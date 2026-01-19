-- 1. Create a function to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email, full_name, role)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', 'student');
  return new;
end;
$$ language plpgsql security definer;

-- 2. Create the trigger
-- Drop if exists to avoid errors on multiple runs
drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 3. Fix: Ensure existing users also have records (if any were missed)
insert into public.users (id, email, full_name, role)
select id, email, raw_user_meta_data->>'full_name', 'student'
from auth.users
where id not in (select id from public.users)
on conflict (id) do nothing;
