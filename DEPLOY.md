# 🚀 Launch Guide - Intellect

Your platform is ready for production! Follow these steps to deploy.

## 1. Prerequisites (Checklist)
- [x] **GitHub Repo**: Code is pushed to `main`.
- [x] **Supabase Project**: Database is live with tables, RLS policies, and seed data.
- [x] **Environment Variables**: You have your `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

## 2. Deploy to Vercel (Recommended)

1.  **Go to Vercel Dashboard**: [https://vercel.com/new](https://vercel.com/new)
2.  **Import Repository**: Select your `intellect` repository from GitHub.
3.  **Configure Project**:
    *   **Framework**: Next.js (should be auto-detected)
    *   **Root Directory**: `./`
4.  **Environment Variables** (Crucial!):
    *   Add `NEXT_PUBLIC_SUPABASE_URL` -> Value from your Supabase Project Settings
    *   Add `NEXT_PUBLIC_SUPABASE_ANON_KEY` -> Value from your Supabase Project Settings
5.  **Click Deploy**: Watch the build logs. It should take ~1-2 minutes.

## 3. Post-Deployment Setup

1.  **Supabase Auth Redirect**:
    *   Go to **Supabase Dashboard** -> **Authentication** -> **URL Configuration**.
    *   Add your new Vercel domain (e.g., `https://intellect-app.vercel.app`) to "Site URL" and "Redirect URLs".
    *   *Why?* This ensures users are redirected back to the live site after logging in, not localhost.

2.  **Google Auth (If used)**:
    *   If you added Google Login, update your Google Cloud Console "Authorized redirect URIs" to include `https://your-vercel-domain.com/auth/v1/callback`.

## 4. Verification
- Visit your new URL.
- Try signing up as a new user (check if you get redirected to the dashboard).
- Visit `/admin` to verify you still have access.

## Troubleshooting
- **Build Errors**: Check the Vercel logs. Common issues are missing TypeScript types or unused variables (we fixed most).
- **500 Errors**: Usually missing Environment Variables. Double-check step 2.4.

Congratulations on shipping! 🚢
