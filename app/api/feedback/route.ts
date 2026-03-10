import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    const supabase = await createClient()
    
    const { data, error } = await supabase
      .from("feedback")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(9)

    if (error) {
      console.error("Error fetching feedback:", error)
      return NextResponse.json({ error: "Failed to fetch feedback" }, { status: 500 })
    }

    return NextResponse.json({ feedback: data })
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { feedbackType, referenceId, rating, title, description, submitterName, submitterEmail } = body

    // Validate required fields
    if (!feedbackType || !referenceId || !rating || !title || !description) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Validate feedback type
    if (!["meeting", "order", "tour"].includes(feedbackType)) {
      return NextResponse.json({ error: "Invalid feedback type" }, { status: 400 })
    }

    // Validate rating
    if (rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Rating must be between 1 and 5" }, { status: 400 })
    }

    const supabase = await createClient()

    const { data, error } = await supabase
      .from("feedback")
      .insert({
        feedback_type: feedbackType,
        reference_id: referenceId,
        rating,
        title,
        description,
        submitter_name: submitterName || null,
        submitter_email: submitterEmail || null,
      })
      .select()
      .single()

    if (error) {
      console.error("Error inserting feedback:", error)
      return NextResponse.json({ error: "Failed to submit feedback" }, { status: 500 })
    }

    return NextResponse.json({ success: true, feedback: data }, { status: 201 })
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
