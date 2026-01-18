"use client";

import { Shield, Star, Award, Lock } from "lucide-react";
// Tooltip imports removed for now
// Note: We haven't created a Tooltip component yet, so I'll just use a simple title attribute or create a simple hover effect.
// For MVP, simple grid.

export function Badges({ xp }: { xp: number }) {
    const badges = [
        { name: "Novice", xp: 0, icon: Star, color: "text-slate-400" },
        { name: "Apprentice", xp: 100, icon: Shield, color: "text-emerald-500" },
        { name: "Scholar", xp: 500, icon: Award, color: "text-indigo-500" },
        { name: "Master", xp: 1000, icon: CrownIcon, color: "text-amber-500" },
    ];

    return (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h3 className="font-bold text-slate-900 mb-4">Your Badges</h3>
            <div className="flex gap-4">
                {badges.map((badge) => {
                    const isUnlocked = xp >= badge.xp;
                    const Icon = badge.icon;

                    return (
                        <div key={badge.name} className="flex flex-col items-center gap-2 group relative">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all 
                                ${isUnlocked ? 'bg-slate-50 border border-slate-200 shadow-sm' : 'bg-slate-50 opacity-50 grayscale'}`}>
                                <Icon className={`w-6 h-6 ${isUnlocked ? badge.color : 'text-slate-300'}`} />
                                {!isUnlocked && <Lock className="w-3 h-3 absolute top-1 right-1 text-slate-400" />}
                            </div>
                            <span className="text-xs font-medium text-slate-500">{badge.name}</span>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

function CrownIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M5 16v-3.87a3.37 3.37 0 0 0 .94-2.61c3.14-.35 6.44-3.29 9-3.29 2 0 3.33.96 3.33 2.25C19 11 18 12.3 16 14H5Z" />
            <path d="M5 16l-1 4h14l-1-4" />
            <path d="M5 16h11" />
        </svg>
    )
}
