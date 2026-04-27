import { highlightCode } from "@/lib/highlighter"
import { RepoFile } from "@git2txt/core"
import { Icons } from "hugeicons-proxy"
import React from "react"

const PREVIEW_LINES = 20

export const FilesTab: React.FC<{ files: RepoFile[] }> = ({ files }) => {
  return (
    <div className="space-y-3">
      {files.map((file) => (
        <FileBlock key={file.path} file={file} />
      ))}
    </div>
  )
}

function FileBlock({ file }: { file: RepoFile }) {
  const [expanded, setExpanded] = React.useState(false)
  const [html, setHtml] = React.useState<string | null>(null)

  const lines = file.content.split("\n")
  const isLong = lines.length > PREVIEW_LINES
  const visible = expanded
    ? file.content
    : lines.slice(0, PREVIEW_LINES).join("\n")

  React.useEffect(() => {
    let cancelled = false
    highlightCode(visible, file.path)
      .then((out) => {
        if (!cancelled) setHtml(out)
      })
      .catch(() => {
        if (!cancelled) setHtml(null)
      })
    return () => {
      cancelled = true
    }
  }, [visible, file.path])

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-background squircle sm:rounded-2xl md:rounded-3xl lg:rounded-4xl">
      <div className="flex items-center justify-between gap-2 border-b border-border bg-card px-4 py-3">
        <div className="flex min-w-0 items-center gap-2">
          <Icons.DocumentCodeIcon className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
          <code className="truncate font-mono text-xs text-foreground">
            ### {file.path}
          </code>
        </div>
        <span className="shrink-0 font-mono text-[10px] text-muted-foreground">
          {lines.length} lines · {file.content.length.toLocaleString()} chars
        </span>
      </div>
      <div className="relative leading-relaxed wrap-break-word whitespace-pre-wrap shadow-2xl">
        {html ? (
          <div
            className="w-full overflow-x-hidden overflow-y-auto p-4 font-mono text-xs leading-relaxed wrap-break-word whitespace-pre-wrap [&_.line]:max-w-full! [&_.line]:wrap-break-word [&_.line]:whitespace-pre-wrap! [&_code]:wrap-break-word [&_code]:whitespace-pre-wrap! [&_pre]:w-full! [&_pre]:max-w-full! [&_pre]:bg-transparent! [&_pre]:wrap-break-word [&_pre]:whitespace-pre-wrap!"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        ) : (
          <pre className="w-full overflow-x-hidden overflow-y-auto p-4 font-mono text-xs leading-relaxed wrap-break-word whitespace-pre-wrap">
            <code className="wrap-break-word whitespace-pre-wrap">
              {visible}
            </code>
          </pre>
        )}
        {isLong && !expanded && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-linear-to-t from-background via-background/70 to-transparent wrap-break-word whitespace-pre-wrap" />
        )}
      </div>
      {isLong && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="flex w-full cursor-pointer items-center justify-center gap-1 border-t border-border bg-card px-4 py-3 text-xs text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          {expanded ? (
            <>
              <Icons.ArrowDown01Icon className="h-3.5 w-3.5" />
              <span>Collapse</span>
            </>
          ) : (
            <>
              <Icons.ArrowRight01Icon className="h-3.5 w-3.5" />
              <span>Expand all {lines.length} lines</span>
            </>
          )}
        </button>
      )}
    </div>
  )
}
