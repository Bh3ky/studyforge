import { z } from "zod"

const asArray = <T>(schema: z.ZodType<T>, minLength = 0) =>
  z.preprocess(
    (value) => {
      if (Array.isArray(value)) {
        return value
      }
      if (value === null || value === undefined) {
        return value
      }
      return [value]
    },
    z.array(schema).min(minLength),
  )

export const infographicSchema = z.object({
  title: z.string().min(1),
  concepts: asArray(
    z.object({
      number: z.coerce.number().int().positive(),
      heading: z.string().min(1),
      description: z.string().min(1),
    }),
    1,
  ),
  keyTakeaway: z.string().min(1),
})

export type InfographicData = z.infer<typeof infographicSchema>

export const notesSchema = z.object({
  subject: z.string().min(1),
  title: z.string().min(1),
  sections: asArray(
    z.object({
      number: z.coerce.number().int().positive(),
      heading: z.string().min(1),
      content: asArray(
        z.object({
          type: z.enum(["definition", "formula", "example", "keypoint"]),
          heading: z.string().min(1),
          text: z.string().min(1),
          items: z.array(z.string().min(1)).optional(),
        }),
        1,
      ),
    }),
    1,
  ),
  practiceProblems: asArray(z.string().min(1), 1),
})

export type NotesData = z.infer<typeof notesSchema>
