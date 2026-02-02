"use client"

import { Card } from "@/components/ui/card"
import { Loader2, FileText, ImageIcon, Sparkles } from "lucide-react"

interface FileData {
  name: string
  type: "pdf" | "image"
}

interface ProcessingAnimationProps {
  files: FileData[]
}

export function ProcessingAnimation({ files }: ProcessingAnimationProps) {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="size-24 rounded-full bg-primary/10 flex items-center justify-center relative">
            <Sparkles className="size-12 text-primary animate-pulse" />
            <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-foreground">Processing Your Files</h2>
        <p className="text-lg text-muted-foreground">AI is analyzing and transforming your content...</p>
      </div>

      <Card className="p-8 bg-card border-border">
        <div className="space-y-4">
          {files.map((file, index) => (
            <div key={index} className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50">
              <div className="size-10 rounded bg-primary/10 flex items-center justify-center flex-shrink-0">
                {file.type === "pdf" ? (
                  <FileText className="size-5 text-primary" />
                ) : (
                  <ImageIcon className="size-5 text-accent" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {file.type === "pdf" ? "Generating infographic..." : "Extracting text..."}
                </p>
              </div>
              <Loader2 className="size-5 text-primary animate-spin" />
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Analyzing Content", percent: 100 },
          { label: "Extracting Key Points", percent: 67 },
          { label: "Creating Visuals", percent: 34 },
        ].map((step, index) => (
          <Card key={index} className="p-6 bg-card border-border">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">{step.label}</span>
                <span className="text-xs text-muted-foreground">{step.percent}%</span>
              </div>
              <div className="h-2 rounded-full bg-secondary overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-1000 ease-out"
                  style={{ width: `${step.percent}%` }}
                />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
