import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request,
    })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) =>
                        request.cookies.set(name, value)
                    )
                    supabaseResponse = NextResponse.next({
                        request,
                    })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    // IMPORTANT: Avoid fetch user here if possible for performance, simply refresh session
    // But getUser is safest for protection. We can optimize by only checking on specific routes
    // and just refreshing session here.
    const { data: { user } } = await supabase.auth.getUser()

    // 1. Protected Routes Guard
    const protectedPaths = ['/dashboard', '/practice', '/pyq', '/tests', '/mistakes'];
    const isProtected = protectedPaths.some(path => request.nextUrl.pathname.startsWith(path));

    if (isProtected && !user) {
        // Redirect to login but keep the intended destination
        const redirectUrl = new URL('/login', request.url);
        redirectUrl.searchParams.set('next', request.nextUrl.pathname);
        return NextResponse.redirect(redirectUrl);
    }

    // 2. Admin Routes Guard
    if (request.nextUrl.pathname.startsWith('/admin')) {
        if (!user) {
            return NextResponse.redirect(new URL('/login', request.url));
        }

        // Optional: Check role claim if available in session or metadata
        // For strict RBAC, checking metadata here is good practice, though user object is already fetched
        const role = user.user_metadata?.role;
        if (role !== 'admin' && role !== 'moderator') {
            // Unauthorized users trying to access admin get kicked to dashboard
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }
    }

    // 3. Auth Page Redirect (If already logged in)
    if ((request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/signup') && user) {
        // Smart redirect based on role
        if (user.user_metadata?.role === 'admin') {
            return NextResponse.redirect(new URL('/admin', request.url));
        }
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return supabaseResponse
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Feel free to modify this pattern to include more paths.
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
