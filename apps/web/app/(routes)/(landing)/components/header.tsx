import React from "react"
import { MaxContainer } from "@/components/max-container"
import { HeaderLogo } from "@/components/header-logo"
import { HeaderRoutes } from "@/components/header-routes"

export const Header = () => {
  return (
    <header className="sticky top-0 left-0 z-50 w-full bg-background/60 backdrop-blur-md">
      <MaxContainer size="lg" className="py-3 sm:py-4">
        <nav className="flex items-center justify-between">
          <HeaderLogo />
          <HeaderRoutes />
        </nav>
      </MaxContainer>
    </header>
  )
}
