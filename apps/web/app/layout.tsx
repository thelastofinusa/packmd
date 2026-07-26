import "@packmd/ui/globals.css"
import { Providers } from "./-providers"
import { fontVariable } from "@/fonts"
import { Metadata } from "next"
import { siteConfig } from "@/config/site.config"
import { Analytics } from "@vercel/analytics/next"

export const metadata: Metadata = {
  title: `${siteConfig.name} - ${siteConfig.slogan}`,
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url as string),
  authors: [siteConfig.author],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: `${siteConfig.name} - ${siteConfig.slogan}`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}/opengraph.png`,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} - ${siteConfig.slogan}`,
    description: siteConfig.description,
    images: [`${siteConfig.url}/opengraph.png`],
    creator: `@${siteConfig.author.username}`,
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
}

export default function RootLayout(props: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={fontVariable("font-sans antialiased")}>
        <Providers>{props.children}</Providers>
        <Analytics />
      </body>
    </html>
  )
}
