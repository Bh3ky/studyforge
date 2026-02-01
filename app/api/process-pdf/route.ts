import { generateText } from "ai"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { fileName, content } = await request.json()

    // Use AI to analyze PDF content and generate structured infographic data
    const { text } = await generateText({
      model: "openai/gpt-4o-mini",
      prompt: `You are an educational content specialist creating study materials for African students. 
      
Analyze the following PDF content and create a structured infographic outline with:
1. A clear, engaging title
2. 4-6 key concepts with explanations (keep it simple and visual)
3. One key takeaway or summary

Content: ${content || fileName}

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
}`,
    })

    return NextResponse.json({
      success: true,
      data: JSON.parse(text),
    })
  } catch (error) {
    console.error("[v0] PDF processing error:", error)
    return NextResponse.json({ success: false, error: "Failed to process PDF" }, { status: 500 })
  }
}
