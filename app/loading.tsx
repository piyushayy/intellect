import { Loader2 } from "lucide-react";

export default function Loading() {
    return (
        <div className="min-h-screen bg-white flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
                <p className="text-slate-400 text-sm font-medium tracking-widest uppercase animate-pulse">Loading Intellect...</p>
            </div>
        </div>
    );
}
