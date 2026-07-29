"use client"

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@packmd/ui/components/dropdown-menu"
import { Separator } from "@packmd/ui/components/separator"
import React from "react"
import { Note2, Align3Left, Trash5 } from "reicon-react"
import { sectionItems as items, ActiveTab, SectionKey } from "./display"
import { Frame } from "@packmd/ui/components/reui/frame"
import { cn } from "@packmd/ui/lib/utils"
import { Skeleton } from "@packmd/ui/components/skeleton"

// CodeMirror Imports
import CodeMirror from "@uiw/react-codemirror"
import { markdown, markdownLanguage } from "@codemirror/lang-markdown"
import { languages } from "@codemirror/language-data"
import { EditorView } from "@codemirror/view"
import { tags as t } from "@lezer/highlight"
import { HighlightStyle, syntaxHighlighting } from "@codemirror/language"

// 1. A transparent theme that inherits Tailwind classes. Defined at module
// scope so React.memo can short-circuit re-renders.
const tailwindTheme = EditorView.theme({
  "&": {
    backgroundColor: "transparent !important",
    height: "100%",
    color: "inherit",
    fontSize: "0.75rem",
  },
  ".cm-content": {
    fontFamily: "inherit",
    padding: "19.2px", // Added padding here (equivalent to p-4)
  },
  "@media (min-width: 768px)": {
    ".cm-content": {
      padding: "16px", // Added responsive padding here (equivalent to md:p-6)
    },
  },
  "&.cm-focused": {
    outline: "none",
  },
  ".cm-gutters": {
    backgroundColor: "transparent",
    color: "currentColor",
    borderRight: "1px solid var(--border)",
    opacity: 0.6,
  },
  ".cm-activeLine": {
    backgroundColor: "var(--secondary)",
  },
  ".cm-activeLineGutter": {
    backgroundColor: "transparent",
  },
  ".cm-scroller": {
    fontFamily: "inherit",
  },
  ".cm-cursor, .cm-dropCursor": {
    borderLeftColor: "var(--primary) !important",
    borderLeftWidth: "2px !important",
  },
})

const customSyntaxHighlighting = HighlightStyle.define([
  {
    tag: t.link,
    color: "var(--muted-foreground)",
  },
  {
    tag: t.url,
    color: "var(--primary)",
    textDecoration: "underline",
  },
])

// Extensions are stable across renders — declared at module scope so
// CodeMirror doesn't need to rebuild its configuration on every render.
const MARKDOWN_EXTENSIONS = [
  markdown({ base: markdownLanguage, codeLanguages: languages }),
  tailwindTheme,
  EditorView.lineWrapping,
  syntaxHighlighting(customSyntaxHighlighting),
]

const BASIC_SETUP = {
  lineNumbers: true,
  highlightActiveLineGutter: false,
  highlightActiveLine: true,
  foldGutter: true,
  syntaxHighlighting: true,
} as const

type SectionItem = (typeof items)[number]

type MarkdownProps = {
  activeTab: ActiveTab
  sectionItems: readonly SectionItem[]
  sections: Record<SectionKey, boolean>
  setSections: React.Dispatch<React.SetStateAction<Record<SectionKey, boolean>>>
  setMarkdown: React.Dispatch<React.SetStateAction<string>>
  renderMarkdown: string
  displayedMarkdown: string
  hasStructure: boolean
}

