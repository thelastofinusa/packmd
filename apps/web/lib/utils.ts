export async function sleep(duration = 1000, name = "Timer"): Promise<void> {
  await new Promise((resolve) => setTimeout(() => resolve({ name }), duration))
}

export function encodeUrl(value: string): string {
  return btoa(String.fromCharCode(...new TextEncoder().encode(value)))
}

export function decodeUrl(value: string): string {
  const bytes = Uint8Array.from(atob(value), (c) => c.charCodeAt(0))
  return new TextDecoder().decode(bytes)
}
