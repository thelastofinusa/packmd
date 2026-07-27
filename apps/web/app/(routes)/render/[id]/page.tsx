import React from "react"
import { Metadata } from "next"
import { Content } from "../components/content"

export const metadata: Metadata = {
  alternates: { canonical: "/render" },
}

export default async function Render(props: PageProps<"/render/[id]">) {
  const { id } = await props.params

  return (
    <React.Suspense fallback={null}>
      <Content id={id as string} />
    </React.Suspense>
  )
}
