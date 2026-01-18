'use server'

import { supabase } from '@/lib/supabase'

export async function getSubjectsWithTopics() {
    const { data: subjects, error } = await supabase
        .from('subjects')
        .select(`
      *,
      topics (
        id,
        name,
        slug
      )
    `)
        .order('name');

    if (error) {
        console.error('Error fetching subjects:', error);
        return [];
    }

    return subjects || [];
}

export async function getTopics(subjectSlug: string) {
    // First get subject ID
    const { data: subject } = await supabase
        .from('subjects')
        .select('id')
        .eq('slug', subjectSlug)
        .single()

    if (!subject) return []

    const { data: topics } = await supabase
        .from('topics')
        .select('*')
        .eq('subject_id', subject.id)
        .order('name')

    return topics || []
}

export async function getQuestions(subjectSlug: string, topicSlug: string) {
    // 1. Get Subject & Topic IDs
    const { data: subject } = await supabase
        .from('subjects')
        .select('id')
        .eq('slug', subjectSlug)
        .single()

    if (!subject) return []

    const { data: topic } = await supabase
        .from('topics')
        .select('id')
        .eq('slug', topicSlug)
        .eq('subject_id', subject.id)
        .single()

    if (!topic) return []

    // 2. Fetch Questions
    // Use text cast to options to ensure lightweight text transfer if complex jsonb
    const { data: questions } = await supabase
        .from('questions')
        .select('*')
        .eq('topic_id', topic.id)
        .limit(20) // Limit for now

    return questions || []
}
