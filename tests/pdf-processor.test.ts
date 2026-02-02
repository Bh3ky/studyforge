import { describe, it, expect, vi, beforeEach } from "vitest"
import pdfParse from "pdf-parse"
import { extractTextFromPdf } from "../lib/processors/pdf"

vi.mock("pdf-parse", () => ({
  default: vi.fn(),
}))

const pdfParseMock = pdfParse as unknown as ReturnType<typeof vi.fn>

describe("extractTextFromPdf", () => {
  beforeEach(() => {
    pdfParseMock.mockReset()
  })

  it("returns normalized text", async () => {
    pdfParseMock.mockResolvedValue({ text: "  Hello \n  world  " })
    const text = await extractTextFromPdf(Buffer.from("fake"))
    expect(text).toBe("Hello world")
  })

  it("throws when no text is extractable", async () => {
    pdfParseMock.mockResolvedValue({ text: "   " })
    await expect(extractTextFromPdf(Buffer.from("fake"))).rejects.toThrow("No extractable text")
  })
})
