"use client"

import { cn } from "../lib/utils"
import { useCopyToClipboard } from "../hooks/use-copy-to-clipboard"
import { Copy3 } from "reicon-react"

export function CopyButton({
  text,
  label,
  className,
  successLabel,
}: {
  text: string
  label?: string
  className?: string
  successLabel?: string
}) {
  const { copy, state } = useCopyToClipboard()

  return (
    <button
      type="button"
      aria-label={state === "done" ? "Copied" : (label ?? "Copy to clipboard")}
      onClick={() => copy(text)}
      data-ignore-click
      className={cn(
        "inline-flex h-8 items-center gap-1.5 rounded-full px-2.5 text-xs transition-[color,transform] duration-150 ease-out active:translate-y-px motion-reduce:transition-none",
        className
      )}
    >
      <span className="grid size-[15px]">
        <Copy3
          aria-hidden
          weight={state === "done" ? "Filled" : "Outline"}
          className={cn(
            "col-start-1 row-start-1 size-[15px] transition-[opacity,filter] duration-200 ease-out motion-reduce:transition-none"
          )}
        />
      </span>
      {label ? (
        <span>{state === "done" ? successLabel || "Copied" : label}</span>
      ) : null}
    </button>
  )
}
