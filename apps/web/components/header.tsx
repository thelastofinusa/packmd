"use client"
import React from "react"
import { MaxContainer } from "./max-container"
import { Button, buttonVariants } from "@packmd/ui/components/button"
import { usePathname, useRouter } from "next/navigation"
import { useIsMobile } from "@packmd/ui/hooks/use-is-mobile"
import { useTiks } from "@rexa-developer/tiks/react"
import { useRender } from "./providers/render.provider"
import { Download2, Drop, X } from "reicon-react"
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
  const [showBanner, setShowBanner] = React.useState(false)

  React.useEffect(() => {
    // Check local storage on mount to see if the user previously dismissed the banner
    const isDismissed = localStorage.getItem(
      `${siteConfig.name.toLowerCase()}:banner-dismissed`
    )
    if (isDismissed === "true") {
      setShowBanner(false)
    } else {
      setShowBanner(true)
    }
  }, [])

  const dismissBanner = () => {
    setShowBanner(false)
    localStorage.setItem(
      `${siteConfig.name.toLowerCase()}:banner-dismissed`,
      "true"
    )
  }

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
      {showBanner && (
        <div className="relative flex h-auto min-h-9 w-full items-center justify-center bg-primary px-8 py-1.5 text-center text-primary-foreground shadow-xs">
          <div className="flex items-center gap-2 text-[13px] font-medium sm:text-sm">
            <span className="hidden items-center rounded-md bg-card/15 px-1.5 py-0.5 text-[10px] font-bold tracking-wider text-primary-foreground/90 uppercase sm:inline-flex">
              Update
            </span>
            <span>
              <a
                href="https://www.npmjs.com/package/git2txt"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-2 transition-colors hover:text-primary-foreground/80"
              >
                <strong>Git2txt</strong>
              </a>{" "}
              is now officially{" "}
              <a
                href="https://www.npmjs.com/package/packmd"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-2 transition-colors hover:text-primary-foreground/80"
              >
                <strong>{siteConfig.name}</strong>
              </a>
              . <br className="sm:hidden" /> Same great tool, entirely new
              experience.
            </span>
          </div>

          <button
            onClick={dismissBanner}
            aria-label="Dismiss banner"
            className="absolute right-3 flex size-6 items-center justify-center rounded-sm border-0 transition-colors outline-none hover:bg-black/10 focus-visible:bg-black/10"
          >
            <X className="size-3 text-white" />
          </button>
        </div>
      )}
      <MaxContainer size={isRenderPage ? "screen" : "lg"} className="h-16">
        <nav className="flex size-full items-center justify-between">
          <div className="flex items-center">
            <Button
              variant="ghost"
              onClick={() => router.push("/")}
              size={isRenderPage && isMobile ? "icon-sm" : "sm"}
              className={cn(
                "-ml-2 transition-transform",
                !isRenderPage && "ml-0 h-auto! bg-transparent! px-0!"
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
