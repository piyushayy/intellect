import { Navbar } from "@/components/layout/Navbar";
import { ArrowRight, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link"; // Added missing import for Link

const POSTS = [
    {
        title: "The Science of Spaced Repetition",
        excerpt: "Why cramming fails and consistency wins. We dive deep into the Ebbinghaus Forgetting Curve.",
        date: "Oct 24, 2025",
        category: "Learning Science",
        slug: "spaced-repetition"
    },
    {
        title: "Cracking CUET 2026: A 6-Month Plan",
        excerpt: "A month-by-month breakdown of what you need to focus on to secure a seat in North Campus.",
        date: "Nov 12, 2025",
        category: "Strategy",
        slug: "cuet-strategy"
    },
    {
        title: "Updates to the Exam Pattern",
        excerpt: "NTA has released new guidelines for the upcoming session. Here is what you need to know.",
        date: "Dec 05, 2025",
        category: "News",
        slug: "exam-updates"
    }
];

export default function BlogPage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main>
                <section className="py-24 px-4 container mx-auto max-w-4xl text-center">
                    <span className="text-indigo-600 font-bold tracking-widest uppercase text-sm mb-4 block">The Intellect Journal</span>
                    <h1 className="font-serif text-5xl md:text-6xl text-slate-900 mb-8 leading-tight">
                        Insights for the <br /> modern learner.
                    </h1>
                </section>

                <section className="pb-24 px-4 container mx-auto max-w-5xl">
                    <div className="grid gap-12">
                        {POSTS.map(post => (
                            <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                                <article className="grid md:grid-cols-4 gap-8 items-start border-t border-slate-100 pt-12">
                                    <div className="md:col-span-1 text-slate-500 text-sm font-medium pt-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Calendar className="w-4 h-4" /> {post.date}
                                        </div>
                                        <span className="text-indigo-600">{post.category}</span>
                                    </div>
                                    <div className="md:col-span-3">
                                        <h2 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-indigo-600 transition-colors">
                                            {post.title}
                                        </h2>
                                        <p className="text-lg text-slate-600 leading-relaxed mb-6">
                                            {post.excerpt}
                                        </p>
                                        <span className="text-indigo-600 font-bold text-sm flex items-center group-hover:underline">
                                            Read Article <ArrowRight className="w-4 h-4 ml-2" />
                                        </span>
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}
