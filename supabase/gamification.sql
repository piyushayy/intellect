-- Create Gamification Table
create table if not exists user_gamification (
  user_id uuid references auth.users(id) primary key,
  current_streak int default 0,
  longest_streak int default 0,
  last_active_date date,
  total_xp bigint default 0,
  level int default 1
);

-- Enable RLS
alter table user_gamification enable row level security;

-- Policies
create policy "Users can view own gamification" on user_gamification
  for select using (auth.uid() = user_id);

create policy "Users can insert own gamification" on user_gamification
  for insert with check (auth.uid() = user_id);

-- Function to update XP and Streak safely
create or replace function update_gamification(p_user_id uuid, p_xp_gain int)
returns void
language plpgsql
security definer
as $$
declare
  v_current_streak int;
  v_longest_streak int;
  v_last_active date;
  v_new_streak int;
begin
  -- Get current state (locking the row)
  select current_streak, longest_streak, last_active_date 
  into v_current_streak, v_longest_streak, v_last_active
  from user_gamification 
  where user_id = p_user_id;

  -- Initialize if not exists
  if not found then
    v_current_streak := 0;
    v_longest_streak := 0;
    v_last_active := null;
    
    insert into user_gamification (user_id, current_streak, longest_streak, last_active_date, total_xp)
    values (p_user_id, 1, 1, CURRENT_DATE, p_xp_gain);
    return;
  end if;

  -- Calculate Streak
  if v_last_active = CURRENT_DATE then
    -- Already active today, maintain streak
    v_new_streak := v_current_streak;
  elsif v_last_active = CURRENT_DATE - 1 then
    -- Active yesterday, increment streak
    v_new_streak := v_current_streak + 1;
  else
    -- Streak broken (or first time in a while)
    v_new_streak := 1;
  end if;

  -- Update longest streak
  if v_new_streak > v_longest_streak then
    v_longest_streak := v_new_streak;
  end if;

  -- Update Record
  update user_gamification
  set 
    current_streak = v_new_streak,
    longest_streak = v_longest_streak,
    last_active_date = CURRENT_DATE,
    total_xp = total_xp + p_xp_gain
  where user_id = p_user_id;
  
end;
$$;
