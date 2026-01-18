"use client";

import { useState } from "react";
import { addQuestionsToTest } from "@/app/actions/admin";
import { Button } from "@/components/ui/Button";
import { Plus, Trash, Search, CheckCircle2, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

// Placeholder types
interface Question {
    id: string;
    question_text: string;
    difficulty: string;
    subject_id: string;
}

interface TestManagerProps {
    test: any;
    availableQuestions: Question[];
}

export function TestManager({ test, availableQuestions }: TestManagerProps) {
    const router = useRouter();
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    // Filter out questions already in the test
    const existingIds = new Set(test.questions.map((q: any) => q.question.id));
    const cleanAvailable = availableQuestions.filter(q => !existingIds.has(q.id));

    const handleAdd = async () => {
        setLoading(true);
        const res = await addQuestionsToTest(test.id, selectedIds);
        setLoading(false);
        if (res.success) {
            setSelectedIds([]);
            router.refresh(); // Refresh data to show in left column
        } else {
            alert("Error: " + res.error);
        }
    };

    // We will use the Server Actions directly in the Page component and pass handlers or use binding
    // For this 'use client' component, passing Server Actions as props is cleanest or importing if 'use server' file is separate.

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left: Added Questions */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-4 flex justify-between">
                    <span>Questions in Test</span>
                    <span className="text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full text-sm">
                        {test.questions.length}
                    </span>
                </h3>

                <div className="space-y-3 h-[500px] overflow-y-auto pr-2">
                    {test.questions.length === 0 && (
                        <p className="text-slate-400 text-center py-10">No questions added yet.</p>
                    )}
                    {test.questions.map((item: any) => (
                        <div key={item.question.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-start group">
                            <p className="text-sm text-slate-700 line-clamp-2">{item.question.question_text}</p>
                            <button
                                className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                            // onClick={() => remove(item.question.id)}
                            >
                                <Trash className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right: Available Questions */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-4">Question Bank</h3>

                {selectedIds.length > 0 && (
                    <div className="mb-4 flex justify-between items-center bg-indigo-50 p-3 rounded-xl animate-in slide-in-from-top-2">
                        <span className="text-sm font-medium text-indigo-700">{selectedIds.length} selected</span>
                        <Button size="sm" onClick={handleAdd} disabled={loading}>
                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Add to Test"}
                        </Button>
                    </div>
                )}

                <div className="space-y-3 h-[500px] overflow-y-auto pr-2">
                    {cleanAvailable.map((q) => {
                        const isSelected = selectedIds.includes(q.id);
                        return (
                            <div
                                key={q.id}
                                className={`p-3 rounded-xl border cursor-pointer transition-all ${isSelected ? 'bg-indigo-50 border-indigo-500 ring-1 ring-indigo-500' : 'bg-white border-slate-200 hover:border-indigo-300'}`}
                                onClick={() => {
                                    if (isSelected) setSelectedIds(ids => ids.filter(i => i !== q.id));
                                    else setSelectedIds(ids => [...ids, q.id]);
                                }}
                            >
                                <div className="flex justify-between items-start gap-3">
                                    <p className="text-sm text-slate-700 line-clamp-2 flex-1">{q.question_text}</p>
                                    {isSelected && <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />}
                                </div>
                                <div className="mt-2 flex gap-2">
                                    <span className="text-[10px] uppercase font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                                        {q.difficulty}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
