import type { FileNode, ParserOptions, RawFile } from "../types"
import { filterRawFiles } from "../utils/filter"
import { defaultParserOptions } from "./defaults"

/**
 * Converts a flat array of RawFiles into a nested FileNode directory tree.
 */
export function buildFileTree(
  rawFiles: RawFile[],
  options: Partial<ParserOptions> = {}
): FileNode[] {
  const opts = { ...defaultParserOptions, ...options }

  // 1. Filter out ignored files first to save processing time
  const filteredFiles = filterRawFiles(rawFiles, opts.ignore || [])

  const root: FileNode[] = []

  // 2. Build the tree structure
  for (const rawFile of filteredFiles) {
    const parts = rawFile.path.split("/")
    let currentLevel = root

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i] as string
      const isFile = i === parts.length - 1

      // Check if this directory/file already exists at the current level
      let existingNode = currentLevel.find((node) => node.name === part)

      if (existingNode) {
        if (!isFile) {
          // Navigate deeper into the existing directory
          currentLevel = existingNode.children!
        }
      } else {
        // Create a new node
        const newNode: FileNode = {
          name: part,
          path: parts.slice(0, i + 1).join("/"),
          isDirectory: !isFile,
        }

        if (isFile) {
          // Handle File specifics
          const extIndex = part.lastIndexOf(".")
          newNode.extension =
            extIndex > 0 ? part.slice(extIndex + 1) : undefined

          if (opts.includeContent) {
            // Apply size limits to prevent generating massive markdown blocks
            if (
              opts.maxFileSize &&
              rawFile.size &&
              rawFile.size > opts.maxFileSize
            ) {
              newNode.content = `[Content omitted: File size exceeds ${opts.maxFileSize} bytes]`
            } else {
              newNode.content = rawFile.content
            }
          }
          newNode.size = rawFile.size
        } else {
          // Handle Directory specifics
          newNode.children = []
        }

        currentLevel.push(newNode)

        // If it's a directory, update the pointer so subsequent parts are nested inside it
        if (!isFile) {
          currentLevel = newNode.children!
        }
      }
    }
  }

  // Optional: Sort the tree so directories appear first, then files alphabetically
  sortTree(root)
  return root
}

/**
 * Recursively sorts the tree: directories first, then alphabetical.
 */
function sortTree(nodes: FileNode[]) {
  nodes.sort((a, b) => {
    if (a.isDirectory === b.isDirectory) {
      return a.name.localeCompare(b.name)
    }
    return a.isDirectory ? -1 : 1
  })

  for (const node of nodes) {
    if (node.children) {
      sortTree(node.children)
    }
  }
}
