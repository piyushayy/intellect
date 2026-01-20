-- 1. Enable pgcrypto extension (Required for password hashing)
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 2. Update metadata to make them an Admin in Auth
UPDATE auth.users 
SET raw_user_meta_data = '{"full_name": "Super Admin", "role": "admin"}' 
WHERE email = 'admin@intellect.com';

-- 3. Update the Public Users table to reflect Admin role
UPDATE public.users 
SET role = 'admin' 
WHERE email = 'admin@intellect.com';

-- 4. FORCE Reset Password to '123456'
-- This generates a secure bcrypt hash compatible with Supabase Auth
UPDATE auth.users 
SET encrypted_password = crypt('123456', gen_salt('bf')) 
WHERE email = 'admin@intellect.com';
