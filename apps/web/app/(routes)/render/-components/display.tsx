"use client"

import React, { useDeferredValue } from "react"
import { ActiveTabs } from "./active-tabs"
import { MaxContainer } from "@/components/max-container"
import {
  Code4,
  EyeScan,
  FileText,
  Link5,
  Paperclip,
  Wallpaper,
} from "reicon-react"
import { Markdown, MarkdownSkeleton } from "./markdown"
import { useSearchParams, useRouter } from "next/navigation"
import { useHistory } from "@/hooks/use-history"
import { useRender } from "@/components/providers/render.provider"
import { useIsMounted } from "@/hooks/use-is-mounted"
import { defaultMarkdown } from "@/lib/constants"
import { Preview, PreviewSkeleton } from "./preview"
import { Skeleton } from "@packmd/ui/components/skeleton"
import {
  applySectionFilters,
  hasRepoStructure,
  sanitizeNoise,
  type SectionFlags,
} from "@/lib/markdown-filter"

export const activeTabs = [
  { key: "markdown", label: "Markdown", icon: Code4 },
  { key: "preview", label: "Preview", icon: EyeScan },
] as const

export type ActiveTab = (typeof activeTabs)[number]["key"]

export const sectionItems = [
  { key: "pageInfo", label: "Page Title", icon: FileText },
  { key: "source", label: "Source URL", icon: Paperclip },
  { key: "structure", label: "Repo Structure", icon: Code4 },
  { key: "images", label: "Images", icon: Wallpaper },
  { key: "links", label: "Links", icon: Link5 },
] as const

export type SectionKey = (typeof sectionItems)[number]["key"]

export const DEFAULT_SECTIONS: SectionFlags = {
  pageInfo: true,
  source: true,
  structure: false,
  images: true,
  links: true,
}

export const MAX_PREVIEW_LENGTH = 50_000

