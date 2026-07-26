import React from "react"
import { Header } from "./components/header"

export default function EncodeLayout(props: LayoutProps<"/encode">) {
  return (
    <div className="flex h-dvh flex-1 flex-col">
      <Header />
      {props.children}
    </div>
  )
}
