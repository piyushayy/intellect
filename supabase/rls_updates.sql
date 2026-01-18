-- Enable RLS for subjects and topics
alter table subjects enable row level security;
alter table topics enable row level security;

-- Allow public read access (everyone can see subjects/topics)
create policy "Public subjects are viewable by everyone" on subjects
  for select using (true);

create policy "Public topics are viewable by everyone" on topics
  for select using (true);

-- Enable public insert for users table (Authenticated users can create their own profile during signup)
create policy "Users can insert their own profile" on users
  for insert with check (auth.uid() = id);