export const Display: React.FC<{ id?: string }> = (props) => {
  const router = useRouter()
  const isMounted = useIsMounted()
  const searchParams = useSearchParams()
  const {
    isLoaded,
    getMarkdown,
    getRawMarkdown,
    getSections,
    update: updateHistory,
  } = useHistory()
  const { markdown: renderMarkdown, setMarkdown } = useRender()

  const [rawMarkdown, setRawMarkdown] = React.useState("")
  const [visibleLength, setVisibleLength] = React.useState(MAX_PREVIEW_LENGTH)
  const [activeTab, setActiveTab] = React.useState<ActiveTab>("markdown")
  const [sections, setSections] = React.useState<SectionFlags>(DEFAULT_SECTIONS)
  const [initialized, setInitialized] = React.useState(false)

  const id = props.id || searchParams.get("id")
  const isFreshGenerate = searchParams.get("fresh") === "1"

  React.useEffect(() => setVisibleLength(MAX_PREVIEW_LENGTH), [id])

  // Load once per id
  React.useEffect(() => {
    if (!isMounted || !isLoaded) return

    if (isFreshGenerate) {
      // Newly generated: context markdown IS the raw digest, unfiltered.
      setRawMarkdown(renderMarkdown)
      setInitialized(true)
      return
    }

    let cancelled = false
    ;(async () => {
      const savedMarkdown = getMarkdown(id as string)
      if (cancelled) return
      if (savedMarkdown === undefined) {
        setMarkdown(defaultMarkdown())
        return
      }
      setRawMarkdown(getRawMarkdown(id as string) ?? savedMarkdown)
      setSections(getSections(id as string) ?? DEFAULT_SECTIONS)
      setMarkdown(savedMarkdown)
      setInitialized(true)
    })()

    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    id,
    getMarkdown,
    getRawMarkdown,
    getSections,
    setMarkdown,
    isMounted,
    isLoaded,
    isFreshGenerate,
    router,
  ])

  // Recompute the visible/saved markdown whenever the RAW content or the
  // toggles change. Toggling alone is reversible; it only reads `rawMarkdown`.
  React.useEffect(() => {
    if (!initialized) return
    const filtered = applySectionFilters(sanitizeNoise(rawMarkdown), sections)
    setMarkdown(filtered)
  }, [rawMarkdown, sections, initialized, setMarkdown])

  // Typing/pasting/clearing updates BOTH the raw baseline and the visible
  // copy — from this point on, whatever's on screen is the new "full" doc.
  const handleEditorChange = React.useCallback(
    (value: React.SetStateAction<string>) => {
      const next =
        typeof value === "function"
          ? (value as (prev: string) => string)(renderMarkdown)
          : value
      setRawMarkdown(next)
      setMarkdown(next)
    },
    [renderMarkdown, setMarkdown]
  )

  React.useEffect(() => {
    if (!id || !initialized) return
    const timer = setTimeout(() => {
      void updateHistory(id, renderMarkdown, rawMarkdown, sections)
    }, 1000)
    return () => clearTimeout(timer)
  }, [renderMarkdown, rawMarkdown, sections, id, updateHistory, initialized])

  // The toggle should reflect what's really in the raw doc, not the
  // already-filtered view (otherwise turning "structure" off disables the
  // checkbox permanently).
  const hasStructure = React.useMemo(
    () => hasRepoStructure(rawMarkdown),
    [rawMarkdown]
  )

  const deferredMarkdown = useDeferredValue(renderMarkdown || "")
  const hasMore = deferredMarkdown.length > visibleLength
  const isPending = renderMarkdown !== deferredMarkdown

  // Windowing is now purely a PREVIEW performance concern — the editor
  // always gets the full text; CodeMirror handles that fine.
  const previewMarkdown = React.useMemo(() => {
    if (!hasMore) return deferredMarkdown
    return (
      deferredMarkdown.slice(0, visibleLength) +
      "\n\n...\n\n*(Preview truncated for performance)*"
    )
  }, [deferredMarkdown, visibleLength, hasMore])

  const hideComponent = !isMounted || !isLoaded

  if (hideComponent) return <DisplaySkeleton />

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col overflow-x-clip">
      <MaxContainer
        size="screen"
        className="flex min-h-0 flex-1 flex-col px-0 sm:px-4 sm:py-4"
      >
        <ActiveTabs
          tabs={activeTabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <main className="grid min-h-0 flex-1 grid-cols-1 gap-3 lg:grid-cols-2">
          <Markdown
            activeTab={activeTab}
            hasStructure={hasStructure}
            sections={sections}
            sectionItems={sectionItems}
            displayedMarkdown={renderMarkdown}
            setSections={setSections}
            renderMarkdown={renderMarkdown}
            setMarkdown={handleEditorChange}
          />

          <Preview
            activeTab={activeTab}
            fullProcessedMarkdown={deferredMarkdown}
            displayedMarkdown={previewMarkdown}
            isPending={isPending}
            hasMore={hasMore}
            setVisibleLength={setVisibleLength}
            visibleLength={visibleLength}
          />
        </main>
      </MaxContainer>
    </div>
  )
}

export const DisplaySkeleton = () => {
  return (
    <div className="flex h-full min-h-0 flex-1 flex-col overflow-x-clip">
      <MaxContainer
        size="screen"
        className="flex min-h-0 flex-1 flex-col px-0 sm:px-4 sm:py-4"
      >
        <div className="flex shrink-0 gap-1 bg-card/60 p-1 sm:mb-4 sm:rounded-lg sm:border lg:hidden">
          <Skeleton className="h-8 w-full rounded-none sm:rounded-sm" />
          <Skeleton className="h-8 w-full rounded-none sm:rounded-sm" />
        </div>
        <main className="grid min-h-0 flex-1 grid-cols-1 gap-3 lg:grid-cols-2">
          <MarkdownSkeleton />
          <PreviewSkeleton />
        </main>
      </MaxContainer>
    </div>
  )
}
