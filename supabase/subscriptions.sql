-- Create subscriptions table
create table if not exists subscriptions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) not null,
  plan_id text not null, -- 'monthly', 'yearly'
  status text not null, -- 'active', 'expired'
  razorpay_order_id text,
  razorpay_payment_id text,
  start_date timestamptz default now(),
  end_date timestamptz,
  created_at timestamptz default now()
);

-- Enable RLS
alter table subscriptions enable row level security;

-- Policies
create policy "Users can view own subscriptions" on subscriptions
  for select using (auth.uid() = user_id);

-- Create a helper to check if user is premium
create or replace function is_premium(check_user_id uuid)
returns boolean as $$
  select exists (
    select 1 from subscriptions
    where user_id = check_user_id
    and status = 'active'
    and end_date > now()
  );
$$ language sql security definer;
