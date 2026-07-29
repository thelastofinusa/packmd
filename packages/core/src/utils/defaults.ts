import { GeneratorOptions, ParserOptions } from "../types"

export const DEFAULT_IGNORES = [
  "**/node_modules",
  "**/node_modules/**",
  "**/.git/**",
  "**/.next/**",
  "**/.next",
  "**/.turbo/**",
  "**/.turbo",
  "**/dist/**",
  "**/dist",
  "**/out/**",
  "**/out",
  "**/build/**",
  "**/build",
  "**/coverage/**",
  "**/coverage",
  "**/.env",
  "**/.env.*",
  "**/package-lock.json",
  "**/pnpm-lock.yaml",
  "**/yarn.lock",
  "**/bun.lock",
  "**/.md",
  "**/.mdx",
]

export const defaultParserOptions: ParserOptions = {
  ignore: DEFAULT_IGNORES,
  includeContent: true,
  maxFileSize: 1048576,
}

export const defaultGeneratorOptions: GeneratorOptions = {
  includeTitle: true,
  includeSource: true,
  includeTree: true,
  includeLineNumbers: false,
  headerIcon: "📦",
}
