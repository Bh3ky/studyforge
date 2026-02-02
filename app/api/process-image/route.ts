import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { generateNotesFromImage } from "@/lib/ai/gemini"
import { getSupabaseUserClient } from "@/lib/supabase/client"
import { requireUserId } from "@/lib/auth/require-user"

export const runtime = "nodejs"

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024

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
      return NextResponse.json({ success: false, error: "Image file is required." }, { status: 400 })
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json({ success: false, error: "Image exceeds 5MB limit." }, { status: 413 })
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ success: false, error: "Unsupported file type." }, { status: 415 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const base64 = buffer.toString("base64")
    const mimeType = file.type || "image/png"

    const data = await generateNotesFromImage(base64, mimeType, file.name)

    let recordId: string | undefined
    let storageWarning: string | undefined

    try {
      const supabase = getSupabaseUserClient(clerkToken)
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
      const { data: record, error } = await supabase
        .from("processed_outputs")
        .insert({
          file_name: file.name,
          file_type: "image",
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
      console.error("[process-image] Supabase insert error:", error)
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
    console.error("[process-image] Error:", error)
    return NextResponse.json({ success: false, error: "Failed to process image." }, { status: 500 })
  }
}
