import React from "react"
import { Separator } from "@packmd/ui/components/separator"
import { SavedURLs } from "./-components/saved"
import { HeroComp } from "@/components/hero"

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
