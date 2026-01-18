import { Navbar } from "@/components/layout/Navbar";
import { getUserStats } from "@/app/actions/user";
import { supabase } from "@/lib/supabase"; // Server Client in server components?
// Wait, for Server Components we need createServerComponentClient or just standard rest call if we have token
// But 'supabase' exported from lib/supabase is createClient (client-side usually)
// For Server Actions / Server Components we typically use cookie-based auth.
// Since we set up a simple 'createClient' in lib/supabase which uses env vars, it acts as a Service Role or Anon client.
// To get specific user context in Server Component, we need cookies.

// However, for this MVP, I will use `supabase.auth.getUser()` which might not work in Server Component without properly forwarding cookies
// OR I will fetch data on Client.
// Let's stick to Server Actions helper `getUserStats` which I defined earlier.
// `getUserStats` takes a `userId`. 
// To get `userId` in Server Component, we need cookies() from next/headers.

import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { Button } from "@/components/ui/Button";
import { Flame, Target, Trophy, ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
    const cookieStore = await cookies()

    const supabaseServer = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value
                },
            },
        }
    )

    const { data: { user } } = await supabaseServer.auth.getUser()

    if (!user) {
        return (
            <div className="min-h-screen bg-slate-50">
                <Navbar />
                <div className="container mx-auto px-4 py-20 text-center">
                    <h1 className="text-3xl font-bold mb-4">Please Sign In</h1>
                    <p className="text-slate-600 mb-8">You need to be logged in to view your dashboard.</p>
                    <Link href="/login"><Button>Sign In</Button></Link>
                </div>
            </div>
        )
    }

    const stats = await getUserStats(user.id);

    return (
        <div className="min-h-screen bg-slate-50">
            <main className="container mx-auto px-4 py-8">

                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900">
                        Welcome back, {user.user_metadata?.full_name?.split(' ')[0] || 'Scholar'}!
                    </h1>
                    <p className="text-slate-600">Here is your progress so far.</p>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                            <Target className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500">Questions Solved</p>
                            <p className="text-2xl font-bold text-slate-900">{stats?.total || 0}</p>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                            <Trophy className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500">Accuracy</p>
                            <p className="text-2xl font-bold text-slate-900">{stats?.accuracy || 0}%</p>
                            <p className="text-xs text-slate-400">{stats?.correct || 0} correct answers</p>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600">
                            <Flame className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500">Current Streak</p>
                            <p className="text-2xl font-bold text-slate-900">{stats?.streak || 0} Days</p>
                            <p className="text-xs text-slate-400">{stats?.xp || 0} XP Earned</p>
                        </div>
                    </div>
                </div>

                {/* Continue Learning */}
                {/* Content Grid */}
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Recent Activity */}
                    <section className="md:col-span-2">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-slate-900">Recommended for You</h2>
                            <Link href="/practice" className="text-sm font-medium text-indigo-600 hover:underline">
                                View all
                            </Link>
                        </div>

                        <div className="grid gap-4">
                            <Link href="/practice/english/reading-comprehension">
                                <div className="p-4 rounded-xl bg-white border border-slate-200 hover:border-indigo-300 transition-all flex items-center gap-4 group">
                                    <div className="w-12 h-12 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                                        Eg
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-slate-900 group-hover:text-indigo-600">Reading Comprehension</h3>
                                        <p className="text-sm text-slate-500">English • Continue where you left off</p>
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-600 transition-colors" />
                                </div>
                            </Link>

                            <Link href="/practice/general-test/numerical-ability">
                                <div className="p-4 rounded-xl bg-white border border-slate-200 hover:border-indigo-300 transition-all flex items-center gap-4 group">
                                    <div className="w-12 h-12 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                                        GT
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-slate-900 group-hover:text-emerald-600">Numerical Ability</h3>
                                        <p className="text-sm text-slate-500">General Test • Popular Topic</p>
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-emerald-600 transition-colors" />
                                </div>
                            </Link>

                            <Link href="/tests">
                                <div className="p-4 rounded-xl bg-white border border-slate-200 hover:border-rose-300 transition-all flex items-center gap-4 group">
                                    <div className="w-12 h-12 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
                                        MT
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-slate-900 group-hover:text-rose-600">Latest Mock Test</h3>
                                        <p className="text-sm text-slate-500">Tests • Challenge yourself</p>
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-rose-600 transition-colors" />
                                </div>
                            </Link>
                        </div>
                    </section>

                    {/* Quick Actions / Up Next */}
                    <aside>
                        <h2 className="text-xl font-bold text-slate-900 mb-6">Quick Actions</h2>
                        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-4">
                            <Link href="/mistakes">
                                <Button variant="outline" className="w-full justify-start h-12 text-slate-600 hover:text-rose-600 hover:bg-rose-50 border-slate-200">
                                    <span className="w-6 h-6 mr-3 text-lg">💡</span> Review Mistakes
                                </Button>
                            </Link>
                            <Link href="/pyq">
                                <Button variant="outline" className="w-full justify-start h-12 text-slate-600 hover:text-amber-600 hover:bg-amber-50 border-slate-200">
                                    <span className="w-6 h-6 mr-3 text-lg">📚</span> Solve PYQs
                                </Button>
                            </Link>
                            <div className="pt-4 border-t border-slate-100 mt-4">
                                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Quote of the Day</div>
                                <p className="text-sm text-slate-600 italic">"The beautiful thing about learning is that no one can take it away from you."</p>
                                <p className="text-xs text-slate-400 mt-1 text-right">- B.B. King</p>
                            </div>
                        </div>
                    </aside>
                </div>

            </main>
        </div>
    );
}
