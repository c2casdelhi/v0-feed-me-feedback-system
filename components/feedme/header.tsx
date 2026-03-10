"use client"

import { Utensils } from "lucide-react"

export function Header() {
  return (
    <header className="border-b border-border bg-card">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <Utensils className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-foreground">FeedMe</h1>
            <p className="text-xs text-muted-foreground">Internal Feedback Platform</p>
          </div>
        </div>
        <nav className="flex items-center gap-6">
          <a href="#feedback" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Submit Feedback
          </a>
          <a href="#recent" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Recent Feedback
          </a>
        </nav>
      </div>
    </header>
  )
}
