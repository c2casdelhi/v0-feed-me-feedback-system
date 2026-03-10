"use client"

import { useState } from "react"
import { Users, ShoppingBag, MapPin, Star, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Spinner } from "@/components/ui/spinner"
import { Field, FieldLabel, FieldGroup } from "@/components/ui/field"
import { cn } from "@/lib/utils"

type FeedbackType = "meeting" | "order" | "tour"

const feedbackTypes = [
  { 
    id: "meeting" as const, 
    label: "Meeting", 
    icon: Users, 
    placeholder: "Meeting ID or name",
    description: "Rate a recent meeting"
  },
  { 
    id: "order" as const, 
    label: "Order", 
    icon: ShoppingBag, 
    placeholder: "Order number",
    description: "Feedback on an order"
  },
  { 
    id: "tour" as const, 
    label: "Tour", 
    icon: MapPin, 
    placeholder: "Tour ID or location",
    description: "Review a tour experience"
  },
]

export function FeedbackForm() {
  const [selectedType, setSelectedType] = useState<FeedbackType>("meeting")
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    referenceId: "",
    title: "",
    description: "",
    submitterName: "",
    submitterEmail: "",
  })

  const currentType = feedbackTypes.find(t => t.id === selectedType)!

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          feedbackType: selectedType,
          referenceId: formData.referenceId,
          rating,
          title: formData.title,
          description: formData.description,
          submitterName: formData.submitterName || null,
          submitterEmail: formData.submitterEmail || null,
        }),
      })

      if (response.ok) {
        setSubmitted(true)
        setFormData({
          referenceId: "",
          title: "",
          description: "",
          submitterName: "",
          submitterEmail: "",
        })
        setRating(0)
        setTimeout(() => setSubmitted(false), 3000)
      }
    } catch (error) {
      console.error("Failed to submit feedback:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="feedback" className="py-16">
      <div className="mx-auto max-w-2xl px-6">
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-2xl font-bold text-foreground">Submit Feedback</h2>
          <p className="text-muted-foreground">Select a category and share your thoughts</p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
          {/* Feedback Type Selection */}
          <div className="mb-8">
            <p className="mb-4 text-sm font-medium text-foreground">What would you like to give feedback on?</p>
            <div className="grid grid-cols-3 gap-3">
              {feedbackTypes.map((type) => {
                const Icon = type.icon
                const isSelected = selectedType === type.id
                return (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setSelectedType(type.id)}
                    className={cn(
                      "flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all",
                      isSelected
                        ? "border-primary bg-primary/5"
                        : "border-border bg-background hover:border-primary/50"
                    )}
                  >
                    <div className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-lg",
                      isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    )}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className={cn(
                      "text-sm font-medium",
                      isSelected ? "text-primary" : "text-foreground"
                    )}>
                      {type.label}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Reference ID */}
            <FieldGroup>
              <Field>
                <FieldLabel>{currentType.label} Reference</FieldLabel>
                <Input
                  placeholder={currentType.placeholder}
                  value={formData.referenceId}
                  onChange={(e) => setFormData(prev => ({ ...prev, referenceId: e.target.value }))}
                  required
                />
              </Field>
            </FieldGroup>

            {/* Rating */}
            <div>
              <p className="mb-3 text-sm font-medium text-foreground">Your Rating</p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={cn(
                        "h-8 w-8 transition-colors",
                        (hoveredRating || rating) >= star
                          ? "fill-primary text-primary"
                          : "text-muted-foreground/30"
                      )}
                    />
                  </button>
                ))}
                {rating > 0 && (
                  <span className="ml-2 self-center text-sm text-muted-foreground">
                    {rating} of 5 stars
                  </span>
                )}
              </div>
            </div>

            {/* Title */}
            <FieldGroup>
              <Field>
                <FieldLabel>Feedback Title</FieldLabel>
                <Input
                  placeholder="Brief summary of your feedback"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  required
                />
              </Field>
            </FieldGroup>

            {/* Description */}
            <FieldGroup>
              <Field>
                <FieldLabel>Detailed Feedback</FieldLabel>
                <Textarea
                  placeholder="Share your experience in detail..."
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  required
                />
              </Field>
            </FieldGroup>

            {/* Contact Info (Optional) */}
            <div className="rounded-lg bg-muted/50 p-4">
              <p className="mb-3 text-sm font-medium text-foreground">Contact Information (Optional)</p>
              <div className="grid gap-4 sm:grid-cols-2">
                <FieldGroup>
                  <Field>
                    <FieldLabel>Your Name</FieldLabel>
                    <Input
                      placeholder="John Doe"
                      value={formData.submitterName}
                      onChange={(e) => setFormData(prev => ({ ...prev, submitterName: e.target.value }))}
                    />
                  </Field>
                </FieldGroup>
                <FieldGroup>
                  <Field>
                    <FieldLabel>Email</FieldLabel>
                    <Input
                      type="email"
                      placeholder="john@company.com"
                      value={formData.submitterEmail}
                      onChange={(e) => setFormData(prev => ({ ...prev, submitterEmail: e.target.value }))}
                    />
                  </Field>
                </FieldGroup>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={isSubmitting || rating === 0}
            >
              {isSubmitting ? (
                <>
                  <Spinner className="mr-2" />
                  Submitting...
                </>
              ) : submitted ? (
                "Feedback Submitted!"
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Submit Feedback
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
