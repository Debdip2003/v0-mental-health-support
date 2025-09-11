import { ResourceHub } from "@/components/resource-hub"

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-serif font-bold text-foreground">Mental Health Resources</h1>
          <p className="text-muted-foreground mt-2">
            Curated guides, articles, and audio content to support your mental wellness journey
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <ResourceHub />
      </main>
    </div>
  )
}
