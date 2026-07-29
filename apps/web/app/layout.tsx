import "@packmd/ui/globals.css"
import { fontVariable } from "@/fonts"
import { Metadata } from "next"
import { siteConfig } from "@/config/site.config"
import { Analytics } from "@vercel/analytics/next"
import { GlobalProvider } from "@/components/providers/global.provider"

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: `${siteConfig.name} - ${siteConfig.slogan}`,
  applicationCategory: "DeveloperApplication",
  browserRequirements: "Requires modern browser",
  offers: {
    "@type": "Offer",
    price: "0",
  },
  author: {
    "@type": "Person",
    name: siteConfig.author.name,
    url: siteConfig.author.url,
  },
  programmingLanguage: "TypeScript",
  codeRepository: siteConfig.links.github,
  url: siteConfig.url,
  description: siteConfig.description,
}

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} - ${siteConfig.slogan}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [siteConfig.author],
  creator: siteConfig.author.name,
  publisher: siteConfig.author.name,
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: siteConfig.url,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: `${siteConfig.name} - ${siteConfig.slogan}`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}/og.png`,
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
    images: [`${siteConfig.url}/og.png`],
    creator: `@${siteConfig.author.username}`,
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
}

const htmlSafeJsonStringify = (obj: unknown): string =>
  JSON.stringify(obj)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")

export default function RootLayout(props: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: htmlSafeJsonStringify(JSON_LD) }}
        />
      </head>
      <body className={fontVariable("font-sans antialiased")}>
        <Analytics />
        <GlobalProvider>{props.children}</GlobalProvider>
      </body>
    </html>
  )
}
