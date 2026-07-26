import { buildDigestHeader, scrapeWebPage } from "@packmd/core"

export async function handleWebpage(target: string, options: any) {
  const scraped = await scrapeWebPage(target, {
    jinaApiKey: options.jinaApiKey,
  })

  const estTokens = Math.round((scraped.content?.length || 0) / 4)
  const header = buildDigestHeader({
    icon: "🌐",
    title: scraped.title || target,
    meta: {
      Source: `\`${target}\``,
      Date: new Date().toISOString().slice(0, 10),
      "Est. tokens": `~${estTokens.toLocaleString()}`,
    },
  })

  return `${header}\n\n${scraped.content || ""}`
}
