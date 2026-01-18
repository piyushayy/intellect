"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { QuestionCard } from "@/components/practice/QuestionCard";
import { Button } from "@/components/ui/Button";
import { Home, RefreshCcw } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";

export default function MistakesPage() {
    const [mistakes, setMistakes] = useState<any[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => {
            if (data.user) {
                setUserId(data.user.id);
                fetchMistakes(data.user.id);
            }
        });
    }, []);

    const fetchMistakes = async (uid: string) => {
        setLoading(true);
        // Join user_progress with questions to get the question details
        // Note: This requires a foreign key relationship set up properly or manual join
        // Since we didn't strictly enforce FK in earlier steps, we might need a stored procedure or just fetching IDs then questions.
        // Let's assume we can fetch progress where is_correct = false

        const { data: progressData } = await supabase
            .from('user_progress')
            .select('question_id')
            .eq('user_id', uid)
            .eq('is_correct', false);

        if (!progressData || progressData.length === 0) {
            setMistakes([]);
            setLoading(false);
            return;
        }

        const questionIds = progressData.map(p => p.question_id);

        // Fetch actual questions
        const { data: questionsData } = await supabase
            .from('questions')
            .select('*')
            .in('id', questionIds);

        setMistakes(questionsData || []);
        setLoading(false);
    };

    const handleAnswer = async (isCorrect: boolean, selectedId: string) => {
        // If they get it right this time, we could remove it from mistakes?
        // For now, let's just let them practice without modifying the DB "mistake" status immediately
        // allowing repetition.
        if (isCorrect && userId) {
            // Optional: Mark as corrected in DB?
            // await supabase.from('user_progress').update({ is_correct: true }).eq(...)
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <RefreshCcw className="w-8 h-8 animate-spin text-indigo-600" />
            </div>
        );
    }

    if (mistakes.length === 0) {
        return (
            <div className="min-h-screen bg-slate-50">
                {/* Navbar provided by layout */}
                <div className="max-w-2xl mx-auto py-20 text-center px-4">
                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
                        ✨
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">No mistakes found!</h2>
                    <p className="text-slate-600 mb-8">
                        You haven't made any mistakes yet, or you've mastered everything. Keep practicing to challenge yourself!
                    </p>
                    <Link href="/practice">
                        <Button>Go to Practice</Button>
                    </Link>
                </div>
            </div>
        );
    }

    if (currentIndex >= mistakes.length) {
        return (
            <div className="min-h-screen bg-slate-50">
                {/* Navbar provided by layout */}
                <div className="max-w-2xl mx-auto py-20 text-center px-4">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Review Complete</h2>
                    <p className="text-slate-600 mb-8">
                        You've reviewed all your logged mistakes.
                    </p>
                    <div className="flex gap-4 justify-center">
                        <Link href="/dashboard">
                            <Button variant="outline"><Home className="w-4 h-4 mr-2" /> Dashboard</Button>
                        </Link>
                        <Button onClick={() => setCurrentIndex(0)}>Review Again</Button>
                    </div>
                </div>
            </div>
        );
    }

    const question = mistakes[currentIndex];
    const parsedQuestion = {
        ...question,
        text: question.question_text,
        correctId: question.correct_option,
        options: typeof question.options === 'string' ? JSON.parse(question.options) : question.options
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="max-w-4xl mx-auto py-12 px-4">
                <header className="mb-12 text-center">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Mistakes Log</h1>
                    <p className="text-slate-500">Reviewing {currentIndex + 1} of {mistakes.length} mistakes</p>
                </header>

                <div className="mb-8">
                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-rose-500 transition-all duration-300"
                            style={{ width: `${((currentIndex) / mistakes.length) * 100}%` }}
                        />
                    </div>
                </div>

                <QuestionCard
                    // @ts-ignore
                    question={parsedQuestion}
                    onNext={() => setCurrentIndex(c => c + 1)}
                    onAnswer={handleAnswer}
                />
            </div>
        </div>
    );
}
