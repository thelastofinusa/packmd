import type { TreeNode } from "@/types"

export function buildTreeStructure(paths: string[]): TreeNode {
  const root: TreeNode = {}
  for (const path of paths) {
    const parts = path.split("/")
    let current: TreeNode = root
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i]
      const isLeaf = i === parts.length - 1
      if (isLeaf) {
        if (!(part in current)) current[part] = "file"
      } else {
        if (!(part in current) || current[part] === "file") {
          current[part] = {}
        }
        current = current[part] as TreeNode
      }
    }
  }
  return root
}

export function renderTree(node: TreeNode, prefix = ""): string {
  // Sort: directories first, then files, both alphabetical
  const entries = Object.entries(node).sort(([aK, aV], [bK, bV]) => {
    const aDir = aV !== "file"
    const bDir = bV !== "file"
    if (aDir !== bDir) return aDir ? -1 : 1
    return aK.localeCompare(bK)
  })

  let out = ""
  entries.forEach(([key, value], idx) => {
    const last = idx === entries.length - 1
    const connector = last ? "└── " : "├── "
    const suffix = value === "file" ? "" : "/"
    out += `${prefix}${connector}${key}${suffix}\n`
    if (value !== "file") {
      out += renderTree(value, prefix + (last ? "    " : "│   "))
    }
  })
  return out
}
