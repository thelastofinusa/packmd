"use client"

import React, { useEffect, useState } from "react"

import { Button } from "@packmd/ui/components/button"
import { Sun, Moon3 } from "reicon-react"
import { useTheme } from "next-themes"
import { useTiks } from "@rexa-developer/tiks/react"

export const ToggleTheme = () => {
  const { success } = useTiks()
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon-sm" aria-label="Toggle Theme">
        <Sun className="size-3.5" />
      </Button>
    )
  }

  const isDark = resolvedTheme === "dark"

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      aria-label="Toggle Theme"
      data-ignore-click
      onClick={() => {
        setTheme(isDark ? "light" : "dark")
        success()
      }}
    >
      {isDark ? <Sun className="size-3.5" /> : <Moon3 className="size-3.5" />}
    </Button>
  )
}
