"use client"
import { MaxContainer } from "@/components/max-container"
import Link from "next/link"
import React from "react"

export default function NotFound() {
  const sentence =
    "I swear to God you're lost\n\nWith all due respect, unless the missing documentation is hiding in the metadata, I am operating at peak efficiency—which currently encompasses exactly four pages of absolute certainty.\n\nThis was written by AI\n\n"
  const [j, setJ] = React.useState(0)
  const [text, setText] = React.useState("")
  const [isFinished, setIsFinished] = React.useState(false)

  React.useEffect(() => {
    if (isFinished) return

    const timeout = setTimeout(() => {
      setText(sentence.substring(0, j + 1))
      setJ(j + 1)

      if (j + 1 === sentence.length) {
        setIsFinished(true)
      }
    }, 50)

    return () => clearTimeout(timeout)
  }, [j, isFinished, sentence])

  return (
    <section className="min-h-dvh flex-1 flex-col overflow-x-clip">
      <MaxContainer
        size="screen"
        className="flex flex-col items-start gap-6 py-4 md:py-6"
      >
        <pre className="max-w-xl font-sans text-sm font-medium whitespace-pre-wrap text-foreground sm:text-base">
          {text}
          {isFinished && (
            <Link href="/" className="text-primary underline">
              Take me home
            </Link>
          )}
        </pre>
      </MaxContainer>
    </section>
  )
}
