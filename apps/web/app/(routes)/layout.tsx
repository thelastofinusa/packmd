"use client"
import React from "react"
import { usePathname } from "next/navigation"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { cn } from "@packmd/ui/lib/utils"

export default function RoutesLayout(props: LayoutProps<"/">) {
  const pathname = usePathname()
  const isRenderRoute = pathname?.startsWith("/render")

  return (
    <div
      className={cn(
        "flex w-full flex-1 flex-col",
        isRenderRoute ? "h-dvh overflow-hidden" : "min-h-dvh"
      )}
    >
      <Header />
      <main
        className={cn(
          "flex min-h-0 flex-1 flex-col",
          isRenderRoute && "overflow-hidden"
        )}
      >
        {props.children}
      </main>
      <Footer />
    </div>
  )
}
