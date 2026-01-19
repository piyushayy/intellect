-- 1. Insert New Subjects (Commerce + Humanities + Math + Gen Test)
INSERT INTO public.subjects (name, slug, icon) VALUES
('Accountancy', 'accountancy', 'calculator'),
('Business Studies', 'business-studies', 'trending-up'),
('Political Science', 'political-science', 'globe'),
('History', 'history', 'book'),
('Psychology', 'psychology', 'brain'),
('Sociology', 'sociology', 'users'),
-- Keeping existing common ones just in case
('Economics', 'economics', 'trending-up'),
('Appl. Mathematics', 'math', 'calculator'),
('English', 'english', 'book'),
('General Test', 'general-test', 'globe')
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, icon = EXCLUDED.icon;

-- 2. Insert Topics for New Subjects
-- Accountancy
WITH s AS (SELECT id FROM subjects WHERE slug = 'accountancy')
INSERT INTO public.topics (subject_id, name, slug) VALUES
((SELECT id FROM s), 'Accounting for NPO', 'npo'),
((SELECT id FROM s), 'Partnership', 'partnership'),
((SELECT id FROM s), 'Company Accounts', 'company-accounts'),
((SELECT id FROM s), 'Financial Statements', 'financial-statements')
ON CONFLICT (slug) DO NOTHING;

-- Business Studies
WITH s AS (SELECT id FROM subjects WHERE slug = 'business-studies')
INSERT INTO public.topics (subject_id, name, slug) VALUES
((SELECT id FROM s), 'Principles of Management', 'management-principles'),
((SELECT id FROM s), 'Business Environment', 'business-environment'),
((SELECT id FROM s), 'Marketing Management', 'marketing'),
((SELECT id FROM s), 'Financial Markets', 'financial-markets')
ON CONFLICT (slug) DO NOTHING;

-- Political Science
WITH s AS (SELECT id FROM subjects WHERE slug = 'political-science')
INSERT INTO public.topics (subject_id, name, slug) VALUES
((SELECT id FROM s), 'Cold War Era', 'cold-war'),
((SELECT id FROM s), 'End of Bipolarity', 'bipolarity'),
((SELECT id FROM s), 'US Hegemony', 'us-hegemony'),
((SELECT id FROM s), 'Politics in India', 'indian-politics')
ON CONFLICT (slug) DO NOTHING;

-- History
WITH s AS (SELECT id FROM subjects WHERE slug = 'history')
INSERT INTO public.topics (subject_id, name, slug) VALUES
((SELECT id FROM s), 'Ancient India', 'ancient-india'),
((SELECT id FROM s), 'Medieval India', 'medieval-india'),
((SELECT id FROM s), 'Modern India', 'modern-india')
ON CONFLICT (slug) DO NOTHING;

-- Psychology
WITH s AS (SELECT id FROM subjects WHERE slug = 'psychology')
INSERT INTO public.topics (subject_id, name, slug) VALUES
((SELECT id FROM s), 'Variations in Attributes', 'attributes'),
((SELECT id FROM s), 'Self and Personality', 'personality'),
((SELECT id FROM s), 'Life Challenges', 'life-challenges')
ON CONFLICT (slug) DO NOTHING;

-- Sociology
WITH s AS (SELECT id FROM subjects WHERE slug = 'sociology')
INSERT INTO public.topics (subject_id, name, slug) VALUES
((SELECT id FROM s), 'Indian Society', 'indian-society'),
((SELECT id FROM s), 'Social Institutions', 'social-institutions'),
((SELECT id FROM s), 'Social Change', 'social-change')
ON CONFLICT (slug) DO NOTHING;

-- Update Economics (add Indian Econ if missing)
WITH s AS (SELECT id FROM subjects WHERE slug = 'economics')
INSERT INTO public.topics (subject_id, name, slug) VALUES
((SELECT id FROM s), 'Indian Economic Development', 'indian-economy')
ON CONFLICT (slug) DO NOTHING;
