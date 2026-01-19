import { getLeaderboard, getUserStats } from "@/app/actions/user";
import { DailyDrop } from "@/components/gamification/DailyDrop";
import { PersonalProgress } from "@/components/dashboard/PersonalProgress";
import { TrophyCabinet } from "@/components/gamification/Trophies";

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { Button } from "@/components/ui/Button";
import { Flame, Target, Trophy, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/ui/Animations";
import { CountUp } from "@/components/ui/CountUp";

export default async function DashboardPage() {
    const cookieStore = await cookies()
    const supabaseServer = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) { return cookieStore.get(name)?.value }
            },
        }
    )

    const { data: { user } } = await supabaseServer.auth.getUser()

    if (!user) {
        return (
            <div className="container mx-auto px-4 py-20 text-center"><p>Please sign in</p></div>
        )
    }

    const stats = await getUserStats(user.id);

    return (
        <div className="min-h-screen bg-slate-50">
            <main className="container mx-auto px-4 py-8">

                <Reveal>
                    <header className="mb-8 flex justify-between items-end">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900">
                                Welcome back, {user.user_metadata?.full_name?.split(' ')[0] || 'Scholar'}!
                            </h1>
                            <p className="text-slate-600">Here is your progress so far.</p>
                        </div>
                    </header>
                </Reveal>

                {/* Top Section: Daily Drop and Stats */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    <div className="md:col-span-1">
                        <Reveal delay={0.1}>
                            <DailyDrop />
                        </Reveal>
                    </div>
                    <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Reveal delay={0.2}>
                            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow h-full">
                                <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                                    <Trophy className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-500">Accuracy</p>
                                    <p className="text-2xl font-bold text-slate-900"><CountUp end={stats?.accuracy || 0} />%</p>
                                    <p className="text-xs text-slate-400">{stats?.correct || 0} correct</p>
                                </div>
                            </div>
                        </Reveal>
                        <Reveal delay={0.3}>
                            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow h-full">
                                <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600">
                                    <Flame className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-500">Current Streak</p>
                                    <p className="text-2xl font-bold text-slate-900"><CountUp end={stats?.streak || 0} /> Days</p>
                                    <p className="text-xs text-slate-400">{stats?.xp || 0} XP Earned</p>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>


                {/* Main Grid: Content + Leaderboard + Quick Actions */}
                <div className="grid lg:grid-cols-4 gap-8">

                    {/* Left Column: Recommended & Trophies */}
                    <section className="lg:col-span-3 space-y-8">
                        <Reveal delay={0.4}>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-bold text-slate-900">Recommended for You</h2>
                                <Link href="/practice" className="text-sm font-medium text-indigo-600 hover:underline">View all</Link>
                            </div>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <Link href="/practice/english/reading-comprehension">
                                    <div className="p-4 rounded-xl bg-white border border-slate-200 hover:border-indigo-300 transition-all flex items-center gap-4 group">
                                        <div className="w-12 h-12 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">Eg</div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-slate-900 group-hover:text-indigo-600">Reading Comprehension</h3>
                                            <p className="text-sm text-slate-500">English • Continue</p>
                                        </div>
                                        <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-600 transition-colors" />
                                    </div>
                                </Link>
                                <Link href="/practice/general-test/numerical-ability">
                                    <div className="p-4 rounded-xl bg-white border border-slate-200 hover:border-indigo-300 transition-all flex items-center gap-4 group">
                                        <div className="w-12 h-12 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">GT</div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-slate-900 group-hover:text-emerald-600">Numerical Ability</h3>
                                            <p className="text-sm text-slate-500">General Test</p>
                                        </div>
                                        <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-emerald-600 transition-colors" />
                                    </div>
                                </Link>
                            </div>
                        </Reveal>

                        <Reveal delay={0.5}>
                            <TrophyCabinet />
                        </Reveal>
                    </section>

                    {/* Right Column: Personal Progress & Quick Actions */}
                    <aside className="space-y-6">
                        <Reveal delay={0.6}>
                            <PersonalProgress />
                        </Reveal>

                        <Reveal delay={0.7}>
                            <h2 className="text-xl font-bold text-slate-900 mb-4">Quick Actions</h2>
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
                            </div>
                        </Reveal>
                    </aside>
                </div>

            </main>
        </div>
    );
}
