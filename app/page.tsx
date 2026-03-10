import { Header } from "@/components/feedme/header"
import { Hero } from "@/components/feedme/hero"
import { FeedbackForm } from "@/components/feedme/feedback-form"
import { RecentFeedback } from "@/components/feedme/recent-feedback"
import { Footer } from "@/components/feedme/footer"

export default function FeedMePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <FeedbackForm />
        <RecentFeedback />
      </main>
      <Footer />
    </div>
  )
}
