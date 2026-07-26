import * as z from "zod"

const normalizeUrl = (value: string) => {
  const trimmed = value.trim()
  if (!/^https?:\/\//i.test(trimmed)) {
    return `https://${trimmed}`
  }
  return trimmed
}

/**
 * Accepts strings or numbers from form inputs, allows empty/undefined values,
 * validates positive numbers >= 1, and transforms valid values into actual `number` types.
 */
const optionalNumericString = z
  .union([z.string(), z.number()])
  .optional()
  .refine(
    (val) => {
      if (val === undefined || val === null || val === "") return true
      const num = Number(val)
      return !isNaN(num) && num >= 1
    },
    { message: "Must be a valid number (at least 1)" }
  )

export const packmdSchema = z.object({
  url: z
    .url("Please enter a valid GitHub repository or website URL.")
    .min(1, "Please enter a valid GitHub repository or website URL.")
    .transform(normalizeUrl)
    .pipe(z.url("Please enter a valid GitHub repository or website URL.")),
  maxFileSizeKB: optionalNumericString,
  maxFiles: optionalNumericString,
  token: z.string().optional(),
  includeGlobs: z.array(z.string()),
  excludeGlobs: z.array(z.string()),
})

export type PackmdSchemaType = z.infer<typeof packmdSchema>
