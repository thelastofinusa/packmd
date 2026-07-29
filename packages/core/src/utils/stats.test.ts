import { describe, it, expect } from "vitest"
import { getMarkdownStats } from "./stats.js"

describe("Stats Utilities", () => {
  it("should accurately calculate character count and estimate tokens", () => {
    const markdown = "This is exactly 24 chars"
    const stats = getMarkdownStats(markdown)

    expect(stats.characters).toBe(24)
    expect(stats.estimatedTokens).toBe(6) // 24 / 4
  })

  it("should round up for uneven token estimates", () => {
    const markdown = "12345" // 5 characters
    const stats = getMarkdownStats(markdown)

    expect(stats.characters).toBe(5)
    expect(stats.estimatedTokens).toBe(2) // Math.ceil(5/4) -> 2
  })
})
