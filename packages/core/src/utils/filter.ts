import { RawFile } from "../types"

/**
 * Converts standard ignore patterns (like .gitignore) into Regular Expressions.
 * Supports '*' (match anything except slash), '**' (match across directories), and '?' (match one char).
 */
export function compileIgnorePatterns(patterns: string[]): RegExp[] {
  return patterns.map((pattern) => {
    // 1. Escape standard Regex characters to avoid syntax errors
    const escaped = pattern.replace(/[.+^${}()|[\]\\]/g, "\\$&")

    // 2. Convert glob stars to Regex equivalents
    // Handle '**' (Match any number of directories)
    let regexStr = escaped.replace(/\\\*\\\*/g, ".*")

    // Handle '*' (Match any character EXCEPT a directory separator)
    regexStr = regexStr.replace(/\\\*/g, "[^/]*")

    // Handle '?' (Match any single character EXCEPT a directory separator)
    regexStr = regexStr.replace(/\\\?/g, "[^/]")

    // 3. Ensure the pattern matches either the start of the path,
    // a directory boundary, or the exact filename.
    return new RegExp(`(^|/)${regexStr}(/|$)`)
  })
}

/**
 * Checks if a specific file path should be ignored.
 */
export function isIgnored(filePath: string, ignoreRegexes: RegExp[]): boolean {
  return ignoreRegexes.some((regex) => regex.test(filePath))
}

/**
 * Takes an array of RawFiles and filters out any that match the ignore patterns.
 */
export function filterRawFiles(
  files: RawFile[],
  ignorePatterns: string[]
): RawFile[] {
  if (!ignorePatterns || ignorePatterns.length === 0) {
    return files
  }

  const regexes = compileIgnorePatterns(ignorePatterns)
  return files.filter((file) => !isIgnored(file.path, regexes))
}

/**
 * Tiny glob matcher. Supports **, *, ?, and literal segments.
 * Checks if a given path matches any of the provided glob patterns.
 */
export function matchesAny(path: string, patterns: string[]): boolean {
  if (patterns.length === 0) return false

  // Convert a glob pattern to a RegExp
  function globToRegex(glob: string): RegExp {
    let re = ""
    for (let i = 0; i < glob.length; i++) {
      const c = glob[i] as string
      if (c === "*") {
        if (glob[i + 1] === "*") {
          re += ".*"
          i++
          if (glob[i + 1] === "/") i++
        } else {
          re += "[^/]*"
        }
      } else if (c === "?") {
        re += "[^/]"
      } else if (".+^${}()|[]\\".includes(c)) {
        re += "\\" + c
      } else {
        re += c
      }
    }
    return new RegExp("^" + re + "$")
  }

  return patterns.some((p) => {
    const re = globToRegex(p)
    if (re.test(path)) return true
    // Also match base name for patterns without a slash
    if (!p.includes("/")) {
      const base = path.split("/").pop() || ""
      if (re.test(base)) return true
    }
    return false
  })
}
