import { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"

import "./globals.css"
import { fontVariable } from "@/fonts"
import { Toaster } from "@/components/ui/sonner"
import { CONST_SITE_URL } from "@/lib/constants"
import { siteConfig } from "@/config/site.config"
import { TooltipProvider } from "@/components/ui/tooltip"
import { TailwindIndicator } from "@/components/shared/tailwind-indicator"

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} - ${siteConfig.slogan}`,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(CONST_SITE_URL as string),
  authors: [
    {
      name: siteConfig.nickname,
      url: `https://x.com/${siteConfig.username}`,
    },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: CONST_SITE_URL,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: `${CONST_SITE_URL}/opengraph.png`,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${CONST_SITE_URL}/opengraph.png`],
    creator: `@${siteConfig.username}`,
  },
  manifest: `${CONST_SITE_URL}/site.webmanifest`,
}

export default function RootLayout(props: Readonly<LayoutProps<"/">>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={fontVariable("font-sans antialiased")}>
        <TooltipProvider delay={0}>
          {props.children}
          <Toaster position="top-center" richColors />
        </TooltipProvider>
        <TailwindIndicator />
        <Analytics />
      </body>
    </html>
  )
}
