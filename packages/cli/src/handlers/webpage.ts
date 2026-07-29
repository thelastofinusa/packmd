import { scrapeWebPage } from "@packmd/core"

export async function handleWebpage(target: string, options: any) {
  const scraped = await scrapeWebPage(target, {
    jinaApiKey: options.jinaApiKey,
  })
  return scraped.markdown
}
