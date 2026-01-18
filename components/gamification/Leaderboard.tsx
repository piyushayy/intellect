"use client";

import { Crown } from "lucide-react";
import { Reveal } from "@/components/ui/Animations";

interface LeaderboardProps {
    data: {
        rank: number;
        name: string;
        xp: number;
        id: string;
    }[];
    currentUserId: string;
}

export function Leaderboard({ data, currentUserId }: LeaderboardProps) {
    return (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-6">
                <Crown className="w-5 h-5 text-amber-500 fill-amber-500" />
                <h3 className="font-bold text-slate-900">Leaderboard</h3>
            </div>

            <div className="space-y-4">
                {data.map((user, index) => (
                    <Reveal key={user.id} delay={index * 0.05}>
                        <div className={`flex items-center justify-between p-3 rounded-xl transition-colors ${user.id === currentUserId ? 'bg-indigo-50 border border-indigo-100' : 'hover:bg-slate-50'}`}>
                            <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm 
                                    ${index === 0 ? 'bg-amber-100 text-amber-700' :
                                        index === 1 ? 'bg-slate-200 text-slate-600' :
                                            index === 2 ? 'bg-orange-100 text-orange-700' :
                                                'bg-slate-50 text-slate-500'}`}>
                                    {index + 1}
                                </div>
                                <div>
                                    <p className={`text-sm font-medium ${user.id === currentUserId ? 'text-indigo-900' : 'text-slate-700'}`}>
                                        {user.name}
                                    </p>
                                    <p className="text-xs text-slate-400">Level {Math.floor(user.xp / 100) + 1}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-bold text-indigo-600">{user.xp} XP</p>
                            </div>
                        </div>
                    </Reveal>
                ))}

                {data.length === 0 && (
                    <p className="text-sm text-slate-500 text-center py-4">No data yet. Be the first!</p>
                )}
            </div>
        </div>
    );
}
