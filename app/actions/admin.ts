'use server'

import { supabase } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'

export async function createQuestion(formData: FormData) {
    const subject_id = formData.get('subject_id') as string
    const topic_id = formData.get('topic_id') as string
    const question_text = formData.get('question_text') as string
    const correct_option = formData.get('correct_option') as string
    const explanation = formData.get('explanation') as string
    const difficulty = formData.get('difficulty') as string

    // Construct options array
    const options = [
        { id: 'a', text: formData.get('option_a') as string },
        { id: 'b', text: formData.get('option_b') as string },
        { id: 'c', text: formData.get('option_c') as string },
        { id: 'd', text: formData.get('option_d') as string },
    ]

    const { error } = await supabase.from('questions').insert({
        subject_id,
        topic_id,
        question_text,
        options: JSON.stringify(options), // Store as JSON string or JSONB
        correct_option,
        explanation,
        difficulty
    })

    if (error) {
        console.error('Failed to create question', error)
        return { success: false, error: error.message }
    }

    revalidatePath('/admin/questions')
    revalidatePath('/practice')
    return { success: true }
}

export async function createMockTest(formData: FormData) {
    const title = formData.get('title') as string
    const duration = parseInt(formData.get('duration') as string)
    const subject_id = formData.get('subject_id') as string || null

    const { data, error } = await supabase.from('mock_tests').insert({
        title,
        duration_minutes: duration,
        subject_id: subject_id === 'all' ? null : subject_id
    }).select().single()

    if (error) {
        return { success: false, error: error.message }
    }

    revalidatePath('/admin/tests')
    return { success: true, id: data.id }
}

export async function addQuestionsToTest(testId: string, questionIds: string[]) {
    // Bulk insert
    const insertData = questionIds.map(qid => ({
        mock_test_id: testId,
        question_id: qid
    }))

    const { error } = await supabase.from('mock_test_questions').insert(insertData)

    if (error) {
        return { success: false, error: error.message }
    }

    revalidatePath(`/admin/tests/${testId}`)
    return { success: true }
}
