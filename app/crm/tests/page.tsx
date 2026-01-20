import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Plus, FileText, ChevronRight } from "lucide-react";

async function getTests() {
    const { data } = await supabase
        .from('mock_tests')
        .select('*')
        .order('created_at', { ascending: false });
    return data || [];
}

export default async function AdminTestsPage() {
    const tests = await getTests();

    return (
        <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-slate-900">Manage  Mock Tests</h1>
                <Link href="/admin/tests/new">
                    <Button>
                        <Plus className="w-4 h-4 mr-2" /> Create New Test
                    </Button>
                </Link>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                {tests.length === 0 ? (
                    <div className="p-12 text-center text-slate-500">
                        No tests created yet.
                    </div>
                ) : (
                    <div className="divide-y divide-slate-100">
                        {tests.map((test) => (
                            <div key={test.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                                        <FileText className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900">{test.title}</h3>
                                        <p className="text-sm text-slate-500">{test.duration_minutes} Minutes • ID: {test.id.slice(0, 8)}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold uppercase rounded-full">
                                        Active
                                    </div>
                                    <Link href={`/admin/tests/${test.id}`}>
                                        <Button variant="outline" size="sm">
                                            Manage Content <ChevronRight className="ml-2 w-4 h-4" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
