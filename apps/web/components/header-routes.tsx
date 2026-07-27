"use client"

import React from "react"
import Link from "next/link"
import { ToggleTheme } from "./toggle-theme"
import { Button } from "@packmd/ui/components/button"
import { Separator } from "@packmd/ui/components/separator"
import { isActivePath } from "@/lib/utils"
import { usePathname } from "next/navigation"

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

export const HeaderRoutes = () => {
  const pathname = usePathname()
  const isRenderPage = pathname.startsWith("/render")

  return (
    <div className="ml-auto flex items-center">
      {routes.map((route) => (
        <Link key={route.href} href={route.href}>
          <Button
            size="sm"
            variant={isActivePath(route.href, pathname) ? "secondary" : "ghost"}
          >
            {route.label}
          </Button>
        </Link>
      ))}
      {!isRenderPage && (
        <Link href="/render">
          <Button
            size="sm"
            variant={isActivePath("/render", pathname) ? "secondary" : "ghost"}
          >
            Render
          </Button>
        </Link>
      )}

      <Separator orientation="vertical" className="mx-1 my-auto h-3" />

      <ToggleTheme />
    </div>
  )
}
