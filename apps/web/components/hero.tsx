import React from "react"
import { MaxContainer } from "./max-container"

export const HeroComp: React.FC<{
  title: string
  comment?: string
  description?: string
}> = (props) => {
  return (
    <MaxContainer size="md">
      <header className="flex flex-col">
        {props.comment && (
          <span className="font-mono text-xs tracking-[0.1em] text-muted-foreground uppercase">
            {"//"} {props.comment}
          </span>
        )}
        <h1 className="mt-2 mb-3 text-2xl font-semibold sm:mb-4 md:text-3xl">
          {props.title}
        </h1>
        {props.description && (
          <p className="max-w-lg text-sm leading-relaxed font-normal text-muted-foreground sm:text-base">
            {props.description}
          </p>
        )}
      </header>
    </MaxContainer>
  )
}
