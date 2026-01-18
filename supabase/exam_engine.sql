-- EXAM ENGINE EXTENSION

-- 1. Table to store Test Attempts
create table if not exists test_attempts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  mock_test_id uuid references mock_tests(id) on delete cascade not null,
  score int not null,
  total_questions int not null,
  percentage int not null,
  time_taken_seconds int,
  completed_at timestamptz default now()
);

-- 2. RLS for Attempts
alter table test_attempts enable row level security;

create policy "Users can view own attempts" on test_attempts
  for select using (auth.uid() = user_id);

create policy "Users can insert own attempts" on test_attempts
  for insert with check (auth.uid() = user_id);

-- 3. Mock Data for "Mock Tests" (if not exists)
insert into mock_tests (title, duration_minutes)
select 'CUET General Test - Full Length', 60
where not exists (select 1 from mock_tests where title = 'CUET General Test - Full Length');

insert into mock_tests (title, duration_minutes)
select 'English Language - Section A', 45
where not exists (select 1 from mock_tests where title = 'English Language - Section A');

-- 4. Link some existing questions to these tests (randomly)
-- Link 5 random questions to General Test
insert into mock_test_questions (mock_test_id, question_id)
select m.id, q.id
from mock_tests m, questions q
where m.title = 'CUET General Test - Full Length'
order by random()
limit 5
on conflict do nothing;

-- Link 5 random questions to English Test
insert into mock_test_questions (mock_test_id, question_id)
select m.id, q.id
from mock_tests m, questions q
where m.title = 'English Language - Section A'
order by random()
limit 5
on conflict do nothing;
