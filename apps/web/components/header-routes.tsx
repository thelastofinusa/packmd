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
    label: "Render",
    href: "/render",
  },
  {
    label: "History",
    href: "/history",
  },
]

export const HeaderRoutes = () => {
  const pathname = usePathname()

  const visibleRoutes = routes.filter(
    (route) => !(pathname === "/render" && route.href === "/render")
  )

  return (
    <div className="ml-auto flex items-center">
      {visibleRoutes.map((route) => (
        <Link key={route.href} href={route.href}>
          <Button
            size="sm"
            variant={isActivePath(route.href, pathname) ? "secondary" : "ghost"}
          >
            {route.label}
          </Button>
        </Link>
      ))}

      <Separator orientation="vertical" className="mx-1 h-4" />

      <ToggleTheme />
    </div>
  )
}
