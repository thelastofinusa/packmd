import { describe, it, expect } from "vitest"
import { generateMarkdown, GeneratorPayload } from "./generator.js"
import { FileNode, RawFile } from "../types/index.js"

describe("Markdown Generator Engine", () => {
  const mockFiles: RawFile[] = [
    { path: "index.ts", content: "console.log('Hello World');", size: 27 },
  ]

  const mockTree: FileNode[] = [
    {
      name: "index.ts",
      path: "index.ts",
      isDirectory: false,
      extension: "ts",
      size: 27,
    },
  ]

  const basePayload: GeneratorPayload = {
    title: "Test Repo",
    sourceUrl: "https://github.com/test/repo",
    files: mockFiles,
    tree: mockTree,
  }

  it("should generate a complete markdown document with all defaults enabled", () => {
    const result = generateMarkdown(basePayload)

    expect(result).toContain("# 📦 Test Repo")
    expect(result).toContain("**Source:** [https://github.com/test/repo]")
    expect(result).toContain("### Repository Structure")
    expect(result).toContain("└── index.ts")
    expect(result).toContain("### File Contents")
    expect(result).toContain("#### `index.ts`")
    expect(result).toContain("```typescript\nconsole.log('Hello World');\n```")
    expect(result).toContain("<!-- [PackMD-Watermark]")
  })

  it("should hide the title and source when toggled off", () => {
    const result = generateMarkdown(basePayload, {
      includeTitle: false,
      includeSource: false,
    })

    expect(result).not.toContain("# 📦 Test Repo")
    expect(result).not.toContain("**Source:**")
    expect(result).toContain("### Repository Structure") // Should still be there
  })

  it("should hide the ASCII tree when includeTree is false", () => {
    const result = generateMarkdown(basePayload, { includeTree: false })
    expect(result).not.toContain("### Repository Structure")
    expect(result).not.toContain("└── index.ts")
  })

  it("should add line numbers when includeLineNumbers is true", () => {
    const result = generateMarkdown(basePayload, { includeLineNumbers: true })
    expect(result).toContain("1 | console.log('Hello World');")
  })
})
