import React from "react"
import { Display, DisplaySkeleton } from "../-components/display"
import { Metadata } from "next"

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

export default async function RenderDetailsPage(
  props: PageProps<"/render/[id]">
) {
  const { id } = await props.params

  return (
    <React.Suspense fallback={<DisplaySkeleton />}>
      <Display id={id} />
    </React.Suspense>
  )
}
