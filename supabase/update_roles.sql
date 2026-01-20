-- 1. Update the Enum to include 'moderator'
-- Postgres doesn't easily allow adding to ENUM inside a transaction sometimes, but we can try:
ALTER TYPE user_role ADD VALUE IF NOT EXISTS 'moderator';

-- 2. Create a secure function to check roles (for RLS)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.users 
    WHERE id = auth.uid() 
    AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.is_moderator()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.users 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'moderator')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Update RLS Policies to use these clean functions
-- Questions Table
DROP POLICY IF EXISTS "Admins can insert questions" ON questions;
DROP POLICY IF EXISTS "Admins can update questions" ON questions;
DROP POLICY IF EXISTS "Admins can delete questions" ON questions;

CREATE POLICY "Staff can insert questions" ON questions
FOR INSERT WITH CHECK (is_moderator());

CREATE POLICY "Staff can update questions" ON questions
FOR UPDATE USING (is_moderator());

CREATE POLICY "Admins can delete questions" ON questions
FOR DELETE USING (is_admin());

-- Mock Tests Table
DROP POLICY IF EXISTS "Admins can insert mock_test_questions" ON mock_test_questions;

CREATE POLICY "Staff can insert mock_test_questions" ON mock_test_questions
FOR INSERT WITH CHECK (is_moderator());
