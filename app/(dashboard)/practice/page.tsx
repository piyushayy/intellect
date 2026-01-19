import Link from "next/link";
import { Book, Calculator, Globe, Quote, ChevronRight, Layers, Atom, FlaskConical, Dna, TrendingUp, Users, Brain } from "lucide-react";
import { SUBJECT_DATA } from "@/lib/subjects"; // We will use static config for better control over UI structure

const ICON_MAP: Record<string, any> = {
    'book': Book,
    'calculator': Calculator,
    'globe': Globe,
    'quote': Quote,
    'atom': Atom,
    'flask': FlaskConical,
    'dna': Dna,
    'trending-up': TrendingUp,
    'users': Users,
    'brain': Brain
};

export default function PracticeHubPage() {
    // We can still fetch dynamic stats here if we want, but structure is defined by requirements

    return (
        <div className="max-w-7xl mx-auto py-12 px-4">
            <div className="mb-16 text-center">
                <h1 className="text-4xl md:text-5xl font-serif text-slate-900 mb-6">Practice Library</h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    Select a section to master. Comprehensive coverage for Language, Domain Subjects, and General Test.
                </p>
            </div>

            {/* SECTION I: LANGUAGE */}
            <section className="mb-20">
                <div className="flex items-center gap-4 mb-8">
                    <div className="h-px bg-slate-200 flex-1" />
                    <span className="text-sm font-bold tracking-widest text-slate-400 uppercase">Section I: Language</span>
                    <div className="h-px bg-slate-200 flex-1" />
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <SubjectCard subject={SUBJECT_DATA['english']} />
                </div>
            </section>

            {/* SECTION II: DOMAIN SUBJECTS */}
            <section className="mb-20">
                <div className="flex items-center gap-4 mb-8">
                    <div className="h-px bg-slate-200 flex-1" />
                    <span className="text-sm font-bold tracking-widest text-slate-400 uppercase">Section II: Domain Subjects</span>
                    <div className="h-px bg-slate-200 flex-1" />
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <SubjectCard subject={SUBJECT_DATA['accountancy']} />
                    <SubjectCard subject={SUBJECT_DATA['business_studies']} />
                    <SubjectCard subject={SUBJECT_DATA['economics']} />
                    <SubjectCard subject={SUBJECT_DATA['math']} />
                    <SubjectCard subject={SUBJECT_DATA['political_science']} />
                    <SubjectCard subject={SUBJECT_DATA['history']} />
                    <SubjectCard subject={SUBJECT_DATA['psychology']} />
                    <SubjectCard subject={SUBJECT_DATA['sociology']} />
                </div>
            </section>

            {/* SECTION III: GENERAL TEST */}
            <section className="mb-20">
                <div className="flex items-center gap-4 mb-8">
                    <div className="h-px bg-slate-200 flex-1" />
                    <span className="text-sm font-bold tracking-widest text-slate-400 uppercase">Section III: General Test</span>
                    <div className="h-px bg-slate-200 flex-1" />
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <SubjectCard subject={SUBJECT_DATA['general-test']} />
                </div>
            </section>

        </div>
    );
}

function SubjectCard({ subject }: { subject: any }) {
    const Icon = ICON_MAP[subject.icon] || Layers;

    // Map Tailwind colors dynamically (safelist might be needed if purging but standard colors usually fine)
    const colorClasses: Record<string, string> = {
        indigo: "group-hover:text-indigo-600 group-hover:bg-indigo-50",
        violet: "group-hover:text-violet-600 group-hover:bg-violet-50",
        teal: "group-hover:text-teal-600 group-hover:bg-teal-50",
        emerald: "group-hover:text-emerald-600 group-hover:bg-emerald-50",
        blue: "group-hover:text-blue-600 group-hover:bg-blue-50",
        amber: "group-hover:text-amber-600 group-hover:bg-amber-50",
        rose: "group-hover:text-rose-600 group-hover:bg-rose-50",
    };

    return (
        <div className="group bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full">
            <div className="p-8 pb-4 flex-1">
                <div className={`w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 ${colorClasses[subject.color]} transition-colors`}>
                    <Icon className="w-7 h-7 text-slate-500 transition-colors inherit" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-1">{subject.name}</h3>
                <p className="text-slate-500 text-sm font-medium uppercase tracking-wide opacity-80">{subject.description}</p>
            </div>

            <div className="px-6 pb-6 pt-2 bg-slate-50/50 border-t border-slate-50">
                <div className="space-y-1">
                    {subject.sections.map((topic: any) => (
                        <Link
                            key={topic.slug}
                            href={`/practice/${subject.slug}/${topic.slug}`}
                            className="flex items-center justify-between p-3 rounded-xl hover:bg-white hover:shadow-sm text-slate-600 hover:text-indigo-600 transition-all group/item"
                        >
                            <span className="font-medium text-sm">{topic.name}</span>
                            <ChevronRight className="w-4 h-4 text-slate-300 group-hover/item:text-indigo-600 -translate-x-1 group-hover/item:translate-x-0 transition-all" />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
