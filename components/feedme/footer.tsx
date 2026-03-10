import { Utensils } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card py-8">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Utensils className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground">FeedMe</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Internal feedback platform. Your opinions help us improve.
          </p>
        </div>
      </div>
    </footer>
  )
}
