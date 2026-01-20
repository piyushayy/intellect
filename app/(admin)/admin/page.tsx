import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Plus, Upload } from "lucide-react";
import { getAdminStats } from "@/app/actions/admin";

export const revalidate = 0; // Ensure fresh data on every request

export default async function AdminDashboard() {
    const stats = await getAdminStats();

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
                <div className="flex gap-4">
                    <Link href="/admin/upload">
                        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                            <Upload className="mr-2 w-4 h-4" /> Import Questions (JSON)
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <Link href="/admin/questions" className="group">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:border-indigo-500 hover:shadow-md transition-all h-full">
                        <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <Plus className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-slate-900 text-lg">Question Bank</h3>
                        <p className="text-slate-500 text-sm mt-1">Manage, Edit, and Delete practice questions. Total: {stats.questionCount}</p>
                    </div>
                </Link>

                <Link href="/admin/upload" className="group">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:border-indigo-500 hover:shadow-md transition-all h-full">
                        <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <Upload className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-slate-900 text-lg">Bulk Import</h3>
                        <p className="text-slate-500 text-sm mt-1">Quickly add content via JSON files for scaling the platform.</p>
                    </div>
                </Link>

                <Link href="/admin/users" className="group">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:border-indigo-500 hover:shadow-md transition-all h-full">
                        <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                        </div>
                        <h3 className="font-bold text-slate-900 text-lg">Userbase</h3>
                        <p className="text-slate-500 text-sm mt-1">Audit active users and manage roles. Total: {stats.userCount}</p>
                    </div>
                </Link>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-bold text-slate-900">Recent Activity</h2>
                    <Link href="/admin/questions" className="text-indigo-600 font-medium text-sm hover:underline">View All</Link>
                </div>
                <div className="space-y-4">
                    {stats.recentQuestions.length === 0 ? (
                        <p className="text-slate-500 text-sm italic">No activity recorded yet.</p>
                    ) : (
                        stats.recentQuestions.map((q: any) => (
                            <div key={q.id} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-xl hover:bg-white transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className={`w-2 h-2 rounded-full ${q.difficulty === 'easy' ? 'bg-emerald-400' : q.difficulty === 'medium' ? 'bg-amber-400' : 'bg-rose-400'}`} />
                                    <div>
                                        <p className="font-medium text-slate-900 line-clamp-1">{q.question_text}</p>
                                        <p className="text-xs text-slate-400 font-mono">
                                            {q.subjects?.name || 'Unknown'} • {q.topics?.name || 'General'}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="text-[10px] font-bold px-2 py-1 bg-white border border-slate-200 text-slate-500 rounded-md">
                                        {new Date(q.created_at).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
