"use client";

import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { FileText, Clock, ArrowRight, Eye, Download, Lock } from "lucide-react";
import { useState } from "react";
import { Reveal } from "@/components/ui/Animations";
import { SUBJECT_DATA } from "@/lib/subjects";

const YEARS = [2024, 2023, 2022];

export default function PYQPage() {
    const [selectedYear, setSelectedYear] = useState<number>(2024);

    return (
        <div className="max-w-7xl mx-auto py-12 px-4">
            <Reveal>
                <div className="mb-16 text-center">
                    <span className="text-sm font-bold tracking-widest text-amber-600 uppercase mb-2 block">Exam Archives</span>
                    <h1 className="text-4xl md:text-5xl font-serif text-slate-900 mb-6">Previous Year Questions</h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        The single best resource for high scores. Practice with actual questions from past CUET exams.
                    </p>
                </div>
            </Reveal>

            {/* Year Selector */}
            <div className="flex justify-center gap-4 mb-12">
                {YEARS.map((year) => (
                    <button
                        key={year}
                        onClick={() => setSelectedYear(year)}
                        className={`px-8 py-3 rounded-2xl text-lg font-bold transition-all ${selectedYear === year
                                ? "bg-slate-900 text-white shadow-lg scale-105"
                                : "bg-white text-slate-500 hover:bg-slate-50 border border-slate-200"
                            }`}
                    >
                        {year}
                    </button>
                ))}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.values(SUBJECT_DATA).map((subject, index) => {
                    // Filter out non-domain if we only have PYQs for domains, but keep all for now
                    return (
                        <Reveal key={subject.slug} delay={index * 0.1}>
                            <div className="group bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                                <div className="flex justify-between items-start mb-6">
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-${subject.color}-50 text-${subject.color}-600`}>
                                        <FileText className="w-6 h-6" />
                                    </div>
                                    <span className="px-3 py-1 bg-slate-100 rounded-full text-xs font-bold text-slate-500">
                                        Shift 1 & 2
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-slate-900 mb-2">{subject.name}</h3>
                                <div className="flex items-center gap-4 text-sm text-slate-500 mb-6">
                                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> 45 Mins</span>
                                    <span className="flex items-center gap-1"><FileText className="w-4 h-4" /> 40 Qs</span>
                                </div>

                                <div className="space-y-3">
                                    <Link href={`/pyq/${selectedYear}/${subject.slug}`}>
                                        <Button className="w-full justify-between bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 hover:border-indigo-300 group/btn">
                                            Start Practice
                                            <ArrowRight className="w-4 h-4 text-slate-400 group-hover/btn:text-indigo-600 transition-colors" />
                                        </Button>
                                    </Link>
                                    <Button variant="ghost" className="w-full justify-between text-slate-500 hover:text-slate-900 text-sm h-auto py-2">
                                        Download PDF <Download className="w-4 h-4" />
                                    </Button>
                                </div>

                                {selectedYear === 2022 && (
                                    <div className="absolute inset-0 bg-white/80 backdrop-blur-[1px] flex flex-col items-center justify-center z-10">
                                        <Lock className="w-8 h-8 text-slate-400 mb-2" />
                                        <p className="font-bold text-slate-900">Coming Soon</p>
                                        <p className="text-sm text-slate-500">2022 Papers are being digitized</p>
                                    </div>
                                )}
                            </div>
                        </Reveal>
                    );
                })}
            </div>
        </div>
    );
}
