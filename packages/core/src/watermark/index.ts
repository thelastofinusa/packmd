import { version, name } from "../../package.json"

export function appendWatermark(markdown: string, sourceUrl: string): string {
  const timestamp = new Date().toISOString()

  return `${markdown}

<!--
──────────────────────────────────────────────────
PackMD Document Metadata
──────────────────────────────────────────────────
Application : PackMD - ${name} v${version}
Website     : https://packmd.vercel.app
Source      : ${sourceUrl}
Generated   : ${timestamp}
──────────────────────────────────────────────────
-->`
}
