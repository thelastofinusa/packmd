"use client"

import { Container } from "@/components/shared/container"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site.config"
import { useDigest } from "@/hooks/digest"
import { Icons } from "hugeicons-proxy"
import React from "react"
import { toast } from "sonner"

export const BottomBarComp = () => {
  const [hasCopied, setHasCopied] = React.useState(false)
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
      setHasCopied(true)
    } catch {
      toast.error("Couldn't copy to clipboard")
    } finally {
      setTimeout(() => setHasCopied(false), 1200)
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
      <div className="sticky bottom-0 z-10 mt-6 border-t border-border bg-background/80 py-4 backdrop-blur-md">
        <Container size="default">
          <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="font-mono text-xs text-muted-foreground">
              {data.files.length} files · ~
              {data.estimatedTokens.toLocaleString()} tokens
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={onDownload}
                className="flex-1 sm:flex-none"
                disabled={!data?.digest}
              >
                <Icons.Download01Icon />
                <span>Download [ .txt ]</span>
              </Button>
              <Button
                variant="outline"
                onClick={onCopy}
                size="icon-sm"
                className="flex-1 sm:flex-none"
                disabled={!data?.digest}
              >
                {hasCopied ? <Icons.Tick01Icon /> : <Icons.CopyIcon />}
                <span className="sr-only">Copy to clipboard</span>
              </Button>
            </div>
          </div>
        </Container>
      </div>
    )

  return null
}
