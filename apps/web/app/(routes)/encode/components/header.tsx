"use client"
import React from "react"
import { Download2, UndoCircle } from "reicon-react"
import { useRouter } from "next/navigation"
import { Button, buttonVariants } from "@packmd/ui/components/button"
import { MaxContainer } from "@/components/max-container"
import { Separator } from "@packmd/ui/components/separator"
import { useIsMobile } from "@packmd/ui/hooks/use-is-mobile"
import Link from "next/link"
import { CopyButton } from "@packmd/ui/components/copy-button"
import { useTiks } from "@rexa-developer/tiks/react"
import { ToggleTheme } from "@/components/toggle-theme"
import { useEncode } from "../context/encode-context"

export const Header = () => {
  const router = useRouter()
  const isMobile = useIsMobile()
  const { pop } = useTiks()
  const { markdown, handleDownload } = useEncode()

  return (
    <header className="sticky top-0 left-0 z-50 w-full border-b backdrop-blur-md">
      <MaxContainer size="screen" className="py-4">
        <nav className="flex items-center">
          <div className="flex items-center">
            <Button
              onClick={() => router.back()}
              variant="ghost"
              size={isMobile ? "icon-sm" : "sm"}
              className="-ml-2"
            >
              <UndoCircle className="size-3.5" />
              <span className="sr-only md:not-sr-only">Back</span>
            </Button>

            <Separator orientation="vertical" className="mx-2 my-auto h-3" />

            <div className="flex items-center gap-0.5">
              <CopyButton
                text={`\`\`\`markdown\n${markdown}\n\`\`\``}
                label={!isMobile ? "Copy as .MD" : undefined}
                successLabel={!isMobile ? "Copied .MD" : undefined}
                className={buttonVariants({
                  size: isMobile ? "icon-sm" : "sm",
                  variant: "secondary",
                })}
              />
              <Button
                size={isMobile ? "icon-sm" : "sm"}
                variant="ghost"
                onClick={() => {
                  pop()
                  handleDownload("pack.md")
                }}
                data-ignore-click
              >
                <Download2 className="size-3.5" />
                <span className="sr-only md:not-sr-only">Download .MD</span>
              </Button>
            </div>
          </div>

          <div className="ml-auto flex items-center">
            <Link href="/docs">
              <Button size="sm" variant="ghost">
                <span>Docs</span>
              </Button>
            </Link>

            <Link href="/history">
              <Button size="sm" variant="ghost">
                <span>History</span>
              </Button>
            </Link>

            <Separator orientation="vertical" className="mx-2 my-auto h-3" />

            <ToggleTheme />
          </div>
        </nav>
      </MaxContainer>
    </header>
  )
}
