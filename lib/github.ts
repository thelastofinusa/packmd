import type {
  DigestOptions,
  DigestResult,
  RepoFile,
  SkippedFile,
} from "@/types"
import { matchesAny } from "./glob"
import { buildTreeStructure } from "./buildTree"
import { buildDigest, estimateTokens } from "./formatter"

const GH_API = "https://api.github.com"

export class GitHubError extends Error {
  constructor(
    message: string,
    public kind:
      | "not_found"
      | "rate_limit"
      | "auth"
      | "network"
      | "unknown" = "unknown"
  ) {
    super(message)
  }
}

function authHeaders(token?: string): HeadersInit {
  const h: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  }
  if (token) h.Authorization = `Bearer ${token}`
  return h
}

async function ghFetch(url: string, token?: string): Promise<Response> {
  let res: Response
  try {
    res = await fetch(url, { headers: authHeaders(token) })
  } catch (e: unknown) {
    throw new GitHubError(
      e instanceof Error ? e.message : "Network error contacting GitHub",
      "network"
    )
  }
  if (res.status === 404)
    throw new GitHubError("Repository not found", "not_found")
  if (res.status === 401) throw new GitHubError("Invalid GitHub token", "auth")
  if (res.status === 403 || res.status === 429) {
    const remaining = res.headers.get("x-ratelimit-remaining")
    if (remaining === "0") {
      throw new GitHubError(
        "GitHub rate limit reached. Add a personal access token in Advanced settings to continue.",
        "rate_limit"
      )
    }
    throw new GitHubError("Access forbidden by GitHub", "auth")
  }
  if (!res.ok)
    throw new GitHubError(`GitHub API error (${res.status})`, "unknown")
  return res
}

async function isLikelyText(blob: Blob): Promise<boolean> {
  // Sample first 4KB; if any null bytes, treat as binary.
  const slice = blob.slice(0, 4096)
  const buf = new Uint8Array(await slice.arrayBuffer())
  for (let i = 0; i < buf.length; i++) if (buf[i] === 0) return false
  return true
}

export async function fetchDigest(
  owner: string,
  repo: string,
  options: DigestOptions,
  onProgress?: (msg: string) => void
): Promise<DigestResult> {
  onProgress?.("Fetching repository metadata...")
  const repoRes = await ghFetch(
    `${GH_API}/repos/${owner}/${repo}`,
    options.token
  )
  const repoData = await repoRes.json()
  const defaultBranch: string = repoData.default_branch || "main"
  const description: string | null = repoData.description ?? null

  onProgress?.(`Fetching git tree (${defaultBranch})...`)
  const treeRes = await ghFetch(
    `${GH_API}/repos/${owner}/${repo}/git/trees/${defaultBranch}?recursive=1`,
    options.token
  )
  const treeJson = await treeRes.json()
  const blobs: Array<{ path: string; size: number; sha: string }> = (
    treeJson.tree || []
  )
    .filter((t: { type: string }) => t.type === "blob")
    .map((t: { path: string; size: number; sha: string }) => ({
      path: t.path,
      size: t.size ?? 0,
      sha: t.sha,
    }))

  const maxBytes = options.maxFileSizeKB * 1024
  const skipped: SkippedFile[] = []
  const candidates: typeof blobs = []

  for (const b of blobs) {
    if (matchesAny(b.path, options.excludeGlobs)) {
      skipped.push({ path: b.path, reason: "excluded", size: b.size })
      continue
    }
    if (
      options.includeGlobs.length > 0 &&
      !matchesAny(b.path, options.includeGlobs)
    ) {
      skipped.push({ path: b.path, reason: "excluded", size: b.size })
      continue
    }
    if (b.size > maxBytes) {
      skipped.push({ path: b.path, reason: "too_large", size: b.size })
      continue
    }
    candidates.push(b)
  }

  // Apply max files cap (after sort by size for deterministic behaviour)
  candidates.sort((a, b) => a.path.localeCompare(b.path))
  const overLimit = candidates.slice(options.maxFiles)
  for (const o of overLimit)
    skipped.push({ path: o.path, reason: "over_limit", size: o.size })
  const limited = candidates.slice(0, options.maxFiles)

  const files: RepoFile[] = []
  const BATCH = 10
  for (let i = 0; i < limited.length; i += BATCH) {
    const batch = limited.slice(i, i + BATCH)
    onProgress?.(
      `Downloading files ${Math.min(i + BATCH, limited.length)}/${limited.length}...`
    )
    const results = await Promise.all(
      batch.map(async (b) => {
        const rawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${defaultBranch}/${b.path
          .split("/")
          .map(encodeURIComponent)
          .join("/")}`
        try {
          // raw.githubusercontent.com supports the Authorization header for private repos too
          const res = await fetch(
            rawUrl,
            options.token
              ? { headers: { Authorization: `Bearer ${options.token}` } }
              : undefined
          )
          if (!res.ok) throw new Error(String(res.status))
          const blob = await res.blob()
          if (!(await isLikelyText(blob))) {
            return {
              skip: { path: b.path, reason: "binary" as const, size: b.size },
            }
          }
          const content = await blob.text()
          return { file: { path: b.path, content, size: b.size } }
        } catch {
          return {
            skip: {
              path: b.path,
              reason: "fetch_failed" as const,
              size: b.size,
            },
          }
        }
      })
    )
    for (const r of results) {
      if ("file" in r && r.file) files.push(r.file)
      if ("skip" in r && r.skip) skipped.push(r.skip)
    }
  }

  const tree = buildTreeStructure(files.map((f) => f.path))
  const digest = buildDigest({
    owner,
    repo,
    description,
    defaultBranch,
    tree,
    files,
    skipped,
  })
  const totalCharacters = files.reduce((s, f) => s + f.content.length, 0)

  return {
    owner,
    repo,
    description,
    defaultBranch,
    files,
    tree,
    skipped,
    totalCharacters,
    estimatedTokens: estimateTokens(totalCharacters),
    digest,
  }
}
