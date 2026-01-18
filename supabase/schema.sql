-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ENUMS
create type user_role as enum ('student', 'admin');
create type question_difficulty as enum ('easy', 'medium', 'hard');

-- USERS
create table users (
  id uuid references auth.users not null primary key,
  email text not null,
  role user_role default 'student',
  full_name text,
  created_at timestamptz default now()
);

-- SUBJECTS
create table subjects (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  slug text unique not null,
  icon text, -- URL or icon name
  created_at timestamptz default now()
);

-- TOPICS
create table topics (
  id uuid default gen_random_uuid() primary key,
  subject_id uuid references subjects(id) on delete cascade not null,
  name text not null,
  slug text not null,
  created_at timestamptz default now()
);

-- QUESTIONS
create table questions (
  id uuid default gen_random_uuid() primary key,
  topic_id uuid references topics(id) on delete set null,
  subject_id uuid references subjects(id) on delete cascade not null,
  question_text text not null,
  options jsonb not null, -- Array of strings or objects {id, text}
  correct_option text not null, -- Matches one of the options keys or text
  explanation text,
  difficulty question_difficulty default 'medium',
  is_pyq boolean default false,
  pyq_year int,
  created_at timestamptz default now()
);

-- USER PROGRESS
create table user_progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references users(id) on delete cascade not null,
  question_id uuid references questions(id) on delete cascade not null,
  is_correct boolean not null,
  selected_option text,
  attempted_at timestamptz default now(),
  unique(user_id, question_id) -- Or allow multiple attempts history
);

-- MOCK TESTS (Simple version)
create table mock_tests (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  subject_id uuid references subjects(id), -- Null if full syllabus
  duration_minutes int default 60,
  created_at timestamptz default now()
);

-- MOCK TEST QUESTIONS
create table mock_test_questions (
  mock_test_id uuid references mock_tests(id) on delete cascade not null,
  question_id uuid references questions(id) on delete cascade not null,
  primary key (mock_test_id, question_id)
);

-- RLS POLICIES (Example: Public Read for Questions)
alter table questions enable row level security;
create policy "Public questions are viewable by everyone" on questions
  for select using (true);

alter table users enable row level security;
create policy "Users can view their own data" on users
  for select using (auth.uid() = id);

alter table user_progress enable row level security;
create policy "Users can view their own progress" on user_progress
  for select using (auth.uid() = user_id);
create policy "Users can insert their own progress" on user_progress
  for insert with check (auth.uid() = user_id);
