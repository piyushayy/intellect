import { Button } from "@/components/ui/Button";
import { Navbar } from "@/components/layout/Navbar";
import { Brain, Heart, Users, Globe, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <main>
                {/* Hero */}
                <section className="py-24 text-center px-4">
                    <h1 className="font-serif text-5xl md:text-7xl text-slate-900 mb-8 max-w-4xl mx-auto leading-tight">
                        We are building the <br />
                        <span className="text-indigo-600 italic">calmest</span> learning platform.
                    </h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                        Intellect was born from a simple observation: preparing for competitive exams in India is overwhelmingly noisy. We exist to bring signal to that noise.
                    </p>
                </section>

                {/* Values */}
                <section className="py-20 bg-slate-50">
                    <div className="container mx-auto px-4 max-w-6xl">
                        <div className="grid md:grid-cols-3 gap-12">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-indigo-600">
                                    <Brain className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">Conceptual Clarity</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    We believe rote memorization is fragile. True confidence comes from deep understanding.
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-rose-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-rose-600">
                                    <Heart className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">Student Well-being</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    Mental health is not a luxury. Our platform is designed to be anxiety-free and encouraging.
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-emerald-600">
                                    <Globe className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">World Class Quality</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    We bring international standards of design and pedagogy to the Indian test-prep market.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Team / Story */}
                <section className="py-24 px-4">
                    <div className="container mx-auto max-w-4xl text-center">
                        <h2 className="font-serif text-4xl text-slate-900 mb-8">Our Story</h2>
                        <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                            Founded in 2026 by a team of educators and engineers from IITs and Ivy Leagues, Intellect started as a small experiment:
                            <span className="italic"> "Can we make a mock test that students actually enjoy taking?"</span>
                        </p>
                        <p className="text-lg text-slate-600 leading-relaxed mb-12">
                            Today, thousands of students trust us with their preparation. We are a remote-first, diverse team united by a single mission: to democratize access to high-quality, calm education.
                        </p>
                        <Link href="/careers">
                            <Button variant="outline" size="lg">Join our team of 12 <ArrowRight className="ml-2 w-4 h-4" /></Button>
                        </Link>
                    </div>
                </section>
            </main>
        </div>
    );
}
