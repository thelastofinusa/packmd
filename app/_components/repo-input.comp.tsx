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
  X,
} from "lucide-react"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { useDigest } from "@/hooks/digest"
import { Badge } from "@/components/ui/badge"
import { CONST_EXAMPLES } from "@/lib/constants"

export const RepoInputComp = () => {
  const [input, setInput] = React.useState("")
  const { options, loading, generate, setOptions } = useDigest()

  const token = options.token?.trim() || ""
  const tokenKind = token.startsWith("github_pat_")
    ? "fine_grained"
    : token.startsWith("ghp_") || token.startsWith("gph_")
      ? "classic"
      : token
        ? "unknown"
        : "none"

  const onSubmit = () => generate(input)

  const onExampleClick = (slug: string) => {
    const url = `https://github.com/${slug}`
    setInput(url)
    void generate(url)
  }

  // ---- Tag input state ----
  const [includeInput, setIncludeInput] = React.useState("")
  const [excludeInput, setExcludeInput] = React.useState("")

  const addInclude = (value: string) => {
    const trimmed = value.trim()
    if (!trimmed) return
    if (options.includeGlobs.includes(trimmed)) return
    setOptions({ ...options, includeGlobs: [...options.includeGlobs, trimmed] })
    setIncludeInput("")
  }

  const removeInclude = (pattern: string) =>
    setOptions({
      ...options,
      includeGlobs: options.includeGlobs.filter((g) => g !== pattern),
    })

  const addExclude = (value: string) => {
    const trimmed = value.trim()
    if (!trimmed) return
    if (options.excludeGlobs.includes(trimmed)) return
    setOptions({ ...options, excludeGlobs: [...options.excludeGlobs, trimmed] })
    setExcludeInput("")
  }

  const removeExclude = (pattern: string) =>
    setOptions({
      ...options,
      excludeGlobs: options.excludeGlobs.filter((g) => g !== pattern),
    })

  const handleTagKeyDown =
    (addFn: (v: string) => void, current: string) =>
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" || e.key === ",") {
        e.preventDefault()
        addFn(current)
      }
      // Remove last tag when backspace pressed and input is empty
      if (
        e.key === "Backspace" &&
        current === "" &&
        options.includeGlobs.length > 0
      ) {
        // For include field
        if (addFn === addInclude)
          setOptions({
            ...options,
            includeGlobs: options.includeGlobs.slice(0, -1),
          })
        else if (addFn === addExclude)
          setOptions({
            ...options,
            excludeGlobs: options.excludeGlobs.slice(0, -1),
          })
      }
    }

  return (
    <Container size="md">
      <Card>
        <CardHeader>
          <Tabs defaultValue="public" className="gap-4">
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
                  placeholder="github_pat_... or ghp_... (only sent to api.github.com)"
                  className="h-10 font-mono"
                />
                {tokenKind === "fine_grained" ? (
                  <div className="pl-3 text-[13px] text-muted-foreground">
                    Detected fine‑grained token. Make sure you granted access to
                    this repo and gave Contents: Read.
                  </div>
                ) : tokenKind === "classic" ? (
                  <div className="pl-3 text-[13px] text-muted-foreground">
                    Detected classic token. For private repos it needs the repo
                    scope.
                  </div>
                ) : tokenKind === "unknown" ? (
                  <div className="pl-3 text-[13px] text-destructive">
                    Format not recognized. Use a fine‑grained token
                    (github_pat_) or a classic token (ghp_).
                  </div>
                ) : null}
                <a
                  href="https://github.com/settings/tokens"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 pl-3 text-[13px]"
                >
                  <span>Get your GitHub access token</span>
                  <ExternalLink className="size-3" />
                </a>
              </Field>
            </TabsContent>

            <div className="mt-2">
              <Field>
                <Label className="pl-3">Try these examples:</Label>
                <div className="mt-1 flex flex-wrap items-center gap-2 px-3">
                  {CONST_EXAMPLES.map((slug) => (
                    <Badge
                      key={slug}
                      variant="secondary"
                      onClick={() => onExampleClick(slug)}
                      className={cn(
                        "cursor-pointer",
                        loading && "pointer-events-none opacity-50"
                      )}
                    >
                      {slug}
                    </Badge>
                  ))}
                </div>
              </Field>
            </div>

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

                  {/* ---- Include patterns (tag input) ---- */}
                  <Field className="col-span-2">
                    <Label>Include patterns</Label>
                    <div
                      className={cn(
                        "flex min-h-9 w-full flex-wrap items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-sm squircle sm:rounded-xl md:rounded-2xl lg:rounded-3xl",
                        "focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50"
                      )}
                    >
                      {options.includeGlobs.map((pattern) => (
                        <Badge
                          key={pattern}
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          {pattern}
                          <button
                            type="button"
                            onClick={() => removeInclude(pattern)}
                            className="ml-1 rounded-full p-0.5 hover:bg-muted-foreground/20"
                            aria-label={`Remove ${pattern}`}
                          >
                            <X className="size-3" />
                          </button>
                        </Badge>
                      ))}
                      <input
                        type="text"
                        value={includeInput}
                        onChange={(e) => setIncludeInput(e.target.value)}
                        onKeyDown={handleTagKeyDown(addInclude, includeInput)}
                        placeholder={
                          options.includeGlobs.length === 0
                            ? "*.ts, *.tsx, *.md  (empty = all)"
                            : "Add pattern..."
                        }
                        className="flex-1 border-none bg-transparent p-0 font-mono text-xs outline-none placeholder:text-muted-foreground"
                        disabled={loading}
                      />
                    </div>
                    <p className="mt-1 pl-3 text-[12px] text-muted-foreground">
                      Type a glob then press Enter. Empty means all files.
                    </p>
                  </Field>

                  {/* ---- Exclude patterns (tag input) ---- */}
                  <Field className="col-span-2">
                    <Label>Exclude patterns</Label>
                    <div
                      className={cn(
                        "flex min-h-9 w-full flex-wrap items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-sm squircle sm:rounded-xl md:rounded-2xl lg:rounded-3xl",
                        "focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50"
                      )}
                    >
                      {options.excludeGlobs.map((pattern) => (
                        <Badge
                          key={pattern}
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          {pattern}
                          <button
                            type="button"
                            onClick={() => removeExclude(pattern)}
                            className="ml-1 rounded-full p-0.5 hover:bg-muted-foreground/20"
                            aria-label={`Remove ${pattern}`}
                          >
                            <X className="size-3" />
                          </button>
                        </Badge>
                      ))}
                      <input
                        type="text"
                        value={excludeInput}
                        onChange={(e) => setExcludeInput(e.target.value)}
                        onKeyDown={handleTagKeyDown(addExclude, excludeInput)}
                        placeholder={
                          options.excludeGlobs.length === 0
                            ? "node_modules/**, .git/**"
                            : "Add pattern..."
                        }
                        className="flex-1 border-none bg-transparent p-0 font-mono text-xs outline-none placeholder:text-muted-foreground"
                        disabled={loading}
                      />
                    </div>
                  </Field>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </Tabs>
        </CardHeader>
      </Card>
    </Container>
  )
}
