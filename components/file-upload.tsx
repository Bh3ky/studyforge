"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, ImageIcon, Upload, X } from "lucide-react"
import { useRouter } from "next/navigation"

type FileType = "pdf" | "image"

interface UploadedFile {
  file: File
  type: FileType
  preview?: string
}

export function FileUpload() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const router = useRouter()

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const processFiles = useCallback((files: FileList | null) => {
    if (!files) return

    const newFiles: UploadedFile[] = []

    Array.from(files).forEach((file) => {
      if (file.type === "application/pdf") {
        newFiles.push({ file, type: "pdf" })
      } else if (file.type.startsWith("image/")) {
        const preview = URL.createObjectURL(file)
        newFiles.push({ file, type: "image", preview })
      }
    })

    setUploadedFiles((prev) => [...prev, ...newFiles])
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      processFiles(e.dataTransfer.files)
    },
    [processFiles],
  )

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      processFiles(e.target.files)
    },
    [processFiles],
  )

  const removeFile = useCallback((index: number) => {
    setUploadedFiles((prev) => {
      const newFiles = [...prev]
      if (newFiles[index].preview) {
        URL.revokeObjectURL(newFiles[index].preview!)
      }
      newFiles.splice(index, 1)
      return newFiles
    })
  }, [])

  const handleProcess = useCallback(async () => {
    if (uploadedFiles.length === 0) return

    setIsProcessing(true)

    const processedData = await Promise.all(
      uploadedFiles.map(async (uf) => {
        try {
          const endpoint = uf.type === "pdf" ? "/api/process-pdf" : "/api/process-image"

          const response = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              fileName: uf.file.name,
              content: uf.type === "pdf" ? "PDF content extracted here" : undefined,
              imageData: uf.type === "image" ? uf.preview : undefined,
            }),
          })

          const result = await response.json()
          return {
            name: uf.file.name,
            type: uf.type,
            data: result.data,
          }
        } catch (error) {
          console.error("[v0] Processing error:", error)
          return {
            name: uf.file.name,
            type: uf.type,
            error: "Failed to process",
          }
        }
      }),
    )

    sessionStorage.setItem("processedFiles", JSON.stringify(processedData))

    setIsProcessing(false)
    router.push("/process")
  }, [uploadedFiles, router])

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <Card
        className={`relative overflow-hidden border-2 border-dashed transition-all ${
          isDragging ? "border-primary bg-primary/5 scale-[1.02]" : "border-border hover:border-primary/50"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="p-12 text-center space-y-6">
          <div className="flex justify-center">
            <div className="size-20 rounded-full bg-primary/10 flex items-center justify-center">
              <Upload className="size-10 text-primary" />
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-semibold text-foreground">Drop your files here</h3>
            <p className="text-muted-foreground">or click to browse from your device</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="outline"
              className="relative bg-transparent"
              onClick={() => document.getElementById("pdf-input")?.click()}
            >
              <FileText className="size-4 mr-2" />
              Upload PDF
              <input
                id="pdf-input"
                type="file"
                accept=".pdf"
                multiple
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={handleFileInput}
              />
            </Button>

            <Button
              variant="outline"
              className="relative bg-transparent"
              onClick={() => document.getElementById("image-input")?.click()}
            >
              <ImageIcon className="size-4 mr-2" />
              Upload Images
              <input
                id="image-input"
                type="file"
                accept="image/*"
                multiple
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={handleFileInput}
              />
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">Supports PDF, PNG, JPG, JPEG • Max 10MB per file</p>
        </div>
      </Card>

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">Uploaded Files ({uploadedFiles.length})</h3>
            <Button onClick={handleProcess} disabled={isProcessing}>
              {isProcessing ? "Processing..." : "Process Files"}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {uploadedFiles.map((uploadedFile, index) => (
              <Card key={index} className="p-4 bg-card border-border relative group">
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute top-2 right-2 size-8 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeFile(index)}
                >
                  <X className="size-4" />
                </Button>

                {uploadedFile.type === "pdf" ? (
                  <div className="flex items-start gap-3">
                    <div className="size-12 rounded bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <FileText className="size-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{uploadedFile.file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(uploadedFile.file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="aspect-video rounded overflow-hidden bg-secondary">
                      {uploadedFile.preview && (
                        <img
                          src={uploadedFile.preview || "/placeholder.svg"}
                          alt={uploadedFile.file.name}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground truncate">{uploadedFile.file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(uploadedFile.file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
