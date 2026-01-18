import { getTestDetails, getQuestionsForSelector } from "@/app/actions/admin_test_manager";
import { TestManager } from "@/components/admin/TestManager";
// In real app, we need to pass the Server Action 'addQuestionsToTest' to the client component 
// or wrap it. For simplicity in this demo, I'll update TestManager to use a direct prop if possible, 
// or I'll export the action to a separate file that Client Components can import.
// Current setup: 'addQuestionsToTest' is in 'app/actions/admin.ts'. 
// Client components CAN import Server Actions.

export default async function ManageTestPage({ params }: { params: { id: string } }) {
    const id = params.id;
    const test = await getTestDetails(id);
    const questions = await getQuestionsForSelector(test.subject_id);

    if (!test) return <div>Test not found</div>;

    return (
        <div className="max-w-6xl mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900">{test.title}</h1>
                <p className="text-slate-500">Duration: {test.duration_minutes} mins</p>
            </div>

            <TestManager test={test} availableQuestions={questions} />
        </div>
    );
}
