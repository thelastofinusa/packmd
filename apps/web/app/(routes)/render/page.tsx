import React from "react"
import { Display, DisplaySkeleton } from "./-components/display"

export default async function RenderPage() {
  return (
    <React.Suspense fallback={<DisplaySkeleton />}>
      <Display />
    </React.Suspense>
  )
}
