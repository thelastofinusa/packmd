import type { RepoFile, TreeNode, SkippedFile } from "@/types"
import { renderTree } from "./buildTree"

export function estimateTokens(chars: number): number {
  return Math.round(chars / 4)
}

export function buildDigest(args: {
  owner: string
  repo: string
  description: string | null
  defaultBranch: string
  tree: TreeNode
  files: RepoFile[]
  skipped: SkippedFile[]
}): string {
  const { owner, repo, description, defaultBranch, tree, files, skipped } = args
  const repoFull = `${owner}/${repo}`
  const totalChars = files.reduce((s, f) => s + f.content.length, 0)

  const lines: string[] = []
  lines.push(`# ${repoFull}`)
  lines.push("")
  lines.push("## Summary")
  lines.push(`- Repository: https://github.com/${repoFull}`)
  if (description) lines.push(`- Description: ${description}`)
  lines.push(`- Default branch: ${defaultBranch}`)
  lines.push(`- Files included: ${files.length}`)
  lines.push(`- Files skipped: ${skipped.length}`)
  lines.push(`- Total characters: ${totalChars.toLocaleString()}`)
  lines.push(
    `- Estimated tokens: ~${estimateTokens(totalChars).toLocaleString()}`
  )
  lines.push("")

  lines.push("## Directory Structure")
  lines.push("```")
  lines.push(`${repoFull}/`)
  lines.push(renderTree(tree).trimEnd())
  lines.push("```")
  lines.push("")

  lines.push("## Files Content")
  lines.push("")
  for (const file of files) {
    lines.push(`### ${file.path}`)
    lines.push("```")
    lines.push(file.content)
    lines.push("```")
    lines.push("")
  }

  return lines.join("\n")
}
