import React from "react"
import { FileText, GitBranch, Hash, Type } from "lucide-react"
import type { DigestResult } from "@/types"

export const SummaryTab: React.FC<{ data: DigestResult }> = ({ data }) => {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-mono text-lg font-semibold">
          {data.owner}/{data.repo}
        </h2>
        {data.description && (
          <p className="mt-1 text-sm text-muted-foreground">
            {data.description}
          </p>
        )}
        <a
          href={`https://github.com/${data.owner}/${data.repo}`}
          target="_blank"
          rel="noreferrer"
          className="mt-2 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
        >
          <GitBranch className="h-3 w-3" />
          {data.defaultBranch}
        </a>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat
          icon={<FileText className="h-3.5 w-3.5" />}
          label="Files included"
          value={data.files.length.toLocaleString()}
        />
        <Stat
          icon={<FileText className="h-3.5 w-3.5" />}
          label="Files skipped"
          value={data.skipped.length.toLocaleString()}
        />
        <Stat
          icon={<Type className="h-3.5 w-3.5" />}
          label="Characters"
          value={data.totalCharacters.toLocaleString()}
        />
        <Stat
          icon={<Hash className="h-3.5 w-3.5" />}
          label="Est. tokens"
          value={`~${data.estimatedTokens.toLocaleString()}`}
        />
      </div>
      {data.skipped.length > 0 && (
        <details className="rounded-xl border border-border bg-background p-4 text-xs squircle sm:rounded-2xl md:rounded-3xl md:p-5 lg:rounded-4xl">
          <summary className="cursor-pointer text-muted-foreground">
            Show {data.skipped.length} skipped file
            {data.skipped.length === 1 ? "" : "s"}
          </summary>
          <ul className="mt-3 max-h-64 space-y-1 overflow-auto font-mono">
            {data.skipped.slice(0, 500).map((s) => (
              <li
                key={s.path}
                className="flex justify-between gap-3 text-muted-foreground"
              >
                <span className="truncate">{s.path}</span>
                <span className="shrink-0 text-foreground/60">{s.reason}</span>
              </li>
            ))}
            {data.skipped.length > 500 && (
              <li className="text-muted-foreground">
                ... and {data.skipped.length - 500} more
              </li>
            )}
          </ul>
        </details>
      )}
    </div>
  )
}

function Stat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="rounded-xl border border-border bg-background p-4 squircle sm:rounded-2xl md:rounded-3xl md:p-5 lg:rounded-4xl">
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        {icon}
        {label}
      </div>
      <div className="mt-2 font-mono text-base font-medium md:text-lg">
        {value}
      </div>
    </div>
  )
}
