/** Tiny glob → RegExp. Supports **, *, ?, and literal segments. */
function globToRegex(glob: string): RegExp {
  let re = ""
  for (let i = 0; i < glob.length; i++) {
    const c = glob[i]
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

export function matchesAny(path: string, patterns: string[]): boolean {
  if (patterns.length === 0) return false
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
