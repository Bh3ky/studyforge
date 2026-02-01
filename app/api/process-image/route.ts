import { generateText } from "ai"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { fileName, imageData } = await request.json()

    // Use AI to extract text from handwritten notes and organize them
    const { text } = await generateText({
      model: "openai/gpt-4o-mini",
      prompt: `You are an educational assistant helping African students organize their handwritten notes.

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
}`,
    })

    return NextResponse.json({
      success: true,
      data: JSON.parse(text),
    })
  } catch (error) {
    console.error("[v0] Image processing error:", error)
    return NextResponse.json({ success: false, error: "Failed to process image" }, { status: 500 })
  }
}
