import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

// Use the direct Postgres URL to bypass PostgREST schema cache issues
const sql = neon(process.env.POSTGRES_URL!)

export async function GET() {
  try {
    const feedback = await sql`
      SELECT * FROM feedback
      ORDER BY created_at DESC
      LIMIT 9
    `

    return NextResponse.json({ feedback })
  } catch (error) {
    console.error("Error fetching feedback:", error)
    return NextResponse.json({ error: "Failed to fetch feedback" }, { status: 500 })
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

    const result = await sql`
      INSERT INTO feedback (feedback_type, reference_id, rating, title, description, submitter_name, submitter_email)
      VALUES (${feedbackType}, ${referenceId}, ${rating}, ${title}, ${description}, ${submitterName || null}, ${submitterEmail || null})
      RETURNING *
    `

    return NextResponse.json({ success: true, feedback: result[0] }, { status: 201 })
  } catch (error) {
    console.error("Error inserting feedback:", error)
    return NextResponse.json({ error: "Failed to submit feedback" }, { status: 500 })
  }
}
