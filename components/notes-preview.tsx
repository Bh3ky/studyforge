"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Share2, Edit } from "lucide-react"

interface NotesPreviewProps {
  fileName: string
}

export function NotesPreview({ fileName }: NotesPreviewProps) {
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
            MATHEMATICS
          </div>
          <h2 className="text-3xl font-bold text-foreground">Calculus Fundamentals</h2>
          <p className="text-sm text-muted-foreground">Extracted from handwritten notes</p>
        </div>

        {/* Section: Derivatives */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="size-8 rounded bg-primary/20 flex items-center justify-center">
              <span className="text-sm font-bold text-primary">1</span>
            </div>
            <h3 className="text-xl font-semibold text-foreground">Derivatives</h3>
          </div>

          <Card className="p-6 bg-secondary/50 border-border space-y-4">
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-foreground">Definition:</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The derivative of a function represents the rate of change at any given point. It's the slope of the
                tangent line to the curve.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-foreground">Power Rule:</h4>
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                <p className="text-center font-mono text-lg text-foreground">d/dx(x^n) = nx^(n-1)</p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-foreground">Example:</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>If f(x) = x³, then f'(x) = 3x²</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>If f(x) = 5x⁴, then f'(x) = 20x³</span>
                </li>
              </ul>
            </div>
          </Card>
        </div>

        {/* Section: Integration */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="size-8 rounded bg-accent/20 flex items-center justify-center">
              <span className="text-sm font-bold text-accent">2</span>
            </div>
            <h3 className="text-xl font-semibold text-foreground">Integration</h3>
          </div>

          <Card className="p-6 bg-secondary/50 border-border space-y-4">
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-foreground">Definition:</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Integration is the reverse of differentiation. It finds the area under a curve or the antiderivative of
                a function.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-foreground">Basic Rule:</h4>
              <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
                <p className="text-center font-mono text-lg text-foreground">∫x^n dx = (x^(n+1))/(n+1) + C</p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-foreground">Key Points:</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span>Always add constant C for indefinite integrals</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span>Definite integrals have upper and lower bounds</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span>Area under curve = ∫[a to b] f(x) dx</span>
                </li>
              </ul>
            </div>
          </Card>
        </div>

        {/* Practice Problems */}
        <Card className="p-6 bg-primary/5 border-primary/20">
          <h4 className="text-sm font-semibold text-foreground mb-4">Practice Problems:</h4>
          <div className="space-y-3 text-sm text-muted-foreground">
            <div className="flex items-start gap-2">
              <span className="text-primary font-semibold">1.</span>
              <span>Find the derivative of f(x) = 7x⁵ - 3x² + 2x</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-primary font-semibold">2.</span>
              <span>Calculate ∫(4x³ + 2x) dx</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-primary font-semibold">3.</span>
              <span>Find the area under y = x² from x = 0 to x = 3</span>
            </div>
          </div>
        </Card>
      </div>
    </Card>
  )
}
