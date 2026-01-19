"use client";

import { use, useState, useEffect } from "react";
import { ExamSession } from "@/components/tests/ExamSession";
import { RefreshCcw } from "lucide-react";
import { SUBJECT_DATA } from "@/lib/subjects"; // Assuming this handles slugs

// Mock Questions for MVP
const MOCK_PYQ_QUESTIONS = [
    {
        id: "q1",
        question_text: "Which of the following integration techniques is best suited for evaluating ∫ x² * e^x dx?",
        options: [
            { id: "a", text: "Integration by Parts" },
            { id: "b", text: "Partial Fractions" },
            { id: "c", text: "Trigonometric Substitution" },
            { id: "d", text: "Reverse Chain Rule" }
        ],
        correct_option: "a"
    },
    {
        id: "q2",
        question_text: "The derivative of f(x) = ln(sin(x)) is:",
        options: [
            { id: "a", text: "cot(x)" },
            { id: "b", text: "tan(x)" },
            { id: "c", text: "sec(x)" },
            { id: "d", text: "1/sin(x)" }
        ],
        correct_option: "a"
    },
    {
        id: "q3",
        question_text: "If A is a 3x3 matrix with |A| = 5, what is the value of |2A|?",
        options: [
            { id: "a", text: "10" },
            { id: "b", text: "40" },
            { id: "c", text: "5" },
            { id: "d", text: "25" }
        ],
        correct_option: "b"
    }
];

export default function PYQPracticePage({ params }: { params: Promise<{ year: string, subject: string }> }) {
    const { year, subject } = use(params);
    const [loading, setLoading] = useState(true);
    const [testData, setTestData] = useState<any>(null);

    useEffect(() => {
        // Simulate fetching
        setTimeout(() => {
            const subjectInfo = Object.values(SUBJECT_DATA).find(s => s.slug === subject);
            setTestData({
                id: `pyq-${year}-${subject}`,
                title: `${subjectInfo?.name || subject.toUpperCase()} ${year} (Shift 1)`,
                duration_minutes: 45, // PYQ standard for domain
                total_marks: 200
            });
            setLoading(false);
        }, 1000);
    }, [year, subject]);

    if (loading) {
        return (
            <div className="h-[80vh] flex flex-col items-center justify-center">
                <RefreshCcw className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
                <p className="text-slate-500 animate-pulse">Retrieving Exam Paper...</p>
            </div>
        );
    }

    return (
        <ExamSession
            test={testData}
            questions={MOCK_PYQ_QUESTIONS} // In real app, fetch questions filtered by pyq_year and subject
        />
    );
}
