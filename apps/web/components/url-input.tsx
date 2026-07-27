"use client"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@packmd/ui/components/input-group"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@packmd/ui/components/popover"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@packmd/ui/components/drawer"
import React from "react"
import { Drop, Setting2, X } from "reicon-react"
import { Controller, UseFormReturn, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@packmd/ui/components/field"
import { resolveIcon } from "@/lib/icons"
import { Button } from "@packmd/ui/components/button"
import { cn } from "@packmd/ui/lib/utils"
import { Frame } from "@packmd/ui/components/reui/frame"
import { MaxContainer } from "./max-container"
import { useRouter } from "next/navigation"
import { useHistory } from "@/hooks/use-history"
import { useTiks } from "@rexa-developer/tiks/react"
import { Input } from "@packmd/ui/components/input"
import { Badge } from "@packmd/ui/components/badge"
import { packmdSchema, type PackmdSchemaType } from "@packmd/core"
import { useIsMobile } from "@packmd/ui/hooks/use-is-mobile"
import { sleep } from "@/lib/utils"

import { useDigest } from "@/hooks/use-digest"
import { useRender } from "@/components/render-context"

interface AdvancedOptionsProps {
  form: UseFormReturn<PackmdSchemaType>
  isPending: boolean
  includeInput: string
  setIncludeInput: (v: string) => void
  excludeInput: string
  setExcludeInput: (v: string) => void
  addInclude: (v: string) => void
  removeInclude: (v: string) => void
  addExclude: (v: string) => void
  removeExclude: (v: string) => void
  handleTagKeyDown: (
    addFn: (v: string) => void,
    current: string
  ) => (e: React.KeyboardEvent<HTMLInputElement>) => void
  error: () => void
}

const AdvancedOptions = ({
  form,
  isPending,
  includeInput,
  setIncludeInput,
  excludeInput,
  setExcludeInput,
  addInclude,
  removeInclude,
  addExclude,
  removeExclude,
  handleTagKeyDown,
  error,
}: AdvancedOptionsProps) => {
  return (
    <div className="flex flex-col gap-3">
      {/* Token field */}
      <Controller
        name="token"
        control={form.control}
        disabled={isPending}
        render={({ field }) => (
          <Field className="gap-1">
            <FieldLabel>GitHub Token (optional)</FieldLabel>
            <Input
              {...field}
              type="password"
              placeholder="github_pat_... or ghp_..."
              disabled={isPending}
              className="rounded-[9px] font-mono text-xs"
            />
            <FieldDescription>
              Required for private repositories.
            </FieldDescription>
          </Field>
        )}
      />

      <div className="grid grid-cols-2 gap-3">
        <Controller
          name="maxFileSizeKB"
          control={form.control}
          disabled={isPending}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1">
              <FieldLabel>Max file size (KB)</FieldLabel>
              <Input
                {...field}
                value={field.value ?? ""}
                type="number"
                min={1}
                aria-invalid={fieldState.invalid}
                placeholder="500"
                disabled={isPending}
                className="rounded-[9px] font-mono text-xs"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="maxFiles"
          control={form.control}
          disabled={isPending}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1">
              <FieldLabel>Max total files</FieldLabel>
              <Input
                {...field}
                value={field.value ?? ""}
                type="number"
                min={1}
                aria-invalid={fieldState.invalid}
                placeholder="500"
                disabled={isPending}
                className="rounded-[9px] font-mono text-xs"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>

      {/* Include patterns */}
      <Field className="gap-1">
        <FieldLabel>Include patterns</FieldLabel>
        <div
          className={cn(
            "flex min-h-8 w-full flex-wrap items-center gap-1 rounded-[9px] border border-border bg-transparent px-2 py-1.5 text-sm dark:bg-input/30",
            "focus-within:border-ring focus-within:ring-0 focus-within:ring-ring/50",
            isPending && "pointer-events-none opacity-50"
          )}
        >
          {(form.watch("includeGlobs") || []).map((pattern) => (
            <Badge
              key={pattern}
              variant="secondary"
              className="flex h-4.5 items-center"
            >
              {pattern}
              <button
                type="button"
                onClick={() => {
                  removeInclude(pattern)
                  error()
                }}
                data-ignore-click
                className="rounded-full hover:bg-muted-foreground/20 disabled:pointer-events-none disabled:opacity-50"
                aria-label={`Remove ${pattern}`}
                disabled={isPending}
              >
                <X className="size-2.5" />
              </button>
            </Badge>
          ))}
          <input
            type="text"
            value={includeInput}
            onChange={(e) => setIncludeInput(e.target.value)}
            onKeyDown={handleTagKeyDown(addInclude, includeInput)}
            placeholder={
              (form.watch("includeGlobs") || []).length === 0
                ? "*.ts, *.tsx, *.md  (empty = all)"
                : "Add pattern..."
            }
            className="flex-1 border-none bg-transparent p-0 font-mono text-xs outline-0 placeholder:text-muted-foreground"
            disabled={isPending}
          />
        </div>
      </Field>

      {/* Exclude patterns */}
      <Field className="gap-1">
        <FieldLabel>Exclude patterns</FieldLabel>
        <div
          className={cn(
            "flex min-h-8 w-full flex-wrap items-center gap-1 rounded-[9px] border border-border bg-transparent px-2 py-1.5 text-sm dark:bg-input/30",
            "focus-within:border-ring focus-within:ring-0 focus-within:ring-ring/50",
            isPending && "pointer-events-none opacity-50"
          )}
        >
          {(form.watch("excludeGlobs") || []).map((pattern) => (
            <Badge
              key={pattern}
              variant="secondary"
              className="flex h-4.5 items-center"
            >
              {pattern}
              <button
                type="button"
                onClick={() => {
                  removeExclude(pattern)
                  error()
                }}
                data-ignore-click
                className="rounded-full hover:bg-muted-foreground/20 disabled:pointer-events-none disabled:opacity-50"
                aria-label={`Remove ${pattern}`}
                disabled={isPending}
              >
                <X className="size-2.5" />
              </button>
            </Badge>
          ))}
          <input
            type="text"
            value={excludeInput}
            onChange={(e) => setExcludeInput(e.target.value)}
            onKeyDown={handleTagKeyDown(addExclude, excludeInput)}
            placeholder={
              (form.watch("excludeGlobs") || []).length === 0
                ? "node_modules/**, .git/**"
                : "Add pattern..."
            }
            className="flex-1 border-none bg-transparent p-0 font-mono text-xs outline-0 placeholder:text-muted-foreground"
            disabled={isPending}
          />
        </div>
      </Field>
    </div>
  )
}

export const URLInput = () => {
  const router = useRouter()
  const { add } = useHistory()
  const { pop, success, error } = useTiks()
  const [isPending, startTransition] = React.useTransition()
  const isMobile = useIsMobile()
  const { setMarkdown } = useRender()
  const { generate } = useDigest()
  const { items } = useHistory()

  const form = useForm<PackmdSchemaType>({
    resolver: zodResolver(packmdSchema),
    defaultValues: {
      url: "",
      maxFileSizeKB: "100",
      maxFiles: "200",
      token: "",
      includeGlobs: [],
      excludeGlobs: [],
    },
  })

  // eslint-disable-next-line react-hooks/incompatible-library
  const url = form.watch("url")
  const isGitHub = url.includes("github.com")

  const LeftIcon = React.useMemo(() => resolveIcon(url), [url])
  const [preset, setPreset] = React.useState<string | null>(null)
  const [openGithubMenu, setOpenGithubMenu] = React.useState<boolean>(false)

  // ---- Tag input states ----
  const [includeInput, setIncludeInput] = React.useState("")
  const [excludeInput, setExcludeInput] = React.useState("")

  // ---- Helper to update globs in form ----
  const addInclude = (value: string) => {
    const trimmed = value.trim()
    if (!trimmed) return
    const current = form.getValues("includeGlobs") || []
    if (current.includes(trimmed)) return
    form.setValue("includeGlobs", [...current, trimmed], { shouldDirty: true })
    setIncludeInput("")
  }

  const removeInclude = (pattern: string) => {
    const current = form.getValues("includeGlobs") || []
    form.setValue(
      "includeGlobs",
      current.filter((g) => g !== pattern),
      { shouldDirty: true }
    )
  }

  const addExclude = (value: string) => {
    const trimmed = value.trim()
    if (!trimmed) return
    const current = form.getValues("excludeGlobs") || []
    if (current.includes(trimmed)) return
    form.setValue("excludeGlobs", [...current, trimmed], { shouldDirty: true })
    setExcludeInput("")
  }

  const removeExclude = (pattern: string) => {
    const current = form.getValues("excludeGlobs") || []
    form.setValue(
      "excludeGlobs",
      current.filter((g) => g !== pattern),
      { shouldDirty: true }
    )
  }

  const handleTagKeyDown =
    (addFn: (v: string) => void, current: string) =>
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" || e.key === ",") {
        e.preventDefault()
        addFn(current)
      }
      if (e.key === "Backspace" && current === "") {
        const globs =
          addFn === addInclude
            ? form.getValues("includeGlobs")
            : form.getValues("excludeGlobs")
        if (globs && globs.length > 0) {
          const newGlobs = globs.slice(0, -1)
          if (addFn === addInclude) {
            form.setValue("includeGlobs", newGlobs, { shouldDirty: true })
          } else {
            form.setValue("excludeGlobs", newGlobs, { shouldDirty: true })
          }
        }
      }
    }

  const selectPreset = (url: string) => {
    form.setValue("url", url, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    })
    setPreset(url)
  }

  React.useEffect(() => {
    if (url !== preset) {
      setPreset(null)
    }
  }, [url, preset])

  async function onSubmit(data: PackmdSchemaType) {
    startTransition(async () => {
      // Inside onSubmit, after form validation
      const existingItem = items.find((item) => item.url === data.url)
      if (existingItem) {
        toast.info("Already generated, redirecting...")
        setMarkdown(existingItem.markdown)
        router.push(`/render/${existingItem.id}`)
        return
      }

      try {
        toast.loading("Generating Markdown. Please wait..", {
          id: "generating",
        })

        // Subscribe to store changes to dynamically update the toast with live progress messages
        const unsubscribe = useDigest.subscribe((state) => {
          if (state.progress) {
            toast.loading(state.progress, { id: "generating" })
          }
        })

        await generate(data.url, {
          maxFileSizeKB: Number(data.maxFileSizeKB),
          maxFiles: Number(data.maxFiles),
          includeGlobs: data.includeGlobs,
          excludeGlobs: data.excludeGlobs,
          token: data.token,
        })

        // Clean up the subscription once generation finishes
        unsubscribe()

        // After generation, check store for result
        const state = useDigest.getState()
        if (state.data?.digest) {
          toast.dismiss("generating")
          toast.success("Markdown generated successfully.")
          success()
          const id = await add(data.url, state.data.digest)
          setMarkdown(state.data.digest)
          await sleep()
          router.push(`/render/${id}`)
          pop()
          form.reset()
        } else if (state.error) {
          throw new Error(state.error)
        }
      } catch (err) {
        toast.dismiss()
        toast.error(
          err instanceof Error ? err.message : "Failed to generate markdown",
          {
            duration: Infinity,
            closeButton: true,
          }
        )
        console.error(err)
        error()
      }
    })
  }

  const triggerButton = (
    <Button
      size="xs"
      variant="secondary"
      disabled={isPending || !isGitHub}
      onClick={(e) => {
        pop()
        e.stopPropagation()
        setOpenGithubMenu((prev) => !prev)
      }}
    >
      <Setting2 className="size-3" />
      <span>Advanced</span>
    </Button>
  )

  const optionsProps: AdvancedOptionsProps = {
    form,
    isPending,
    includeInput,
    setIncludeInput,
    excludeInput,
    setExcludeInput,
    addInclude,
    removeInclude,
    addExclude,
    removeExclude,
    handleTagKeyDown,
    error,
  }

  return (
    <MaxContainer className="py-18">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col items-center sm:mb-10"
      >
        <FieldGroup>
          <Controller
            name="url"
            control={form.control}
            disabled={isPending}
            render={({ field, fieldState }) => {
              const submitVariant = isPending
                ? "outline"
                : field.value.length > 0
                  ? "default"
                  : "secondary"

              return (
                <Field data-invalid={fieldState.invalid}>
                  <Frame
                    variant="inverse"
                    className={cn(
                      "rounded-3xl!",
                      fieldState.invalid ? "glow-error" : "glow-pulse",
                      "has-[[data-slot=input-group-control]:focus-visible]:[--glow-opacity:0.1]"
                    )}
                  >
                    <InputGroup className="relative bg-card!">
                      <span className="absolute top-3 left-4">
                        <LeftIcon className="size-3.5 animate-pulse text-muted-foreground" />
                      </span>
                      {!isPending && field.value.trim().length > 0 && (
                        <span
                          onClick={() => {
                            form.reset()
                            error()
                          }}
                          role="button"
                          data-ignore-click
                          className="cup absolute top-3 right-4"
                        >
                          <X className="size-3.5 text-muted-foreground" />
                        </span>
                      )}
                      <InputGroupInput
                        {...field}
                        aria-invalid={fieldState.invalid}
                        autoComplete="off"
                        placeholder="Paste GitHub repo Web URL"
                        disabled={isPending}
                        className="px-10 pt-3 pb-4"
                      />
                      <InputGroupAddon align="block-end">
                        <InputGroupAddon>
                          {isMobile ? (
                            <Drawer
                              open={openGithubMenu}
                              onOpenChange={setOpenGithubMenu}
                            >
                              <DrawerTrigger render={triggerButton} />
                              {isGitHub && (
                                <DrawerContent className="p-4 pb-6">
                                  <DrawerHeader className="px-0 pt-0 text-left">
                                    <DrawerTitle>Advanced Options</DrawerTitle>
                                  </DrawerHeader>
                                  <div className="mt-2">
                                    <AdvancedOptions {...optionsProps} />
                                  </div>
                                </DrawerContent>
                              )}
                            </Drawer>
                          ) : (
                            <Popover
                              open={openGithubMenu}
                              onOpenChange={setOpenGithubMenu}
                            >
                              <PopoverTrigger render={triggerButton} />
                              {isGitHub && (
                                <PopoverContent
                                  align="start"
                                  onClick={(e) => e.stopPropagation()}
                                  className="max-w-md min-w-72 p-4"
                                >
                                  <AdvancedOptions {...optionsProps} />
                                </PopoverContent>
                              )}
                            </Popover>
                          )}
                        </InputGroupAddon>

                        <InputGroupButton
                          type="submit"
                          variant={submitVariant}
                          size="icon-sm"
                          isLoading={isPending}
                          disabled={fieldState.invalid || !field.value.length}
                          className="ml-auto rounded-full"
                        >
                          <Drop size="3.5" />
                          <span className="sr-only">Send</span>
                        </InputGroupButton>
                      </InputGroupAddon>
                    </InputGroup>
                  </Frame>
                  <div className="mx-auto flex items-center justify-center px-2 text-center">
                    {fieldState.invalid ? (
                      <FieldError
                        className="text-xs sm:text-sm"
                        errors={[fieldState.error]}
                      />
                    ) : (
                      <FieldDescription className="text-xs sm:text-sm">
                        {isGitHub
                          ? "Customize options to include or exclude specific files."
                          : "Add a GitHub repository to unlock advanced options."}
                      </FieldDescription>
                    )}
                  </div>
                </Field>
              )
            }}
          />
        </FieldGroup>

        <div className="mt-3 flex items-center gap-1 md:mt-4">
          {[
            {
              label: "Medium Article",
              url: "https://thelastofinusa.medium.com/your-ai-is-only-as-good-as-the-context-you-give-it-0a60d8dc898d",
            },
            {
              label: "PackMD Repo",
              url: "https://github.com/thelastofinusa/packmd",
            },
          ].map(({ label, url }) => {
            const Icon = resolveIcon(url)

            return (
              <Button
                key={url}
                type="button"
                size={isMobile ? "xs" : "sm"}
                variant={preset === url ? "outline" : "secondary"}
                disabled={preset === url || isPending}
                onClick={() => selectPreset(url)}
              >
                <Icon className={isMobile ? "size-3" : "size-3.5"} />
                <span>{label}</span>
              </Button>
            )
          })}
        </div>
      </form>
    </MaxContainer>
  )
}
