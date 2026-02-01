"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProcessingAnimation } from "@/components/processing-animation"
import { InfographicPreview } from "@/components/infographic-preview"
import { NotesPreview } from "@/components/notes-preview"
import { Sparkles, ArrowLeft, Download } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface FileData {
  name: string
  type: "pdf" | "image"
  size: number
}

export default function ProcessPage() {
  const router = useRouter()
  const [files, setFiles] = useState<FileData[]>([])
  const [isProcessing, setIsProcessing] = useState(true)
  const [currentTab, setCurrentTab] = useState("infographic")

  useEffect(() => {
    const storedFiles = sessionStorage.getItem("processingFiles")
    if (storedFiles) {
      setFiles(JSON.parse(storedFiles))
      // Simulate processing time
      setTimeout(() => setIsProcessing(false), 3000)
    } else {
      router.push("/dashboard")
    }
  }, [router])

  const pdfFiles = files.filter((f) => f.type === "pdf")
  const imageFiles = files.filter((f) => f.type === "image")

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="size-8 bg-primary rounded flex items-center justify-center">
              <Sparkles className="size-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground tracking-tight">StudyForge</span>
          </Link>
          <Button variant="ghost" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="size-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {isProcessing ? (
            <ProcessingAnimation files={files} />
          ) : (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-foreground">Your Study Materials</h1>
                  <p className="text-muted-foreground">AI-powered transformation complete</p>
                </div>
                <Button size="lg">
                  <Download className="size-4 mr-2" />
                  Download All
                </Button>
              </div>

              <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
                <TabsList className="grid w-full max-w-md grid-cols-2">
                  <TabsTrigger value="infographic" disabled={pdfFiles.length === 0}>
                    Infographics ({pdfFiles.length})
                  </TabsTrigger>
                  <TabsTrigger value="notes" disabled={imageFiles.length === 0}>
                    Notes ({imageFiles.length})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="infographic" className="space-y-6 mt-6">
                  {pdfFiles.map((file, index) => (
                    <InfographicPreview key={index} fileName={file.name} />
                  ))}
                </TabsContent>

                <TabsContent value="notes" className="space-y-6 mt-6">
                  {imageFiles.map((file, index) => (
                    <NotesPreview key={index} fileName={file.name} />
                  ))}
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
