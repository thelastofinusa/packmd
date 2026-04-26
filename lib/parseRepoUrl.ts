export interface ParsedRepo {
  owner: string
  repo: string
}

/**
 * Accepts:
 *   https://github.com/owner/repo
 *   https://github.com/owner/repo/tree/main/...
 *   github.com/owner/repo
 *   owner/repo
 *   https://anything.tld/owner/repo  (ingest-style)
 */
export function parseRepoUrl(input: string): ParsedRepo | null {
  const raw = input.trim()
  if (!raw) return null

  // Bare owner/repo form
  const bare = raw.match(/^([\w.-]+)\/([\w.-]+)$/)
  if (bare) return { owner: bare[1], repo: stripGit(bare[2]) }

  // Try as URL
  let url: URL
  try {
    url = new URL(raw.startsWith("http") ? raw : `https://${raw}`)
  } catch {
    return null
  }

  const parts = url.pathname.split("/").filter(Boolean)
  if (parts.length >= 2) {
    return { owner: parts[0], repo: stripGit(parts[1]) }
  }
  return null
}

function stripGit(name: string) {
  return name.replace(/\.git$/, "")
}
