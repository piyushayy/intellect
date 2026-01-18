import { getExamData } from "@/app/actions/exam";
import { ExamSession } from "@/components/tests/ExamSession";
import { redirect } from "next/navigation";

export default async function ExamRunPage({ params }: { params: { id: string } }) {
    const data = await getExamData(params.id);

    if (!data) {
        return <div>Test not found or access denied.</div>;
    }

    if (data.questions.length === 0) {
        return (
            <div className="max-w-2xl mx-auto py-20 text-center">
                <h1 className="text-2xl font-bold mb-4">This test is being prepared</h1>
                <p className="text-slate-500">No questions have been added to this test yet.</p>
            </div>
        )
    }

    return (
        <ExamSession test={data.test} questions={data.questions} />
    );
}
