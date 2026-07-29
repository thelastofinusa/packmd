import React from "react"
import { Display, DisplaySkeleton } from "../-components/display"

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
