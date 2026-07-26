"use client"

import React, { useSyncExternalStore } from "react"
import Link from "next/link"
import { Trash2 } from "reicon-react"

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@packmd/ui/components/empty"
import { Button } from "@packmd/ui/components/button"
import { Skeleton } from "@packmd/ui/components/skeleton"
import { resolveIcon } from "@/lib/icons"
import { TOTAL_DAYS, useHistory } from "@/hooks/use-history"
import { MaxContainer } from "@/components/max-container"
import { useTiks } from "@rexa-developer/tiks/react"
import { Separator } from "@packmd/ui/components/separator"
import { Frame } from "@packmd/ui/components/reui/frame"

// Hydration helpers
const emptySubscribe = () => () => {}
const getClientSnapshot = () => true
const getServerSnapshot = () => false

function useIsMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    getClientSnapshot,
    getServerSnapshot
  )
}

export default function History() {
  const isMounted = useIsMounted()
  const { error } = useTiks()
  const {
    items: historyItems,
    isLoaded,
    remove,
    clear,
    getTimeLeft,
  } = useHistory()

  // Guard against hydration mismatch: keep items empty during initial client hydration pass
  const items = isMounted ? historyItems : []

  return (
    <section className="flex-1 overflow-x-clip">
      <div className="py-8 md:pb-24">
        <MaxContainer size="md">
          <header className="flex flex-col">
            <span className="font-mono text-xs tracking-[0.1em] text-muted-foreground uppercase">
              {"//"} URL History
            </span>
            <h1 className="mt-2 mb-3 text-2xl font-semibold sm:mb-4 md:text-3xl">
              Recent Generations
            </h1>
            <p className="max-w-lg text-sm leading-relaxed font-normal text-muted-foreground sm:text-base">
              View recently generated URLs, reopen them at any time, or remove
              entries before they expire automatically.
            </p>
          </header>

          <Separator orientation="horizontal" className="my-8" />

          <section className="flex flex-col gap-4">
            <div className="flex justify-end">
              <Button
                disabled={items.length <= 0}
                variant="destructive"
                className="transition-opacity disabled:opacity-0"
                size="sm"
                data-ignore-click
                onClick={() => {
                  clear()
                  error()
                }}
              >
                <Trash2 className="size-3.5" />
                Clear all
              </Button>
            </div>

            {!isLoaded ? (
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
            ) : items.length === 0 ? (
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
            ) : (
              <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {items.map((item) => {
                  const Icon = resolveIcon(item.url)
                  const left = getTimeLeft(item.expiresAt)

                  return (
                    <Frame
                      key={item.id}
                      variant="inverse"
                      className="rounded-xl"
                    >
                      <div className="group flex items-center gap-3 rounded-lg border bg-card px-4 py-3">
                        {/* Icon Container */}
                        <Icon className="size-6 text-foreground/70 transition-colors group-hover:text-foreground" />

                        {/* Content */}
                        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                          <Link
                            href={`/render?id=${item.id}`}
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
                              {left.days}d {left.hours}h {left.minutes}m
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
                          className="-mr-2"
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </Frame>
                  )
                })}
              </ul>
            )}
          </section>
        </MaxContainer>
      </div>
    </section>
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
