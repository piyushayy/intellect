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

export async function bulkImportQuestions(questions: any[]) {
    // 1. Fetch all subjects and topics for mapping
    const { data: subjects } = await supabase.from('subjects').select('id, slug');
    const { data: topics } = await supabase.from('topics').select('id, slug, subject_id');

    if (!subjects || !topics) {
        return { success: false, error: "Failed to load metadata for validation" };
    }

    const subjectMap = new Map(subjects.map(s => [s.slug, s.id]));
    const topicMap = new Map(topics.map(t => [t.slug, t.id]));

    const validQuestions = [];
    const errors = [];

    // 2. Validate and Transform
    for (const [index, q] of questions.entries()) {
        const subjectId = subjectMap.get(q.subject);
        const topicId = topicMap.get(q.topic); // Optional

        if (!subjectId) {
            errors.push(`Row ${index + 1}: Invalid subject slug '${q.subject}'`);
            continue;
        }

        // Validate basic fields
        if (!q.question_text || !q.options || !q.correct_option) {
            errors.push(`Row ${index + 1}: Missing required fields`);
            continue;
        }

        validQuestions.push({
            subject_id: subjectId,
            topic_id: topicId || null,
            question_text: q.question_text,
            options: typeof q.options === 'string' ? JSON.parse(q.options) : q.options,
            correct_option: q.correct_option,
            explanation: q.explanation || null,
            difficulty: q.difficulty || 'medium',
            is_pyq: !!q.is_pyq,
            pyq_year: q.pyq_year || null
        });
    }

    if (validQuestions.length === 0) {
        return { success: false, error: "No valid questions found", details: errors };
    }

    // 3. Batch Insert (chunked if necessary, keeping it simple for now)
    const { error } = await supabase.from('questions').insert(validQuestions);

    if (error) {
        console.error("Bulk insert error:", error);
        return { success: false, error: error.message };
    }

    revalidatePath('/admin/questions');
    return { success: true, count: validQuestions.length, errors };
}
