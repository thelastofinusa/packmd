import { describe, it, expect } from "vitest"
import { compileIgnorePatterns, isIgnored, matchesAny } from "./filter.js"

describe("Filter Utilities", () => {
  describe("compileIgnorePatterns & isIgnored", () => {
    it("should correctly identify ignored paths based on glob patterns", () => {
      const patterns = compileIgnorePatterns([
        "**/node_modules/**",
        "**/.git/**",
        "*.log",
      ])

      expect(isIgnored("src/node_modules/test.js", patterns)).toBe(true)
      expect(isIgnored(".git/config", patterns)).toBe(true)
      expect(isIgnored("error.log", patterns)).toBe(true)

      expect(isIgnored("src/index.ts", patterns)).toBe(false)
      expect(isIgnored("package.json", patterns)).toBe(false)
    })
  })

  describe("matchesAny", () => {
    it("should match custom include/exclude globs correctly", () => {
      const globs = ["**/*.test.ts", "docs/**"]

      expect(matchesAny("src/components/Button.test.ts", globs)).toBe(true)
      expect(matchesAny("docs/readme.md", globs)).toBe(true)

      expect(matchesAny("src/components/Button.ts", globs)).toBe(false)
    })
  })
})
