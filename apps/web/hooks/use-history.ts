"use client"
import { useCallback, useEffect, useMemo, useState } from "react"
import { get, set, del } from "idb-keyval"

const STORAGE_KEY = "packmd-url-history"
const EXPIRATION_TIME = 30 * 24 * 60 * 60 * 1000 // 2,592,000,000 milliseconds
export const TOTAL_DAYS = Math.floor(EXPIRATION_TIME / (1000 * 60 * 60 * 24))

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

  // Load & purge expired items ONCE on initial client mount
  useEffect(() => {
    if (typeof window === "undefined") return

    get<HistoryItem[]>(STORAGE_KEY)
      .then((stored) => {
        if (stored && Array.isArray(stored)) {
          const currentTime = Date.now()
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

  // Timer tick for active UI countdowns
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

  const add = useCallback(
    async (url: string, markdown: string) => {
      const id = crypto.randomUUID()
      const currentTime = Date.now()

      const item: HistoryItem = {
        id,
        url,
        markdown,
        createdAt: currentTime,
        expiresAt: currentTime + EXPIRATION_TIME,
      }

      const updated = [item, ...items.filter((i) => i.url !== url)]
      await save(updated)

      return id
    },
    [items, save]
  )

  const update = useCallback(
    async (id: string, markdown: string) => {
      const targetItem = items.find((item) => item.id === id)
      if (!targetItem) return

      const updatedItem: HistoryItem = { ...targetItem, markdown }
      const newItems = items.map((item) =>
        item.id === id ? updatedItem : item
      )
      await save(newItems)
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
      return items.find((i) => i.id === id)?.markdown
    },
    [items]
  )

  const getTimeLeft = useCallback(
    (expiresAt: number) => {
      const remaining = Math.max(0, expiresAt - now)

      return {
        days: Math.floor(remaining / 86_400_000),
        hours: Math.floor((remaining / 3_600_000) % 24),
        minutes: Math.floor((remaining / 60_000) % 60),
        seconds: Math.floor((remaining / 1000) % 60),
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
    update,
    remove,
    clear,
    getMarkdown,
    getTimeLeft,
  }
}
