import React from "react"
import { Metadata } from "next"
import { Display, DisplaySkeleton } from "./-components/display"

export const metadata: Metadata = {
  title: "Render Digest",
  description:
    "View and copy your generated AI-ready Markdown digest. Download the optimized output for your LLM context window.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "/render",
  },
  openGraph: {
    title: "Render Digest",
    description:
      "View and copy your generated AI-ready Markdown digest. Download the optimized output for your LLM context window.",
    url: "/render",
  },
  twitter: {
    title: "Render Digest",
    description:
      "View and copy your generated AI-ready Markdown digest. Download the optimized output for your LLM context window.",
  },
}

export default async function RenderPage() {
  return (
    <React.Suspense fallback={<DisplaySkeleton />}>
      <Display />
    </React.Suspense>
  )
}
