-- Allow Public Read for Mock Tests
alter table mock_tests enable row level security;
alter table mock_test_questions enable row level security;

create policy "Public tests are viewable by everyone" on mock_tests
  for select using (true);
  
create policy "Public test questions are viewable by everyone" on mock_test_questions
  for select using (true);
