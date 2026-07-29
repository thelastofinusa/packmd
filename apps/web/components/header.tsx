"use client"
import React from "react"
import { MaxContainer } from "./max-container"
import { Button, buttonVariants } from "@packmd/ui/components/button"
import { usePathname, useRouter } from "next/navigation"
import { useIsMobile } from "@packmd/ui/hooks/use-is-mobile"
import { useTiks } from "@rexa-developer/tiks/react"
import { useRender } from "./providers/render.provider"
import { Download2, Drop } from "reicon-react"
import { Separator } from "@packmd/ui/components/separator"
import { CopyButton } from "@packmd/ui/components/copy-button"
import Link from "next/link"
import { siteConfig } from "@/config/site.config"
import { isActivePath } from "@/lib/utils"
import { ToggleTheme } from "./toggle-theme"
import { cn } from "@packmd/ui/lib/utils"
import { VscMarkdown } from "react-icons/vsc"

const routes = [
  {
    label: "Docs",
    href: "/docs",
  },
  {
    label: "History",
    href: "/history",
  },
]

export const Header = () => {
  const router = useRouter()
  const pathname = usePathname()
  const isMobile = useIsMobile()
  const { pop } = useTiks()
  const { markdown, handleDownload } = useRender()

  const isRenderPage = pathname.startsWith("/render")

  return (
    <header
      className={cn(
        "sticky top-0 left-0 z-50 w-full border-b border-transparent bg-background/60 backdrop-blur-md",
        {
          "border-border": isRenderPage,
        }
      )}
    >
      <MaxContainer size={isRenderPage ? "screen" : "lg"} className="h-16">
        <nav className="flex size-full items-center justify-between">
          <div className="flex items-center">
            <Button
              variant="ghost"
              onClick={() => router.push("/")}
              size={isRenderPage && isMobile ? "icon-sm" : "sm"}
              className={cn(
                "transition-transform",
                !isRenderPage && "h-auto! bg-transparent! px-0!"
              )}
            >
              {!isRenderPage ? (
                <React.Fragment>
                  <Drop className="size-3.5 md:size-4" />
                  <span className="text-sm md:text-base">
                    {siteConfig.name}
                  </span>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <VscMarkdown />
                  <span className="sr-only md:not-sr-only">New Markdown</span>
                </React.Fragment>
              )}
            </Button>

            {isRenderPage && (
              <div className="flex items-center">
                <Separator
                  orientation="vertical"
                  className="mx-2 my-auto h-3"
                />

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
                    <Download2 />
                    <span className="sr-only md:not-sr-only">Download .MD</span>
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="ml-auto flex items-center">
            {routes.map((route) => (
              <Link key={route.href} href={route.href}>
                <Button
                  size="sm"
                  variant={
                    isActivePath(route.href, pathname) ? "secondary" : "ghost"
                  }
                >
                  {route.label}
                </Button>
              </Link>
            ))}

            {!isMobile && isActivePath && (
              <Link href="/render">
                <Button
                  size="sm"
                  variant={
                    isActivePath("/render", pathname) ? "secondary" : "ghost"
                  }
                >
                  Render
                </Button>
              </Link>
            )}

            <Separator orientation="vertical" className="mx-1 my-auto h-3" />

            <ToggleTheme />
          </div>
        </nav>
      </MaxContainer>
    </header>
  )
}
