# Admin Setup Instructions

Since I cannot manipulate your secure passwords directly in the database, follow these 3 simple steps to create your Admin account:

1. **Create the Account**
   - Go to [http://localhost:3000/signup](http://localhost:3000/signup).
   - **Email**: `admin@intellect.com` (or any email you want)
   - **Password**: `123456`
   - **Name**: `Admin User`
   - Click "Create Account".

2. **Promote to Admin**
   - Go to your Supabase SQL Editor.
   - Run the script inside `supabase/promote_admin.sql`.
   - *Direct Command:*
     ```sql
     UPDATE users SET role = 'admin' WHERE email = 'admin@intellect.com';
     ```

3. **Login**
   - Go to [http://localhost:3000/admin](http://localhost:3000/admin).
   - You should now have full access!
