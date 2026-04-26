import type { Highlighter } from "shiki"

let highlighterPromise: Promise<Highlighter> | null = null

const LANG_MAP: Record<string, string> = {
  ts: "typescript",
  tsx: "tsx",
  js: "javascript",
  jsx: "jsx",
  mjs: "javascript",
  cjs: "javascript",
  json: "json",
  jsonc: "json",
  md: "markdown",
  mdx: "markdown",
  py: "python",
  rb: "ruby",
  go: "go",
  rs: "rust",
  java: "java",
  kt: "kotlin",
  swift: "swift",
  c: "c",
  h: "c",
  cpp: "cpp",
  cc: "cpp",
  hpp: "cpp",
  cs: "csharp",
  php: "php",
  sh: "bash",
  bash: "bash",
  zsh: "bash",
  yml: "yaml",
  yaml: "yaml",
  toml: "toml",
  html: "html",
  htm: "html",
  css: "css",
  scss: "scss",
  sql: "sql",
  vue: "vue",
  svelte: "svelte",
  dockerfile: "docker",
  xml: "xml",
}

const LOADED_LANGS = Array.from(new Set(Object.values(LANG_MAP)))

function langForPath(path: string): string {
  const lower = path.toLowerCase()
  if (lower.endsWith("/dockerfile") || lower === "dockerfile") return "docker"
  const ext = lower.split(".").pop() ?? ""
  return LANG_MAP[ext] ?? "text"
}

async function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = import("shiki").then(({ createHighlighter }) =>
      createHighlighter({
        themes: ["github-dark-dimmed"],
        langs: LOADED_LANGS,
      })
    )
  }
  return highlighterPromise
}

export async function highlightCode(
  code: string,
  path: string
): Promise<string> {
  const lang = langForPath(path)
  if (lang === "text") {
    return `<pre><code>${escapeHtml(code)}</code></pre>`
  }
  try {
    const hl = await getHighlighter()
    return hl.codeToHtml(code, { lang, theme: "github-dark-dimmed" })
  } catch {
    return `<pre><code>${escapeHtml(code)}</code></pre>`
  }
}

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
}
