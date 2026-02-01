import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, ImageIcon, Download, Eye } from "lucide-react"

const mockProjects = [
  {
    id: 1,
    name: "Biology Chapter 5 Summary",
    type: "pdf",
    date: "2 hours ago",
    thumbnail: "/biology-infographic-cells.jpg",
  },
  {
    id: 2,
    name: "Math Notes - Calculus",
    type: "image",
    date: "1 day ago",
    thumbnail: "/math-calculus-notes.jpg",
  },
  {
    id: 3,
    name: "History Timeline Infographic",
    type: "pdf",
    date: "3 days ago",
    thumbnail: "/history-timeline.png",
  },
]

export function RecentProjects() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Recent Projects</h2>
          <p className="text-muted-foreground">Your latest study materials</p>
        </div>
        <Button variant="outline">View All</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockProjects.map((project) => (
          <Card key={project.id} className="overflow-hidden border-border hover:border-primary/50 transition-all group">
            <div className="aspect-video bg-secondary relative overflow-hidden">
              <img
                src={project.thumbnail || "/placeholder.svg"}
                alt={project.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4 gap-2">
                <Button size="sm" variant="secondary">
                  <Eye className="size-4 mr-1" />
                  View
                </Button>
                <Button size="sm" variant="secondary">
                  <Download className="size-4 mr-1" />
                  Download
                </Button>
              </div>
            </div>

            <div className="p-4 space-y-3">
              <div className="flex items-start gap-3">
                <div className="size-10 rounded bg-primary/10 flex items-center justify-center flex-shrink-0">
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
    </div>
  )
}
