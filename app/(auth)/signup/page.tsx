'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { supabase } from '@/lib/supabase'
import { Loader2 } from 'lucide-react'

export default function SignupPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [fullName, setFullName] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        // 1. Sign up
        const { data, error: authError } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                },
            },
        })

        if (authError) {
            setError(authError.message)
            setLoading(false)
            return
        }

        // Check if session was created (if not, email verification is likely enabled)
        if (!data.session) {
            // Try to sign in immediately just in case (sometimes helps with race conditions or specific configs)
            const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
                email,
                password
            });

            if (loginData.session) {
                router.refresh();
                router.push('/dashboard');
                return;
            }

            // If still no session, then email verification is definitely ON
            setError("Account created! Please check your email to verify your account, or ask Admin to disable email verification.");
            setLoading(false);
            return;
        }

        // Success - Redirect
        router.refresh()
        router.push('/dashboard')
    }

    return (
        <>
            <div className="text-center">
                <h2 className="text-2xl font-bold text-slate-900">Create an account</h2>
                <p className="mt-2 text-slate-600">Start your journey to CUET success today</p>
            </div>

            <form onSubmit={handleSignup} className="mt-8 space-y-6">
                {error && (
                    <div className="p-3 text-sm text-rose-600 bg-rose-50 border border-rose-100 rounded-lg">
                        {error}
                    </div>
                )}

                <div className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-700">Full Name</label>
                        <input
                            id="name"
                            type="text"
                            required
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                            placeholder="John Doe"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email address</label>
                        <input
                            id="email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                            placeholder="you@example.com"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-slate-700">Password</label>
                        <input
                            id="password"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                            placeholder="••••••••"
                        />
                    </div>
                </div>

                <Button type="submit" className="w-full h-11 text-base" disabled={loading}>
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Create Account'}
                </Button>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-slate-200" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-slate-50 px-2 text-slate-500">Or continue with</span>
                    </div>
                </div>

                <Button
                    type="button"
                    variant="outline"
                    className="w-full h-11"
                    onClick={() => supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: `${location.origin}/auth/callback` } })}
                >
                    <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                        <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                    </svg>
                    Google
                </Button>

                <p className="text-center text-sm text-slate-600">
                    Already have an account?{' '}
                    <Link href="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
                        Sign in
                    </Link>
                </p>
            </form>
        </>
    )
}
