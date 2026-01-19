-- Give Admins full control over Questions
CREATE POLICY "Admins can insert questions" ON questions
FOR INSERT WITH CHECK (
  auth.uid() IN (SELECT id FROM users WHERE role = 'admin')
);

CREATE POLICY "Admins can update questions" ON questions
FOR UPDATE USING (
  auth.uid() IN (SELECT id FROM users WHERE role = 'admin')
);

CREATE POLICY "Admins can delete questions" ON questions
FOR DELETE USING (
  auth.uid() IN (SELECT id FROM users WHERE role = 'admin')
);

-- Also need policies for mock_test_questions if creating tests
ALTER TABLE mock_test_questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read mock_test_questions" ON mock_test_questions
FOR SELECT USING (true);

CREATE POLICY "Admins can insert mock_test_questions" ON mock_test_questions
FOR INSERT WITH CHECK (
  auth.uid() IN (SELECT id FROM users WHERE role = 'admin')
);
