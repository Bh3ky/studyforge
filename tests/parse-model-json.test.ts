import { describe, it, expect } from "vitest"
import { parseModelJson } from "../lib/ai/parse-model-json"
import { infographicSchema, notesSchema } from "../lib/schemas/processing"

describe("parseModelJson", () => {
  it("parses JSON with surrounding text", () => {
    const rawText = `Here is your output:
{
  "title": "Photosynthesis",
  "concepts": [
    { "number": "1", "heading": "Light Energy", "description": "Sunlight powers the process." }
  ],
  "keyTakeaway": "Plants convert light into energy."
}
Thanks!`

    const data = parseModelJson(rawText, infographicSchema)
    expect(data.title).toBe("Photosynthesis")
    expect(data.concepts[0].number).toBe(1)
  })

  it("throws on invalid JSON", () => {
    const rawText = "Not JSON at all"
    expect(() => parseModelJson(rawText, infographicSchema)).toThrow()
  })

  it("throws when schema validation fails", () => {
    const rawText = `{
      "title": "Missing concepts",
      "concepts": [],
      "keyTakeaway": "Key idea"
    }`
    expect(() => parseModelJson(rawText, infographicSchema)).toThrow()
  })

  it("handles notes schema", () => {
    const rawText = `{
      "subject": "Biology",
      "title": "Cells",
      "sections":
        {
          "number": "1",
          "heading": "Basics",
          "content": { "type": "definition", "heading": "Cell", "text": "Smallest unit of life." }
        },
      "practiceProblems": "Define a cell"
    }`
    const data = parseModelJson(rawText, notesSchema)
    expect(data.subject).toBe("Biology")
    expect(data.sections[0].content[0].type).toBe("definition")
  })
})
