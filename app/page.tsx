import { Container } from "@/components/shared/container"
import { HeroComp } from "./_components/hero.comp"
import { RepoInputComp } from "./_components/repo-input.comp"
import { BottomBarComp } from "./_components/bottom-bar.comp"
import { OutputTabsComp } from "./_components/output-tabs.comp"
import { StateComp } from "./_components/state.comp"

export default function Page() {
  return (
    <div className="relative min-h-dvh">
      <HeroComp />
      <RepoInputComp />
      <StateComp />
      <OutputTabsComp />
      <Container size="md" className="py-16">
        <footer className="text-center text-sm text-muted-foreground">
          Runs entirely in your browser. Your GitHub token, if provided, is sent
          only to <strong className="text-foreground">api.github.com</strong>.
        </footer>
      </Container>
      <BottomBarComp />
    </div>
  )
}
