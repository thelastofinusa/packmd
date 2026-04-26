"use client"
import * as React from "react"

import { Field, FieldGroup, FieldSet } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/shared/container"
import { Card, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  ChevronDownIcon,
  ExternalLink,
  GitBranch,
  Settings2,
} from "lucide-react"
import { Label } from "@/components/ui/label"
import { splitList } from "@/lib/utils"
import { useDigest } from "@/hooks/digest"
// import { Badge } from "@/components/ui/badge"

// const EXAMPLES = [
//   "facebook/react",
//   "vercel/next.js",
//   "huggingface/transformers",
//   "tailwindlabs/tailwindcss",
// ]

export const RepoInputComp = () => {
  const [input, setInput] = React.useState(
    "https://github.com/thelastofinusa/repo-prompt"
  )
  const { options, loading, generate, setOptions } = useDigest()

  const onSubmit = () => generate(input)

  //   const onExampleClick = (slug: string) => {
  //     const url = `https://github.com/${slug}`
  //     setInput(url)
  //     void generate(url)
  //   }

  return (
    <Container size="md">
      <Card>
        <CardHeader>
          <Tabs defaultValue="public">
            <TabsList>
              <TabsTrigger value="public">Public</TabsTrigger>
              <TabsTrigger value="private">Private</TabsTrigger>
            </TabsList>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                if (!loading) onSubmit()
              }}
            >
              <FieldSet>
                <FieldGroup>
                  <Field orientation="horizontal">
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      id="name"
                      placeholder="https://github.com/user/repo"
                      required
                      className="h-10 flex-1"
                      disabled={loading}
                    />
                    <Button
                      type="submit"
                      size="lg"
                      isLoading={loading}
                      loadingText="Digesting..."
                    >
                      <GitBranch />
                      Digest
                    </Button>
                  </Field>
                </FieldGroup>
              </FieldSet>
            </form>

            <TabsContent value="private" className="mt-2">
              <Field>
                <Label className="pl-3">Personal Access Token</Label>
                <Input
                  type="password"
                  value={options.token ?? ""}
                  onChange={(e) =>
                    setOptions({
                      ...options,
                      token: e.target.value || undefined,
                    })
                  }
                  placeholder="ghp_…  (only sent to api.github.com)"
                  className="h-10 font-mono"
                />
                <a
                  href="https://github.com/settings/tokens?type=beta"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 pl-3 text-[13px]"
                >
                  <span>Get your GitHub access token</span>
                  <ExternalLink className="size-3" />
                </a>
              </Field>
            </TabsContent>

            <Collapsible>
              <CollapsibleTrigger
                render={
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full border-0! bg-transparent! ring-0! outline-0!"
                  >
                    <span className="flex items-center gap-2">
                      <Settings2 />
                      Advanced settings
                    </span>
                    <ChevronDownIcon className="ml-auto group-data-panel-open/button:rotate-180" />
                  </Button>
                }
              />
              <CollapsibleContent className="p-0 pt-2">
                <div className="grid gap-4 rounded-xl border border-border bg-background p-6 squircle sm:grid-cols-2 sm:rounded-2xl md:rounded-3xl lg:rounded-4xl">
                  <Field>
                    <Label>Max file size (KB)</Label>
                    <Input
                      type="number"
                      min={1}
                      value={options.maxFileSizeKB}
                      onChange={(e) =>
                        setOptions({
                          ...options,
                          maxFileSizeKB: Number(e.target.value) || 1,
                        })
                      }
                      className="h-9 bg-card font-mono"
                    />
                  </Field>
                  <Field>
                    <Label>Max total files</Label>
                    <Input
                      type="number"
                      min={1}
                      value={options.maxFiles}
                      onChange={(e) =>
                        setOptions({
                          ...options,
                          maxFiles: Number(e.target.value) || 1,
                        })
                      }
                      className="h-9 bg-card font-mono"
                    />
                  </Field>
                  <Field className="col-span-2">
                    <Label>Include patterns (comma-separated)</Label>
                    <Input
                      value={options.includeGlobs.join(", ")}
                      onChange={(e) =>
                        setOptions({
                          ...options,
                          includeGlobs: splitList(e.target.value),
                        })
                      }
                      placeholder="*.ts, *.tsx, *.md  (empty = all)"
                      className="h-9 bg-card font-mono text-xs"
                    />
                  </Field>
                  <Field className="col-span-2">
                    <Label>Exclude patterns (comma-separated)</Label>
                    <Input
                      value={options.excludeGlobs.join(", ")}
                      onChange={(e) =>
                        setOptions({
                          ...options,
                          excludeGlobs: splitList(e.target.value),
                        })
                      }
                      className="h-9 bg-card font-mono text-xs"
                    />
                  </Field>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </Tabs>
        </CardHeader>
      </Card>

      {/* <div className="mt-5 flex flex-wrap items-center gap-2">
        <span className="mr-2 text-sm text-muted-foreground">
          Try these examples:
        </span>
        {EXAMPLES.map((slug) => (
          <Badge
            key={slug}
            variant="secondary"
            onClick={() => onExampleClick(slug)}
            className="cursor-pointer"
          >
            {slug}
          </Badge>
        ))}
      </div> */}
    </Container>
  )
}
