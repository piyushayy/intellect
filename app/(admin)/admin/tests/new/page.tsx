"use client";

import { useEffect, useState } from "react";
import { createMockTest } from "@/app/actions/admin";
import { getSubjectsWithTopics } from "@/app/actions/practice";
import { Button } from "@/components/ui/Button";
import { Loader2, Plus } from "lucide-react";

export default function CreateTestPage() {
    const [subjects, setSubjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        getSubjectsWithTopics().then(setSubjects);
    }, []);

    const handleSubmit = async (formData: FormData) => {
        setLoading(true);
        setMessage("");

        // @ts-ignore
        const res = await createMockTest(formData);

        setLoading(false);
        if (res.success) {
            setMessage("Test created successfully! You can now add questions to it.");
            // Redirect or clear
        } else {
            setMessage("Error: " + res.error);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-slate-900">Create Mock Test</h1>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                <form action={handleSubmit} className="space-y-6">

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Test Title</label>
                        <input
                            name="title"
                            required
                            className="w-full p-3 rounded-xl border border-slate-200"
                            placeholder="e.g. Full Syllabus Mock Test - Phase 1"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Subject Scope</label>
                            <select
                                name="subject_id"
                                className="w-full p-3 rounded-xl border border-slate-200 bg-white"
                            >
                                <option value="all">Full Syllabus (All Subjects)</option>
                                {subjects.map(s => (
                                    <option key={s.id} value={s.id}>{s.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Duration (Minutes)</label>
                            <input
                                name="duration"
                                type="number"
                                defaultValue={60}
                                required
                                className="w-full p-3 rounded-xl border border-slate-200"
                            />
                        </div>
                    </div>

                    {message && (
                        <div className="p-4 bg-indigo-50 text-indigo-700 rounded-xl text-sm font-medium">
                            {message}
                        </div>
                    )}

                    <Button disabled={loading} className="w-full h-12 text-base">
                        {loading ? <Loader2 className="animate-spin" /> : <><Plus className="w-4 h-4 mr-2" /> Create Test Shell</>}
                    </Button>

                </form>
            </div>
        </div>
    );
}
