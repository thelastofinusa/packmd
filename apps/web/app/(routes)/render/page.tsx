import React from "react"

import { Content } from "./components/content"
import { Metadata } from "next"

export const metadata: Metadata = {
  alternates: { canonical: "/render" },
}

export default async function Render(props: PageProps<"/render">) {
  const { id } = await props.searchParams

  return (
    <React.Suspense fallback={null}>
      <Content id={id as string} />
    </React.Suspense>
  )
}
