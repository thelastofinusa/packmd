"use client"
import React from "react"
import { PackmdSchemaType } from "@packmd/core"
import { Controller, UseFormReturn } from "react-hook-form"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@packmd/ui/components/field"
import { cn } from "@packmd/ui/lib/utils"
import { Badge } from "@packmd/ui/components/badge"
import { X } from "reicon-react"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@packmd/ui/components/input-group"
import { FaGithubAlt } from "react-icons/fa6"

export interface AdvancedOptionsProps {
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

export const AdvancedOptions: React.FC<AdvancedOptionsProps> = ({
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
}) => {
  return (
    <div className="flex flex-col gap-3">
      <Controller
        name="token"
        control={form.control}
        disabled={isPending}
        render={({ field }) => (
          <Field className="gap-0.5">
            <FieldLabel className="px-1 text-[13px]">
              GitHub Token (optional)
            </FieldLabel>
            <InputGroup className="rounded-[9px]! transition-none has-[[data-slot=input-group-control]:focus-visible]:ring-0 dark:bg-input/30">
              <InputGroupAddon>
                <FaGithubAlt className="mt-px size-3.5" />
              </InputGroupAddon>
              <InputGroupInput
                {...field}
                type="password"
                placeholder="github_pat_... or ghp_..."
                disabled={isPending}
                className="font-mono text-xs"
              />
            </InputGroup>
            <FieldDescription className="px-1 text-[13px]">
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
            <Field data-invalid={fieldState.invalid} className="gap-0.5">
              <FieldLabel className="px-1 text-[13px]">
                Max file size
              </FieldLabel>
              <InputGroup className="rounded-[9px]! transition-none has-[[data-slot=input-group-control]:focus-visible]:ring-0 dark:bg-input/30">
                <InputGroupAddon align="inline-end" className="text-[13px]">
                  KB
                </InputGroupAddon>
                <InputGroupInput
                  {...field}
                  value={field.value ?? ""}
                  type="number"
                  min={1}
                  aria-invalid={fieldState.invalid}
                  placeholder="500"
                  disabled={isPending}
                  className="font-mono text-xs"
                />
              </InputGroup>
              {fieldState.invalid && (
                <FieldError
                  className="px-1 text-[13px]"
                  errors={[fieldState.error]}
                />
              )}
            </Field>
          )}
        />
        <Controller
          name="maxFiles"
          control={form.control}
          disabled={isPending}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-0.5">
              <FieldLabel className="px-1 text-[13px]">
                Max total files
              </FieldLabel>
              <InputGroup className="rounded-[9px]! transition-none has-[[data-slot=input-group-control]:focus-visible]:ring-0 dark:bg-input/30">
                <InputGroupAddon align="inline-end" className="text-[13px]">
                  Files
                </InputGroupAddon>
                <InputGroupInput
                  {...field}
                  value={field.value ?? ""}
                  type="number"
                  min={1}
                  aria-invalid={fieldState.invalid}
                  placeholder="500"
                  disabled={isPending}
                  className="font-mono text-xs"
                />
              </InputGroup>
              {fieldState.invalid && (
                <FieldError
                  className="px-1 text-[13px]"
                  errors={[fieldState.error]}
                />
              )}
            </Field>
          )}
        />
      </div>

      <Field className="gap-0.5">
        <FieldLabel className="px-1 text-[13px]">Include patterns</FieldLabel>
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

      <Field className="gap-0.5">
        <FieldLabel className="px-1 text-[13px]">Exclude patterns</FieldLabel>
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
