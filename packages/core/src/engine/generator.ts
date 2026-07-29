import { FileNode, GeneratorOptions, RawFile } from "../types"
import { defaultGeneratorOptions } from "../utils/defaults"
import { appendWatermark } from "../watermark"

export interface GeneratorPayload {
  title: string
  sourceUrl: string
  files?: RawFile[]
  tree?: FileNode[]
  content?: string
}

export function generateMarkdown(
  payload: GeneratorPayload,
  options: Partial<GeneratorOptions> = {}
): string {
  const opts = { ...defaultGeneratorOptions, ...options }
  const icon = opts.headerIcon || "📦"
  let markdown = ""

  // 1. Bold title and source (filterable)
  if (opts.includeTitle) {
    markdown += `**Title:** ${icon} ${payload.title}\n\n`
  }
  if (opts.includeSource) {
    markdown += `**Source:** [${payload.sourceUrl}](${payload.sourceUrl})\n`
  }
  if (opts.includeTitle || opts.includeSource) {
    markdown += "\n"
  }

  // 2. Main heading (always included)
  markdown += `## ${icon} ${payload.title}\n\n`

  // 3. ASCII Tree (optional)
  if (opts.includeTree && payload.tree && payload.tree.length > 0) {
    markdown += "### Repo Structure\n\n```text\n.\n"
    markdown += generateTreeString(payload.tree, "")
    markdown += "```\n\n"
  }

  // 4. Direct Content (for Web Scraper) or File Contents (for Repos)
  if (payload.content) {
    markdown += `${payload.content}\n\n`
  } else if (payload.files) {
    markdown += "### File Contents\n\n"

    if (payload.files.length === 0) {
      markdown += "*No files found or all files were ignored.*\n"
      return appendWatermark(markdown, payload.sourceUrl)
    }

    for (const file of payload.files) {
      markdown += `#### \`${file.path}\`\n\n`

      if (file.content === undefined) {
        markdown += "*Content not extracted or file is empty.*\n\n---\n\n"
        continue
      }

      const extension = file.path.split(".").pop() || ""
      const language = getMarkdownLanguage(extension)
      const contentToRender = opts.includeLineNumbers
        ? addLineNumbers(file.content)
        : file.content

      markdown += `\`\`\`${language}\n`
      markdown += contentToRender.endsWith("\n")
        ? contentToRender
        : `${contentToRender}\n`
      markdown += "```\n\n---\n\n"
    }
  }

  return appendWatermark(markdown, payload.sourceUrl)
}

function generateTreeString(nodes: FileNode[], prefix: string): string {
  let result = ""
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i]
    const isLast = i === nodes.length - 1
    const connector = isLast ? "└── " : "├── "
    result += `${prefix}${connector}${node?.name}${node?.isDirectory ? "/" : ""}\n`
    if (node?.isDirectory && node?.children) {
      const nextPrefix = prefix + (isLast ? "    " : "│   ")
      result += generateTreeString(node?.children, nextPrefix)
    }
  }
  return result
}

function addLineNumbers(content: string): string {
  const lines = content.split("\n")
  const padLength = lines.length.toString().length
  return lines
    .map((line, i) => `${String(i + 1).padStart(padLength, " ")} | ${line}`)
    .join("\n")
}

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
