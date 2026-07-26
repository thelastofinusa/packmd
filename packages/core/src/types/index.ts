/**
 * Represents a single file or directory within the parsed repository structure.
 * This is environment-agnostic; it doesn't care if it was generated via Node's `fs`
 * or a browser-based file drop API.
 */
export interface FileNode {
  /** The name of the file or directory (e.g., 'index.ts', 'src') */
  name: string
  /** The relative path from the root of the parsed directory (e.g., 'src/utils/index.ts') */
  path: string
  /** True if the node is a directory, false if it is a file */
  isDirectory: boolean
  /** The file extension without the dot (e.g., 'ts', 'json'). Undefined for directories. */
  extension?: string
  /** The raw text content of the file. Undefined for directories or if content extraction is disabled. */
  content?: string
  /** Array of child nodes. Undefined if this node is a file. */
  children?: FileNode[]
  /** File size in bytes. Useful for filtering out massively bloated files before parsing. */
  size?: number
}

/**
 * Configuration options dictating how raw files are processed into a FileNode tree.
 */
export interface ParserOptions {
  /** Array of exact matches or glob patterns to ignore (e.g., ['node_modules', '.git', '*.log']) */
  ignore: string[]
  /** Maximum folder depth to traverse. Undefined or 0 means infinite depth. */
  maxDepth?: number
  /** Whether to extract file contents. If false, only the tree structure is built. Defaults to true. */
  includeContent?: boolean
  /** Maximum file size (in bytes) to read. Files exceeding this are added to the tree without content. */
  maxFileSize?: number
}

/**
 * Configuration options dictating how the FileNode tree is transformed into Markdown.
 */
export interface GeneratorOptions {
  /** Whether to render an ASCII-style file tree at the top of the Markdown output. Defaults to true. */
  showTree?: boolean
  /** Whether to inject line numbers into the markdown code blocks. Defaults to false. */
  includeLineNumbers?: boolean
  /** Optional custom title or description to inject at the very top of the output. */
  headerText?: string
  /** A way to collapse or summarize specific files instead of printing their full content. */
  collapseThreshold?: number
}

/**
 * The unified configuration object for PackMD.
 */
export interface PackMDConfig {
  parser: ParserOptions
  generator: GeneratorOptions
}

export interface ScraperOptions {
  /**
   * Optional Jina API Key. Passing this upgrades the free rate limit
   * from 20 Requests Per Minute to 500 Requests Per Minute.
   */
  jinaApiKey?: string
  /**
   * Maximum number of times to retry the request if rate-limited (HTTP 429)
   * or if a network error occurs. Defaults to 3.
   */
  maxRetries?: number
  /**
   * Abort after this many milliseconds. Defaults to 30000.
   */
  timeoutMs?: number
  /**
   * Callback fired during retry loops or rate-limit pauses to update the CLI/UI.
   */
  onProgress?: (msg: string) => void
}

export interface WebScrapeResult {
  url: string
  title: string
  /** Markdown body converted from the extracted HTML. */
  content: string
  /** Ready-to-use markdown: a title heading followed by the content. */
  markdown: string
  excerpt?: string
  byline?: string | null
  siteName?: string | null
  /**
   * Indicates if the page was fully rendered.
   * (Now defaults to true as Jina handles JS execution natively).
   */
  rendered: boolean
}

export interface GithubFileNode {
  path: string
  type: "blob" | "tree"
  size?: number
  sha?: string
  content?: string
}

export interface GithubRepoResult {
  owner: string
  repo: string
  /** The branch, tag, or commit SHA the digest was generated from. */
  ref: string
  /** The repo's actual default branch (even if a different `ref` was requested). */
  defaultBranch: string
  /** Set when the URL pointed at a subdirectory (e.g. `/tree/main/packages/core`). */
  subpath?: string
  /** True if GitHub truncated the tree listing because the repo is very large. */
  truncated: boolean
  files: GithubFileNode[]
  tree: FileNode[]
  skipped: SkippedFile[]
  markdown: string
}

/**
 * The flat file structure passed into the core by the consuming environment.
 */
export interface RawFile {
  /** The relative path (e.g., 'src/components/Button.tsx') */
  path: string
  /** The stringified content of the file */
  content?: string
  /** File size in bytes */
  size?: number
}

export interface SkippedFile {
  path: string
  reason: "too_large" | "excluded" | "binary" | "fetch_failed" | "over_limit"
  size?: number
}
