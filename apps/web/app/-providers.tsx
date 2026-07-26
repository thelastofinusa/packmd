"use client"
import * as React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { TooltipProvider } from "@packmd/ui/components/tooltip"
import { Toaster } from "@packmd/ui/components/sonner"
import ClickSpark from "@packmd/ui/components/click-spark"
import { useIsMobile } from "@packmd/ui/hooks/use-is-mobile"
import { EncodeProvider } from "./(routes)/encode/context/encode-context"
import { defaultMarkdown } from "@/lib/constants"

export const Providers: React.FC<React.PropsWithChildren> = (props) => {
  const isMobile = useIsMobile()
  const markdown = defaultMarkdown()

  return (
    <ThemeProvider>
      <ClickSpark
        sparkColor="var(--foreground)"
        sparkSize={10}
        sparkRadius={15}
        sparkCount={8}
        duration={400}
      >
        <EncodeProvider initialMarkdown={markdown}>
          <TooltipProvider delay={0}>
            <Toaster
              richColors
              position={isMobile ? "bottom-center" : "top-center"}
            />
            {props.children}
          </TooltipProvider>
        </EncodeProvider>
      </ClickSpark>
    </ThemeProvider>
  )
}
