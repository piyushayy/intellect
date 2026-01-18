"use client";

import { Zap, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export function DailyDrop() {
    // In a real app, calculate time remaining until midnight
    return (
        <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-6 text-white relative overflow-hidden group hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl transform translate-x-10 -translate-y-10" />

            <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full w-fit backdrop-blur-sm">
                        <Zap className="w-3 h-3 text-yellow-300 fill-yellow-300" />
                        <span className="text-xs font-bold text-white tracking-wider uppercase">Daily Drop</span>
                    </div>
                    <div className="flex items-center gap-1 text-indigo-200 text-xs font-mono">
                        <Clock className="w-3 h-3" />
                        <span>08:12:45 left</span>
                    </div>
                </div>

                <h3 className="text-2xl font-bold mb-2">Rapid Fire: Calculus</h3>
                <p className="text-indigo-100 text-sm mb-6 max-w-[80%]">Complete 3 questions in 2 minutes to win double XP.</p>

                <Link href="/practice/math/calculus?mode=daily">
                    <Button className="w-full bg-white text-indigo-700 hover:bg-indigo-50 border-0">
                        Start Challenge <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                </Link>
            </div>
        </div>
    );
}
