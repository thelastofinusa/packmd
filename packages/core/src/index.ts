// Export core configuration and limits
export {
  DEFAULT_IGNORES,
  defaultParserOptions,
  defaultGeneratorOptions,
} from "./utils/defaults"

// Export type definitions and schemas
export * from "./types"
export * from "./utils/zod-schema"

// Export ingest sources
export * from "./ingest-sources/github"
export * from "./ingest-sources/scraper"

// Export the Markdown engine
export { generateMarkdown } from "./engine/generator"
export type { GeneratorPayload } from "./engine/generator"

// Export utilities
export {
  compileIgnorePatterns,
  isIgnored,
  filterRawFiles,
  matchesAny,
} from "./utils/filter"
export { getMarkdownStats } from "./utils/stats"
export { buildFileTree } from "./utils/tree-builder"
export { appendWatermark } from "./watermark"
