import { MessageSquare, Users, ShoppingBag, MapPin } from "lucide-react"

export function Hero() {
  return (
    <section className="bg-card py-16">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
          <MessageSquare className="h-8 w-8 text-primary" />
        </div>
        <h2 className="mb-4 text-balance text-4xl font-bold tracking-tight text-foreground">
          Your Voice Matters
        </h2>
        <p className="mx-auto mb-10 max-w-2xl text-pretty text-lg text-muted-foreground">
          Help us improve by sharing your feedback on meetings, orders, and tours. 
          Every piece of feedback helps us serve you better.
        </p>
        
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="rounded-xl border border-border bg-background p-6 transition-shadow hover:shadow-md">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 font-semibold text-foreground">Meetings</h3>
            <p className="text-sm text-muted-foreground">
              Rate and review your meeting experiences
            </p>
          </div>
          
          <div className="rounded-xl border border-border bg-background p-6 transition-shadow hover:shadow-md">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/20">
              <ShoppingBag className="h-6 w-6 text-accent" />
            </div>
            <h3 className="mb-2 font-semibold text-foreground">Orders</h3>
            <p className="text-sm text-muted-foreground">
              Share your thoughts on order fulfillment
            </p>
          </div>
          
          <div className="rounded-xl border border-border bg-background p-6 transition-shadow hover:shadow-md">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 font-semibold text-foreground">Tours</h3>
            <p className="text-sm text-muted-foreground">
              Tell us about your tour experiences
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
