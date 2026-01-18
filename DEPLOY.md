# Deployment Guide for Intellect

## 1. Prerequisites
- A GitHub account
- A Vercel account (free tier is fine)
- Your Supabase project ready

## 2. Environment Variables
You need to add the following Environment Variables to your Vercel Project Settings:

- `NEXT_PUBLIC_SUPABASE_URL`: Check your Supabase Settings -> API
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Check your Supabase Settings -> API

## 3. Deployment Steps
1. Push your code to GitHub.
2. Go to Vercel Dashboard -> Add New Project.
3. Import your `intellect` repository.
4. **Important**: Add the Environment Variables from Step 2 *before* clicking Deploy.
5. Click **Deploy**.

## 4. Post-Deployment
- Go to Supabase -> Authentication -> URL Configuration.
- Add your new Vercel domain (e.g., `https://intellect-app.vercel.app`) to "Site URL".
- Add `https://intellect-app.vercel.app/auth/callback` to "Redirect URLs".

## 5. Verification
- Visit your new URL.
- Try "Continue with Google".
- Try "Start Practice".

🎉 Your EdTech platform is live!
