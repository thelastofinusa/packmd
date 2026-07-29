"use client"

import React, { createContext, useContext, useState } from "react"

interface RenderContextType {
  markdown: string
  setMarkdown: React.Dispatch<React.SetStateAction<string>>
  handleDownload: (filename?: string) => void
}

const RenderContext = createContext<RenderContextType | null>(null)

export const RenderProvider: React.FC<{
  initialMarkdown: string
  children: React.ReactNode
}> = ({ initialMarkdown, children }) => {
  const [markdown, setMarkdown] = useState(initialMarkdown)

  const handleDownload = (filename = "pack.md") => {
    const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <RenderContext.Provider value={{ markdown, setMarkdown, handleDownload }}>
      {children}
    </RenderContext.Provider>
  )
}

export const useRender = () => {
  const context = useContext(RenderContext)
  if (!context) {
    throw new Error("useRender must be used within an RenderProvider")
  }
  return context
}
