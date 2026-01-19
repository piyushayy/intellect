import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const POSITIONS = [
    { title: "Senior Frontend Engineer", team: "Engineering", type: "Remote", link: "#" },
    { title: "Content Strategist (Math)", team: "Content", type: "Remote", link: "#" },
    { title: "Product Designer", team: "Design", type: "Remote", link: "#" }
];

export default function CareersPage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main>
                <section className="py-24 text-center px-4 bg-slate-50">
                    <h1 className="font-serif text-5xl md:text-6xl text-slate-900 mb-6 mx-auto leading-tight">
                        Do your life's best work.
                    </h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-10">
                        Join a dedicated team building the future of education. We heavily value autonomy, mastery, and purpose.
                    </p>
                    <div className="flex justify-center gap-8 text-sm font-bold text-slate-500 uppercase tracking-widest">
                        <span>Remote-First</span>
                        <span>•</span>
                        <span>Competitive Pay</span>
                        <span>•</span>
                        <span>Unlimited Learning</span>
                    </div>
                </section>

                <section className="py-24 px-4 container mx-auto max-w-4xl">
                    <h2 className="text-2xl font-bold text-slate-900 mb-8">Open Positions</h2>
                    <div className="space-y-4">
                        {POSITIONS.map((pos) => (
                            <div key={pos.title} className="p-6 bg-white border border-slate-200 rounded-2xl flex items-center justify-between hover:border-indigo-300 hover:shadow-md transition-all group cursor-pointer">
                                <div>
                                    <h3 className="font-bold text-lg text-slate-900 group-hover:text-indigo-600 transition-colors">{pos.title}</h3>
                                    <p className="text-slate-500">{pos.team} • {pos.type}</p>
                                </div>
                                <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-600" />
                            </div>
                        ))}
                    </div>
                    <div className="mt-12 p-8 bg-indigo-50 rounded-3xl text-center">
                        <h3 className="font-bold text-indigo-900 mb-2">Don't see your role?</h3>
                        <p className="text-indigo-700 mb-6">We are always looking for exceptional talent. If you think you can help us, say hello.</p>
                        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">Email Founders</Button>
                    </div>
                </section>
            </main>
        </div>
    );
}
