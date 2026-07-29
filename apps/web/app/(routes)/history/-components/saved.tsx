"use client"
import React from "react"
import { TOTAL_DAYS, useHistory } from "@/hooks/use-history"
import { Button } from "@packmd/ui/components/button"
import { MaxContainer } from "@/components/max-container"
import { useTiks } from "@rexa-developer/tiks/react"
import { DocAdd, Trash5 } from "reicon-react"
import { useIsMounted } from "@/hooks/use-is-mounted"
import { Frame } from "@packmd/ui/components/reui/frame"
import { Skeleton } from "@packmd/ui/components/skeleton"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@packmd/ui/components/empty"
import Link from "next/link"
import { resolveIcon } from "@/lib/icons"
import { useRouter } from "next/navigation"
import { VscMarkdown } from "react-icons/vsc"

export const SavedURLs = () => {
  const router = useRouter()
  const isMounted = useIsMounted()
  const { error } = useTiks()
  const {
    items: historyItems,
    isLoaded,
    remove,
    clear,
    getTimeLeft,
  } = useHistory()

  const items = isMounted ? historyItems : []

  return (
    <MaxContainer size="md">
      <div className="flex flex-col gap-4">
        {!isLoaded ? (
          <React.Fragment>
            <div className="flex items-center justify-between gap-2 sm:justify-end">
              <Skeleton className="h-7 w-30" />
              <Skeleton className="h-7 w-20" />
            </div>

            <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {Array.from({ length: 6 }).map((_, index) => (
                <Frame key={index} variant="inverse" className="rounded-xl">
                  <div className="group flex items-center gap-3 rounded-lg border bg-card px-4 py-3">
                    <Skeleton className="size-8 rounded-full" />

                    <div className="flex min-w-0 flex-1 flex-col gap-2">
                      <Skeleton className="h-2.5 w-full rounded-[9px]" />
                      <Skeleton className="h-2 w-20 rounded-[9px]" />
                    </div>
                    <Skeleton className="-mr-1 size-6 rounded-full" />
                  </div>
                </Frame>
              ))}
            </ul>
          </React.Fragment>
        ) : items.length === 0 ? (
          <React.Fragment>
            <div className="flex items-center justify-between gap-2 sm:justify-end">
              <Button
                variant="outline"
                size="sm"
                data-ignore-click
                onClick={() => router.push("/")}
              >
                <VscMarkdown />
                <span>New Markdown</span>
              </Button>
            </div>

            <Empty>
              <EmptyHeader>
                <EmptyMedia>
                  <StackedCardsIllustration />
                </EmptyMedia>
                <EmptyTitle>No history yet.</EmptyTitle>
                <EmptyDescription>
                  Generated URLs are saved locally and automatically removed
                  after {TOTAL_DAYS} days.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className="flex items-center justify-between gap-2 sm:justify-end">
              <Link href="/">
                <Button variant="outline" size="sm">
                  <VscMarkdown />
                  <span>New Markdown</span>
                </Button>
              </Link>
              <Button
                variant="destructive"
                size="sm"
                data-ignore-click
                onClick={() => {
                  clear()
                  error()
                }}
              >
                <Trash5 className="size-3.5" />
                Clear all
              </Button>
            </div>

            <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {items.map((item) => {
                const Icon = resolveIcon(item.url)
                const left = getTimeLeft(item.expiresAt)

                return (
                  <Frame key={item.id} variant="inverse" className="rounded-xl">
                    <div className="group flex items-center gap-3 rounded-lg border bg-card px-4 py-3">
                      {/* Icon Container */}
                      <div className="flex size-8 items-center justify-center">
                        <Icon className="size-6 text-foreground/70 transition-colors group-hover:text-foreground" />
                      </div>

                      {/* Content */}
                      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                        <Link
                          href={`/render/${item.id}`}
                          className="truncate text-sm font-medium text-muted-foreground hover:text-primary hover:underline"
                        >
                          {item.url}
                        </Link>

                        {/* Expiration Timer */}
                        <div className="flex items-center text-xs text-muted-foreground">
                          <span className="relative mr-2 flex size-1.5">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex size-1.5 rounded-full bg-green-500"></span>
                          </span>
                          <span className="truncate font-medium tracking-tight">
                            {left.days}d {left.hours}h {left.minutes}m{" "}
                            {left.seconds}s
                          </span>
                          <span className="ml-0.5 opacity-75">left</span>
                        </div>
                      </div>
                      {/* Actions */}
                      <Button
                        size="icon-sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation()
                          remove(item.id)
                          error()
                        }}
                        data-ignore-click
                        aria-label="Delete history item"
                        className="-mr-1.5"
                      >
                        <Trash5 className="size-4" />
                      </Button>
                    </div>
                  </Frame>
                )
              })}
            </ul>
          </React.Fragment>
        )}
      </div>
    </MaxContainer>
  )
}

function StackedCardsIllustration() {
  return (
    <div className="relative h-24 w-64" aria-hidden="true">
      {/* Back card */}
      <div className="absolute inset-x-6 top-0 h-6 rounded-t-lg border border-border/50 bg-card/60" />
      {/* Middle card */}
      <div className="absolute inset-x-3 top-3 h-6 rounded-t-lg border border-border/60 bg-card/80" />
      {/* Front card */}
      <div className="absolute inset-x-0 top-6 flex h-16 items-center gap-3 rounded-lg border border-border bg-background px-4 shadow-sm">
        <div className="size-8 shrink-0 rounded bg-secondary" />
        <div className="flex flex-1 flex-col gap-1.5">
          <div className="h-2.5 w-3/4 rounded bg-secondary" />
          <div className="h-2 w-1/2 rounded bg-secondary/60" />
        </div>
      </div>
      {/* Fade overlay */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-linear-to-b from-background/0 via-background/60 to-background" />
    </div>
  )
}
