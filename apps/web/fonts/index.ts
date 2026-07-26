import { cn } from "@packmd/ui/lib/utils"
import { Bricolage_Grotesque, Geist_Mono } from "next/font/google"

const fontSans = Bricolage_Grotesque({
  subsets: ["latin"],
  preload: true,
  variable: "--font-sans",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  preload: true,
  variable: "--font-mono",
})

export const fontVariable = (className?: string) =>
  cn(fontSans.variable, fontMono.variable, className)
