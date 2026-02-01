import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { FileText, ImageIcon, Sparkles, Globe, Zap, BookOpen } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-8 bg-primary rounded flex items-center justify-center">
              <Sparkles className="size-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground tracking-tight">StudyForge</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              How It Works
            </Link>
            <Link href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
          </nav>
          <Button asChild>
            <Link href="/dashboard">Get Started</Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border">
            <Globe className="size-4 text-primary" />
            <span className="text-sm text-foreground">Built for African Students</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight text-balance">
            Learn Smarter, <span className="text-primary">Not Harder</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
            Transform your PDFs into stunning infographics and convert handwritten notes into organized study materials
            with AI-powered tools.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button asChild size="lg" className="text-base px-8 py-6">
              <Link href="/dashboard">Start Creating Free</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-base px-8 py-6 bg-transparent">
              <Link href="#how-it-works">See How It Works</Link>
            </Button>
          </div>

          {/* Retro Grid Background Effect */}
          <div className="relative mt-16 rounded-lg overflow-hidden border-2 border-primary/20 bg-card">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,oklch(0.28_0.02_65)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.28_0.02_65)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
            <div className="relative p-8 md:p-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6 bg-secondary/50 border-border">
                  <FileText className="size-8 text-primary mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">PDF to Infographic</h3>
                  <p className="text-sm text-muted-foreground">Turn dense textbooks into visual learning materials</p>
                </Card>
                <Card className="p-6 bg-secondary/50 border-border">
                  <ImageIcon className="size-8 text-accent mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Image to Notes</h3>
                  <p className="text-sm text-muted-foreground">Convert handwritten notes into digital study guides</p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Powerful Tools for <span className="text-primary">Better Learning</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to ace your exams and retain information effectively
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-8 bg-card border-border hover:border-primary/50 transition-colors">
              <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <Sparkles className="size-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">AI-Powered Processing</h3>
              <p className="text-muted-foreground leading-relaxed">
                Advanced AI understands your content and creates meaningful visual representations tailored to your
                learning style.
              </p>
            </Card>

            <Card className="p-8 bg-card border-border hover:border-primary/50 transition-colors">
              <div className="size-12 rounded-lg bg-accent/10 flex items-center justify-center mb-6">
                <Zap className="size-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Lightning Fast</h3>
              <p className="text-muted-foreground leading-relaxed">
                Process documents in seconds, not hours. Get back to studying what matters most without technical
                delays.
              </p>
            </Card>

            <Card className="p-8 bg-card border-border hover:border-primary/50 transition-colors">
              <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <BookOpen className="size-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Study Anywhere</h3>
              <p className="text-muted-foreground leading-relaxed">
                Works on any device with internet. Perfect for students with limited data - optimized for African
                connectivity.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="container mx-auto px-4 py-20 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Simple <span className="text-primary">Three-Step</span> Process
            </h2>
            <p className="text-lg text-muted-foreground">From upload to study-ready in minutes</p>
          </div>

          <div className="space-y-8">
            {[
              {
                step: "01",
                title: "Upload Your Content",
                description: "Drag and drop PDFs, images of notes, or textbook pages. We support all common formats.",
              },
              {
                step: "02",
                title: "AI Does the Magic",
                description:
                  "Our AI analyzes your content, identifies key concepts, and structures information visually.",
              },
              {
                step: "03",
                title: "Download & Study",
                description: "Get beautiful infographics and organized notes ready for studying, printing, or sharing.",
              },
            ].map((item) => (
              <Card key={item.step} className="p-8 bg-card border-border">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="text-6xl font-bold text-primary/20 select-none">{item.step}</div>
                  <div className="flex-1 space-y-2">
                    <h3 className="text-2xl font-semibold text-foreground">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 border-t border-border">
        <Card className="max-w-4xl mx-auto p-12 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
          <div className="text-center space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
              Ready to Transform Your Learning?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Join thousands of African students already using StudyForge to ace their exams
            </p>
            <Button asChild size="lg" className="text-base px-8 py-6">
              <Link href="/dashboard">Get Started Now - It's Free</Link>
            </Button>
          </div>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="size-8 bg-primary rounded flex items-center justify-center">
                  <Sparkles className="size-5 text-primary-foreground" />
                </div>
                <span className="text-lg font-bold text-foreground">StudyForge</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Empowering African students with AI-powered learning tools.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#features" className="hover:text-foreground transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#how-it-works" className="hover:text-foreground transition-colors">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-foreground transition-colors">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/docs" className="hover:text-foreground transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-foreground transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="hover:text-foreground transition-colors">
                    Support
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/privacy" className="hover:text-foreground transition-colors">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-foreground transition-colors">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>© 2025 StudyForge. Built with ❤️ for African students.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
