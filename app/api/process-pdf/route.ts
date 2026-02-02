import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { generateInfographicFromText } from "@/lib/ai/gemini"
import { extractTextFromPdf } from "@/lib/processors/pdf"
import { getSupabaseUserClient } from "@/lib/supabase/client"
import { requireUserId } from "@/lib/auth/require-user"

export const runtime = "nodejs"

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024
const MAX_SOURCE_CHARS = 12000

export async function POST(request: Request) {
  try {
    const { userId, getToken } = await auth()
    const requiredUserId = requireUserId(userId)
    const clerkToken = await getToken()
    if (!clerkToken) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }
    const formData = await request.formData()
    const file = formData.get("file")

    if (!(file instanceof File)) {
      return NextResponse.json({ success: false, error: "PDF file is required." }, { status: 400 })
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json({ success: false, error: "PDF exceeds 5MB limit." }, { status: 413 })
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json({ success: false, error: "Unsupported file type." }, { status: 415 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const extractedText = await extractTextFromPdf(buffer)
    const sourceText = extractedText.slice(0, MAX_SOURCE_CHARS)

    const data = await generateInfographicFromText(sourceText, file.name)

    let recordId: string | undefined
    let storageWarning: string | undefined

    try {
      const supabase = getSupabaseUserClient(clerkToken)
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
      const { data: record, error } = await supabase
        .from("processed_outputs")
        .insert({
          file_name: file.name,
          file_type: "pdf",
          status: "success",
          result: data,
          expires_at: expiresAt,
          user_id: requiredUserId,
        })
        .select("id")
        .single()

      if (error) {
        throw error
      }

      recordId = record?.id
    } catch (error) {
      console.error("[process-pdf] Supabase insert error:", error)
      storageWarning = "Processed output could not be stored."
    }

    return NextResponse.json({
      success: true,
      data,
      recordId,
      storageWarning,
    })
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }
    console.error("[process-pdf] Error:", error)
    return NextResponse.json({ success: false, error: "Failed to process PDF." }, { status: 500 })
  }
}
