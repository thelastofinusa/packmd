"use client"

import React from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"

import { cn } from "@packmd/ui/lib/utils"
import { Separator } from "@packmd/ui/components/separator"
import { Frame } from "@packmd/ui/components/reui/frame"
import { CodeBlock } from "@packmd/ui/components/code-block"
import { MAX_PREVIEW_LENGTH, ActiveTab } from "./display"
import { Skeleton } from "@packmd/ui/components/skeleton"
import { Button } from "@packmd/ui/components/button"
import { getMarkdownStats } from "@packmd/core"
import { ChevronUp, Cpu3, TextInput } from "reicon-react"

type PreviewProps = {
  fullProcessedMarkdown: string
  displayedMarkdown: string
  isPending: boolean
  activeTab: ActiveTab
  hasMore: boolean
  visibleLength: number
  setVisibleLength: React.Dispatch<React.SetStateAction<number>>
}

/**
 * Stable component overrides for `react-markdown`. We build them at module
 * scope so that ReactMarkdown doesn't see a fresh `components` object on
 * every render — that previously caused it to remount every paragraph.
 */
const markdownComponents = {
  event: ({ ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div {...props} />
  ),
  phase: ({ ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div {...props} />
  ),
  fixcard: ({ ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div {...props} />
  ),
  fixcardgrid: ({ ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div {...props} />
  ),
  card: ({ ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div {...props} />
  ),

  h1: ({ ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className="mb-2 border-b border-border pb-2 text-2xl font-bold tracking-tight text-foreground not-first:mt-6 md:text-3xl"
      {...props}
    />
  ),
  h2: ({ ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="mb-2 border-b border-border pb-1 text-xl font-semibold tracking-tight text-foreground not-first:mt-6 md:text-2xl"
      {...props}
    />
  ),
  h3: ({ ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="mb-3 text-base font-semibold tracking-tight text-foreground not-first:mt-6 md:text-xl"
      {...props}
    />
  ),
  p: ({ ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <div
      className="text-sm leading-6 text-foreground md:text-base"
      {...props}
    />
  ),
  a: ({ ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className="font-medium text-primary underline underline-offset-4 transition-colors hover:text-primary/80"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
  img: ({ alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className="my-2 inline-flex max-w-full" alt={alt || ""} {...props} />
  ),
  ul: ({ ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className="ml-6 list-disc text-foreground not-first:my-4 [&>li]:not-first:mt-1"
      {...props}
    />
  ),
  ol: ({ ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className="ml-6 list-decimal text-foreground not-first:my-4 [&>li]:not-first:mt-1"
      {...props}
    />
  ),
  li: ({ ...props }: React.LiHTMLAttributes<HTMLLIElement>) => (
    <li className="text-sm text-foreground md:text-base" {...props} />
  ),
  blockquote: ({
    ...props
  }: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="mt-4 border-l-2 border-primary pl-4 text-foreground italic"
      {...props}
    />
  ),
  table: ({ ...props }: React.TableHTMLAttributes<HTMLTableElement>) => (
    <div className="my-6">
      <Frame variant="inverse" className="rounded-xl">
        <div className="overflow-hidden rounded-lg border bg-background">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left" {...props} />
          </div>
        </div>
      </Frame>
    </div>
  ),
  thead: ({ ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className="border-b bg-card" {...props} />
  ),
  tr: ({ ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className="border-b border-border/40 last:border-0" {...props} />
  ),
  th: ({ ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) => (
    <th
      className="px-4 py-2.5 text-[13px] font-medium text-muted-foreground"
      {...props}
    />
  ),
  td: ({ ...props }: React.TdHTMLAttributes<HTMLTableDataCellElement>) => (
    <td
      className="px-4 py-3.5 align-top text-[13px] leading-5 text-muted-foreground"
      {...props}
    />
  ),
  code: ({
    className,
    children,
    ...props
  }: React.HTMLAttributes<HTMLElement> & { className?: string }) => {
    const match = /language-(\w+)/.exec(className || "")
    const isBlock = match !== null

    if (isBlock) {
      const language = match![1]
      const codeString = String(children).replace(/\n$/, "")
      return (
        <div className="my-5">
          <Frame variant="inverse" className="rounded-xl">
            <CodeBlock fileName={language} source={codeString} />
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
  hr: ({ ...props }: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className="my-6 border-border" {...props} />
  ),
}

const remarkPlugins = [remarkGfm] as const
const rehypePlugins = [rehypeRaw] as const

/**
 * Render-only wrapper for ReactMarkdown. Memoized so that toggling
 * checkboxes in the toolbar or paging the preview via "Load More"
 * doesn't remount the entire tree (which would re-run rehype-raw's
 * full document parse on every render).
 */
const MarkdownRenderer = React.memo(function MarkdownRenderer({
  markdown,
}: {
  markdown: string
}) {
  return (
    <ReactMarkdown
      remarkPlugins={remarkPlugins as unknown as []}
      rehypePlugins={rehypePlugins as unknown as []}
      components={markdownComponents}
    >
      {markdown}
    </ReactMarkdown>
  )
})

const PreviewComponent: React.FC<PreviewProps> = ({
  fullProcessedMarkdown,
  activeTab,
  displayedMarkdown,
  isPending,
  hasMore,
  visibleLength,
  setVisibleLength,
}) => {
  const [showScrollTop, setShowScrollTop] = React.useState(false)
  const scrollContainerRef = React.useRef<HTMLDivElement>(null)

  // Compute token/char stats ONCE per processed markdown so we don't
  // pay the O(n) scan twice for the header counters.
  const stats = React.useMemo(
    () => getMarkdownStats(fullProcessedMarkdown),
    [fullProcessedMarkdown]
  )

  // `useTransition` keeps the Load More click responsive: the chunk is
  // committed at React's normal priority while the heavy markdown
  // processing for the next chunk runs as a transition.
  const [isPaging, startPaging] = React.useTransition()

  const handleLoadMore = React.useCallback(() => {
    startPaging(() => {
      setVisibleLength((prev) => prev + MAX_PREVIEW_LENGTH)
    })
  }, [setVisibleLength])

  const handleScroll = React.useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setShowScrollTop(e.currentTarget.scrollTop > 500)
  }, [])

  const scrollToTop = React.useCallback(() => {
    scrollContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  return (
    <Frame
      variant="inverse"
      className={cn(
        "hidden h-full min-h-0 rounded-none sm:rounded-xl lg:block",
        activeTab === "preview" && "block"
      )}
    >
      <div className="relative flex h-full flex-col overflow-hidden border shadow-sm transition-colors sm:rounded-lg">
        <div className="flex items-center justify-between border-b bg-card px-3 py-2 text-xs font-medium">
          <div className="flex items-center gap-1">
            <span>Preview</span>
            {isPending && (
              <span className="ml-2 animate-pulse text-muted-foreground">
                Loading..
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <button className="group flex items-center gap-1.5 transition-colors hover:text-primary">
              <Cpu3 className="size-3 opacity-70 group-hover:opacity-100" />
              <span>~{stats.estimatedTokens.toLocaleString()} tokens</span>
            </button>

            <Separator orientation="vertical" className="my-auto h-2!" />

            <button className="group flex items-center gap-1.5 transition-colors hover:text-primary">
              <TextInput className="size-3 opacity-70 group-hover:opacity-100" />
              <span>{stats.characters.toLocaleString()} chars</span>
            </button>
          </div>
        </div>

        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className={cn(
            "flex-1 overflow-x-hidden overflow-y-auto p-4 transition-opacity duration-300 md:p-6",
            isPending ? "opacity-50" : "opacity-100"
          )}
        >
          <MarkdownRenderer markdown={displayedMarkdown} />

          {hasMore && (
            <div className="mt-8 flex flex-col items-center justify-center gap-2 border-t border-border/60 pt-6 text-center">
              <p className="font-mono text-xs text-muted-foreground">
                Showing {visibleLength.toLocaleString()} of{" "}
                {stats.characters.toLocaleString()} chars
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleLoadMore}
                disabled={isPaging}
              >
                {isPaging
                  ? "Loading…"
                  : `Load More - ${MAX_PREVIEW_LENGTH.toLocaleString()}`}
              </Button>
            </div>
          )}
        </div>

        <Button
          type="button"
          size="icon"
          onClick={scrollToTop}
          className={cn(
            "absolute right-4 bottom-4 z-50 rounded-full border shadow-md transition-all duration-300",
            showScrollTop
              ? "translate-y-0 opacity-100"
              : "pointer-events-none translate-y-4 opacity-0"
          )}
        >
          <ChevronUp className="size-3.5" weight="Filled" />
        </Button>
      </div>
    </Frame>
  )
}

export const Preview = React.memo(PreviewComponent)
Preview.displayName = "Preview"

export const PreviewSkeleton = () => {
  return (
    <Frame
      variant="inverse"
      className="h-full min-h-0 rounded-none sm:rounded-xl"
    >
      <div className="flex items-center justify-between px-3 py-2 text-xs font-medium">
        <Skeleton className="h-3 w-12" />
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Skeleton className="h-3 w-16" />
          </div>
          <Separator orientation="vertical" className="mx-2 my-auto h-2!" />
          <div className="flex items-center gap-1">
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
      </div>
      <Skeleton className="h-full overflow-hidden rounded-none border sm:rounded-b-lg" />
    </Frame>
  )
}
