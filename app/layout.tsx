import { Metadata } from "next"

import "./globals.css"
import { fontVariable } from "@/fonts"
import { Toaster } from "@/components/ui/sonner"
import { siteConfig } from "@/config/site.config"
import { TooltipProvider } from "@/components/ui/tooltip"
import { ThemeProvider } from "@/components/provider/theme.provider"
import { TailwindIndicator } from "@/components/shared/tailwind-indicator"

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} - ${siteConfig.title}`,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
}

export default function RootLayout(props: Readonly<LayoutProps<"/">>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={fontVariable("font-sans antialiased")}>
        <ThemeProvider>
          <TooltipProvider delay={0}>
            {props.children}
            <Toaster position="top-center" richColors />
          </TooltipProvider>
          <TailwindIndicator />
        </ThemeProvider>
      </body>
    </html>
  )
}
