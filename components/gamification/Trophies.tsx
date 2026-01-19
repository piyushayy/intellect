"use client";

import { Trophy, TROPHIES, UserStats } from "@/lib/trophies";
import { Lock } from "lucide-react";
import { Reveal } from "@/components/ui/Animations";

// For MVP, we might mock some stats or pass them in props
// In a real implementation, these would come from the database
const MOCK_STATS: UserStats = {
    totalQuestions: 15,
    daysPracticed: 2,
    streak: 2,
    englishEasyCompleted: false,
    mathAccuracy: 65,
    gtAttempted: false,
    pyqYearsAttempted: 1,
    pyqTopicAccuracy: 0,
    fullMockCompleted: false
};

export function TrophyCabinet({ stats = MOCK_STATS }: { stats?: UserStats }) {
    // Group trophies by category
    const categories = {
        consistency: TROPHIES.filter(t => t.category === 'consistency'),
        mastery: TROPHIES.filter(t => t.category === 'mastery'),
        pyq: TROPHIES.filter(t => t.category === 'pyq'),
        milestone: TROPHIES.filter(t => t.category === 'milestone'),
    };

    return (
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="text-2xl">🏆</span> Your Trophy Cabinet
            </h3>

            <div className="space-y-10">
                <CategorySection title="Consistency" trophies={categories.consistency} stats={stats} />
                <CategorySection title="Subject Mastery" trophies={categories.mastery} stats={stats} />
                <CategorySection title="PYQ Milestones" trophies={categories.pyq} stats={stats} />
                <CategorySection title="Milestones" trophies={categories.milestone} stats={stats} />
            </div>
        </div>
    );
}

function CategorySection({ title, trophies, stats }: { title: string, trophies: Trophy[], stats: UserStats }) {
    return (
        <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">{title}</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {trophies.map((trophy, index) => {
                    const isUnlocked = trophy.condition(stats); // Check condition
                    const Icon = trophy.icon;

                    return (
                        <div
                            key={trophy.id}
                            className={`
                                relative p-4 rounded-2xl border transition-all duration-500
                                flex flex-col items-center text-center gap-3
                                ${isUnlocked
                                    ? 'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-100 shadow-[0_0_15px_rgba(251,191,36,0.2)]'
                                    : 'bg-slate-50 border-slate-100 grayscale opacity-70'}
                            `}
                        >
                            <div className={`
                                w-12 h-12 rounded-full flex items-center justify-center
                                ${isUnlocked ? 'bg-white shadow-sm text-amber-500' : 'bg-slate-200 text-slate-400'}
                            `}>
                                <Icon className="w-6 h-6" />
                            </div>

                            <div>
                                <p className={`text-sm font-bold ${isUnlocked ? 'text-slate-800' : 'text-slate-500'}`}>
                                    {trophy.title}
                                </p>
                                <p className="text-[10px] text-slate-400 mt-1 leading-tight">
                                    {trophy.description}
                                </p>
                            </div>

                            {/* Lock Icon for locked state */}
                            {!isUnlocked && (
                                <div className="absolute top-2 right-2">
                                    <Lock className="w-3 h-3 text-slate-300" />
                                </div>
                            )}

                            {/* Soft glow text for unlocked */}
                            {isUnlocked && (
                                <div className="absolute -bottom-2 bg-amber-100 text-amber-700 text-[9px] font-bold px-2 py-0.5 rounded-full border border-amber-200 uppercase tracking-wide">
                                    Unlocked
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
