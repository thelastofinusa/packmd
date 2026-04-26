export type TreeNode = { [name: string]: TreeNode | "file" }

export interface RepoFile {
  path: string
  content: string
  size: number
}

export interface SkippedFile {
  path: string
  reason: "too_large" | "excluded" | "binary" | "fetch_failed" | "over_limit"
  size?: number
}

export interface DigestResult {
  owner: string
  repo: string
  description: string | null
  defaultBranch: string
  files: RepoFile[]
  tree: TreeNode
  skipped: SkippedFile[]
  totalCharacters: number
  estimatedTokens: number
  digest: string
}

export interface DigestOptions {
  maxFileSizeKB: number
  maxFiles: number
  includeGlobs: string[]
  excludeGlobs: string[]
  token?: string
}

export const DEFAULT_OPTIONS: DigestOptions = {
  maxFileSizeKB: 100,
  maxFiles: 200,
  includeGlobs: [],
  excludeGlobs: [
    "node_modules/**",
    ".git/**",
    "*.lock",
    "*.png",
    "*.jpg",
    "*.jpeg",
    "*.gif",
    "*.webp",
    "*.svg",
    "*.ico",
    "*.woff",
    "*.woff2",
    "*.ttf",
    "*.otf",
    "*.mp4",
    "*.mp3",
    "*.zip",
    "*.tar",
    "*.gz",
    "dist/**",
    "build/**",
    ".next/**",
    "out/**",
    "vendor/**",
    "__pycache__/**",
    "*.pyc",
  ],
}
