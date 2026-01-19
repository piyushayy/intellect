"use client";

import { CheckCircle2, Clock, CircleDot, ArrowRight } from "lucide-react";
import Link from "next/link";

export function PersonalProgress() {
    return (
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 h-full">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Your Progress</h3>

            <div className="space-y-6">

                {/* In Progress */}
                <div>
                    <div className="flex items-center gap-2 mb-3 text-indigo-600">
                        <Clock className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-wider">In Progress</span>
                    </div>
                    <div className="bg-indigo-50/50 rounded-xl p-3 border border-indigo-100">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-bold text-slate-700">Calculus: Limits</span>
                            <span className="text-xs font-medium text-indigo-600">65%</span>
                        </div>
                        <div className="h-1.5 w-full bg-indigo-100 rounded-full overflow-hidden">
                            <div className="h-full bg-indigo-500 w-[65%]" />
                        </div>
                        <Link href="/practice/math/calculus" className="text-xs text-indigo-500 mt-2 flex items-center hover:underline">
                            Continue <ArrowRight className="w-3 h-3 ml-1" />
                        </Link>
                    </div>
                </div>

                {/* Topics To Revise */}
                <div>
                    <div className="flex items-center gap-2 mb-3 text-amber-600">
                        <CircleDot className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-wider">To Revise</span>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer border border-transparent hover:border-slate-100">
                            <span className="text-sm text-slate-600">English Grammar</span>
                            <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">Low Accuracy</span>
                        </div>
                    </div>
                </div>

                {/* Topics Completed */}
                <div>
                    <div className="flex items-center gap-2 mb-3 text-emerald-600">
                        <CheckCircle2 className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-wider">Completed</span>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between p-2">
                            <span className="text-sm text-slate-600 line-through decoration-slate-300">Reading Comp. Basics</span>
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