const MarkdownComponent: React.FC<MarkdownProps> = ({
  activeTab,
  sectionItems,
  sections,
  setSections,
  renderMarkdown,
  setMarkdown,
  displayedMarkdown,
  hasStructure,
}) => {
  const toggleSection = React.useCallback(
    (key: SectionKey) => (checked: boolean) => {
      setSections((prev) => ({ ...prev, [key]: checked }))
    },
    [setSections]
  )

  const handlePaste = React.useCallback(() => {
    if (!navigator.clipboard) return
    navigator.clipboard
      .readText()
      .then((text) => setMarkdown((prev) => `${text}\n\n${prev || ""}`))
      .catch(() => {})
  }, [setMarkdown])

  const handleClear = React.useCallback(() => {
    setMarkdown("")
  }, [setMarkdown])

  const sectionNodes = React.useMemo(
    () =>
      sectionItems.map((section) => {
        const Icon = section.icon
        const disabled = section.key === "structure" && !hasStructure
        return (
          <DropdownMenuCheckboxItem
            key={section.key}
            checked={disabled ? false : sections[section.key]}
            disabled={disabled}
            onCheckedChange={toggleSection(section.key)}
          >
            <Icon className="size-3" />
            <span>{section.label}</span>
          </DropdownMenuCheckboxItem>
        )
      }),
    [sectionItems, sections, hasStructure, toggleSection]
  )

  return (
    <Frame
      variant="inverse"
      className={cn(
        "hidden h-full min-h-0 rounded-none sm:rounded-xl lg:block",
        activeTab === "markdown" && "block"
      )}
    >
      <div className="flex h-full flex-col overflow-hidden border shadow-sm transition-colors sm:rounded-lg">
        <div className="flex items-center justify-between border-b bg-card px-3 py-2 text-xs font-medium">
          <div className="flex items-center gap-2">Markdown</div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePaste}
              className="group flex items-center gap-1.5 transition-colors hover:text-primary"
            >
              <Note2 className="size-3 opacity-70 group-hover:opacity-100" />
              <span>Paste</span>
            </button>
            <button
              onClick={handleClear}
              className="group flex items-center gap-1.5 transition-colors hover:text-destructive"
            >
              <Trash5 className="size-3 opacity-70 group-hover:opacity-100" />
              <span>Clear</span>
            </button>

            <Separator orientation="vertical" className="my-auto h-2!" />

            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <button className="group flex items-center gap-1.5 transition-colors hover:text-foreground">
                    <Align3Left className="size-3 opacity-70 group-hover:opacity-100" />
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
                <DropdownMenuGroup>{sectionNodes}</DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="flex-1 overflow-hidden bg-background font-mono transition-opacity duration-300">
          <CodeMirrorEditor
            value={displayedMarkdown || ""}
            onChange={setMarkdown}
            upstreamValue={renderMarkdown}
          />
        </div>
      </div>
    </Frame>
  )
}

/**
 * Isolated editor wrapper. Owns its own buffer so that:
 *
 *  1. Upstream re-renders (sections toggle, paginated "Load More", etc.)
 *     don't reset the cursor position or cause CodeMirror to rebuild.
 *  2. We only push edits upstream on idle/flush, keeping the parent
 *     component's deferred/memo pipeline from thrashing.
 *  3. When the upstream markdown changes from outside the editor
 *     (e.g. loading a different history item), we sync the buffer.
 */
const CodeMirrorEditor = React.memo(
  ({
    value,
    onChange,
    upstreamValue,
  }: {
    value: string
    onChange: React.Dispatch<React.SetStateAction<string>>
    upstreamValue: string
  }) => {
    const [buffer, setBuffer] = React.useState(value)
    const lastUpstreamRef = React.useRef(value)

    // Sync buffer when the upstream value diverges from what we last
    // accepted (e.g. user switched history items, or pages loaded).
    React.useEffect(() => {
      if (upstreamValue !== lastUpstreamRef.current) {
        lastUpstreamRef.current = upstreamValue
        setBuffer(value)
      }
    }, [upstreamValue, value])

    const handleChange = React.useCallback(
      (val: string) => {
        setBuffer(val)
        lastUpstreamRef.current = val
        onChange(val)
      },
      [onChange]
    )

    return (
      <CodeMirror
        value={buffer || ""}
        height="100%"
        className="h-full"
        onChange={handleChange}
        extensions={MARKDOWN_EXTENSIONS}
        basicSetup={BASIC_SETUP}
      />
    )
  }
)
CodeMirrorEditor.displayName = "CodeMirrorEditor"

export const Markdown = React.memo(MarkdownComponent)
Markdown.displayName = "Markdown"

export const MarkdownSkeleton = () => {
  return (
    <Frame
      variant="inverse"
      className="hidden h-full min-h-0 rounded-none sm:flex sm:rounded-xl"
    >
      <div className="flex items-center justify-between px-3 py-2 text-xs font-medium">
        <Skeleton className="h-3 w-12" />
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Skeleton className="size-3" />
            <Skeleton className="h-3 w-10" />
          </div>
          <div className="flex items-center gap-1">
            <Skeleton className="size-3" />
            <Skeleton className="h-3 w-10" />
          </div>
          <Separator orientation="vertical" className="mx-2 my-auto h-2!" />
          <div className="flex items-center gap-1">
            <Skeleton className="size-3" />
            <Skeleton className="h-3 w-10" />
          </div>
        </div>
      </div>
      <Skeleton className="h-full overflow-hidden rounded-none border sm:rounded-b-lg" />
    </Frame>
  )
}
