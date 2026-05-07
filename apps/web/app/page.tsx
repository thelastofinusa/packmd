/* eslint-disable @next/next/no-img-element */
import { Container } from "@/components/shared/container"
import { HeroComp } from "./_components/hero.comp"
import { RepoInputComp } from "./_components/repo-input.comp"
import { BottomBarComp } from "./_components/bottom-bar.comp"
import { OutputTabsComp } from "./_components/output-tabs.comp"
import { StateComp } from "./_components/state.comp"
import Image from "next/image"

export default function Page() {
  return (
    <div className="relative min-h-dvh">
      <HeroComp />
      <RepoInputComp />
      <StateComp />
      <OutputTabsComp />
      <Container size="md" className="flex flex-col items-center gap-6 py-16">
        <footer className="text-center text-sm text-muted-foreground">
          Runs entirely in your browser. Your GitHub token, if provided, is sent
          only to <strong className="text-foreground">api.github.com</strong>.
        </footer>
        <a
          href="https://www.producthunt.com/products/git2txt?embed=true&amp;utm_source=badge-featured&amp;utm_medium=badge&amp;utm_campaign=badge-git2txt"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            alt="Git2txt - Turn any Git repo into LLM-ready text. | Product Hunt"
            width={200}
            height={50}
            src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1141160&amp;theme=dark&amp;t=1778143701407"
          />
        </a>
      </Container>
      <BottomBarComp />
    </div>
  )
}
