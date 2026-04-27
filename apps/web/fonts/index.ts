import localFont from "next/font/local"

import { cn } from "@/lib/utils"

const fontSans = localFont({
  src: "./BricolageGrotesque/BricolageGrotesque-VariableFont_opsz,wdth,wght.ttf",
  variable: "--font-sans",
  preload: true,
})
const fontMono = localFont({
  src: "./GeistMono/GeistMono-VariableFont_wght.ttf",
  variable: "--font-mono",
  preload: true,
})

const fontVariable = (className?: string) =>
  cn(fontSans.variable, fontMono.variable, className)

export { fontVariable }
