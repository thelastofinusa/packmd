"use client"

import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site.config"
import { useDigest } from "@/hooks/digest"
import { Copy, Download } from "lucide-react"
import { toast } from "sonner"

export const BottomBarComp = () => {
  const { data, loading, error } = useDigest()

  const filename = `${data?.owner}-${data?.repo}-digest.txt`

  const onCopy = async () => {
    if (!data?.digest) {
      toast.error("Nothing to copy yet")
      return
    }
    try {
      const header = siteConfig.buildExportHeader(data)
      const text = header + "\n\n" + data.digest
      await navigator.clipboard.writeText(text)
      toast.success("Digest copied to clipboard")
    } catch {
      toast.error("Couldn't copy to clipboard")
    }
  }

  const onDownload = () => {
    if (!data?.digest) {
      toast.error("Nothing to download yet")
      return
    }
    const header = siteConfig.buildExportHeader(data)
    const text = header + "\n\n" + data.digest
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (!loading && !error && data)
    return (
      <div className="sticky bottom-0 z-10 mt-6 border-t border-border bg-background/80 px-4 py-3 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="font-mono text-xs text-muted-foreground">
            {data.files.length} files · ~{data.estimatedTokens.toLocaleString()}{" "}
            tokens
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={onCopy}
              className="flex-1 sm:flex-none"
              disabled={!data?.digest}
            >
              <Copy />
              Copy to clipboard
            </Button>
            <Button
              onClick={onDownload}
              className="flex-1 sm:flex-none"
              disabled={!data?.digest}
            >
              <Download />
              Download .txt
            </Button>
          </div>
        </div>
      </div>
    )

  return null
}
