import { CopyButton } from "./copy-button"

export function CodeBlock({
  html,
  source,
  fileName,
}: {
  /** Pre-highlighted HTML produced on the server. Omit for a single-line command row. */
  html?: string
  /** Raw source, used for the copy button. */
  source: string
  /** File name shown in the header of a multi-line block. */
  fileName?: string
}) {
  if (!html) {
    return (
      <div className="not-typeset overflow-hidden rounded-lg border">
        <div className="flex items-center justify-between border-b bg-card py-0.5 pr-1.5 pl-4">
          <span className="font-mono text-xs text-muted-foreground">
            {fileName ?? ""}
          </span>
          <CopyButton text={source} />
        </div>
        <div className="p-4">
          <code className="font-mono text-[13px] break-all whitespace-pre-wrap text-foreground/90">
            {source}
          </code>
        </div>
      </div>
    )
  }

  return (
    <div className="not-typeset overflow-hidden rounded-lg border">
      <div className="flex items-center justify-between border-b bg-card py-1 pr-1.5 pl-4">
        <span className="text-[12px] text-muted-foreground">
          {fileName ?? ""}
        </span>
        <CopyButton text={source} />
      </div>
      <div
        className="docs-code max-h-[480px] overflow-y-auto text-[13px] leading-6"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
