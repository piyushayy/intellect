import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Timer, ArrowRight, ShieldCheck } from "lucide-react";
import { supabase } from "@/lib/supabase"; // Client or Server? Page is Server Component by default

// Fetch real tests for student
async function getActiveTests() {
    // Creating a new client here or importing shared
    // For quick MVP let's assume public read access or we use the service role bypass
    // Actually RLS is Public Read for subjects, but mock_tests logic? 
    // Let's ensure RLS allows read.
    const { data } = await supabase.from('mock_tests').select('*').limit(10);
    return data || [];
}

export default async function MockTestsPage() {
    const tests = await getActiveTests();

    return (
        <div className="max-w-6xl mx-auto py-12">
            <div className="mb-12">
                <h1 className="text-4xl font-bold text-slate-900 mb-4">Exam Portal</h1>
                <p className="text-lg text-slate-600 max-w-2xl">
                    Simulate the real exam environment. Timed tests with detailed analysis.
                </p>
            </div>

            <div className="grid gap-4">
                {tests.length === 0 && (
                    <div className="p-12 text-center bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                        <p className="text-slate-500">No active tests available at the moment.</p>
                    </div>
                )}

                {tests.map((test) => (
                    <div key={test.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:border-indigo-200 transition-colors flex items-center justify-between group">
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center font-bold text-2xl text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                <ShieldCheck className="w-8 h-8" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 mb-1">{test.title}</h3>
                                <p className="text-slate-500 flex items-center gap-4 text-sm">
                                    <span className="flex items-center gap-1"><Timer className="w-4 h-4" /> {test.duration_minutes} Mins</span>
                                </p>
                            </div>
                        </div>

                        <Link href={`/tests/${test.id}`}>
                            <Button size="lg" className="rounded-xl px-8">Start Test <ArrowRight className="ml-2 w-4 h-4" /></Button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
