"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, ImageIcon, Download, Eye } from "lucide-react"
import Link from "next/link"
import { buildRecentProjects, type RecentProject } from "@/lib/recent-projects"

export function RecentProjects() {
  const [projects, setProjects] = useState<RecentProject[]>([])

  useEffect(() => {
    const storedFiles = sessionStorage.getItem("processedFiles")
    if (!storedFiles) {
      return
    }

    try {
      const parsed = JSON.parse(storedFiles)
      if (Array.isArray(parsed)) {
        setProjects(buildRecentProjects(parsed))
      }
    } catch (error) {
      console.error("[recent-projects] Failed to parse stored files:", error)
    }
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Recent Projects</h2>
          <p className="text-muted-foreground">Your latest study materials</p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/process">View All</Link>
        </Button>
      </div>

      {projects.length === 0 ? (
        <Card className="p-8 bg-card border-border">
          <p className="text-sm text-muted-foreground">
            No recent projects yet. Upload a file to generate your first study material.
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="overflow-hidden border-border hover:border-primary/50 transition-all group">
              <div className="aspect-video bg-secondary relative overflow-hidden">
                <img
                  src={project.thumbnail || "/placeholder.svg"}
                  alt={project.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-linear-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4 gap-2">
                  <Button size="sm" variant="secondary" asChild>
                    <Link href="/process">
                      <Eye className="size-4 mr-1" />
                      View
                    </Link>
                  </Button>
                  <Button size="sm" variant="secondary" disabled>
                    <Download className="size-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>

              <div className="p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="size-10 rounded bg-primary/10 flex items-center justify-center shrink-0">
                    {project.type === "pdf" ? (
                      <FileText className="size-5 text-primary" />
                    ) : (
                      <ImageIcon className="size-5 text-accent" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-foreground truncate">{project.name}</h3>
                    <p className="text-xs text-muted-foreground">{project.date}</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
