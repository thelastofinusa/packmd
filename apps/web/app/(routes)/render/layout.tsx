import React from "react"
import { Header } from "./components/header"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "View & Edit Markdown Digest",
  description:
    "Preview, edit, and customize your generated Markdown digest. Toggle sections, copy as .MD, or download it for use in your favorite LLM.",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "/render",
  },
  openGraph: {
    title: "View & Edit Markdown Digest",
    description:
      "Preview, edit, and customize your generated Markdown digest. Toggle sections, copy as .MD, or download it for use in your favorite LLM.",
    url: "/render",
  },
  twitter: {
    title: "View & Edit Markdown Digest",
    description:
      "Preview, edit, and customize your generated Markdown digest. Toggle sections, copy as .MD, or download it for use in your favorite LLM.",
  },
}

export default function EncodeLayout(props: LayoutProps<"/render">) {
  return (
    <div className="flex h-dvh flex-1 flex-col">
      <Header />
      {props.children}
    </div>
  )
}
