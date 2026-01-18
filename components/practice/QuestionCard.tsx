"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Check, X, ArrowRight, Flag, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import confetti from "canvas-confetti";

interface Option {
    id: string;
    text: string;
}

interface Question {
    id: string;
    text: string;
    options: Option[];
    correctId: string;
    explanation: string;
}

interface QuestionCardProps {
    question: Question;
    onNext: () => void;
    onAnswer?: (isCorrect: boolean, selectedId: string) => void;
}

export function QuestionCard({ question, onNext, onAnswer }: QuestionCardProps) {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [status, setStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle');
    const [showExplanation, setShowExplanation] = useState(false);

    // Reset state when question changes
    useEffect(() => {
        setSelectedId(null);
        setStatus('idle');
        setShowExplanation(false);
    }, [question.id]);

    const handleCheck = () => {
        if (!selectedId) return;

        const isCorrect = selectedId === question.correctId;

        if (isCorrect) {
            setStatus('correct');
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#22c55e', '#4ade80', '#ffffff']
            });
            if (onAnswer) onAnswer(true, selectedId);
        } else {
            setStatus('incorrect');
            if (onAnswer) onAnswer(false, selectedId);
        }
    };

    const handleContinue = () => {
        onNext();
    };

    return (
        <div className="w-full max-w-3xl mx-auto pb-32">
            {/* Question Area */}
            <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
                    {question.text}
                </h2>
            </div>

            {/* Options Grid */}
            <div className="grid md:grid-cols-2 gap-4">
                {question.options.map((option) => {
                    const isSelected = selectedId === option.id;
                    const isDisabled = status !== 'idle';

                    return (
                        <motion.button
                            key={option.id}
                            whileHover={!isDisabled ? { scale: 1.02 } : {}}
                            whileTap={!isDisabled ? { scale: 0.98 } : {}}
                            onClick={() => !isDisabled && setSelectedId(option.id)}
                            className={cn(
                                "relative p-6 rounded-2xl border-2 text-left transition-all duration-200 h-full flex flex-col justify-center min-h-[120px]",
                                isSelected
                                    ? "border-indigo-600 bg-indigo-50 shadow-[0_0_0_2px_rgba(79,70,229,0.2)]"
                                    : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm",
                                isDisabled && !isSelected && "opacity-50 grayscale",
                                isDisabled && isSelected && status === 'correct' && "border-green-500 bg-green-50",
                                isDisabled && isSelected && status === 'incorrect' && "border-rose-500 bg-rose-50"
                            )}
                        >
                            <div className="flex items-center justify-between w-full mb-2">
                                <span className={cn(
                                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2",
                                    isSelected
                                        ? "border-indigo-600 text-indigo-600 bg-white"
                                        : "border-slate-200 text-slate-400"
                                )}>
                                    {option.id.toUpperCase()}
                                </span>
                                {isSelected && (
                                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                                        <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center">
                                            <div className="w-2.5 h-2.5 bg-white rounded-full" />
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                            <span className={cn(
                                "text-lg font-medium",
                                isSelected ? "text-indigo-900" : "text-slate-700"
                            )}>
                                {option.text}
                            </span>
                        </motion.button>
                    );
                })}
            </div>

            {/* Floating Bottom Action Bar */}
            <AnimatePresence>
                <motion.div
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    className={cn(
                        "fixed bottom-0 left-0 right-0 p-4 border-t",
                        status === 'correct' ? "bg-green-100 border-green-200" :
                            status === 'incorrect' ? "bg-rose-100 border-rose-200" :
                                "bg-white border-slate-100"
                    )}
                >
                    <div className="max-w-3xl mx-auto flex items-center justify-between">
                        {/* Feedback Text area */}
                        <div className="flex-1">
                            {status === 'correct' && (
                                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3 text-green-800">
                                    <div className="bg-green-200 p-2 rounded-full">
                                        <Check className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-lg">Unstoppable!</p>
                                        <p className="text-sm text-green-700 font-medium">+15 XP</p>
                                    </div>
                                </motion.div>
                            )}

                            {status === 'incorrect' && (
                                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3 text-rose-800">
                                    <div className="bg-rose-200 p-2 rounded-full">
                                        <X className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-lg">Not quite right</p>
                                        <button
                                            onClick={() => setShowExplanation(!showExplanation)}
                                            className="text-sm underline font-semibold flex items-center gap-1 hover:text-rose-900"
                                        >
                                            <HelpCircle className="w-3 h-3" />
                                            See Explanation
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        {/* Action Button */}
                        <div>
                            {status === 'idle' ? (
                                <Button
                                    size="lg"
                                    className="rounded-full px-12 h-14 text-lg font-bold shadow-xl shadow-slate-200 bg-slate-200 text-slate-400 hover:bg-slate-300 data-[active=true]:bg-black data-[active=true]:text-white data-[active=true]:shadow-slate-900/20"
                                    data-active={!!selectedId}
                                    disabled={!selectedId}
                                    onClick={handleCheck}
                                >
                                    Check
                                </Button>
                            ) : (
                                <Button
                                    size="lg"
                                    onClick={handleContinue}
                                    className={cn(
                                        "rounded-full px-12 h-14 text-lg font-bold shadow-xl transition-all hover:scale-105",
                                        status === 'correct' ? "bg-green-600 hover:bg-green-700 shadow-green-200 text-white" :
                                            "bg-rose-600 hover:bg-rose-700 shadow-rose-200 text-white"
                                    )}
                                >
                                    Continue <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Explanation Slide-out */}
                    {status !== 'idle' && (
                        <div className="max-w-3xl mx-auto mt-4 overflow-hidden">
                            <AnimatePresence>
                                {(status === 'correct' || showExplanation) && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="text-slate-700 bg-white/50 p-4 rounded-xl border border-black/5"
                                    >
                                        <p className="font-medium mb-1 text-xs uppercase tracking-wider text-slate-400">Explanation</p>
                                        <p>{question.explanation}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
