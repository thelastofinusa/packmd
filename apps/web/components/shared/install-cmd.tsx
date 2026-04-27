"use client"
import * as React from "react"
import { toast } from "sonner"
import { Icons } from "hugeicons-proxy"
import { TbCopy, TbCopyCheckFilled } from "react-icons/tb"

export const InstallCmd = () => {
  const command = "npx @git2txt/cli"
  const [isCopied, setIsCopied] = React.useState<boolean>(false)
  const [version, setVersion] = React.useState<string | null>(null)

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(command)
      toast.success("Command copied to clipboard")
      setIsCopied(true)
    } catch {
      toast.error("Couldn’t copy command")
    } finally {
      setTimeout(() => setIsCopied(false), 2000)
    }
  }

  React.useEffect(() => {
    fetch("/api/package")
      .then((r) => r.json())
      .then((d) => setVersion(d.version))
  }, [])

  return (
    <div
      onClick={onCopy}
      className="group relative mx-auto mb-8 inline-flex -rotate-3 cursor-pointer items-center gap-2 rounded-xl border border-primary bg-linear-to-r from-primary/40 via-primary/20 to-primary/10 py-1 pr-3 pl-1 text-[#00c2d0] shadow-2xl shadow-primary/20 transition-all duration-500 squircle hover:shadow-primary/80 md:rounded-2xl lg:rounded-3xl"
    >
      <div className="absolute inset-0 rounded-full bg-linear-to-r from-primary/0 via-primary/50 to-primary/0 opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100" />

      <div className="flex h-full items-center gap-1 rounded-lg bg-primary px-2 py-0.5 text-white squircle md:rounded-xl lg:rounded-2xl">
        <Icons.PackageDeliveredIcon className="size-3.5" />
        <span className="text-[13px]">v{version ?? "0.0.0"}</span>
      </div>
      <span>-</span>
      <code className="relative z-10 font-mono text-[13px] font-medium">
        {command}
      </code>
      <span aria-label="Copy installation command">
        {isCopied ? (
          <TbCopyCheckFilled className="size-3.5" />
        ) : (
          <TbCopy className="size-3.5" />
        )}
      </span>
    </div>
  )
}
