import React from "react"
import { URLInput } from "@/components/url-input"
import { Metadata } from "next"

export const metadata: Metadata = {
  alternates: { canonical: "/" },
}

export default function Page() {
  return (
    <section className="flex flex-1 items-center justify-center overflow-x-clip">
      <URLInput />
    </section>
  )
}
