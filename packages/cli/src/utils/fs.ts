import fs from "node:fs/promises"
import path from "node:path"
import { minimatch } from "minimatch"
import type { Ignore } from "ignore"

export async function walkLocalDir(
  dir: string,
  base: string,
  excludeGlobs: string[],
  includeGlobs: string[],
  maxFileSizeKB: number,
  maxFiles: number,
  gitignore: Ignore | null = null,
  collected: { path: string; content: string }[] = []
): Promise<{ path: string; content: string }[]> {
  if (collected.length >= maxFiles) return collected

  const entries = await fs.readdir(dir)

  for (const name of entries) {
    if (collected.length >= maxFiles) break

    const fullPath = path.join(dir, name)
    const relativePath = path.relative(base, fullPath).replace(/\\/g, "/")

    const isExcluded = excludeGlobs.some((g) =>
      minimatch(relativePath, g, { dot: true })
    )
    if (isExcluded) continue

    const stats = await fs.stat(fullPath)

    // append '/' for directories — `ignore` needs it to match dir-only rules like `dist/`
    if (
      gitignore?.ignores(
        stats.isDirectory() ? `${relativePath}/` : relativePath
      )
    ) {
      continue
    }

    if (stats.isDirectory()) {
      await walkLocalDir(
        fullPath,
        base,
        excludeGlobs,
        includeGlobs,
        maxFileSizeKB,
        maxFiles,
        gitignore,
        collected
      )
    } else if (stats.isFile()) {
      if (includeGlobs.length > 0) {
        const isIncluded = includeGlobs.some((g) =>
          minimatch(relativePath, g, { dot: true })
        )
        if (!isIncluded) continue
      }
      const sizeKB = stats.size / 1024
      if (sizeKB <= maxFileSizeKB) {
        const content = await fs.readFile(fullPath, "utf-8")
        collected.push({ path: relativePath, content })
      }
    }
  }

  return collected
}
