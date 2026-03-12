// app/api/feedback/route.ts
// --------------------------------------------
// 1. Install mysql2 first:
//    npm install mysql2
// --------------------------------------------

import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";

// DB connection config — put these in .env.local
const db = mysql.createPool({
  host:     process.env.DB_HOST     || "localhost",
  user:     process.env.DB_USER     || "root",
  password: process.env.DB_PASSWORD || "yourpassword",
  database: process.env.DB_NAME     || "feedme",
});

// POST /api/feedback — submit new feedback
export async function POST(req: NextRequest) {
  try {
    const { feedbackType, referenceId, rating, title, description, submitterName, submitterEmail } =
      await req.json();

    if (!feedbackType || !rating || !title) {
      return NextResponse.json(
        { error: "type, rating, and title are required" },
        { status: 400 }
      );
    }

    const [result]: any = await db.execute(
      `INSERT INTO feedback (type, reference, rating, title, description, name, email)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [feedbackType, referenceId, rating, title, description, submitterName, submitterEmail]
    );

    return NextResponse.json({ success: true, id: result.insertId });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

// GET /api/feedback — fetch all feedback
export async function GET() {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM feedback ORDER BY submitted_at DESC LIMIT 50"
    );
    return NextResponse.json(rows);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
