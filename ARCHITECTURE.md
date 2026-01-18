# Intellect - CUET Learning Platform Architecture

## 1. System Architecture

The platform follows a modern serverless architecture using Next.js for the frontend and API, and Supabase for the backend (Database & Auth).

### Tech Stack
- **Frontend**: Next.js 14+ (App Router), Tailwind CSS, Framer Motion
- **Backend**: Supabase (PostgreSQL, Auth, Edge Functions if needed)
- **Deployment**: Vercel (recommended)

## 2. Database Schema (Supabase / PostgreSQL)

```sql
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
```

## 3. API Structure (Next.js Server Actions / API Routes)

We will primarily use **Server Actions** for mutations and data fetching directly in server components where possible.

- `actions/auth.ts`: signUp, signIn, signOut
- `actions/practice.ts`: getSubjects, getTopics, getQuestions(topicId)
- `actions/user.ts`: saveProgress, getUserStats
- `actions/admin.ts`: createQuestion, uploadBulkQuestions

## 4. Frontend Folder Structure

```
/app
  /layout.tsx       # Root layout (Fonts, Providers)
  /page.tsx         # Landing Page (Hero, CTA)
  /(auth)
    /login/page.tsx
    /signup/page.tsx
  /(dashboard)      # Authenticated Student View
    /layout.tsx     # Dashboard Shell (Navbar)
    /dashboard/page.tsx
    /practice
      /page.tsx     # Subject selection
      /[subject]
        /page.tsx   # Topic selection
        /[topic]
          /page.tsx # Practice Interface (Question Card)
    /pyq/page.tsx   # PYQ filtering
    /tests
      /page.tsx     # List of mock tests
      /[testId]
        /page.tsx   # Active Test Interface (Timer, Fullscreen)
        /result/page.tsx
  /(admin)          # Admin View
    /admin
      /questions/page.tsx
      /users/page.tsx
/components
  /ui               # Atomic components (Button, Card, Badge)
  /practice         # QuestionCard.tsx, OptionItem.tsx
  /layout           # Navbar.tsx, Sidebar.tsx
  /landing          # Hero.tsx, Features.tsx
/lib
  supabase.ts       # Client
  utils.ts          # Helpers
```

## 5. User Journeys

### Student Journey
1. **Landing**: Sees "Master CUET with Confidence". Clicks "Start Practicing".
2. **Onboarding**: Simple Sign up (Email/Password or Google).
3. **Dashboard**: Sees "Daily Progress", "Continue Practice", "Recommended Topics".
4. **Practice**: Selects "English" -> "Reading Comprehension".
5. **Question**:
   - Sees clear question card.
   - Selects option.
   - Immediate feedback (Green/Red).
   - "Why?" explanation expands below softly.
   - "Next" button appears.
6. **Completion**: "Topic Complete! +10 concepts mastered".

### Admin Journey
1. **Login**: Access /admin.
2. **Dashboard**: "Total Questions", "Total Users".
3. **Add Question**:
   - Form: Text, Options (A, B, C, D), Correct Ans, Explanation.
   - Tag: Subject, Topic, Is PYQ?
4. **Bulk Upload**: Upload CSV. Check for errors. Submit.

## 6. UI Component Breakdown

### Core Design System
- **Colors**:
  - `bg-slate-50` (App bg)
  - `text-slate-900` (Headings)
  - `text-slate-600` (Body)
  - `bg-indigo-600` (Primary Action)
  - `bg-emerald-100` / `text-emerald-700` (Correct)
  - `bg-rose-100` / `text-rose-700` (Wrong)
- **Typography**: `Inter` or `Outfit` (Clean, Sans-serif).
- **Radius**: `rounded-2xl` (Soft, friendly).
- **Shadows**: `shadow-sm` (Subtle).

### Key Components
1. **QuestionCard**:
   - Clean white card.
   - Large typography for question.
   - Stack of options.
   - Smooth transition for state change (Neutral -> Correct/Wrong).
2. **ProgressBar**:
   - Soft gradient filler.
3. **SubjectCard**:
   - Icon + Title.
   - Hover: Slight lift + border color change.
