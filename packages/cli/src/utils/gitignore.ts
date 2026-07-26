import fs from "node:fs/promises"
import path from "node:path"
import ignore, { Ignore } from "ignore"

/**
 * Walks upward from `startDir` collecting every .gitignore file found,
 * stopping at the directory containing `.git` (the repo root) or the
 * filesystem root — whichever comes first. Lets a package folder inherit
 * the monorepo's root .gitignore even if it has none of its own.
 */
export async function loadGitignore(startDir: string): Promise<Ignore | null> {
  const ig = ignore()
  let found = false
  let dir = startDir

  while (true) {
    try {
      const content = await fs.readFile(path.join(dir, ".gitignore"), "utf-8")
      ig.add(content)
      found = true
    } catch {
      // no .gitignore at this level — fine, keep walking up
    }

    try {
      await fs.access(path.join(dir, ".git"))
      break // reached the repo root
    } catch {
      // not there yet
    }

    const parent = path.dirname(dir)
    if (parent === dir) break // hit the filesystem root
    dir = parent
  }

  return found ? ig : null
}
