import React from "react"
import Link from "next/link"
import { Drop } from "reicon-react"

import { siteConfig } from "@/config/site.config"
import { MaxContainer } from "@/components/max-container"
import { Button } from "@packmd/ui/components/button"
import { ToggleTheme } from "@/components/toggle-theme"
import { Separator } from "@packmd/ui/components/separator"

export const Header = () => {
  return (
    <header className="sticky top-0 left-0 z-50 w-full bg-background/60 backdrop-blur-md">
      <MaxContainer size="lg" className="py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-1.5">
            <Drop className="mb-px size-4" />
            <p className="text-sm font-medium sm:text-base">
              {siteConfig.name}
            </p>
          </Link>

          <div className="flex items-center">
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
