import { MarkdownStats } from "../types"

/**
 * The single place token/char estimates are computed. Anything that shows a
 * count to the user — the initial digest generation AND live editing in the
 * web app — must call this, not roll its own `.length / 4` math.
 */
export function getMarkdownStats(markdown: string): MarkdownStats {
  const characters = markdown.length
  const estimatedTokens = Math.ceil(characters / 4)
  return { characters, estimatedTokens }
}
