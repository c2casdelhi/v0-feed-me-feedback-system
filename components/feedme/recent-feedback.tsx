"use client"

import useSWR from "swr"
import { Users, ShoppingBag, MapPin, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type Feedback = {
  id: string
  feedback_type: "meeting" | "order" | "tour"
  reference_id: string
  rating: number
  title: string
  description: string
  submitter_name: string | null
  created_at: string
}

const fetcher = (url: string) => fetch(url).then(res => res.json())

const typeConfig = {
  meeting: { icon: Users, label: "Meeting", color: "bg-primary/10 text-primary" },
  order: { icon: ShoppingBag, label: "Order", color: "bg-accent/20 text-accent" },
  tour: { icon: MapPin, label: "Tour", color: "bg-primary/10 text-primary" },
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            "h-4 w-4",
            rating >= star ? "fill-primary text-primary" : "text-muted-foreground/30"
          )}
        />
      ))}
    </div>
  )
}

function FeedbackCard({ feedback }: { feedback: Feedback }) {
  const config = typeConfig[feedback.feedback_type]
  const Icon = config.icon
  const date = new Date(feedback.created_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })

  return (
    <div className="rounded-xl border border-border bg-card p-5 transition-shadow hover:shadow-md">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className={cn("flex h-9 w-9 items-center justify-center rounded-lg", config.color)}>
            <Icon className="h-4 w-4" />
          </div>
          <div>
            <Badge variant="secondary" className="mb-1">
              {config.label}
            </Badge>
            <p className="text-xs text-muted-foreground">Ref: {feedback.reference_id}</p>
          </div>
        </div>
        <StarRating rating={feedback.rating} />
      </div>
      
      <h4 className="mb-2 font-semibold text-foreground">{feedback.title}</h4>
      <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">{feedback.description}</p>
      
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{feedback.submitter_name || "Anonymous"}</span>
        <span>{date}</span>
      </div>
    </div>
  )
}

export function RecentFeedback() {
  const { data, error, isLoading } = useSWR<{ feedback: Feedback[] }>("/api/feedback", fetcher, {
    refreshInterval: 10000,
  })

  return (
    <section id="recent" className="bg-muted/30 py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-2xl font-bold text-foreground">Recent Feedback</h2>
          <p className="text-muted-foreground">See what others are saying</p>
        </div>

        {isLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-48 animate-pulse rounded-xl bg-card" />
            ))}
          </div>
        ) : error ? (
          <div className="rounded-xl border border-border bg-card p-8 text-center">
            <p className="text-muted-foreground">Unable to load recent feedback</p>
          </div>
        ) : data?.feedback && data.feedback.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.feedback.map((item) => (
              <FeedbackCard key={item.id} feedback={item} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-border bg-card p-8 text-center">
            <p className="text-muted-foreground">No feedback submitted yet. Be the first!</p>
          </div>
        )}
      </div>
    </section>
  )
}
