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
                        <Button variant="outline">
                            <Upload className="mr-2 w-4 h-4" /> Bulk Import
                        </Button>
                    </Link>
                    <Link href="/admin/questions/new">
                        <Button>
                            <Plus className="mr-2 w-4 h-4" /> Add Question
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h3 className="text-sm font-medium text-slate-500 mb-2">Total Questions</h3>
                    <p className="text-3xl font-bold text-slate-900">{stats.questionCount}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h3 className="text-sm font-medium text-slate-500 mb-2">Active Users</h3>
                    <p className="text-3xl font-bold text-slate-900">{stats.userCount}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h3 className="text-sm font-medium text-slate-500 mb-2">Tests Completed</h3>
                    <p className="text-3xl font-bold text-slate-900">{stats.attemptCount}</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">Recent Questions</h2>
                <div className="space-y-4">
                    {stats.recentQuestions.length === 0 ? (
                        <p className="text-slate-500 text-sm italic">No questions added yet.</p>
                    ) : (
                        stats.recentQuestions.map((q: any) => (
                            <div key={q.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                                <div className="flex-1 min-w-0 pr-4">
                                    <p className="font-medium text-slate-900 line-clamp-1">{q.question_text}</p>
                                    <p className="text-sm text-slate-500">
                                        {q.subjects?.name || 'Unknown Subject'} • {q.topics?.name || 'General'}
                                    </p>
                                </div>
                                <span className="text-xs font-medium px-2 py-1 bg-emerald-100 text-emerald-700 rounded-lg whitespace-nowrap">
                                    {new Date(q.created_at).toLocaleDateString()}
                                </span>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
