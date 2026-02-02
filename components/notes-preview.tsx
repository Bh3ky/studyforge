"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Share2, Edit } from "lucide-react"
import type { NotesData } from "@/lib/schemas/processing"

interface NotesPreviewProps {
  fileName: string
  data: NotesData
}

export function NotesPreview({ fileName, data }: NotesPreviewProps) {
  return (
    <Card className="overflow-hidden border-border">
      <div className="p-6 border-b border-border bg-secondary/20">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-1">{fileName}</h3>
            <p className="text-sm text-muted-foreground">Digitized and organized notes</p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              <Edit className="size-4 mr-1" />
              Edit
            </Button>
            <Button size="sm" variant="outline">
              <Share2 className="size-4 mr-1" />
              Share
            </Button>
            <Button size="sm">
              <Download className="size-4 mr-1" />
              Download
            </Button>
          </div>
        </div>
      </div>

      {/* Notes Preview - Mock Design */}
      <div className="p-8 md:p-12 bg-card space-y-8">
        {/* Title */}
        <div className="space-y-2">
          <div className="inline-block px-3 py-1 bg-accent/20 rounded text-xs font-semibold text-accent">
            {data.subject.toUpperCase()}
          </div>
          <h2 className="text-3xl font-bold text-foreground">{data.title}</h2>
          <p className="text-sm text-muted-foreground">Extracted from handwritten notes</p>
        </div>

        {data.sections.map((section, index) => {
          const isPrimary = index % 2 === 0
          return (
            <div key={`${section.number}-${section.heading}`} className="space-y-4">
              <div className="flex items-center gap-3">
                <div
                  className={`size-8 rounded flex items-center justify-center ${
                    isPrimary ? "bg-primary/20" : "bg-accent/20"
                  }`}
                >
                  <span className={`text-sm font-bold ${isPrimary ? "text-primary" : "text-accent"}`}>
                    {section.number}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-foreground">{section.heading}</h3>
              </div>

              <Card className="p-6 bg-secondary/50 border-border space-y-4">
                {section.content.map((content, contentIndex) => (
                  <div key={`${content.heading}-${contentIndex}`} className="space-y-2">
                    <h4 className="text-sm font-semibold text-foreground">{content.heading}:</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{content.text}</p>
                    {content.items && content.items.length > 0 && (
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {content.items.map((item, itemIndex) => (
                          <li key={`${item}-${itemIndex}`} className="flex items-start gap-2">
                            <span className={`${isPrimary ? "text-primary" : "text-accent"} mt-1`}>•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </Card>
            </div>
          )
        })}

        {/* Practice Problems */}
        <Card className="p-6 bg-primary/5 border-primary/20">
          <h4 className="text-sm font-semibold text-foreground mb-4">Practice Problems:</h4>
          <div className="space-y-3 text-sm text-muted-foreground">
            {data.practiceProblems.map((problem, index) => (
              <div key={`${problem}-${index}`} className="flex items-start gap-2">
                <span className="text-primary font-semibold">{index + 1}.</span>
                <span>{problem}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Card>
  )
}
