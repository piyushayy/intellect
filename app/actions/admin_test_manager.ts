'use server'

import { supabase } from '@/lib/supabase' // Using generic client for simpler reads
import { revalidatePath } from 'next/cache'

// ... existing actions ...

export async function getTestDetails(testId: string) {
    const { data: test } = await supabase
        .from('mock_tests')
        .select(`
        *,
        questions:mock_test_questions(
            question:questions(*)
        )
    `)
        .eq('id', testId)
        .single()

    return test
}

export async function getQuestionsForSelector(subjectId?: string | null) {
    let query = supabase.from('questions').select('*').limit(50)

    if (subjectId) {
        query = query.eq('subject_id', subjectId)
    }

    const { data } = await query
    return data || []
}

export async function removeQuestionFromTest(testId: string, questionId: string) {
    const { error } = await supabase
        .from('mock_test_questions')
        .delete()
        .match({ mock_test_id: testId, question_id: questionId })

    if (error) return { success: false, error: error.message }

    revalidatePath(`/admin/tests/${testId}`)
    return { success: true }
}
