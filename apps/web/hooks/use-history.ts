"use client"
import { useCallback, useEffect, useMemo, useState } from "react"
import { get, set, del } from "idb-keyval"

const STORAGE_KEY = "packmd-url-history"
const HISTORY_TTL = 7 * 24 * 60 * 60 * 1000
export const TOTAL_DAYS = Math.floor(HISTORY_TTL / (1000 * 60 * 60 * 24))

export type HistoryItem = {
  id: string
  url: string
  markdown: string
  createdAt: number
  expiresAt: number
}

export function useHistory() {
  const [now, setNow] = useState(Date.now())
  const [items, setItems] = useState<HistoryItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load history from IndexedDB on initial client mount
  useEffect(() => {
    if (typeof window === "undefined") return

    get<HistoryItem[]>(STORAGE_KEY)
      .then((stored) => {
        if (stored && Array.isArray(stored)) {
          const currentTime = Date.now()
          // Filter out expired items on load
          const valid = stored.filter((item) => item.expiresAt > currentTime)
          setItems(valid)
          if (valid.length !== stored.length) {
            set(STORAGE_KEY, valid)
          }
        }
      })
      .catch(() => {
        setItems([])
      })
      .finally(() => {
        setIsLoaded(true)
      })
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const save = useCallback(async (value: HistoryItem[]) => {
    setItems(value)
    try {
      await set(STORAGE_KEY, value)
    } catch (err) {
      console.error("Failed to save history to IndexedDB", err)
    }
  }, [])

  const cleanup = useCallback(async () => {
    if (!isLoaded) return
    const currentTime = Date.now()
    const valid = items.filter((item) => item.expiresAt > currentTime)
    if (valid.length !== items.length) {
      await save(valid)
    }
  }, [items, isLoaded, save])

  useEffect(() => {
    if (isLoaded) {
      cleanup()
    }
  }, [now, cleanup, isLoaded])

  const add = useCallback(
    async (url: string, markdown: string) => {
      const id = crypto.randomUUID()
      const currentTime = Date.now()

      const item: HistoryItem = {
        id,
        url,
        markdown,
        createdAt: currentTime,
        expiresAt: currentTime + HISTORY_TTL,
      }

      const updated = [item, ...items.filter((i) => i.url !== url)]
      await save(updated)

      return id
    },
    [items, save]
  )

  const remove = useCallback(
    async (id: string) => {
      await save(items.filter((item) => item.id !== id))
    },
    [items, save]
  )

  const clear = useCallback(async () => {
    setItems([])
    try {
      await del(STORAGE_KEY)
    } catch (err) {
      console.error("Failed to clear history from IndexedDB", err)
    }
  }, [])

  const getMarkdown = useCallback(
    (id: string): string | undefined => {
      const item = items.find((i) => i.id === id)
      return item?.markdown
    },
    [items]
  )

  const getTimeLeft = useCallback(
    (expiresAt: number) => {
      const remaining = Math.max(0, expiresAt - now)

      const days = Math.floor(remaining / 86_400_000)
      const hours = Math.floor((remaining / 3_600_000) % 24)
      const minutes = Math.floor((remaining / 60_000) % 60)
      const seconds = Math.floor((remaining / 1000) % 60)

      return {
        days,
        hours,
        minutes,
        seconds,
        ms: remaining,
        expired: remaining === 0,
      }
    },
    [now]
  )

  return {
    items: useMemo(() => items, [items]),
    isLoaded,
    add,
    remove,
    clear,
    getMarkdown,
    getTimeLeft,
  }
}
