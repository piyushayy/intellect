-- Create a trigger to automatically create a user profile when a new user signs up
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.users (id, email, full_name, role)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', 'student');
  return new;
end;
$$;

-- Drop trigger if exists to avoid conflicts
drop trigger if exists on_auth_user_created on auth.users;

-- Create the trigger
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Ensure RLS allows users to insert their own progress
alter table user_progress enable row level security;
drop policy if exists "Users can insert own progress" on user_progress;
create policy "Users can insert own progress" 
  on user_progress 
  for insert 
  with check (auth.uid() = user_id);

drop policy if exists "Users can update own progress" on user_progress;
create policy "Users can update own progress" 
  on user_progress 
  for update
  using (auth.uid() = user_id);
  
drop policy if exists "Users can view own progress" on user_progress;
create policy "Users can view own progress" 
  on user_progress 
  for select
  using (auth.uid() = user_id);
