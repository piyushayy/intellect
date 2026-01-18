import Link from "next/link";
import { getSubjectsWithTopics } from "@/app/actions/practice";
import { Book, Calculator, Globe, Quote, ChevronRight, Layers } from "lucide-react";

const ICON_MAP: Record<string, any> = {
    'book': Book,
    'calculator': Calculator,
    'globe': Globe,
    'quote': Quote,
};

export default async function PracticeHubPage() {
    const subjects = await getSubjectsWithTopics();

    return (
        <div className="max-w-6xl mx-auto py-12">
            <div className="mb-12">
                <h1 className="text-4xl font-bold text-slate-900 mb-4">Practice Library</h1>
                <p className="text-lg text-slate-600 max-w-2xl">
                    Select a subject to start building your mastery. Efficient, distraction-free practice.
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {subjects.map((subject) => {
                    const Icon = ICON_MAP[subject.icon] || Layers;

                    return (
                        <div key={subject.id} className="group bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
                            <div className="p-8 pb-6">
                                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 group-hover:bg-indigo-50 group-hover:scale-110 transition-transform duration-300">
                                    <Icon className="w-6 h-6 text-slate-600 group-hover:text-indigo-600 transition-colors" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-2">{subject.name}</h3>
                                <p className="text-slate-500">{subject.topics?.length || 0} Topics available</p>
                            </div>

                            <div className="px-8 pb-8 pt-2">
                                <div className="space-y-2">
                                    {subject.topics?.slice(0, 3).map((topic: any) => (
                                        <Link
                                            key={topic.id}
                                            href={`/practice/${subject.slug}/${topic.slug}`}
                                            className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 text-slate-600 hover:text-indigo-600 transition-colors"
                                        >
                                            <span className="font-medium">{topic.name}</span>
                                            <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </Link>
                                    ))}
                                    {subject.topics && subject.topics.length > 3 && (
                                        <div className="p-3 text-sm text-slate-400 font-medium">
                                            + {subject.topics.length - 3} more topics
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
