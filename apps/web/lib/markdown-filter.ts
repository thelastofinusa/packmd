/**
 * Markdown section filtering.
 *
 * PackMD's generated digests always include a fixed preamble:
 *
 *   **Title:** 📦 owner/repo
 *
 *   **Source:** [https://github.com/owner/repo](https://github.com/owner/repo)
 *
 *   ---
 *
 *   ## 📦 owner/repo
 *
 *   ### Repo Structure
 *
 *   ```text
 *   .
 *   ├── ...
 *   ```
 *
 *   ### File Contents
 *
 *   #### `path/to/file.ts`
 *
 *   ```typescript
 *   ...
 *   ```
 *
 * This module provides pure, well-anchored regexes that strip these
 * pre-existing sections when the user toggles them off in the UI. They are
 * intentionally lenient with the icon character (📦 by default) and tolerate
 * the optional separator that `generateMarkdown` adds.
 *
 * All transforms are pure functions that DO NOT mutate their input.
 */

export type SectionKey =
  "pageInfo" | "source" | "structure" | "images" | "links"

export type SectionFlags = Record<SectionKey, boolean>

export const DEFAULT_SECTIONS: SectionFlags = {
  pageInfo: true,
  source: true,
  structure: false,
  images: true,
  links: true,
}

/**
 * Strips HTML/JSX noise that may sneak into scraped pages. We also strip a
 * handful of common Next.js / React Server Components artifacts so they
 * don't leak through the preview pane.
 */
export function sanitizeNoise(input: string): string {
  if (!input) return ""
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(
      /<\/?(fragment|profiler|strictmode|suspense|activity|viewtransition)\b[^>]*>/gi,
      ""
    )
}

/**
 * Strip image references from a markdown string.
 * Handles both inline `![alt](url)` syntax and raw `<img>` tags.
 */
export function stripImages(input: string): string {
  if (!input) return ""
  return input
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/<img\b[^>]*>/gi, "")
}

/**
 * Convert all markdown links `[label](url)` to plain `label`, and unwrap
 * anchor tags. Used when the user wants a "links removed" preview.
 */
export function stripLinks(input: string): string {
  if (!input) return ""
  return input
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/<a\b[^>]*>([\s\S]*?)<\/a>/gi, "$1")
}

/**
 * Strip the embedded `**Title:**` line that the core engine adds.
 * Matches at the start of the document and tolerates any leading icon
 * (default 📦 but configurable). Also consumes a trailing blank line.
 */
export function stripTitle(input: string): string {
  if (!input) return ""
  // Greedy one-liner that covers:
  //   **Title:** 📦 owner/repo
  //   **Title:** some arbitrary title with [brackets] and : colons
  // We allow any non-newline content after the colon.
  return input.replace(/^\*\*Title:\*\*[ \t]+[^\n]*\n+(?:\n+)?/m, "")
}

/**
 * Strip the embedded `**Source:**` line (and trailing blank line) that
 * the core engine adds, including the optional `---` separator that
 * `generateMarkdown` injects right after.
 */
export function stripSource(input: string): string {
  if (!input) return ""
  // 1. Strip the bold source line + any blank lines.
  // 2. Then strip the immediately-following `---` separator (consuming
  //    its blank lines) so we don't leave a dangling horizontal rule.
  return input
    .replace(/^\*\*Source:\*\*[ \t]+[^\n]*\n+(?:\n+)?/m, "")
    .replace(/^\s*---\s*\n+(?:\n+)?/m, "")
}

/**
 * Strip the "### Repo Structure" section, including the fenced
 * ```text code block. Tolerant of CR/LF and trailing whitespace.
 */
export function stripRepoStructure(input: string): string {
  if (!input) return ""
  // Remove the heading itself, the following blank line, and the entire
  // ```text ... ``` block that follows. `[\s\S]*?` is non-greedy so we
  // stop at the FIRST closing fence. We also strip the blank line that
  // comes after the closing fence so we don't leave an empty gap.
  return input.replace(
    /^###\s+Repo\s+Structure\b[^\n]*\n+```text[\s\S]*?```\s*\n*/gim,
    ""
  )
}

/**
 * Detect whether the markdown actually contains a Repo Structure section.
 * Cheap, single regex test — used to disable the toggle when the section
 * is not present.
 */
export function hasRepoStructure(input: string): boolean {
  if (!input) return false
  return /^###\s+Repo\s+Structure\b/im.test(input)
}

/**
 * Apply every section-stripping transform that the user has disabled.
 * Order matters: we strip the title and source lines first (which live
 * in the preamble) before we strip the structure block (which lives
 * deeper in the document).
 */
export function applySectionFilters(
  input: string,
  flags: SectionFlags
): string {
  if (!input) return ""

  let output = input

  if (!flags.pageInfo) {
    output = stripTitle(output)
  }
  if (!flags.source) {
    output = stripSource(output)
  }
  if (!flags.structure) {
    output = stripRepoStructure(output)
  }
  if (!flags.images) {
    output = stripImages(output)
  }
  if (!flags.links) {
    output = stripLinks(output)
  }

  return output
}

/**
 * Stable serialization key for section flags. Used as a memo dependency
 * so we never re-run the (potentially expensive) filter pipeline with
 * the same inputs.
 */
export function sectionsKey(flags: SectionFlags): string {
  return `${flags.pageInfo ? 1 : 0}${flags.source ? 1 : 0}${flags.structure ? 1 : 0}${flags.images ? 1 : 0}${flags.links ? 1 : 0}`
}
