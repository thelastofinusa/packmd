import path from "node:path"
import {
  DEFAULT_IGNORES,
  RawFile,
  buildFileTree,
  generateMarkdown,
} from "@packmd/core"
import { walkLocalDir } from "../utils/fs"
import { loadGitignore } from "../utils/gitignore"
import type { Ora } from "ora"

export async function handleLocalDir(
  target: string,
  options: any,
  spinner: Ora
) {
  const absolutePath = path.resolve(process.cwd(), target)
  const excludeGlobs = options.exclude || DEFAULT_IGNORES
  const includeGlobs = options.include || []
  const maxFiles = Number(options.maxFiles)
  const maxFileSizeKB = Number(options.maxFileSize)

  const gitignore =
    options.gitignore === false ? null : await loadGitignore(absolutePath)

  // walkLocalDir returns { path, content }[]
  const walked = await walkLocalDir(
    absolutePath,
    absolutePath,
    excludeGlobs,
    includeGlobs,
    maxFileSizeKB,
    maxFiles,
    gitignore
  )

  spinner.text = `Processing ${walked.length} local files..`

  // Convert to RawFile[] (size = content length, approximate)
  const files: RawFile[] = walked.map((f) => ({
    path: f.path,
    content: f.content,
    size: Buffer.byteLength(f.content, "utf-8"), // or f.content.length
  }))

  // Build tree – pass empty ignore list to avoid double‑filtering (already done in walk)
  const tree = buildFileTree(files, {
    ignore: [],
    maxFileSize: maxFileSizeKB * 1024,
  })

  const title = `Local - ${path.basename(absolutePath)}`
  const sourceUrl = `file://${absolutePath}`

  const markdown = generateMarkdown({ title, sourceUrl, files, tree })
  return markdown
}
