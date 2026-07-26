import path from "node:path"
import { DEFAULT_IGNORES, buildDigestHeader } from "@packmd/core"
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

  const files = await walkLocalDir(
    absolutePath,
    absolutePath,
    excludeGlobs,
    includeGlobs,
    maxFileSizeKB,
    maxFiles,
    gitignore
  )

  spinner.text = `Processing ${files.length} local files..`

  const totalChars = files.reduce((sum, f) => sum + f.content.length, 0)
  const estTokens = Math.round(totalChars / 4)

  const header = buildDigestHeader({
    title: `Local Digest — \`${path.basename(absolutePath)}\``,
    meta: {
      Path: `\`${absolutePath}\``,
      Date: new Date().toISOString().slice(0, 10),
      Files: files.length,
      "Est. tokens": `~${estTokens.toLocaleString()}`,
    },
  })

  const markdownParts = [header]
  for (const file of files) {
    markdownParts.push(`## File: ${file.path}\n\`\`\`\n${file.content}\n\`\`\``)
  }

  return markdownParts.join("\n\n")
}
