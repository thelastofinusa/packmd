import React from "react"
import { Separator } from "@packmd/ui/components/separator"
import { SavedURLs } from "./-components/saved"
import { HeroComp } from "@/components/hero"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "History",
  description:
    "View your recently generated PackMD URLs. Reopen past codebase and webpage digests, or manage your local generation history.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/history",
  },
  openGraph: {
    title: "History",
    description:
      "View your recently generated PackMD URLs. Reopen past codebase and webpage digests, or manage your local generation history.",
    url: "/history",
  },
  twitter: {
    title: "History",
    description:
      "View your recently generated PackMD URLs. Reopen past codebase and webpage digests, or manage your local generation history.",
  },
}

export default function HistoryPage() {
  return (
    <section className="h-full overflow-x-clip">
      <div className="py-8 md:pb-24">
        <HeroComp
          comment="URL History"
          title="Recent Generations"
          description="View recently generated URLs, reopen them at any time, or remove
          entries before they expire automatically."
        />
        <Separator orientation="horizontal" className="my-8" />
        <SavedURLs />
      </div>
    </section>
  )
}
