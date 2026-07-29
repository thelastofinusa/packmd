import { describe, it, expect } from "vitest"
import { buildFileTree } from "./tree-builder.js"
import { RawFile } from "../types/index.js"

describe("Tree Builder", () => {
  it("should construct a nested FileNode tree from flat paths", () => {
    const rawFiles: RawFile[] = [
      { path: "src/index.ts", content: "console.log('hi');", size: 18 },
      {
        path: "src/utils/math.ts",
        content: "export const add = () => {};",
        size: 28,
      },
      { path: "package.json", content: "{}", size: 2 },
    ]

    const tree = buildFileTree(rawFiles)

    // Tree should have two roots: 'src' (dir) and 'package.json' (file)
    expect(tree).toHaveLength(2)

    const packageJsonNode = tree.find((n) => n.name === "package.json")
    expect(packageJsonNode?.isDirectory).toBe(false)
    expect(packageJsonNode?.extension).toBe("json")

    const srcNode = tree.find((n) => n.name === "src")
    expect(srcNode?.isDirectory).toBe(true)
    expect(srcNode?.children).toHaveLength(2)

    // Ensure children are mapped correctly
    const indexNode = srcNode?.children?.find(
      (n: { name: string }) => n.name === "index.ts"
    )
    expect(indexNode?.path).toBe("src/index.ts")
  })

  it("should omit content if the file size exceeds maxFileSize", () => {
    const rawFiles: RawFile[] = [
      { path: "big.log", content: "huge string", size: 5000 },
    ]

    const tree = buildFileTree(rawFiles, { maxFileSize: 1000 }) // Limit to 1000 bytes

    const node = tree[0]
    expect(node?.content).toContain("[Content omitted: File size exceeds")
  })
})
