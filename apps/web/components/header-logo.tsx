import React from "react"
import Link from "next/link"
import { Drop } from "reicon-react"
import { siteConfig } from "@/config/site.config"

export const HeaderLogo = () => {
  return (
    <Link href="/" className="flex items-center gap-1.5">
      <Drop className="mb-px size-4" />
      <p className="text-sm font-medium sm:text-base">{siteConfig.name}</p>
    </Link>
  )
}
