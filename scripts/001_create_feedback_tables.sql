-- ============================================
-- FeedMe - Internal Feedback Platform
-- MySQL Database Schema
-- ============================================

CREATE DATABASE IF NOT EXISTS feedme;
USE feedme;

-- Main feedback table (handles all 3 types)
CREATE TABLE feedback (
  id              INT AUTO_INCREMENT PRIMARY KEY,
  type            ENUM('meeting', 'order', 'tour') NOT NULL,
  reference       VARCHAR(255),          -- Meeting ID / Order number / Tour ID
  rating          TINYINT CHECK (rating BETWEEN 1 AND 5),
  title           VARCHAR(255),
  description     TEXT,
  name            VARCHAR(255),          -- Optional contact name
  email           VARCHAR(255),          -- Optional contact email
  submitted_at    DATETIME DEFAULT NOW()
);

-- ============================================
-- Sample Data
-- ============================================

INSERT INTO feedback (type, reference, rating, title, description, name, email) VALUES
('meeting', 'Q1 Planning 2025',  5, 'Very productive session',     'Everyone was aligned and decisions were made quickly.', 'Kesav',  'kesav@company.com'),
('order',   'ORD-10245',         3, 'Delivery was slightly late',  'Product quality was great but took 3 extra days.',     'Priya',  'priya@company.com'),
('tour',    'Agra Heritage Tour', 4, 'Great experience overall',   'Guide was knowledgeable. Loved the monuments.',        'Rahul',  'rahul@company.com');

-- ============================================
-- Useful queries
-- ============================================

-- View all feedback
SELECT * FROM feedback ORDER BY submitted_at DESC;

-- Average rating by type
SELECT type, ROUND(AVG(rating), 2) AS avg_rating, COUNT(*) AS total
FROM feedback
GROUP BY type;

-- Recent feedback (last 7 days)
SELECT * FROM feedback
WHERE submitted_at >= NOW() - INTERVAL 7 DAY
ORDER BY submitted_at DESC;
