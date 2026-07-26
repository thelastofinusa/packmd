"use client"

import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import React, { useEffect, useState, useSyncExternalStore } from "react"
import { useSearchParams } from "next/navigation"
import { useHistory } from "@/hooks/use-history"
import { MaxContainer } from "@/components/max-container"
import { Frame } from "@packmd/ui/components/reui/frame"
import {
  ClipboardText,
  Code4,
  EyeScan,
  FileText,
  Link5,
  Paperclip,
  SortAlpha,
  Trash9,
  Wallpaper,
} from "reicon-react"
import { Textarea } from "@packmd/ui/components/textarea"
import { CodeBlock } from "@packmd/ui/components/code-block"
import { cn } from "@packmd/ui/lib/utils"
import { Separator } from "@packmd/ui/components/separator"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@packmd/ui/components/dropdown-menu"

import { extractTitle } from "@/lib/utils"
import { defaultMarkdown } from "@/lib/constants"
import { siteConfig } from "@/config/site.config"
import { useRender } from "@/components/render-context"
import { Skeleton } from "@packmd/ui/components/skeleton"

// Helpers for useSyncExternalStore
const emptySubscribe = () => () => {}
const getClientSnapshot = () => true
const getServerSnapshot = () => false

const previewTabs = [
  { key: "markdown", label: "Markdown", icon: Code4 },
  { key: "preview", label: "Preview", icon: EyeScan },
] as const

type PreviewTab = (typeof previewTabs)[number]["key"]

const sectionItems = [
  {
    key: "pageInfo",
    label: "Page Title",
    icon: FileText,
    markdown: (ctx: { pageTitle: string }) => `**Title:** ${ctx.pageTitle}`,
  },
  {
    key: "source",
    label: "Source URL",
    icon: Paperclip,
    markdown: (ctx: { sourceUrl: string }) =>
      `**Source:** [${ctx.sourceUrl}](${ctx.sourceUrl})`,
  },
  {
    key: "images",
    label: "Images",
    icon: Wallpaper,
  },
  {
    key: "links",
    label: "Links",
    icon: Link5,
  },
] as const

type SectionKey = (typeof sectionItems)[number]["key"]

