import React from "react"
import { Header } from "./components/header"
import { Footer } from "./components/footer"

export default function LandingLayout(props: LayoutProps<"/">) {
  return (
    <div className="flex min-h-dvh flex-1 flex-col">
      <Header />
      {props.children}
      <Footer />
    </div>
  )
}
