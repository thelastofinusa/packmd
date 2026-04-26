import { renderTree } from "@/lib/buildTree"
import { DigestResult } from "@/types"
import React from "react"

export const TreeTab: React.FC<{ data: DigestResult }> = ({ data }) => {
  const tree = `${data.owner}/${data.repo}/\n${renderTree(data.tree).trimEnd()}`
  return (
    <pre className="max-h-[60vh] overflow-auto rounded-xl border border-border bg-background p-4 font-mono text-xs leading-relaxed text-foreground squircle sm:rounded-2xl md:rounded-3xl md:p-5 lg:rounded-4xl">
      <code>{tree}</code>
    </pre>
  )
}
