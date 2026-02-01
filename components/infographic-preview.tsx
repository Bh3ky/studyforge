"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Share2, Edit } from "lucide-react"

interface InfographicPreviewProps {
  fileName: string
}

export function InfographicPreview({ fileName }: InfographicPreviewProps) {
  return (
    <Card className="overflow-hidden border-border">
      <div className="p-6 border-b border-border bg-secondary/20">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-1">{fileName}</h3>
            <p className="text-sm text-muted-foreground">Generated infographic ready for download</p>
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

      {/* Infographic Preview - Mock Design */}
      <div className="relative">
        <div className="aspect-[3/4] bg-gradient-to-br from-primary/5 via-accent/5 to-background p-8 md:p-12">
          {/* Title Section */}
          <div className="space-y-4 mb-8">
            <div className="inline-block px-4 py-2 bg-primary/20 rounded-lg">
              <span className="text-sm font-semibold text-primary">STUDY GUIDE</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">Cell Structure & Functions</h1>
            <div className="h-1 w-24 bg-primary rounded-full" />
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Cell Membrane */}
            <Card className="p-6 bg-card/80 backdrop-blur-sm border-primary/20">
              <div className="flex items-start gap-4">
                <div className="size-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Cell Membrane</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Controls what enters and exits the cell. Semi-permeable barrier made of lipids and proteins.
                  </p>
                </div>
              </div>
            </Card>

            {/* Nucleus */}
            <Card className="p-6 bg-card/80 backdrop-blur-sm border-accent/20">
              <div className="flex items-start gap-4">
                <div className="size-12 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold text-accent">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Nucleus</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Contains genetic material (DNA). Controls cell activities and reproduction.
                  </p>
                </div>
              </div>
            </Card>

            {/* Mitochondria */}
            <Card className="p-6 bg-card/80 backdrop-blur-sm border-primary/20">
              <div className="flex items-start gap-4">
                <div className="size-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Mitochondria</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Powerhouse of the cell. Produces energy through cellular respiration.
                  </p>
                </div>
              </div>
            </Card>

            {/* Cytoplasm */}
            <Card className="p-6 bg-card/80 backdrop-blur-sm border-accent/20">
              <div className="flex items-start gap-4">
                <div className="size-12 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold text-accent">4</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Cytoplasm</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Gel-like substance filling the cell. Contains organelles and supports cell structure.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Key Takeaway */}
          <Card className="p-6 bg-primary/10 border-primary/30">
            <div className="flex items-start gap-4">
              <div className="text-3xl">💡</div>
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-2">Key Takeaway</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Each cell component works together to maintain life processes. Understanding their individual
                  functions helps explain how living organisms survive and thrive.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Card>
  )
}
