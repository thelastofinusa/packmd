"use client"
import React from "react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@packmd/ui/components/tooltip"
import { SOCIALS } from "@/lib/constants"
import { resolveIcon } from "@/lib/icons"
import { MaxContainer } from "@/components/max-container"
import { Separator } from "@packmd/ui/components/separator"
import { LeaveAStar } from "@/components/leave-a-star"
import { cn } from "@packmd/ui/lib/utils"
import { usePathname } from "next/navigation"

export const Footer = () => {
  const pathname = usePathname()
  const isRenderPage = pathname.startsWith("/render")
  const [version, setVersion] = React.useState("0.0.0")

  React.useEffect(() => {
    fetch("/api/version")
      .then((res) => res.json())
      .then((data) => setVersion(data))
      .catch(() => setVersion("0.0.0"))
  }, [])

  if (isRenderPage) return null

  return (
    <footer className="mt-auto flex w-full items-center gap-4">
      <MaxContainer size="lg" className="py-6">
        <nav className="flex flex-col-reverse items-center justify-between gap-1 sm:flex-row">
          <p className="text-[13px] text-muted-foreground sm:text-sm">
            Built with curiosity and too much coffee.
          </p>

          <div className="flex items-center gap-2">
            {SOCIALS.map((social) => {
              const Icon = resolveIcon(social.url)
              const isGithub = social.platform.toLowerCase().includes("github")

              return (
                <div
                  key={social.url}
                  className={cn("relative inline-flex", isGithub && "group")}
                >
                  <a
                    key={social.url}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="relative flex items-center justify-center"
                  >
                    <Tooltip>
                      <TooltipTrigger>
                        <Icon className="size-3.5 text-foreground hover:text-primary" />
                      </TooltipTrigger>
                      <TooltipContent side="top" sideOffset={10}>
                        <p className="text-center font-normal">
                          {social.platform} - {social.name} <br />{" "}
                          {social.username}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </a>

                  {isGithub && <LeaveAStar />}
                </div>
              )
            })}

            <Separator orientation="vertical" className="my-auto h-2" />

            <span className="font-mono text-xs text-muted-foreground">
              v{version}
            </span>
          </div>
        </nav>
      </MaxContainer>
    </footer>
  )
}
