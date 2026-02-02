import pdfParse from "pdf-parse"

export async function extractTextFromPdf(buffer: Buffer): Promise<string> {
  const data = await pdfParse(buffer)
  const text = data.text?.replace(/\s+/g, " ").trim() ?? ""

  if (!text) {
    throw new Error("No extractable text found in PDF.")
  }

  return text
}
