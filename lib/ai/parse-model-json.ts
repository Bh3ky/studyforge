import { z } from "zod"

export function parseModelJson<T>(rawText: string, schema: z.ZodSchema<T>): T {
  const firstBrace = rawText.indexOf("{")
  const lastBrace = rawText.lastIndexOf("}")

  if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
    throw new Error("Model output did not include a JSON object.")
  }

  const jsonText = rawText.slice(firstBrace, lastBrace + 1)
  let parsed: unknown

  try {
    parsed = JSON.parse(jsonText)
  } catch (error) {
    throw new Error("Failed to parse JSON from model output.")
  }

  const result = schema.safeParse(parsed)
  if (!result.success) {
    throw new Error("Model output failed validation.")
  }

  return result.data
}
