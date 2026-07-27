"use client"
import React from "react"
import { Download2, DocAdd } from "reicon-react"
import { useRouter } from "next/navigation"
import { Button, buttonVariants } from "@packmd/ui/components/button"
import { MaxContainer } from "@/components/max-container"
import { Separator } from "@packmd/ui/components/separator"
import { useIsMobile } from "@packmd/ui/hooks/use-is-mobile"
import { CopyButton } from "@packmd/ui/components/copy-button"
import { useTiks } from "@rexa-developer/tiks/react"
import { useRender } from "../../../../components/render-context"
import { HeaderRoutes } from "@/components/header-routes"

export const Header = () => {
  const router = useRouter()
  const isMobile = useIsMobile()
  const { pop } = useTiks()
  const { markdown, handleDownload } = useRender()

  return (
    <header className="sticky top-0 left-0 z-50 w-full border-b backdrop-blur-md">
      <MaxContainer size="screen" className="py-3 sm:py-4">
        <nav className="flex items-center">
          <div className="flex items-center">
            <Button
              onClick={() => router.push("/")}
              variant="ghost"
              size={isMobile ? "icon-sm" : "sm"}
            >
              <DocAdd className="size-3" />
              <span className="sr-only md:not-sr-only">New Markdown</span>
            </Button>

            <Separator orientation="vertical" className="mx-2 my-auto h-3" />

            <div className="flex items-center gap-0.5">
              <CopyButton
                text={`\`\`\`markdown\n${markdown}\n\`\`\``}
                label={!isMobile ? "Copy as .MD" : undefined}
                successLabel={!isMobile ? "Copied .MD" : undefined}
                className={buttonVariants({
                  size: isMobile ? "icon-sm" : "sm",
                })}
              />
              <Button
                size={isMobile ? "icon-sm" : "sm"}
                variant="secondary"
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

          <HeaderRoutes />
        </nav>
      </MaxContainer>
    </header>
  )
}
