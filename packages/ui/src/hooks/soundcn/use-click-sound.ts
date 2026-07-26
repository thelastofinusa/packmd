"use client"

import { clickSoftSound } from "@packmd/ui/lib/soundcn/click-soft"
import { useSound } from "./use-sound"

export function useClickSound() {
  return useSound(clickSoftSound, { volume: 0.3 })
}
