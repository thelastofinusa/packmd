export interface DigestHeaderOptions {
  /** Emoji or short icon prefix for the title line. Defaults to "📦". */
  icon?: string
  /** Main title text, rendered as an H1. */
  title: string
  /** Key/value pairs rendered as a compact bold metadata block under the title. */
  meta: Record<string, string | number>
}

/**
 * Builds the shared header used at the top of every PackMD digest —
 * GitHub, webpage, or local directory — so all three look consistent.
 */
export function buildDigestHeader({
  icon = "📦",
  title,
  meta,
}: DigestHeaderOptions): string {
  const metaLines = Object.entries(meta)
    .map(([label, value]) => `**${label}:** ${value}`)
    .join("  \n") // markdown hard line-break — keeps lines stacked, not one paragraph

  return [`# ${icon} ${title}`, metaLines, `---`].join("\n\n")
}
