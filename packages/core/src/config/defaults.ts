import { ParserOptions, GeneratorOptions, PackMDConfig } from "../types"

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
]

export const defaultParserOptions: ParserOptions = {
  ignore: DEFAULT_IGNORES,
  includeContent: true,
  maxFileSize: 1048576, // 1MB in bytes (prevents accidental ingestion of huge assets)
}

export const defaultGeneratorOptions: GeneratorOptions = {
  showTree: true,
  includeLineNumbers: false,
}

export const defaultConfig: PackMDConfig = {
  parser: defaultParserOptions,
  generator: defaultGeneratorOptions,
}
