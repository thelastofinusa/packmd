import { FileNode, GeneratorOptions } from "../types"
import { defaultGeneratorOptions } from "../config/defaults"

/**
 * Generates the final Markdown string from the parsed FileNode tree.
 */
export function generateMarkdown(
  tree: FileNode[],
  options: Partial<GeneratorOptions> = {}
): string {
  const opts = { ...defaultGeneratorOptions, ...options }
  let markdown = ""

  // 1. Optional Header text
  if (opts.headerText) {
    markdown += `${opts.headerText}\n\n`
  }

  // 2. Visual ASCII Directory Tree
  if (opts.showTree) {
    markdown += "### Repository Structure\n\n```text\n"
    markdown += ".\n"
    markdown += generateTreeString(tree, "")
    markdown += "```\n\n"
  }

  // 3. File Contents
  markdown += "### File Contents\n\n"
  const allFiles = flattenFiles(tree)

  if (allFiles.length === 0) {
    markdown += "*No files found or all files were ignored.*\n"
    return markdown
  }

  for (const file of allFiles) {
    markdown += `#### \`${file.path}\`\n\n`

    if (file.content === undefined) {
      markdown += "*Content not extracted or file is empty.*\n\n"
      markdown += "---\n\n"
      continue
    }

    const language = getMarkdownLanguage(file.extension)
    const contentToRender = opts.includeLineNumbers
      ? addLineNumbers(file.content)
      : file.content

    markdown += `\`\`\`${language}\n`
    // Ensure the code block is closed safely even if the content lacks a trailing newline
    markdown += contentToRender.endsWith("\n")
      ? contentToRender
      : `${contentToRender}\n`
    markdown += "```\n\n"
    markdown += "---\n\n"
  }

  return markdown.trim()
}

/**
 * Recursively generates an ASCII-style tree string (similar to the 'tree' command).
 */
function generateTreeString(nodes: FileNode[], prefix: string): string {
  let result = ""

  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i]
    const isLast = i === nodes.length - 1

    // Use '└── ' for the final item in a directory, '├── ' for everything else
    const connector = isLast ? "└── " : "├── "

    result += `${prefix}${connector}${node?.name}${node?.isDirectory ? "/" : ""}\n`

    if (node?.isDirectory && node?.children) {
      // If it's the last item, subsequent children need spaces, otherwise they need a vertical line
      const nextPrefix = prefix + (isLast ? "    " : "│   ")
      result += generateTreeString(node?.children, nextPrefix)
    }
  }

  return result
}

/**
 * Flattens the hierarchical tree into a single array of just the files.
 * This makes it much easier to loop through and print contents sequentially.
 */
function flattenFiles(nodes: FileNode[]): FileNode[] {
  let files: FileNode[] = []

  for (const node of nodes) {
    if (node.isDirectory && node.children) {
      files = files.concat(flattenFiles(node.children))
    } else if (!node.isDirectory) {
      files.push(node)
    }
  }

  return files
}

/**
 * Prepends line numbers to a string of text.
 * Automatically pads the numbers so they align perfectly.
 */
function addLineNumbers(content: string): string {
  const lines = content.split("\n")
  const padLength = lines.length.toString().length

  return lines
    .map((line, index) => {
      const lineNumber = String(index + 1).padStart(padLength, " ")
      return `${lineNumber} | ${line}`
    })
    .join("\n")
}

/**
 * Maps standard file extensions to Markdown syntax highlighting languages.
 * Falls back to treating the extension as the language if not explicitly mapped.
 */
function getMarkdownLanguage(extension?: string): string {
  if (!extension) return "text"

  const map: Record<string, string> = {
    ts: "typescript",
    tsx: "tsx",
    js: "javascript",
    jsx: "jsx",
    json: "json",
    md: "markdown",
    html: "html",
    css: "css",
    scss: "scss",
    yml: "yaml",
    yaml: "yaml",
    sh: "bash",
    bash: "bash",
    py: "python",
    go: "go",
    rs: "rust",
  }

  return map[extension.toLowerCase()] || extension.toLowerCase()
}
