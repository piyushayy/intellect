import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen grid lg:grid-cols-2">
            {/* Left: Branding */}
            <div className="hidden lg:flex flex-col justify-between bg-slate-900 p-12 text-white relative overflow-hidden">
                {/* Abstract Background */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

                <div className="relative z-10">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-indigo-500 flex items-center justify-center">
                            <span className="text-white font-bold text-xl">I</span>
                        </div>
                        <span className="text-xl font-bold tracking-tight">Intellect</span>
                    </Link>
                </div>

                <div className="relative z-10 max-w-md">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700/50 mb-6">
                        <Sparkles className="w-4 h-4 text-emerald-400" />
                        <span className="text-sm font-medium text-slate-300">Join 10,000+ Students</span>
                    </div>
                    <h1 className="text-4xl font-bold mb-6 leading-tight">
                        Master your concepts in a calm, confident environment.
                    </h1>
                    <p className="text-slate-400 text-lg">
                        No distractions. No noise. Just pure learning designed for the modern aspirant.
                    </p>
                </div>

                <div className="relative z-10 text-sm text-slate-500">
                    &copy; 2024 Intellect Education
                </div>
            </div>

            {/* Right: Form */}
            <div className="flex items-center justify-center p-8 bg-slate-50">
                <div className="w-full max-w-md space-y-8">
                    {children}
                </div>
            </div>
        </div>
    );
}
