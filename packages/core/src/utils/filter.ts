import { makeRe, minimatch } from "minimatch"
import { RawFile } from "../types"

/**
 * Converts ignore patterns (like .gitignore) into RegExp objects
 * using minimatch's `makeRe` for accurate glob matching.
 */
export function compileIgnorePatterns(patterns: string[]): RegExp[] {
  return patterns
    .filter((p) => p && p.length > 0)
    .map((pattern) => makeRe(pattern, { dot: true, noglobstar: false }))
    .filter((regex): regex is RegExp => regex !== false)
}

/**
 * Checks if a file path matches any of the compiled ignore regexes.
 */
export function isIgnored(filePath: string, ignoreRegexes: RegExp[]): boolean {
  return ignoreRegexes.some((regex) => regex.test(filePath))
}

/**
 * Filters an array of RawFiles, removing those that match any ignore pattern.
 */
export function filterRawFiles(
  files: RawFile[],
  ignorePatterns: string[]
): RawFile[] {
  if (!ignorePatterns || ignorePatterns.length === 0) {
    return files
  }
  const regexes = compileIgnorePatterns(ignorePatterns)
  return files.filter((file) => !isIgnored(file.path, regexes))
}

/**
 * Checks if a path matches any of the provided glob patterns.
 * Uses minimatch for full glob support.
 */
export function matchesAny(path: string, patterns: string[]): boolean {
  if (patterns.length === 0) return false
  return patterns.some((pattern) => minimatch(path, pattern, { dot: true }))
}
