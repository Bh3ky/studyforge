import { FileUpload } from "@/components/file-upload"
import { RecentProjects } from "@/components/recent-projects"
import { Sparkles } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="size-8 bg-primary rounded flex items-center justify-center">
              <Sparkles className="size-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground tracking-tight">StudyForge</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Welcome Section */}
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-foreground">Welcome Back</h1>
            <p className="text-lg text-muted-foreground">Transform your study materials into visual learning tools</p>
          </div>

          {/* Upload Section */}
          <FileUpload />

          {/* Recent Projects */}
          <RecentProjects />
        </div>
      </main>
    </div>
  )
}
