"use client"
import React from "react"
import { AlertTriangle, Loader } from "lucide-react"

import { useDigest } from "@/hooks/digest"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardHeader } from "@/components/ui/card"
import { Container } from "@/components/shared/container"

export const StateComp = () => {
  const { loading, error, progress } = useDigest()

  return (
    <React.Fragment>
      {loading && (
        <Container className="mt-16">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader className="size-4 animate-spin" />
                <span>{progress ?? "Working..."}</span>
              </div>
              <div className="mt-6 space-y-3">
                <Skeleton className="h-5 w-1/3 bg-secondary" />
                <Skeleton className="h-4 w-2/3 bg-secondary" />
                <Skeleton className="h-4 w-1/2 bg-secondary" />
                <Skeleton className="mt-6 h-32 w-full bg-secondary" />
                <Skeleton className="h-4 w-1/4 bg-secondary" />
                <Skeleton className="h-24 w-full bg-secondary" />
              </div>
            </CardHeader>
          </Card>
        </Container>
      )}

      {error && (
        <Container className="mt-16">
          <Card>
            <CardHeader>
              <div className="flex items-start gap-3 border border-destructive/40 bg-destructive/10 p-4 text-sm squircle sm:rounded-xl md:rounded-2xl lg:rounded-3xl">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                <div>
                  <div className="font-medium text-foreground">
                    Couldn&apos;t generate digest
                  </div>
                  <p className="mt-1 text-muted-foreground">{error}</p>
                </div>
              </div>
            </CardHeader>
          </Card>
        </Container>
      )}
    </React.Fragment>
  )
}