export const Content: React.FC<{ id: string }> = (props) => {
  const searchParams = useSearchParams()
  const { items, isLoaded, getMarkdown } = useHistory()
  const { markdown: renderMarkdown, setMarkdown } = useRender()

  const [activeTab, setActiveTab] = useState<PreviewTab>("markdown")

  const [sections, setSections] = useState<Record<SectionKey, boolean>>({
    pageInfo: true,
    source: true,
    images: true,
    links: true,
  })

  const toggleSection = (key: SectionKey) => (checked: boolean) => {
    setSections((prev) => ({
      ...prev,
      [key]: checked,
    }))
  }

  const isMounted = useSyncExternalStore(
    emptySubscribe,
    getClientSnapshot,
    getServerSnapshot
  )

  const id = props.id || searchParams.get("id")
  const item = items.find((item) => item.id === id)

  // Set markdown from history or fallback to default
  useEffect(() => {
    if (!isMounted) return

    const savedMarkdown = id ? getMarkdown(id) : null
    if (savedMarkdown) {
      setMarkdown(savedMarkdown)
    } else {
      // No saved markdown – show default
      setMarkdown(defaultMarkdown())
    }
  }, [id, getMarkdown, setMarkdown, isMounted])

  // Process the raw markdown to strip images/links if toggled off, and sanitize unsafe/unrecognized tags
  let processedMarkdown = renderMarkdown || ""

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

  const pageTitle = extractTitle(renderMarkdown, "PackMD")
  const sourceUrl = item?.url || siteConfig.links.github

  const markdown = [
    sections.pageInfo && `**Title:** ${pageTitle}`,
    sections.source && `**Source:** [${sourceUrl}](${sourceUrl})`,
    processedMarkdown,
  ]
    .filter(Boolean)
    .join("\n\n")

  const hideComponent = !isMounted || !isLoaded

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col overflow-x-clip">
      <MaxContainer
        size="screen"
        className="flex min-h-0 flex-1 flex-col px-0 sm:px-4 sm:py-4"
      >
        {hideComponent ? (
          <React.Fragment>
            <div className="flex shrink-0 gap-1 bg-card/60 p-1 sm:mb-4 sm:rounded-lg sm:border lg:hidden">
              <Skeleton className="h-8 w-full rounded-none sm:rounded-sm" />
              <Skeleton className="h-8 w-full rounded-none sm:rounded-sm" />
            </div>
            <main className="grid min-h-0 flex-1 grid-cols-1 gap-3 lg:grid-cols-2">
              <Frame
                variant="inverse"
                className="hidden h-full min-h-0 rounded-none sm:flex sm:rounded-xl"
              >
                <div className="flex items-center justify-between px-3 py-2 text-xs font-medium">
                  <Skeleton className="h-3 w-12" />
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Skeleton className="size-3" />
                      <Skeleton className="h-3 w-8" />
                    </div>
                    <div className="flex items-center gap-1">
                      <Skeleton className="size-3" />
                      <Skeleton className="h-3 w-8" />
                    </div>
                    <Separator
                      orientation="vertical"
                      className="mx-2 my-auto h-2!"
                    />
                    <div className="flex items-center gap-1">
                      <Skeleton className="size-3" />
                      <Skeleton className="h-3 w-8" />
                    </div>
                  </div>
                </div>
                <Skeleton className="h-full overflow-hidden rounded-none border sm:rounded-b-lg" />
              </Frame>
              <Frame
                variant="inverse"
                className="h-full min-h-0 rounded-none sm:rounded-xl"
              >
                <div className="flex items-center justify-between px-3 py-2 text-xs font-medium">
                  <Skeleton className="h-3 w-12" />
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Skeleton className="h-3 w-8" />
                    </div>
                    <Separator
                      orientation="vertical"
                      className="mx-2 my-auto h-2!"
                    />
                    <div className="flex items-center gap-1">
                      <Skeleton className="h-3 w-8" />
                    </div>
                  </div>
                </div>
                <Skeleton className="h-full overflow-hidden rounded-none border sm:rounded-b-lg" />
              </Frame>
            </main>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className="flex shrink-0 gap-px bg-card/60 p-1 sm:mb-4 sm:rounded-lg sm:border lg:hidden">
              {previewTabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-sm border border-transparent px-3 py-2 text-xs font-medium transition-all ${
                    activeTab === tab.key
                      ? "border-border! bg-primary text-primary-foreground shadow-sm"
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
                              setMarkdown(
                                text + "\n\n" + (renderMarkdown || "")
                              )
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

                      <Separator
                        orientation="vertical"
                        className="my-auto h-2!"
                      />

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
                            <DropdownMenuLabel>
                              Include in Output
                            </DropdownMenuLabel>

                            {sectionItems.map((section) => {
                              const Icon = section.icon

                              return (
                                <DropdownMenuCheckboxItem
                                  key={section.key}
                                  checked={sections[section.key]}
                                  onCheckedChange={toggleSection(section.key)}
                                >
                                  <Icon className="size-3" />
                                  <span>{section.label}</span>
                                </DropdownMenuCheckboxItem>
                              )
                            })}
                          </DropdownMenuGroup>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  <Textarea
                    value={renderMarkdown || ""}
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
                          ~{Math.ceil(markdown.length / 4).toLocaleString()}{" "}
                          tokens
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
                          <div
                            className="leading-6 text-foreground"
                            {...props}
                          />
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
                            const codeString = String(children).replace(
                              /\n$/,
                              ""
                            )
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
          </React.Fragment>
        )}
      </MaxContainer>
    </div>
  )
}
