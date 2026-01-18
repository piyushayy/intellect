"use client";

import { useEffect, useState } from "react";
import { createQuestion } from "@/app/actions/admin";
import { getSubjectsWithTopics } from "@/app/actions/practice";
import { Button } from "@/components/ui/Button";
import { Loader2, Plus, Save } from "lucide-react";

export default function AddQuestionPage() {
    const [subjects, setSubjects] = useState<any[]>([]);
    const [selectedSubjectId, setSelectedSubjectId] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        getSubjectsWithTopics().then(setSubjects);
    }, []);

    const selectedSubject = subjects.find(s => s.id === selectedSubjectId);

    const handleSubmit = async (formData: FormData) => {
        setLoading(true);
        setMessage("");

        const res = await createQuestion(formData);

        setLoading(false);
        if (res.success) {
            setMessage("Question added successfully!");
            // specific form reset logic or redirect could go here
            // form.reset() approach needed if using ref, or just reload page for now
            window.location.reload();
        } else {
            setMessage("Error: " + res.error);
        }
    };

    return (
        <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-slate-900">Add New Question</h1>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                <form action={handleSubmit} className="space-y-6">

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Subject</label>
                            <select
                                name="subject_id"
                                required
                                className="w-full p-3 rounded-xl border border-slate-200 bg-white"
                                onChange={(e) => setSelectedSubjectId(e.target.value)}
                            >
                                <option value="">Select Subject</option>
                                {subjects.map(s => (
                                    <option key={s.id} value={s.id}>{s.name}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Topic</label>
                            <select
                                name="topic_id"
                                required
                                className="w-full p-3 rounded-xl border border-slate-200 bg-white"
                                disabled={!selectedSubject}
                            >
                                <option value="">Select Topic</option>
                                {selectedSubject?.topics.map((t: any) => (
                                    <option key={t.id} value={t.id}>{t.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Question Text</label>
                        <textarea
                            name="question_text"
                            required
                            rows={3}
                            className="w-full p-3 rounded-xl border border-slate-200"
                            placeholder="e.g. What is the powerhouse of the cell?"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-6 rounded-xl">
                        {['a', 'b', 'c', 'd'].map((opt) => (
                            <div key={opt}>
                                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Option {opt}</label>
                                <input
                                    name={`option_${opt}`}
                                    required
                                    className="w-full p-2 rounded-lg border border-slate-200"
                                    placeholder={`Option ${opt.toUpperCase()} text`}
                                />
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Correct Option</label>
                            <select
                                name="correct_option"
                                required
                                className="w-full p-3 rounded-xl border border-slate-200 bg-white"
                            >
                                <option value="a">Option A</option>
                                <option value="b">Option B</option>
                                <option value="c">Option C</option>
                                <option value="d">Option D</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Difficulty</label>
                            <select
                                name="difficulty"
                                required
                                className="w-full p-3 rounded-xl border border-slate-200 bg-white"
                            >
                                <option value="easy">Easy</option>
                                <option value="medium">Medium</option>
                                <option value="hard">Hard</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Explanation</label>
                        <textarea
                            name="explanation"
                            required
                            rows={3}
                            className="w-full p-3 rounded-xl border border-slate-200"
                            placeholder="Why is the answer correct?"
                        />
                    </div>

                    {message && (
                        <div className="p-4 bg-indigo-50 text-indigo-700 rounded-xl text-sm font-medium">
                            {message}
                        </div>
                    )}

                    <Button disabled={loading} className="w-full h-12 text-base">
                        {loading ? <Loader2 className="animate-spin" /> : <><Plus className="w-4 h-4 mr-2" /> Create Question</>}
                    </Button>

                </form>
            </div>
        </div>
    );
}
