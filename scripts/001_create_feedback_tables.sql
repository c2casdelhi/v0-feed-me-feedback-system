-- Create feedback table for FeedMe application
-- Supports three feedback types: meeting, order, tour

CREATE TABLE IF NOT EXISTS public.feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  feedback_type TEXT NOT NULL CHECK (feedback_type IN ('meeting', 'order', 'tour')),
  reference_id TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT NOT NULL,
  description TEXT,
  submitter_name TEXT NOT NULL,
  submitter_email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for internal feedback submission)
CREATE POLICY "Allow anonymous insert" ON public.feedback
  FOR INSERT
  WITH CHECK (true);

-- Allow anonymous read for viewing feedback (internal tool)
CREATE POLICY "Allow anonymous select" ON public.feedback
  FOR SELECT
  USING (true);

-- Create index for faster queries by type
CREATE INDEX IF NOT EXISTS idx_feedback_type ON public.feedback(feedback_type);
CREATE INDEX IF NOT EXISTS idx_feedback_created_at ON public.feedback(created_at DESC);
