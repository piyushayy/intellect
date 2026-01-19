import { Navbar } from "@/components/layout/Navbar";
import { Search, HelpCircle, FileText, MessageCircle } from "lucide-react";
import Link from "next/link"; // Added missing import for Link

export default function HelpPage() {
    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <main>
                {/* Search Header */}
                <section className="bg-white py-20 px-4 border-b border-slate-200 text-center">
                    <h1 className="font-serif text-4xl text-slate-900 mb-6">How can we help?</h1>
                    <div className="max-w-xl mx-auto relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search for articles (e.g., 'refund', 'mock test')"
                            className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg"
                        />
                    </div>
                </section>

                <section className="py-20 px-4 container mx-auto max-w-5xl">
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Box 1 */}
                        <div className="bg-white p-8 rounded-2xl border border-slate-200">
                            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-6">
                                <FileText className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-lg text-slate-900 mb-4">Getting Started</h3>
                            <ul className="space-y-3">
                                <li><Link href="#" className="text-slate-600 hover:text-indigo-600">How to create an account</Link></li>
                                <li><Link href="#" className="text-slate-600 hover:text-indigo-600">Starting your first test</Link></li>
                                <li><Link href="#" className="text-slate-600 hover:text-indigo-600">Understanding your dashboard</Link></li>
                            </ul>
                        </div>

                        {/* Box 2 */}
                        <div className="bg-white p-8 rounded-2xl border border-slate-200">
                            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 mb-6">
                                <HelpCircle className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-lg text-slate-900 mb-4">Account & Billing</h3>
                            <ul className="space-y-3">
                                <li><Link href="#" className="text-slate-600 hover:text-indigo-600">Manage subscription</Link></li>
                                <li><Link href="#" className="text-slate-600 hover:text-indigo-600">Request a refund</Link></li>
                                <li><Link href="#" className="text-slate-600 hover:text-indigo-600">Change password</Link></li>
                            </ul>
                        </div>

                        {/* Box 3 */}
                        <div className="bg-white p-8 rounded-2xl border border-slate-200">
                            <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600 mb-6">
                                <MessageCircle className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-lg text-slate-900 mb-4">Support</h3>
                            <ul className="space-y-3">
                                <li><Link href="#" className="text-slate-600 hover:text-indigo-600">Contact Support</Link></li>
                                <li><Link href="#" className="text-slate-600 hover:text-indigo-600">Twitter Support</Link></li>
                                <li><Link href="#" className="text-slate-600 hover:text-indigo-600">Community Forum</Link></li>
                            </ul>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
