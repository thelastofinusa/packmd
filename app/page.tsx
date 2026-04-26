import { HeroComp } from "./_components/hero.comp"
import { RepoInputComp } from "./_components/repo-input.comp"

export default function Page() {
  return (
    <div className="relative min-h-dvh">
      <HeroComp />
      <RepoInputComp />
    </div>
  )
}
