-- 1. Create Practice Sessions Table (Session Tracking) --
-- Stores info about a generated session (Topic/Subject-wise or Mock)
CREATE TABLE practice_sessions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    session_type TEXT NOT NULL CHECK (session_type IN ('practice', 'mock', 'mixed')),
    subject_id UUID REFERENCES subjects(id),
    topic_id UUID REFERENCES topics(id),
    total_questions INT DEFAULT 0,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'abandoned')),
    started_at TIMESTAMPTZ DEFAULT now(),
    completed_at TIMESTAMPTZ
);

-- 2. Enhanced User Progress / History (Anti-Repetition & Cool-down) --
-- We already have user_progress, but we need to track status more explicitly including SKIPS
ALTER TABLE user_progress ADD COLUMN IF NOT EXISTS status TEXT CHECK (status IN ('correct', 'incorrect', 'skipped')) DEFAULT 'incorrect';
-- Update existing rows based on is_correct flag if needed, or keep both.
-- Let's rely on 'status' for new features.

-- Index for fast lookup of recently attempted questions
CREATE INDEX idx_user_progress_user_question ON user_progress(user_id, question_id);
CREATE INDEX idx_user_progress_attempted_at ON user_progress(attempted_at);

-- 3. Function to Fetch Questions for Session (The Core Logic) --
-- Rules: Random, Difficulty Balanced (50-30-20), Anti-Repetition (Cool-down 5 days)

CREATE OR REPLACE FUNCTION generate_practice_session_questions(
    p_user_id UUID,
    p_subject_id UUID,
    p_topic_id UUID DEFAULT NULL,
    p_limit INT DEFAULT 15
)
RETURNS TABLE (
    question_id UUID,
    difficulty question_difficulty,
    is_new BOOLEAN
) 
LANGUAGE plpgsql
AS $$
DECLARE
    v_cooldown_days INT := 5;
    v_limit_easy INT := CEIL(p_limit * 0.5);   -- 50%
    v_limit_medium INT := CEIL(p_limit * 0.3); -- 30%
    v_limit_hard INT := p_limit - (v_limit_easy + v_limit_medium); -- Remaining (~20%)
BEGIN
    RETURN QUERY
    WITH recent_attempts AS (
        SELECT question_id, attempted_at, is_correct 
        FROM user_progress 
        WHERE user_id = p_user_id
    ),
    eligible_questions AS (
        SELECT 
            q.id, 
            q.difficulty,
            CASE WHEN ra.question_id IS NULL THEN TRUE ELSE FALSE END as is_new
        FROM questions q
        LEFT JOIN recent_attempts ra ON q.id = ra.question_id
        WHERE 
            q.subject_id = p_subject_id
            AND (p_topic_id IS NULL OR q.topic_id = p_topic_id)
            -- Condition: Either NEVER attempted OR (Attempted > 5 days ago OR Attempted incorrectly recently)
            AND (
                ra.question_id IS NULL  -- Never attempted
                OR (ra.attempted_at < (now() - (v_cooldown_days || ' days')::INTERVAL)) -- Cooldown passed
                OR (ra.is_correct = FALSE) -- Allowed to repeat mistakes anytime
            )
    )
    (
        SELECT id, difficulty, is_new FROM eligible_questions WHERE difficulty = 'easy' ORDER BY random() LIMIT v_limit_easy
    )
    UNION ALL
    (
        SELECT id, difficulty, is_new FROM eligible_questions WHERE difficulty = 'medium' ORDER BY random() LIMIT v_limit_medium
    )
    UNION ALL
    (
        SELECT id, difficulty, is_new FROM eligible_questions WHERE difficulty = 'hard' ORDER BY random() LIMIT v_limit_hard
    );
END;
$$;
