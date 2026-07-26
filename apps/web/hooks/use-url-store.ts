"use client"

import { useCallback } from "react"

const STORAGE_KEY = "packmd-url-store"
const TTL = 30 * 60 * 1000 // 30 minutes

export type StoredUrl = {
  id: string
  url: string
  expiresAt: number
}

export function useUrlStore() {
  const save = useCallback((url: string) => {
    const id = crypto.randomUUID()

    const items: StoredUrl[] = JSON.parse(
      localStorage.getItem(STORAGE_KEY) ?? "[]"
    )

    const now = Date.now()

    const next = [
      ...items.filter((item) => item.expiresAt > now),
      {
        id,
        url,
        expiresAt: now + TTL,
      },
    ]

    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))

    return id
  }, [])

  const get = useCallback((id: string) => {
    const items: StoredUrl[] = JSON.parse(
      localStorage.getItem(STORAGE_KEY) ?? "[]"
    )

    const item = items.find(
      (item) => item.id === id && item.expiresAt > Date.now()
    )

    return item?.url ?? null
  }, [])

  const remove = useCallback((id: string) => {
    const items: StoredUrl[] = JSON.parse(
      localStorage.getItem(STORAGE_KEY) ?? "[]"
    )

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(items.filter((item) => item.id !== id))
    )
  }, [])

  return {
    save,
    get,
    remove,
  }
}
