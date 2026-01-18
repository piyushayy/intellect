'use server'

import { supabase } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'

export async function saveProgress(
    userId: string,
    questionId: string,
    isCorrect: boolean,
    selectedOption: string
) {
    if (!userId) return

    // Upsert progress (update if exists, insert if not)
    const { error } = await supabase
        .from('user_progress')
        .upsert({
            user_id: userId,
            question_id: questionId,
            is_correct: isCorrect,
            selected_option: selectedOption,
            attempted_at: new Date().toISOString()
        }, {
            onConflict: 'user_id, question_id'
        })

    if (error) {
        console.error('Error saving progress:', error)
    } else {
        // Update Gamification (XP & Streak)
        const xpGain = isCorrect ? 10 : 1; // 10 XP for correct, 1 XP for attempt

        // Use RPC call to update safely on server side
        await supabase.rpc('update_gamification', {
            p_user_id: userId,
            p_xp_gain: xpGain
        });

        revalidatePath('/dashboard')
    }
}

export async function getUserStats(userId: string) {
    if (!userId) return null

    // Get total attempts
    const { count: totalAttempts } = await supabase
        .from('user_progress')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)

    // Get correct answers
    const { count: correctAnswers } = await supabase
        .from('user_progress')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)
        .eq('is_correct', true)

    // Get Gamification Stats
    const { data: gameStats } = await supabase
        .from('user_gamification')
        .select('*')
        .eq('user_id', userId)
        .single();

    return {
        total: totalAttempts || 0,
        correct: correctAnswers || 0,
        accuracy: totalAttempts ? Math.round(((correctAnswers || 0) / totalAttempts) * 100) : 0,
        streak: gameStats?.current_streak || 0,
        xp: gameStats?.total_xp || 0
    }
}

export async function getLeaderboard() {
    const { data } = await supabase
        .from('user_gamification')
        .select('total_xp, user_id')
        .order('total_xp', { ascending: false })
        .limit(10);

    if (!data) return [];

    const userIds = data.map(d => d.user_id);
    const { data: profiles } = await supabase
        .from('users')
        .select('id, full_name')
        .in('id', userIds);

    return data.map((entry, index) => {
        const profile = profiles?.find(p => p.id === entry.user_id);
        return {
            rank: index + 1,
            name: profile?.full_name || `Learner ${entry.user_id.slice(0, 4)}`,
            xp: entry.total_xp,
            id: entry.user_id
        };
    });
}
