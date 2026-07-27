import React from "react"
import { Content } from "./components/content"

export default function Render() {
  return (
    <React.Suspense fallback={null}>
      <Content />
    </React.Suspense>
  )
}
