'use server'

import { supabase } from '@/lib/supabase'

export async function getExamData(testId: string) {
    // Fetch test details
    const { data: test, error: testError } = await supabase
        .from('mock_tests')
        .select('*')
        .eq('id', testId)
        .single()

    if (testError || !test) return null

    // Fetch questions linked to this test
    const { data: linkData, error: linkError } = await supabase
        .from('mock_test_questions')
        .select(`
      question:questions (
        id,
        question_text,
        options,
        difficulty,
        subject_id,
        topic_id
      )
    `)
        .eq('mock_test_id', testId)

    if (linkError) return null

    // Transform data
    // casting to any to handle the nested join structure which Supabase types sometimes struggle with auto-detecting deeply
    const questions = (linkData as any[]).map(item => item.question)

    return {
        test,
        questions
    }
}

export async function submitExam(testId: string, userId: string, answers: Record<string, string>) {
    // 1. Fetch correct answers from DB (secure grading)
    const { data: linkData } = await supabase
        .from('mock_test_questions')
        .select(`
      question:questions (
        id,
        correct_option
      )
    `)
        .eq('mock_test_id', testId)

    if (!linkData) return { success: false }

    let score = 0;
    const total = linkData.length;

    // Calculate Score
    linkData.forEach((item: any) => {
        const qId = item.question.id;
        const correct = item.question.correct_option;
        const userAns = answers[qId];

        if (userAns === correct) {
            score += 1;
        }
    });

    // 3. Save Attempt
    const percentage = Math.round((score / total) * 100);

    const { error: saveError } = await supabase.from('test_attempts').insert({
        user_id: userId,
        mock_test_id: testId,
        score,
        total_questions: total,
        percentage
    });

    if (!saveError) {
        // Award XP (Bonus 50 XP for completing a test + score * 5)
        const xpGain = 50 + (score * 5);
        await supabase.rpc('update_gamification', {
            p_user_id: userId,
            p_xp_gain: xpGain
        });
    }

    return {
        success: true,
        score,
        total,
        percentage,
        xpEarned: 50 + (score * 5)
    }
}
