"use client"

import { Container } from "@/components/shared/container"
import { FilesTab } from "@/components/shared/files-tab"
import { SummaryTab } from "@/components/shared/summary-tab"
import { TreeTab } from "@/components/shared/tree-tab"
import { Card, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useDigest } from "@/hooks/digest"
import { Icons } from "hugeicons-proxy"

export const OutputTabsComp = () => {
  const { data, error, loading } = useDigest()

  if (!loading && !error && data)
    return (
      <Container size="lg" className="mt-16">
        <Card>
          <CardHeader>
            <Tabs defaultValue="summary">
              <TabsList className="grid w-full grid-cols-3 bg-background sm:w-auto">
                <TabsTrigger
                  value="summary"
                  className="gap-1.5 text-xs sm:text-sm"
                >
                  <Icons.TextIndent01Icon className="size-4" />
                  <span>Summary</span>
                </TabsTrigger>
                <TabsTrigger
                  value="tree"
                  className="gap-1.5 text-xs sm:text-sm"
                >
                  <Icons.Structure05Icon className="size-4" />
                  <span className="hidden sm:inline">Directory Structure</span>
                  <span className="sm:hidden">Tree</span>
                </TabsTrigger>
                <TabsTrigger
                  value="files"
                  className="gap-1.5 text-xs sm:text-sm"
                >
                  <Icons.CodeSimpleIcon className="size-4" />
                  <span className="hidden sm:inline">Files Content</span>
                  <span className="sm:hidden">Files</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="summary" className="mt-5">
                <SummaryTab data={data} />
              </TabsContent>
              <TabsContent value="tree" className="mt-5">
                <TreeTab data={data} />
              </TabsContent>
              <TabsContent value="files" className="mt-5">
                <FilesTab files={data.files} />
              </TabsContent>
            </Tabs>
          </CardHeader>
        </Card>
      </Container>
    )

  return null
}
