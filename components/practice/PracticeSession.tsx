"use client";

import { saveProgress } from "@/app/actions/user";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { QuestionCard } from "./QuestionCard";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Home } from "lucide-react";

interface Option {
    id: string;
    text: string;
}

interface Question {
    id: string;
    question_text: string;
    options: Option[] | any; // Handling JSONB return
    correct_option: string;
    explanation: string;
}

interface PracticeSessionProps {
    subject: string;
    topic: string;
    initialQuestions: Question[];
}

export function PracticeSession({ subject, topic, initialQuestions }: PracticeSessionProps) {
    const [questions] = useState<Question[]>(initialQuestions);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => {
            setUserId(data.user?.id || null);
        });
    }, []);

    const handleAnswer = async (isCorrect: boolean, selectedId: string) => {
        const question = questions[currentIndex];
        if (userId && question) {
            await saveProgress(userId, question.id, isCorrect, selectedId);
        }
    };

    if (!questions || questions.length === 0) {
        return (
            <div className="max-w-2xl mx-auto py-20 text-center">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">No questions found</h2>
                <p className="text-slate-600 mb-8">
                    We couldn't find any questions for {topic.replace(/-/g, ' ')}.
                    Check back later or try another topic.
                </p>
                <Link href="/practice">
                    <Button>Back to Practice</Button>
                </Link>
            </div>
        );
    }

    const isCompleted = currentIndex >= questions.length;

    if (isCompleted) {
        return (
            <div className="max-w-2xl mx-auto py-20 text-center animate-in fade-in slide-in-from-bottom-4">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-4xl">🎉</span>
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Topic Complete!</h2>
                <p className="text-slate-600 mb-8 max-w-md mx-auto">
                    You've practiced all available questions for this session. Great job staying inconsistent!
                </p>
                <div className="flex gap-4 justify-center">
                    <Link href="/practice">
                        <Button variant="outline"><Home className="w-4 h-4 mr-2" /> Back to Home</Button>
                    </Link>
                    <Button onClick={() => setCurrentIndex(0)}>Practice Again</Button>
                </div>
            </div>
        )
    }

    const question = questions[currentIndex];

    // Parse options if they come as string from DB (sometimes happens with JSONB/Supabase)
    const parsedQuestion = {
        ...question,
        text: question.question_text, // Map DB field to Component prop
        correctId: question.correct_option, // Map DB field
        options: typeof question.options === 'string' ? JSON.parse(question.options) : question.options
    };

    return (
        <div className="max-w-4xl mx-auto py-8">
            <div className="mb-8 px-4">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold">⚡ 0</span>
                    </div>
                    <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map(d => (
                            <div key={d} className="w-8 h-8 rounded-full border-2 border-slate-200 flex items-center justify-center text-xs font-bold text-slate-300">
                                {['M', 'T', 'W', 'T', 'F'][d - 1]}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-green-500 transition-all duration-500 ease-out rounded-full"
                        style={{ width: `${((currentIndex) / questions.length) * 100}%` }}
                    />
                </div>
            </div>

            <div className="text-center mb-8">
                <h1 className="text-xl font-medium text-slate-400 uppercase tracking-widest mb-2">
                    {subject.replace(/-/g, ' ')}
                </h1>
            </div>

            <QuestionCard
                // @ts-ignore - mismatch between strict types but runtime structure is handled
                question={parsedQuestion}
                onNext={() => setCurrentIndex(c => c + 1)}
                onAnswer={handleAnswer}
            />
        </div>
    );
}
