import { createClient } from "@/lib/supabase-server";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Upload, Search, Edit } from "lucide-react";

import { DeleteQuestionButton } from "@/components/admin/QuestionActions";

async function getQuestions() {
    const supabase = await createClient();
    const { data } = await supabase
        .from('questions')
        .select('*, subjects(name), topics(name)')
        .order('created_at', { ascending: false })
        .limit(50);
    return data || [];
}

export default async function AdminQuestionsPage() {
    const questions = await getQuestions();

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-slate-900">Question Bank</h1>
                <Link href="/admin/upload">
                    <Button>
                        <Upload className="w-4 h-4 mr-2" /> Import Questions
                    </Button>
                </Link>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex gap-4">
                    {/* Search Placeholder */}
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Search questions by text..."
                        />
                    </div>
                </div>

                <div className="divide-y divide-slate-100">
                    {questions.map((q: any) => (
                        <div key={q.id} className="p-6 hover:bg-slate-50 transition-colors group">
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex flex-col gap-1">
                                    <span className="text-xs font-bold text-indigo-600 uppercase tracking-wide">
                                        {q.subjects?.name} • {q.topics?.name}
                                    </span>
                                    <h3 className="font-medium text-slate-900 line-clamp-2">{q.question_text}</h3>
                                </div>
                                <DeleteQuestionButton id={q.id} />
                            </div>
                            <div className="flex items-center gap-3 text-sm text-slate-500">
                                <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase
                            ${q.difficulty === 'easy' ? 'bg-emerald-100 text-emerald-700' :
                                        q.difficulty === 'medium' ? 'bg-amber-100 text-amber-700' :
                                            'bg-rose-100 text-rose-700'}
                        `}>
                                    {q.difficulty}
                                </span>
                                <span>•</span>
                                <span>Type: MCQ</span>
                            </div>
                        </div>
                    ))}
                    {questions.length === 0 && (
                        <div className="p-12 text-center text-slate-500">No questions found.</div>
                    )}
                </div>
            </div>
        </div>
    );
}
