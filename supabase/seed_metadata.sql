-- 1. Insert Subjects
INSERT INTO public.subjects (name, slug, icon) VALUES
('English', 'english', 'book'),
('Physics', 'physics', 'atom'),
('Chemistry', 'chemistry', 'flask'),
('Biology', 'biology', 'dna'),
('Mathematics', 'math', 'calculator'),
('Economics', 'economics', 'trending-up'),
('General Test', 'general-test', 'globe')
ON CONFLICT (slug) DO NOTHING;

-- 2. Insert Topics (Using Subqueries to get Subject IDs)
-- English
WITH s AS (SELECT id FROM subjects WHERE slug = 'english')
INSERT INTO public.topics (subject_id, name, slug) VALUES
((SELECT id FROM s), 'Reading Comprehension', 'reading-comprehension'),
((SELECT id FROM s), 'Vocabulary', 'vocabulary'),
((SELECT id FROM s), 'Grammar', 'grammar'),
((SELECT id FROM s), 'Verbal Ability', 'verbal-ability')
ON CONFLICT (slug) DO NOTHING;

-- Physics
WITH s AS (SELECT id FROM subjects WHERE slug = 'physics')
INSERT INTO public.topics (subject_id, name, slug) VALUES
((SELECT id FROM s), 'Mechanics', 'mechanics'),
((SELECT id FROM s), 'Thermodynamics', 'thermodynamics'),
((SELECT id FROM s), 'Electrostatics', 'electrostatics'),
((SELECT id FROM s), 'Optics', 'optics')
ON CONFLICT (slug) DO NOTHING;

-- Chemistry
WITH s AS (SELECT id FROM subjects WHERE slug = 'chemistry')
INSERT INTO public.topics (subject_id, name, slug) VALUES
((SELECT id FROM s), 'Physical Chemistry', 'physical-chemistry'),
((SELECT id FROM s), 'Organic Chemistry', 'organic-chemistry'),
((SELECT id FROM s), 'Inorganic Chemistry', 'inorganic-chemistry')
ON CONFLICT (slug) DO NOTHING;

-- Biology
WITH s AS (SELECT id FROM subjects WHERE slug = 'biology')
INSERT INTO public.topics (subject_id, name, slug) VALUES
((SELECT id FROM s), 'Genetics', 'genetics'),
((SELECT id FROM s), 'Ecology', 'ecology'),
((SELECT id FROM s), 'Human Physiology', 'human-physiology')
ON CONFLICT (slug) DO NOTHING;

-- Mathematics
WITH s AS (SELECT id FROM subjects WHERE slug = 'math')
INSERT INTO public.topics (subject_id, name, slug) VALUES
((SELECT id FROM s), 'Calculus', 'calculus'),
((SELECT id FROM s), 'Algebra', 'algebra'),
((SELECT id FROM s), 'Probability', 'probability'),
((SELECT id FROM s), 'Vectors', 'vectors')
ON CONFLICT (slug) DO NOTHING;

-- Economics
WITH s AS (SELECT id FROM subjects WHERE slug = 'economics')
INSERT INTO public.topics (subject_id, name, slug) VALUES
((SELECT id FROM s), 'Microeconomics', 'microeconomics'),
((SELECT id FROM s), 'Macroeconomics', 'macroeconomics'),
((SELECT id FROM s), 'Indian Statistics', 'indian-statistics')
ON CONFLICT (slug) DO NOTHING;

-- General Test
WITH s AS (SELECT id FROM subjects WHERE slug = 'general-test')
INSERT INTO public.topics (subject_id, name, slug) VALUES
((SELECT id FROM s), 'General Knowledge', 'gk'),
((SELECT id FROM s), 'Current Affairs', 'current-affairs'),
((SELECT id FROM s), 'Logical Reasoning', 'logical-reasoning'),
((SELECT id FROM s), 'Quantitative Reasoning', 'quant'),
((SELECT id FROM s), 'Numerical Ability', 'numerical-ability')
ON CONFLICT (slug) DO NOTHING;
