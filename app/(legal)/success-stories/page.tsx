import { Navbar } from "@/components/layout/Navbar";
import { Star, Quote } from "lucide-react";
import Image from "next/image";

const STORIES = [
    {
        name: "Aditi Sharma",
        college: "SRCC, Delhi University",
        score: "800/800",
        quote: "I was overwhelmed by other platforms. Intellect gave me exactly what I needed—focus. The daily streak kept me going when I wanted to quit.",
        image: "A"
    },
    {
        name: "Rahul Verma",
        college: "Hindu College",
        score: "788/800",
        quote: "The mock tests are harder than the actual exam, which is perfect. When I sat for CUET, it felt like a breeze because I had practiced on Intellect.",
        image: "R"
    },
    {
        name: "Sneha Gupta",
        college: "Miranda House",
        score: "792/800",
        quote: "The analytics showed me that I was losing marks in Geometry. I focused there for 2 weeks, and my score jumped by 50 points.",
        image: "S"
    }
];

export default function SuccessStoriesPage() {
    return (
        <div className="min-h-screen bg-slate-900 text-white">
            <Navbar /> {/* Note: Navbar might need dark mode prop or adjustment, currently standard */}
            <main>
                <section className="py-24 px-4 container mx-auto max-w-6xl text-center">
                    <h1 className="font-serif text-5xl md:text-6xl mb-8 text-white">
                        From Aspirants to Achievers.
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-12">
                        See how thousands of students are securing seats in India's most prestigious colleges using Intellect.
                    </p>
                </section>

                <section className="pb-24 px-4 container mx-auto max-w-6xl">
                    <div className="grid md:grid-cols-3 gap-8">
                        {STORIES.map((story, i) => (
                            <div key={i} className="bg-slate-800 p-8 rounded-3xl border border-slate-700 relative">
                                <Quote className="w-10 h-10 text-indigo-500 absolute top-8 right-8 opacity-20" />
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-2xl font-bold mb-6">
                                    {story.image}
                                </div>
                                <p className="text-lg text-slate-300 leading-relaxed mb-8 relative z-10">
                                    "{story.quote}"
                                </p>
                                <div>
                                    <h3 className="font-bold text-white text-lg">{story.name}</h3>
                                    <p className="text-indigo-400 text-sm font-medium">{story.college}</p>
                                    <div className="flex items-center gap-2 mt-2">
                                        <div className="flex">
                                            {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-3 h-3 text-yellow-500 fill-yellow-500" />)}
                                        </div>
                                        <span className="text-xs text-slate-500">Score: {story.score}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}
