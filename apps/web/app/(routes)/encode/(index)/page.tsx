import React from "react"
import { Content } from "../components/content"
import { redirect } from "next/navigation"

export default async function Generated(props: PageProps<"/encode">) {
  const { id } = await props.searchParams
  if (!id) redirect("/")

  return (
    <React.Suspense fallback={null}>
      <Content id={id as string} />
    </React.Suspense>
  )
}
