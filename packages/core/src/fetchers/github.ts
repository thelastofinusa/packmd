import { matchesAny } from "../utils/filter"
import { buildFileTree } from "../parser"
import { generateMarkdown } from "../generator/markdown"
import { GithubRepoResult, RawFile, SkippedFile } from "../types"
import { DEFAULT_IGNORES, defaultParserOptions } from "../config/defaults"
import { buildDigestHeader } from "../generator/header"

const GITHUB_API = "https://api.github.com/repos"

const BINARY_EXTENSIONS = new Set([
  "png",
  "jpg",
  "jpeg",
  "gif",
  "webp",
  "bmp",
  "ico",
  "tiff",
  "pdf",
  "zip",
  "tar",
  "gz",
  "7z",
  "rar",
  "exe",
  "dll",
  "so",
  "dylib",
  "bin",
  "dat",
  "class",
  "jar",
  "wasm",
  "woff",
  "woff2",
  "ttf",
  "eot",
  "otf",
  "mp3",
  "mp4",
  "mov",
  "avi",
  "webm",
  "flac",
  "wav",
  "db",
  "sqlite",
  "lock",
])

function isLikelyBinaryPath(path: string): boolean {
  const ext = path.split(".").pop()?.toLowerCase()
  return !!ext && BINARY_EXTENSIONS.has(ext)
}

/**
 * Smartly parses any GitHub URL variant:
 * - Root repo: https://github.com/vercel/next.js
 * - Branch root: https://github.com/vercel/next.js/tree/canary
 * - Subdirectory: https://github.com/vercel/next.js/tree/canary/packages/next
 * - Single file blob: https://github.com/vercel/next.js/blob/canary/package.json
 */
function parseGithubUrl(url: string): {
  owner: string
  repo: string
  type?: "tree" | "blob"
  segments: string[]
} {
  const cleaned = url
    .split("#")[0]!
    .split("?")[0]!
    .replace(/\/$/, "")
    .replace(/\.git$/, "")

  const match = cleaned.match(
    /github\.com\/([^\/]+)\/([^\/]+)(?:\/(tree|blob)\/(.+))?$/i
  )
  if (!match || !match[1] || !match[2]) {
    throw new Error(
      "Invalid GitHub repository URL. Expected something like https://github.com/owner/repo or https://github.com/owner/repo/tree/branch/subdir."
    )
  }

  const rest = match[4]
  const segments = rest ? rest.split("/").filter(Boolean) : []
  return {
    owner: match[1],
    repo: match[2],
    type: match[3]?.toLowerCase() as "tree" | "blob" | undefined,
    segments,
  }
}

function buildHeaders(token?: string): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "PackMD-App",
  }
  if (token) {
    headers.Authorization = token.startsWith("github_pat_")
      ? `Bearer ${token}`
      : `token ${token}`
  }
  return headers
}

function rateLimitMessage(res: Response): string {
  const remaining = res.headers.get("x-ratelimit-remaining")
  const reset = res.headers.get("x-ratelimit-reset")
  const base = "GitHub API rate limit exceeded."
  const hint =
    "Add a personal access token (PAT) in options to raise the limit to 5,000 requests/hour."
  if (remaining === "0" && reset) {
    const resetDate = new Date(Number(reset) * 1000)
    return `${base} Resets at ${resetDate.toLocaleTimeString()}. ${hint}`
  }
  return `${base} ${hint}`
}

async function refExists(
  owner: string,
  repo: string,
  candidate: string,
  headers: Record<string, string>
): Promise<boolean> {
  const branchRes = await fetch(
    `${GITHUB_API}/${owner}/${repo}/branches/${encodeURIComponent(candidate)}`,
    { headers }
  )
  if (branchRes.ok) return true

  const tagRes = await fetch(
    `${GITHUB_API}/${owner}/${repo}/git/ref/tags/${encodeURIComponent(candidate)}`,
    { headers }
  )
  return tagRes.ok
}

/**
 * Resolves ref (branch/tag) when names contain slashes (e.g. feature/my-branch)
 */
async function resolveRef(
  owner: string,
  repo: string,
  segments: string[],
  headers: Record<string, string>
): Promise<{ ref: string; subpath: string }> {
  if (segments.length <= 1) {
    return { ref: segments[0] || "", subpath: "" }
  }

  const first = segments[0]!
  if (await refExists(owner, repo, first, headers)) {
    return { ref: first, subpath: segments.slice(1).join("/") }
  }

  const maxAttempts = Math.min(segments.length, 8)
  for (let i = maxAttempts; i > 1; i--) {
    const candidate = segments.slice(0, i).join("/")
    if (await refExists(owner, repo, candidate, headers)) {
      return { ref: candidate, subpath: segments.slice(i).join("/") }
    }
  }

  return { ref: first, subpath: segments.slice(1).join("/") }
}

