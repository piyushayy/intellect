import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { FileText, Clock, ArrowRight } from "lucide-react";

export default function PYQPage() {
    const years = [2024, 2023, 2022];

    return (
        <div className="max-w-6xl mx-auto py-12">
            <div className="mb-12">
                <h1 className="text-4xl font-bold text-slate-900 mb-4">Previous Year Questions</h1>
                <p className="text-lg text-slate-600 max-w-2xl">
                    Practice with actual questions from past CUET exams. Filter by year and subject.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {years.map((year) => (
                    <div key={year} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center mb-6">
                            <FileText className="w-6 h-6 text-indigo-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">{year} Papers</h3>
                        <p className="text-slate-500 mb-6">Full shift-wise question papers.</p>
                        <Button variant="outline" className="w-full justify-between group">
                            View Papers <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600" />
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
}
