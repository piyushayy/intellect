import { createBrowserClient } from '@supabase/ssr';

// This client is for Client Components (Browser)
// It uses cookies so the Server Components can read the session too!
export const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
