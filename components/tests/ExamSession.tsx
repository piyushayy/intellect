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

    // Calculate Sanity Check Metrics
    const getSanityReport = (res: any) => {
        const timeTaken = (test.duration_minutes * 60) - timeLeft;
        const avgTimePerQ = timeTaken / (res.total || 1); // Avoid division by zero

        let feedback = "";
        let pace = "";

        // Pace Analysis
        if (avgTimePerQ < 30) {
            pace = "Fast";
            feedback += "You're moving very quickly. ";
        } else if (avgTimePerQ > 120) {
            pace = "Slow";
            feedback += "You're taking your time. ";
        } else {
            pace = "Balanced";
        }

        // Accuracy Analysis
        const accuracy = res.percentage || 0;
        if (accuracy > 85) feedback += "Your accuracy is outstanding! Keep it up.";
        else if (accuracy > 60) feedback += "Good accuracy, but room for refinement.";
        else feedback += "Focus on accuracy before speed.";

        return { timeTaken, pace, feedback, accuracy };
    };

    if (result) {
        const report = getSanityReport(result);
        const formatDuration = (s: number) => `${Math.floor(s / 60)}m ${s % 60}s`;

        return (
            <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 p-4">
                <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100 max-w-2xl w-full animate-in zoom-in-95">

                    <div className="text-center mb-12">
                        <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle className="w-10 h-10 text-emerald-600" />
                        </div>
                        <h1 className="text-3xl font-bold text-slate-900 mb-2">Sanity Check Report</h1>
                        <p className="text-slate-500">{report.feedback}</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                        <div className="bg-slate-50 p-4 rounded-2xl text-center">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Score</p>
                            <p className="text-2xl font-bold text-indigo-600">{result.score}/{result.total}</p>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-2xl text-center">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Accuracy</p>
                            <p className={`text-2xl font-bold ${report.accuracy > 70 ? 'text-emerald-600' : 'text-amber-500'}`}>
                                {report.accuracy}%
                            </p>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-2xl text-center">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Time Taken</p>
                            <p className="text-2xl font-bold text-slate-700">{formatDuration(report.timeTaken)}</p>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-2xl text-center">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Pace</p>
                            <p className="text-2xl font-bold text-slate-700">{report.pace}</p>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <Button className="w-full h-12 text-base" onClick={() => router.push('/dashboard')}>
                            Return to Dashboard
                        </Button>
                        <Button variant="outline" className="w-full h-12 text-base" onClick={() => router.push('/mistakes')}>
                            Review Mistakes
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
