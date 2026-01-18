-- 1. First, make sure you have Signed Up in the app with this email
-- (e.g. Go to http://localhost:3000/signup)

-- 2. Run this query to promote that user to Admin
UPDATE users
SET role = 'admin'
WHERE email = 'admin@intellect.com'; -- <Change this to your email

-- 3. Verify the change
SELECT * FROM users WHERE role = 'admin';
