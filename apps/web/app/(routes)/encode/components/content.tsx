"use client"

import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import React, { useEffect, useState, useSyncExternalStore } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useHistory } from "@/hooks/use-history"
import { MaxContainer } from "@/components/max-container"
import { Frame } from "@packmd/ui/components/reui/frame"
import {
  ClipboardText,
  Code4,
  EyeScan,
  FileText,
  Link5,
  MoreH,
  Paperclip,
  SortAlpha,
  Trash9,
  Wallpaper,
} from "reicon-react"
import { Textarea } from "@packmd/ui/components/textarea"
import { useEncode } from "../context/encode-context"
import { CodeBlock } from "@packmd/ui/components/code-block"
import { cn } from "@packmd/ui/lib/utils"
import { Separator } from "@packmd/ui/components/separator"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@packmd/ui/components/dropdown-menu"

// Helpers for useSyncExternalStore
const emptySubscribe = () => () => {}
const getClientSnapshot = () => true
const getServerSnapshot = () => false

const previewTabs = [
  { key: "markdown", label: "Markdown", icon: Code4 },
  { key: "preview", label: "Preview", icon: EyeScan },
] as const

type PreviewTab = (typeof previewTabs)[number]["key"]

// Extract the first markdown heading or fall back to the URL
function extractTitle(md: string, fallback?: string): string {
  const lines = md.split("\n")
  for (const line of lines) {
    const trimmed = line.trim()
    if (trimmed.startsWith("# ")) {
      return trimmed.replace(/^#\s+/, "")
    }
    if (trimmed.startsWith("## ")) {
      return trimmed.replace(/^##\s+/, "")
    }
  }
  return fallback || "Untitled"
}

export const Content: React.FC<{ id: string }> = (props) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { items, isLoaded, getMarkdown } = useHistory()
  const { markdown: encodedMarkdown, setMarkdown } = useEncode()

  const [activeTab, setActiveTab] = useState<PreviewTab>("markdown")

  const [sections, setSections] = useState({
    pageInfo: true,
    source: true,
    images: true,
    links: true,
  })

  const isMounted = useSyncExternalStore(
    emptySubscribe,
    getClientSnapshot,
    getServerSnapshot
  )

  const id = props.id || searchParams.get("id")
  const item = items.find((item) => item.id === id)

  const toggleSection = (key: keyof typeof sections) => (checked: boolean) => {
    setSections((prev) => ({
      ...prev,
      [key]: checked,
    }))
  }

  useEffect(() => {
    if (id) {
      const savedMarkdown = getMarkdown(id)
      if (savedMarkdown) {
        setMarkdown(savedMarkdown)
      }
    }
  }, [id, getMarkdown, setMarkdown])

  // Process the raw markdown to strip images/links if toggled off, and sanitize unsafe/unrecognized tags
  let processedMarkdown = encodedMarkdown || ""

  // Strip script tags and unrecognized lowercase React element names causing browser warnings
  processedMarkdown = processedMarkdown
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(
      /<\/?(fragment|profiler|strictmode|suspense|activity|viewtransition)\b[^>]*>/gi,
      ""
    )

  if (!sections.images) {
    // Strip markdown images: ![alt](url) -> ""
    processedMarkdown = processedMarkdown.replace(/!\[.*?\]\([^)]+\)/g, "")
    // Strip HTML images: <img ... /> -> ""
    processedMarkdown = processedMarkdown.replace(/<img[^>]*>/gi, "")
  }

  if (!sections.links) {
    // Strip markdown links while preserving anchor text: [text](url) -> "text"
    processedMarkdown = processedMarkdown.replace(
      /\[([^\]]+)\]\([^)]+\)/g,
      "$1"
    )
    // Strip HTML links while preserving text: <a href="...">text</a> -> "text"
    processedMarkdown = processedMarkdown.replace(
      /<a\b[^>]*>(.*?)<\/a>/gi,
      "$1"
    )
  }

  const pageTitle = extractTitle(encodedMarkdown, item?.url)

  const markdown = [
    sections.pageInfo && `**Title:** ${pageTitle}`,

    sections.source && `**Source:** [${item?.url}](${item?.url})`,

    processedMarkdown,
  ]
    .filter(Boolean)
    .join("\n\n")

  // Graceful redirection guard with a short debounce to handle IndexedDB write lag
  useEffect(() => {
    if (!isMounted || !isLoaded) return

    if (!id) {
      router.replace("/docs")
      return
    }

    const timer = setTimeout(() => {
      const currentItem = items.find((i) => i.id === id)
      const currentMarkdown = getMarkdown(id)

      if (!currentItem && !currentMarkdown && !encodedMarkdown) {
        router.replace("/docs")
      }
    }, 150)

    return () => clearTimeout(timer)
  }, [isMounted, isLoaded, id, items, getMarkdown, encodedMarkdown, router])

  if (!isMounted || !isLoaded) return null
  if (id && !item && !encodedMarkdown && !getMarkdown(id)) return null

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col overflow-x-clip">
      <MaxContainer
        size="screen"
        className="flex min-h-0 flex-1 flex-col px-0 sm:px-4 sm:py-4"
      >
        <div className="flex shrink-0 gap-px bg-card/60 p-1 sm:mb-4 sm:rounded-lg sm:border lg:hidden">
          {previewTabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(tab.key)}
              className={`flex flex-1 items-center justify-center gap-2 rounded-sm border border-transparent px-3 py-2 text-xs font-medium transition-all ${
                activeTab === tab.key
                  ? "border-border! bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              }`}
            >
              <tab.icon className="size-3" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <main className="grid min-h-0 flex-1 grid-cols-1 gap-3 lg:grid-cols-2">
          <Frame
            variant="inverse"
            className={cn(
              "hidden h-full min-h-0 rounded-none sm:rounded-xl lg:block",
              {
                block: activeTab === "markdown",
              }
            )}
          >
            <div className="flex h-full flex-col overflow-hidden border shadow-sm transition-colors sm:rounded-lg">
              <div className="flex items-center justify-between border-b bg-card px-3 py-2 text-xs font-medium">
                <div className="flex items-center gap-2">Markdown</div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      navigator.clipboard
                        .readText()
                        .then((text) =>
                          setMarkdown(text + "\n\n" + (encodedMarkdown || ""))
                        )
                        .catch(() => {})
                    }}
                    className="group flex items-center gap-1.5 transition-colors hover:text-primary"
                  >
                    <ClipboardText className="size-3 opacity-70 group-hover:opacity-100" />
                    <span>Paste</span>
                  </button>
                  <button
                    onClick={() => setMarkdown("")}
                    className="group flex items-center gap-1.5 transition-colors hover:text-destructive"
                  >
                    <Trash9 className="size-3 opacity-70 group-hover:opacity-100" />
                    <span>Clear</span>
                  </button>

                  <Separator orientation="vertical" className="my-auto h-2!" />

                  <DropdownMenu>
                    <DropdownMenuTrigger
                      render={
                        <button className="group flex items-center gap-1.5 transition-colors hover:text-foreground">
                          <SortAlpha className="size-4 opacity-70 group-hover:opacity-100" />
                          <span>Sections</span>
                        </button>
                      }
                    />
                    <DropdownMenuContent
                      className="min-w-40"
                      align="end"
                      side="bottom"
                      sideOffset={10}
                    >
                      <DropdownMenuGroup>
                        <DropdownMenuLabel>Include in Output</DropdownMenuLabel>
                        <DropdownMenuCheckboxItem
                          checked={sections.pageInfo}
                          onCheckedChange={toggleSection("pageInfo")}
                        >
                          <FileText className="size-3" />
                          <span>Page Title</span>
                        </DropdownMenuCheckboxItem>

                        <DropdownMenuCheckboxItem
                          checked={sections.source}
                          onCheckedChange={toggleSection("source")}
                        >
                          <Paperclip className="size-3" />
                          <span>Source URL</span>
                        </DropdownMenuCheckboxItem>

                        <DropdownMenuSeparator />

                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger>
                            <MoreH weight="Filled" className="size-3" />
                            <span>Other Options</span>
                          </DropdownMenuSubTrigger>
                          <DropdownMenuPortal>
                            <DropdownMenuSubContent className="min-w-30">
                              <DropdownMenuCheckboxItem
                                checked={sections.images}
                                onCheckedChange={toggleSection("images")}
                              >
                                <Wallpaper weight="Filled" className="size-3" />
                                <span>Images</span>
                              </DropdownMenuCheckboxItem>
                              <DropdownMenuCheckboxItem
                                checked={sections.links}
                                onCheckedChange={toggleSection("links")}
                              >
                                <Link5 className="size-3" />
                                <span>Links</span>
                              </DropdownMenuCheckboxItem>
                            </DropdownMenuSubContent>
                          </DropdownMenuPortal>
                        </DropdownMenuSub>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <Textarea
                value={encodedMarkdown || ""}
                spellCheck={false}
                onChange={(e) => setMarkdown(e.target.value)}
                className="text-mono h-full resize-none overflow-y-auto rounded-none border-none bg-background! p-4 font-mono text-xs leading-tight shadow-none ring-0! outline-0 placeholder:opacity-50 focus-visible:ring-0 md:p-6"
                placeholder="Paste or write markdown here.."
              />
            </div>
          </Frame>

          <Frame
            variant="inverse"
            className={cn(
              "hidden h-full min-h-0 rounded-none sm:rounded-xl lg:block",
              {
                block: activeTab === "preview",
              }
            )}
          >
            <div className="flex h-full flex-col overflow-hidden border shadow-sm transition-colors sm:rounded-lg">
              <div className="flex items-center justify-between border-b bg-card px-3 py-2 text-xs font-medium">
                <div className="flex items-center gap-2">Preview</div>
                <div className="flex items-center">
                  <p className="font-mono text-[11px] text-muted-foreground">
                    <span>
                      ~{Math.ceil(markdown.length / 4).toLocaleString()} tokens
                    </span>
                  </p>
                  <Separator
                    orientation="vertical"
                    className="mx-2 my-auto h-2!"
                  />
                  <p className="font-mono text-[11px] text-muted-foreground">
                    <span>{markdown.length.toLocaleString()} chars</span>
                  </p>
                </div>
              </div>
              <div className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-6">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                  components={{
                    h1: ({ ...props }) => (
                      <h1
                        className="mb-2 border-b border-border pb-2 text-3xl font-bold tracking-tight text-foreground not-first:mt-6"
                        {...props}
                      />
                    ),
                    h2: ({ ...props }) => (
                      <h2
                        className="mb-2 border-b border-border pb-1 text-2xl font-semibold tracking-tight text-foreground not-first:mt-6"
                        {...props}
                      />
                    ),
                    h3: ({ ...props }) => (
                      <h3
                        className="mb-3 text-xl font-semibold tracking-tight text-foreground not-first:mt-6"
                        {...props}
                      />
                    ),
                    p: ({ ...props }) => (
                      <div className="leading-6 text-foreground" {...props} />
                    ),
                    a: ({ ...props }) => (
                      <a
                        className="font-medium text-primary underline underline-offset-4 transition-colors hover:text-primary/80"
                        target="_blank"
                        rel="noopener noreferrer"
                        {...props}
                      />
                    ),
                    img: ({ ...props }) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        className="my-2 inline-flex max-w-full"
                        alt={props.alt || ""}
                        {...props}
                      />
                    ),
                    ul: ({ ...props }) => (
                      <ul
                        className="ml-6 list-disc text-foreground not-first:my-4 [&>li]:not-first:mt-1"
                        {...props}
                      />
                    ),
                    ol: ({ ...props }) => (
                      <ol
                        className="ml-6 list-decimal text-foreground not-first:my-4 [&>li]:not-first:mt-1"
                        {...props}
                      />
                    ),
                    li: ({ ...props }) => (
                      <li className="text-foreground" {...props} />
                    ),
                    blockquote: ({ ...props }) => (
                      <blockquote
                        className="mt-4 border-l-2 border-primary pl-4 text-foreground italic"
                        {...props}
                      />
                    ),
                    table: ({ ...props }) => (
                      <div className="my-6">
                        <Frame variant="inverse" className="rounded-xl">
                          <div className="overflow-hidden rounded-lg border bg-background">
                            <div className="overflow-x-auto">
                              <table
                                className="w-full border-collapse text-left"
                                {...props}
                              />
                            </div>
                          </div>
                        </Frame>
                      </div>
                    ),
                    thead: ({ ...props }) => (
                      <thead className="border-b bg-card" {...props} />
                    ),
                    tr: ({ ...props }) => (
                      <tr
                        className="border-b border-border/40 last:border-0"
                        {...props}
                      />
                    ),
                    th: ({ ...props }) => (
                      <th
                        className="px-4 py-2.5 text-[13px] font-medium text-muted-foreground"
                        {...props}
                      />
                    ),
                    td: ({ ...props }) => (
                      <td
                        className="px-4 py-3.5 align-top text-[13px] leading-5 text-muted-foreground"
                        {...props}
                      />
                    ),
                    code: ({ className, children, ...props }) => {
                      const match = /language-(\w+)/.exec(className || "")
                      const isBlock = match !== null

                      if (isBlock) {
                        const language = match[1]
                        const codeString = String(children).replace(/\n$/, "")
                        return (
                          <div className="my-5">
                            <Frame variant="inverse" className="rounded-xl">
                              <CodeBlock
                                fileName={language}
                                source={codeString}
                              />
                            </Frame>
                          </div>
                        )
                      }

                      return (
                        <code
                          className="rounded-[9px] bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground/80"
                          {...props}
                        >
                          {children}
                        </code>
                      )
                    },
                    hr: ({ ...props }) => (
                      <hr className="my-6 border-border" {...props} />
                    ),
                  }}
                >
                  {markdown}
                </ReactMarkdown>
              </div>
            </div>
          </Frame>
        </main>
      </MaxContainer>
    </div>
  )
}
