"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { Timer, CheckCircle, ChevronLeft, ChevronRight, Flag } from "lucide-react";
import { submitExam } from "@/app/actions/exam";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

interface ExamSessionProps {
    test: any;
    questions: any[];
}

export function ExamSession({ test, questions }: ExamSessionProps) {
    const router = useRouter();
    const [currentIdx, setCurrentIdx] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [timeLeft, setTimeLeft] = useState(test.duration_minutes * 60);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => setUserId(data.user?.id || null));
    }, []);

    // Timer
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    handleSubmit(); // Auto submit
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    const handleOptionSelect = (qId: string, optId: string) => {
        setAnswers(prev => ({ ...prev, [qId]: optId }));
    };

    const [result, setResult] = useState<{ score: number, total: number, percentage: number, xpEarned: number } | null>(null);

    const handleSubmit = async () => {
        if (!userId) {
            alert("Please login to submit");
            return;
        }
        setIsSubmitting(true);
        const res = await submitExam(test.id, userId, answers);

        if (res.success && typeof res.score === 'number') {
            // @ts-ignore
            setResult(res);
            // Scroll to top
            window.scrollTo(0, 0);
        }
        setIsSubmitting(false);
    };

    const currentQ = questions[currentIdx];
    const options = typeof currentQ.options === 'string' ? JSON.parse(currentQ.options) : currentQ.options;

    if (result) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 p-4">
                <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100 text-center max-w-lg w-full animate-in zoom-in-95">
                    <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span className="text-4xl">🏆</span>
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Test Completed!</h1>
                    <p className="text-slate-500 mb-8">Great job finishing the exam.</p>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="bg-slate-50 p-4 rounded-2xl">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Score</p>
                            <p className="text-3xl font-bold text-indigo-600">{result.score}/{result.total}</p>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-2xl">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">XP Earned</p>
                            <p className="text-3xl font-bold text-amber-500">+{result.xpEarned}</p>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <Button className="w-full" onClick={() => router.push('/dashboard')}>
                            Dashboard
                        </Button>
                        <Button variant="outline" className="w-full" onClick={() => router.push('/tests')}>
                            Take Another
                        </Button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col md:flex-row h-[calc(100vh-80px)] overflow-hidden">

            {/* Sidebar (Question Palette) */}
            <aside className="w-full md:w-72 bg-white border-r border-slate-200 hidden md:flex flex-col">
                <div className="p-6 border-b border-slate-100 bg-slate-50">
                    <h2 className="font-bold text-slate-800">{test.title}</h2>
                    <p className="text-sm text-slate-500 mt-1">Question {currentIdx + 1} of {questions.length}</p>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                    <div className="grid grid-cols-5 gap-3">
                        {questions.map((_, idx) => {
                            const ansStatus = answers[questions[idx].id]; // 'opt_id' or 'skipped'
                            const isSkipped = ansStatus === 'skipped';
                            const isAnswered = ansStatus && !isSkipped;
                            const isCurrent = currentIdx === idx;

                            return (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentIdx(idx)}
                                    className={cn(
                                        "h-10 w-10 rounded-lg flex items-center justify-center text-sm font-bold transition-all border",
                                        isCurrent ? "bg-indigo-600 text-white border-indigo-600" :
                                            isAnswered ? "bg-emerald-100 text-emerald-700 border-emerald-200" :
                                                isSkipped ? "bg-slate-100 text-slate-400 border-slate-200" :
                                                    "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                                    )}
                                >
                                    {idx + 1}
                                </button>
                            )
                        })}
                    </div>
                </div>

                <div className="p-6 border-t border-slate-200">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-slate-600">Time Remaining</span>
                        <span className="text-lg font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                            {formatTime(timeLeft)}
                        </span>
                    </div>
                    <Button onClick={handleSubmit} disabled={isSubmitting} className="w-full bg-rose-600 hover:bg-rose-700 text-white">
                        Submit Test
                    </Button>
                </div>
            </aside>

            {/* Mobile Header (Timer only) */}
            <div className="md:hidden bg-slate-900 text-white p-4 flex justify-between items-center">
                <span className="font-mono">{formatTime(timeLeft)}</span>
                <Button size="sm" variant="outline" className="text-white border-white/20" onClick={handleSubmit}>Submit</Button>
            </div>

            {/* Main Question Area */}
            <main className="flex-1 bg-slate-50 overflow-y-auto p-6 md:p-12 pb-24">
                <div className="max-w-3xl mx-auto">
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 min-h-[400px]">
                        <div className="mb-8">
                            <span className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold uppercase mb-4">
                                Q{currentIdx + 1}
                            </span>
                            <h2 className="text-xl md:text-2xl font-medium text-slate-900 leading-relaxed">
                                {currentQ.question_text}
                            </h2>
                        </div>

                        <div className="space-y-3">
                            {options.map((opt: any) => {
                                const isSelected = answers[currentQ.id] === opt.id;
                                return (
                                    <button
                                        key={opt.id}
                                        onClick={() => handleOptionSelect(currentQ.id, opt.id)}
                                        className={cn(
                                            "w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-4 group",
                                            isSelected
                                                ? "border-indigo-600 bg-indigo-50/50"
                                                : "border-slate-100 hover:border-indigo-200 hover:bg-slate-50"
                                        )}
                                    >
                                        <div className={cn(
                                            "w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs transition-colors",
                                            isSelected ? "border-indigo-600 bg-indigo-600 text-white" : "border-slate-300 text-slate-400"
                                        )}>
                                            {isSelected && <CheckCircle className="w-3 h-3" />}
                                        </div>
                                        <span className={cn("text-base", isSelected ? "text-indigo-900 font-medium" : "text-slate-600")}>
                                            {opt.text}
                                        </span>
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    {/* Navigation Footer */}
                    <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-100">
                        <Button
                            variant="ghost"
                            disabled={currentIdx === 0}
                            onClick={() => setCurrentIdx(c => c - 1)}
                            className="text-slate-500 hover:text-slate-900"
                        >
                            <ChevronLeft className="w-4 h-4 mr-2" /> Previous
                        </Button>

                        <div className="flex gap-3">
                            <Button
                                variant="outline"
                                className="border-slate-200 text-slate-500 hover:text-slate-700 hover:bg-slate-50 min-w-[100px]"
                                onClick={() => {
                                    setAnswers(prev => ({ ...prev, [currentQ.id]: 'skipped' }));
                                    if (currentIdx < questions.length - 1) setCurrentIdx(c => c + 1);
                                }}
                            >
                                <Flag className="w-4 h-4 mr-2" /> Skip
                            </Button>

                            <Button
                                className="min-w-[140px]"
                                onClick={() => {
                                    if (currentIdx < questions.length - 1) setCurrentIdx(c => c + 1);
                                }}
                                disabled={currentIdx === questions.length - 1}
                            >
                                Next Question <ChevronRight className="w-4 h-4 ml-2" />
                            </Button>
                        </div>
                    </div>
                </div>
            </main>

        </div>
    );
}
