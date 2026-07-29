"use client"
import React from "react"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
} from "@packmd/ui/components/field"
import { Controller, useForm, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@packmd/ui/components/button"
import { useIsMobile } from "@packmd/ui/hooks/use-is-mobile"
import { packmdSchema, PackmdSchemaType } from "@packmd/core"

import { resolveIcon } from "@/lib/icons"
import { MaxContainer } from "@/components/max-container"
import { Frame } from "@packmd/ui/components/reui/frame"
import { cn } from "@packmd/ui/lib/utils"
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
import { Drop, Setting2, X } from "reicon-react"
import { useTiks } from "@rexa-developer/tiks/react"
import { AdvancedOptions, AdvancedOptionsProps } from "./advanced-options"
import { useRender } from "@/components/providers/render.provider"
import { useDigest } from "@/hooks/use-digest"
import { useHistory } from "@/hooks/use-history"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { sleep } from "@/lib/utils"

const packmdSchemaDefaultValues = {
  url: "",
  maxFileSizeKB: "100",
  maxFiles: "200",
  token: "",
  includeGlobs: [],
  excludeGlobs: [],
}

const quickActions = [
  {
    label: "Medium Article",
    url: "https://thelastofinusa.medium.com/your-ai-is-only-as-good-as-the-context-you-give-it-0a60d8dc898d",
  },
  {
    label: "PackMD Repo",
    url: "https://github.com/thelastofinusa/packmd",
  },
]

export const URLInput = () => {
  const router = useRouter()
  const isMobile = useIsMobile()
  const { generate } = useDigest()
  const { items, add, getMarkdown } = useHistory()
  const { setMarkdown } = useRender()
  const { pop, success, error } = useTiks()
  const [isPending, startTransition] = React.useTransition()

  const [preset, setPreset] = React.useState<string | null>(null)
  const [includeInput, setIncludeInput] = React.useState<string>("")
  const [excludeInput, setExcludeInput] = React.useState<string>("")
  const [openGithubMenu, setOpenGithubMenu] = React.useState<boolean>(false)

  const form = useForm<PackmdSchemaType>({
    resolver: zodResolver(packmdSchema),
    defaultValues: packmdSchemaDefaultValues,
  })

  const url = useWatch({ name: "url", control: form.control })
  const isGitHub = url.includes("github.com")

  async function onSubmit(values: PackmdSchemaType) {
    startTransition(async () => {
      const existingItem = items.find((item) => item.url === values.url)

      if (existingItem) {
        toast.info("Markdown already generated")

        const saved = getMarkdown(existingItem.id)
        if (saved) {
          setMarkdown(saved)
          await sleep()
          router.push(`/render/${existingItem.id}?fresh=1`)
          pop()
          form.reset()
          return
        }
      }

      toast.loading("Generating markdown. Please wait..", {
        id: "generating",
      })

      const unsubscribe = useDigest.subscribe((state) => {
        if (state.progress) {
          toast.loading(state.progress, { id: "generating" })
        }
      })

      try {
        await generate(values.url, {
          maxFileSizeKB: Number(values.maxFileSizeKB),
          maxFiles: Number(values.maxFiles),
          includeGlobs: values.includeGlobs,
          excludeGlobs: values.excludeGlobs,
          token: values.token,
        })

        const { data, error: generationError } = useDigest.getState()

        if (generationError) {
          throw new Error(generationError)
        }

        if (!data?.digest) {
          throw new Error("No markdown was generated.")
        }

        success()

        setMarkdown(data.digest)
        const id = await add(values.url, data.digest)
        toast.success("Markdown generated successfully.", {
          id: "generating",
        })

        await sleep()

        router.push(`/render/${id}`)
        pop()
        form.reset()
      } catch (err) {
        let message =
          err instanceof Error ? err.message : "Failed to generate markdown"

        // Strip or replace any references to Jina in error messages
        if (message.toLowerCase().includes("jina")) {
          message = message.replace(/Jina/gi, "Web service")
        }

        toast.error(message, {
          id: "generating",
          duration: Infinity,
          closeButton: true,
        })

        error()
        console.error(err)
      } finally {
        unsubscribe()
      }
    })
  }

  React.useEffect(() => {
    if (url !== preset) return setPreset(null)
  }, [url, preset])

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
        className="flex w-full flex-col items-center gap-2 sm:mb-10"
      >
        <FieldGroup>
          <Controller
            name="url"
            control={form.control}
            disabled={isPending}
            render={({ field, fieldState }) => {
              const Icon = resolveIcon(field.value ?? "")
              const submitVariant = isPending
                ? "outline"
                : field.value.length > 0
                  ? "default"
                  : "secondary"

              return (
                <Field data-invalid={fieldState.invalid} className="gap-3">
                  <Frame
                    variant="inverse"
                    className={cn(
                      "rounded-xl",
                      fieldState.invalid ? "glow-error" : "glow-pulse",
                      "has-[[data-slot=input-group-control]:focus-visible]:[--glow-opacity:0.1]"
                    )}
                  >
                    <InputGroup className="relative rounded-lg bg-card">
                      <span className="absolute top-3 left-4">
                        <Icon
                          className={cn(
                            "size-3.5 text-muted-foreground",
                            isPending && "animate-pulse"
                          )}
                        />
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
                                <DrawerContent
                                  className="p-4 pb-6"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <DrawerHeader className="px-0 pt-0 text-left">
                                    <DrawerTitle className="text-sm">
                                      Advanced Options
                                    </DrawerTitle>
                                  </DrawerHeader>
                                  <div className="mt-4">
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
                                  className="max-w-sm p-4"
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

        <div className="flex items-center gap-1 md:mt-4">
          {quickActions.map((action) => {
            const Icon = resolveIcon(action.url)

            return (
              <Button
                key={action.url}
                type="button"
                size={isMobile ? "xs" : "sm"}
                variant={preset === action.url ? "outline" : "secondary"}
                disabled={preset === action.url || isPending}
                onClick={() => selectPreset(action.url)}
              >
                <Icon className={isMobile ? "size-3" : "size-3.5"} />
                <span>{action.label}</span>
              </Button>
            )
          })}
        </div>
      </form>
    </MaxContainer>
  )
}
