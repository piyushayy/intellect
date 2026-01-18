-- RUN THIS IN SUPABASE SQL EDITOR TO FIX LOGIN

-- 1. Force Confirm the Email (Bypasses verification link requirement)
UPDATE auth.users
SET email_confirmed_at = now()
WHERE email = 'admin@intellect.com';

-- 2. Ensure the User exists in public table and is Admin
-- (This fixes cases where the profile wasn't created)
INSERT INTO public.users (id, email, role, full_name)
SELECT id, email, 'admin', 'Admin User'
FROM auth.users
WHERE email = 'admin@intellect.com'
ON CONFLICT (id) DO UPDATE
SET role = 'admin';

-- 3. Check the result
SELECT email, role FROM users WHERE email = 'admin@intellect.com';