function resolveMaxBytes(maxFileSizeKB?: number): number {
  const kb =
    typeof maxFileSizeKB === "number" &&
    !Number.isNaN(maxFileSizeKB) &&
    maxFileSizeKB > 0
      ? maxFileSizeKB
      : defaultParserOptions.maxFileSize! / 1024
  return kb * 1024
}

function resolveMaxFiles(maxFiles?: number): number {
  return typeof maxFiles === "number" && !Number.isNaN(maxFiles) && maxFiles > 0
    ? maxFiles
    : 200
}

interface BlobCandidate {
  path: string
  fullPath: string
  size: number
  sha?: string
}

async function downloadRawFile(
  owner: string,
  repo: string,
  ref: string,
  blob: BlobCandidate,
  token?: string,
  attempt = 0
): Promise<{ ok: true; file: RawFile } | { ok: false; skipped: SkippedFile }> {
  const encodedPath = blob.fullPath.split("/").map(encodeURIComponent).join("/")
  const encodedRef = ref.split("/").map(encodeURIComponent).join("/")
  const rawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${encodedRef}/${encodedPath}`

  try {
    const res = await fetch(
      rawUrl,
      token
        ? {
            headers: {
              Authorization: token.startsWith("github_pat_")
                ? `Bearer ${token}`
                : `token ${token}`,
            },
          }
        : undefined
    )
    if (!res.ok) throw new Error(`HTTP ${res.status}`)

    const buffer = await res.arrayBuffer()
    const sample = new Uint8Array(buffer.slice(0, 8000))
    if (sample.includes(0)) {
      return {
        ok: false,
        skipped: { path: blob.path, reason: "binary", size: blob.size },
      }
    }

    const content = new TextDecoder("utf-8").decode(buffer)
    return { ok: true, file: { path: blob.path, content, size: blob.size } }
  } catch (err) {
    if (attempt < 2) {
      await new Promise((r) => setTimeout(r, 300 * (attempt + 1)))
      return downloadRawFile(owner, repo, ref, blob, token, attempt + 1)
    }
    return {
      ok: false,
      skipped: { path: blob.path, reason: "fetch_failed", size: blob.size },
    }
  }
}

export async function fetchGithubRepo(
  repoUrl: string,
  options: {
    token?: string
    excludeGlobs?: string[]
    includeGlobs?: string[]
    maxFileSizeKB?: number
    maxFiles?: number
    useDefaultIgnores?: boolean
    onProgress?: (msg: string) => void
  } = {}
): Promise<GithubRepoResult> {
  const { owner, repo, type, segments } = parseGithubUrl(repoUrl)
  const token = options.token
  const headers = buildHeaders(token)
  const onProgress = options.onProgress || (() => {})

  onProgress(`Fetching metadata for ${owner}/${repo}..`)
  const repoRes = await fetch(`${GITHUB_API}/${owner}/${repo}`, { headers })
  if (!repoRes.ok) {
    if (repoRes.status === 404) {
      throw new Error(
        token
          ? "Repository not found or your token lacks access permissions."
          : "Repository not found or is private. Please provide a GitHub Personal Access Token (PAT)."
      )
    }
    if (repoRes.status === 403 || repoRes.status === 429) {
      throw new Error(rateLimitMessage(repoRes))
    }
    throw new Error(`GitHub API error: ${repoRes.statusText}`)
  }
  const repoData = await repoRes.json()
  const defaultBranch: string = repoData.default_branch || "main"

  let ref = defaultBranch
  let subpath = ""

  if (segments.length > 0) {
    onProgress("Resolving branch, tag, or path..")
    const resolved = await resolveRef(owner, repo, segments, headers)
    ref = resolved.ref || defaultBranch
    subpath = resolved.subpath
  }

  // If it's a direct file blob URL (e.g. /blob/main/package.json), treat subpath as the exact file path
  if (type === "blob" && segments.length > 0) {
    ref = segments[0] || defaultBranch
    subpath = segments.slice(1).join("/")
  }

  onProgress(`Fetching git tree for ref (${ref})..`)
  const treeRes = await fetch(
    `${GITHUB_API}/${owner}/${repo}/git/trees/${encodeURIComponent(ref)}?recursive=1`,
    { headers }
  )
  if (!treeRes.ok) {
    if (treeRes.status === 403 || treeRes.status === 429) {
      throw new Error(rateLimitMessage(treeRes))
    }
    if (treeRes.status === 404) {
      throw new Error(
        `Branch, tag, or path "${ref}" was not found on ${owner}/${repo}.`
      )
    }
    throw new Error(`Failed to fetch tree: ${treeRes.statusText}`)
  }

  const treeData = await treeRes.json()
  const truncated = Boolean(treeData.truncated)
  if (truncated) {
    onProgress(
      "Warning: GitHub truncated this tree listing due to repository size."
    )
  }

  const prefix = subpath ? `${subpath}/` : ""
  const allBlobs: BlobCandidate[] = (treeData.tree || [])
    .filter((item: any) => item.type === "blob")
    .filter((item: any) => {
      if (!subpath) return true
      if (type === "blob") return item.path === subpath
      return item.path === subpath || item.path.startsWith(prefix)
    })
    .map((item: any) => {
      const fullPath = item.path as string
      const relativePath =
        subpath && type !== "blob"
          ? fullPath.startsWith(prefix)
            ? fullPath.slice(prefix.length)
            : fullPath.split("/").pop()!
          : fullPath
      return {
        fullPath,
        path: relativePath,
        size: (item.size as number) || 0,
        sha: item.sha as string | undefined,
      }
    })

  if (subpath && allBlobs.length === 0) {
    throw new Error(
      `No files found under "${subpath}" on ${owner}/${repo}@${ref}.`
    )
  }

  const maxBytes = resolveMaxBytes(options.maxFileSizeKB)
  const exclude =
    options.useDefaultIgnores === false
      ? options.excludeGlobs || []
      : [...DEFAULT_IGNORES, ...(options.excludeGlobs || [])]
  const include = options.includeGlobs || []
  const maxFiles = resolveMaxFiles(options.maxFiles)

  const candidates: BlobCandidate[] = []
  const skipped: SkippedFile[] = []

  for (const b of allBlobs) {
    if (matchesAny(b.path, exclude) || matchesAny(b.fullPath, exclude)) {
      skipped.push({ path: b.path, reason: "excluded", size: b.size })
      continue
    }
    if (
      include.length > 0 &&
      !matchesAny(b.path, include) &&
      !matchesAny(b.fullPath, include)
    ) {
      skipped.push({ path: b.path, reason: "excluded", size: b.size })
      continue
    }
    if (isLikelyBinaryPath(b.path)) {
      skipped.push({ path: b.path, reason: "binary", size: b.size })
      continue
    }
    if (b.size > maxBytes) {
      skipped.push({ path: b.path, reason: "too_large", size: b.size })
      continue
    }
    candidates.push(b)
  }

  candidates.sort((a, b) => a.path.localeCompare(b.path))
  const overLimit = candidates.slice(maxFiles)
  for (const o of overLimit) {
    skipped.push({ path: o.path, reason: "over_limit", size: o.size })
  }
  const limited = candidates.slice(0, maxFiles)

  const files: RawFile[] = []
  const batchSize = 10

  for (let i = 0; i < limited.length; i += batchSize) {
    const batch = limited.slice(i, i + batchSize)
    onProgress(
      `Downloading files (${Math.min(i + batchSize, limited.length)}/${limited.length})..`
    )

    const results = await Promise.all(
      batch.map((b) => downloadRawFile(owner, repo, ref, b, token))
    )

    for (const result of results) {
      if (result.ok) files.push(result.file)
      else skipped.push(result.skipped)
    }
  }

  onProgress(`Done. Included ${files.length} files, skipped ${skipped.length}.`)

  const tree = buildFileTree(files, {
    ignore: [],
    includeContent: true,
    maxFileSize: maxBytes,
  })

  const headerLabel = subpath
    ? `${owner}/${repo}/${subpath}`
    : `${owner}/${repo}`
  const refSuffix = ref !== defaultBranch ? ` @ ${ref}` : ""
  const totalChars = files.reduce((sum, f) => sum + (f.content?.length || 0), 0)
  const estTokens = Math.round(totalChars / 4)

  const headerText = buildDigestHeader({
    icon: "🐙",
    title: `GitHub Digest — \`${headerLabel}${refSuffix}\``,
    meta: {
      Source: `\`https://github.com/${owner}/${repo}\``,
      Files: files.length,
      "Est. tokens": `~${estTokens.toLocaleString()}`,
      ...(truncated
        ? { Note: "⚠️ GitHub truncated this tree (repo too large)" }
        : {}),
    },
  })

  const markdown = generateMarkdown(tree, { showTree: true, headerText })

  return {
    owner,
    repo,
    ref,
    defaultBranch,
    subpath: subpath || undefined,
    truncated,
    files: files.map((f) => ({ ...f, type: "blob" as const })),
    tree,
    skipped,
    markdown,
  }
}
