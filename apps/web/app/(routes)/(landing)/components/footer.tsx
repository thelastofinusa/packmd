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

export const Footer = () => {
  return (
    <footer className="mt-auto flex w-full items-center gap-4">
      <MaxContainer size="lg" className="py-6">
        <nav className="flex flex-col-reverse items-center justify-between gap-1 sm:flex-row">
          <p className="text-[13px] text-muted-foreground sm:text-sm">
            Built with curiosity and too much coffee.
          </p>

          <div className="flex items-center gap-3">
            {SOCIALS.map((social) => {
              const Icon = resolveIcon(social.url)

              return (
                <a
                  key={social.url}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center"
                >
                  <Tooltip>
                    <TooltipTrigger>
                      <Icon className="size-4 text-muted-foreground hover:text-foreground sm:size-3.5" />
                    </TooltipTrigger>
                    <TooltipContent side="top" sideOffset={10}>
                      <p className="text-center font-normal">
                        {social.platform} - {social.name} <br />{" "}
                        {social.username}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </a>
              )
            })}
          </div>
        </nav>
      </MaxContainer>
    </footer>
  )
}
