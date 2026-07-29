export interface FileNode {
  name: string
  path: string
  isDirectory: boolean
  extension?: string
  content?: string
  children?: FileNode[]
  size?: number
}

export interface RawFile {
  path: string
  content?: string
  size?: number
}

export interface SkippedFile {
  path: string
  reason: "too_large" | "excluded" | "binary" | "fetch_failed" | "over_limit"
  size?: number
}

export interface MarkdownStats {
  characters: number
  estimatedTokens: number
}

export interface ParserOptions {
  ignore: string[]
  maxDepth?: number
  includeContent?: boolean
  maxFileSize?: number
}

export interface GeneratorOptions {
  /** Include the `# Title` heading. Defaults to true. */
  includeTitle?: boolean
  /** Include the `**Source:** URL` line. Defaults to true. */
  includeSource?: boolean
  /** Render the ASCII directory tree. Defaults to true. */
  includeTree?: boolean
  /** Inject line numbers into code blocks. Defaults to false. */
  includeLineNumbers?: boolean
  /** Custom emoji/icon for the header. Defaults to "📦". */
  headerIcon?: string
}

/**
 * Unified return type for BOTH the web scraper and GitHub fetcher.
 */
export interface PackmdResult {
  sourceUrl: string
  title: string
  markdown: string
  stats: MarkdownStats
  files: RawFile[]
  tree?: FileNode[]
  metadata: {
    engine: "github" | "scraper"
    skippedCount: number
    truncated?: boolean
    ref?: string
  }
}
