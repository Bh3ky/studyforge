import { GoogleGenerativeAI } from "@google/generative-ai"
import { infographicSchema, notesSchema, type InfographicData, type NotesData } from "@/lib/schemas/processing"
import { parseModelJson } from "@/lib/ai/parse-model-json"

const DEFAULT_TEXT_MODEL = "gemini-flash-latest"

function getTextModelName() {
  return process.env.GEMINI_TEXT_MODEL ?? DEFAULT_TEXT_MODEL
}

function getVisionModelName() {
  return process.env.GEMINI_VISION_MODEL ?? getTextModelName()
}

function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set.")
  }
  return new GoogleGenerativeAI(apiKey)
}

export async function generateInfographicFromText(
  sourceText: string,
  fileName: string,
): Promise<InfographicData> {
  const genAI = getGeminiClient()
  const model = genAI.getGenerativeModel({ model: getTextModelName() })

  const prompt = `You are an educational content specialist creating study materials for African students.

Analyze the following PDF content and create a structured infographic outline with:
1. A clear, engaging title
2. 4-6 key concepts with explanations (keep it simple and visual)
3. One key takeaway or summary

Content: ${sourceText || fileName}

Format your response as JSON with this structure:
{
  "title": "Main Topic",
  "concepts": [
    {
      "number": 1,
      "heading": "Concept Name",
      "description": "Brief explanation"
    }
  ],
  "keyTakeaway": "Main lesson to remember"
}

Return ONLY valid JSON. Do not wrap in markdown or code fences.`

  const result = await model.generateContent(prompt)
  const text = result.response.text()
  return parseModelJson(text, infographicSchema)
}

export async function generateNotesFromImage(
  imageBase64: string,
  mimeType: string,
  fileName: string,
): Promise<NotesData> {
  const genAI = getGeminiClient()
  const model = genAI.getGenerativeModel({ model: getVisionModelName() })

  const prompt = `You are an educational assistant helping African students organize their handwritten notes.

Based on the image file name "${fileName}", create well-structured, organized study notes with:
1. A subject category (e.g., Mathematics, Biology, History)
2. A descriptive title
3. 2-3 main sections with content
4. 3 practice problems or key points to remember

Format your response as JSON with this structure:
{
  "subject": "Subject Name",
  "title": "Topic Title",
  "sections": [
    {
      "number": 1,
      "heading": "Section Name",
      "content": [
        {
          "type": "definition" | "formula" | "example" | "keypoint",
          "heading": "Subheading",
          "text": "Content text",
          "items": ["list item 1", "list item 2"] // optional for lists
        }
      ]
    }
  ],
  "practiceProblems": ["Problem 1", "Problem 2", "Problem 3"]
}

Return ONLY valid JSON. Do not wrap in markdown or code fences.`

  const result = await model.generateContent([
    prompt,
    {
      inlineData: {
        data: imageBase64,
        mimeType,
      },
    },
  ])

  const text = result.response.text()
  return parseModelJson(text, notesSchema)
}
