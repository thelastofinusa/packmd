// Export core configuration and limits
export {
  DEFAULT_IGNORES,
  defaultParserOptions,
  defaultGeneratorOptions,
  defaultConfig,
} from "./config/defaults"

// Export type definitions
export * from "./types"
export * from "./utils/schema"
export * from "./fetchers/github"
export * from "./fetchers/scraper"

// Export the parser logic (Updated to match your parser file)
export { buildFileTree } from "./parser"

// Export the markdown generation logic
export { generateMarkdown } from "./generator/markdown"
export { buildDigestHeader } from "./generator/header"

// Export utilities (useful if the CLI/Web wants to pre-filter files before passing them)
export {
  compileIgnorePatterns,
  isIgnored,
  filterRawFiles,
} from "./utils/filter"
