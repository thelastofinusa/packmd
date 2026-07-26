"use client"

import React, { createContext, useContext, useState } from "react"

interface EncodeContextType {
  markdown: string
  setMarkdown: React.Dispatch<React.SetStateAction<string>>
  handleDownload: (filename?: string) => void
}

const EncodeContext = createContext<EncodeContextType | null>(null)

export const EncodeProvider: React.FC<{
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
    <EncodeContext.Provider value={{ markdown, setMarkdown, handleDownload }}>
      {children}
    </EncodeContext.Provider>
  )
}

export const useEncode = () => {
  const context = useContext(EncodeContext)
  if (!context) {
    throw new Error("useEncode must be used within an EncodeProvider")
  }
  return context
}
