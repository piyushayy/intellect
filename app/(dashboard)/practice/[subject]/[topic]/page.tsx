
import { PracticeSession } from "@/components/practice/PracticeSession";
import { getQuestions } from "@/app/actions/practice";

export default async function PracticePage({ params }: { params: Promise<{ subject: string; topic: string }> }) {
    const { subject, topic } = await params;

    // Fetch Real Data from Supabase
    const questions = await getQuestions(subject, topic);

    return <PracticeSession subject={subject} topic={topic} initialQuestions={questions} />;
}
