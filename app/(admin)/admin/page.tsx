import { Button } from "@/components/ui/Button";
import { Plus, Upload } from "lucide-react";

export default function AdminDashboard() {
    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
                <div className="flex gap-4">
                    <Button variant="outline">
                        <Upload className="mr-2 w-4 h-4" /> Bulk Import
                    </Button>
                    <Button>
                        <Plus className="mr-2 w-4 h-4" /> Add Question
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h3 className="text-sm font-medium text-slate-500 mb-2">Total Questions</h3>
                    <p className="text-3xl font-bold text-slate-900">1,240</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h3 className="text-sm font-medium text-slate-500 mb-2">Active Students</h3>
                    <p className="text-3xl font-bold text-slate-900">856</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h3 className="text-sm font-medium text-slate-500 mb-2">Tests Taken</h3>
                    <p className="text-3xl font-bold text-slate-900">3,402</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">Recent Questions</h2>
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                            <div>
                                <p className="font-medium text-slate-900 line-clamp-1">Which of the following is an example of...</p>
                                <p className="text-sm text-slate-500">English • Reading Comprehension</p>
                            </div>
                            <span className="text-xs font-medium px-2 py-1 bg-emerald-100 text-emerald-700 rounded-lg">Active</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
