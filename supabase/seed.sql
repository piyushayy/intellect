-- SEED DATA
-- Run this in Supabase SQL Editor AFTER running the schema

-- 1. Insert Subjects
INSERT INTO subjects (id, name, slug, icon) VALUES
('d290f1ee-6c54-4b01-90e6-d701748f0851', 'English', 'english', 'book'),
('a123f1ee-6c54-4b01-90e6-d701748f0852', 'General Test', 'general-test', 'globe'),
('b456f1ee-6c54-4b01-90e6-d701748f0853', 'Mathematics', 'mathematics', 'calculator');

-- 2. Insert Topics for English
INSERT INTO topics (id, subject_id, name, slug) VALUES
('c789f1ee-6c54-4b01-90e6-d701748f0854', 'd290f1ee-6c54-4b01-90e6-d701748f0851', 'Reading Comprehension', 'reading-comprehension'),
('d012f1ee-6c54-4b01-90e6-d701748f0855', 'd290f1ee-6c54-4b01-90e6-d701748f0851', 'Synonyms & Antonyms', 'synonyms-antonyms');

-- 3. Insert Questions (English - Reading Comp)
INSERT INTO questions (topic_id, subject_id, question_text, options, correct_option, explanation, difficulty) VALUES
(
  'c789f1ee-6c54-4b01-90e6-d701748f0854', 
  'd290f1ee-6c54-4b01-90e6-d701748f0851',
  'Which literary device is used in the phrase "The wind whispered through the trees"?',
  '[
    {"id": "a", "text": "Simile"},
    {"id": "b", "text": "Metaphor"},
    {"id": "c", "text": "Personification"},
    {"id": "d", "text": "Hyperbole"}
  ]'::jsonb,
  'c',
  'Personification is giving human qualities (whispering) to non-human things (the wind).',
  'easy'
),
(
  'c789f1ee-6c54-4b01-90e6-d701748f0854', 
  'd290f1ee-6c54-4b01-90e6-d701748f0851',
  'What is the primary purpose of a thesis statement?',
  '[
    {"id": "a", "text": "To ask a rhetorical question"},
    {"id": "b", "text": "To summarize the conclusion"},
    {"id": "c", "text": "To state the main argument of the essay"},
    {"id": "d", "text": "To provide evidence"}
  ]'::jsonb,
  'c',
  'A thesis statement clearly states the main argument or claim of the essay and guides the reader.',
  'medium'
);

-- 4. Insert Questions (English - Synonyms)
INSERT INTO questions (topic_id, subject_id, question_text, options, correct_option, explanation, difficulty) VALUES
(
  'd012f1ee-6c54-4b01-90e6-d701748f0855', 
  'd290f1ee-6c54-4b01-90e6-d701748f0851',
  'Identify the antonym of "Benevolent".',
  '[
    {"id": "a", "text": "Kind"},
    {"id": "b", "text": "Malevolent"},
    {"id": "c", "text": "Generous"},
    {"id": "d", "text": "Altruistic"}
  ]'::jsonb,
  'b',
  'Benevolent means well-meaning and kindly. Malevolent means having or showing a wish to do evil to others.',
  'medium'
);
