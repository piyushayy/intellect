-- Replace 'YOUR_EMAIL_HERE' with the actual email of the admin user
UPDATE public.users
SET role = 'admin'
WHERE email = 'YOUR_EMAIL_HERE';

-- Verify the change
SELECT * FROM public.users WHERE role = 'admin';
