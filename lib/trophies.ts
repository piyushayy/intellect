import { LucideIcon, Footprints, Target, Zap, BookOpen, Brain, Globe, History, Eye, CheckCircle2, ListTodo, BarChart3, Medal, Trophy } from "lucide-react";

export interface Trophy {
    id: string;
    title: string;
    description: string;
    category: 'consistency' | 'mastery' | 'pyq' | 'milestone';
    icon: LucideIcon;
    condition: (stats: UserStats) => boolean;
}

export interface UserStats {
    totalQuestions: number;
    daysPracticed: number;
    streak: number;
    englishEasyCompleted: boolean;
    mathAccuracy: number;
    gtAttempted: boolean;
    pyqYearsAttempted: number;
    pyqTopicAccuracy: number;
    fullMockCompleted: boolean;
}

export const TROPHIES: Trophy[] = [
    // CATEGORY 1: CONSISTENCY
    {
        id: 'first-step',
        title: 'First Step',
        description: 'Completed first practice session',
        category: 'consistency',
        icon: Footprints,
        condition: (stats) => stats.totalQuestions > 0
    },
    {
        id: 'focused-learner',
        title: 'Focused Learner',
        description: 'Practiced 3 days in a row',
        category: 'consistency',
        icon: Zap,
        condition: (stats) => stats.streak >= 3
    },
    {
        id: 'steady-progress',
        title: 'Steady Progress',
        description: 'Practiced 10 days total',
        category: 'consistency',
        icon: History,
        condition: (stats) => stats.daysPracticed >= 10
    },

    // CATEGORY 2: SUBJECT MASTERY
    {
        id: 'english-basics',
        title: 'English Basics Clear',
        description: 'Completed all easy English questions',
        category: 'mastery',
        icon: BookOpen,
        condition: (stats) => stats.englishEasyCompleted
    },
    {
        id: 'math-confidence',
        title: 'Math Confidence Builder',
        description: '70%+ accuracy in Math',
        category: 'mastery',
        icon: Brain,
        condition: (stats) => stats.mathAccuracy >= 70
    },
    {
        id: 'gt-starter',
        title: 'General Test Starter',
        description: 'Attempted first full GT set',
        category: 'mastery',
        icon: Globe,
        condition: (stats) => stats.gtAttempted
    },

    // CATEGORY 3: PYQ-BASED (BEST DIFFERENTIATOR)
    {
        id: 'pyq-explorer',
        title: 'PYQ Explorer',
        description: 'Attempted PYQs from 3 years',
        category: 'pyq',
        icon: Eye,
        condition: (stats) => stats.pyqYearsAttempted >= 3
    },
    {
        id: 'pattern-spotter',
        title: 'Pattern Spotter',
        description: '80% accuracy in PYQs of one topic',
        category: 'pyq',
        icon: Target,
        condition: (stats) => stats.pyqTopicAccuracy >= 80
    },
    {
        id: 'exam-ready',
        title: 'Exam Ready',
        description: 'Completed one full PYQ mock',
        category: 'pyq',
        icon: CheckCircle2,
        condition: (stats) => stats.fullMockCompleted
    },

    // CATEGORY 4: CALM MILESTONE
    {
        id: '100-questions',
        title: 'Century',
        description: '100 Questions Practiced',
        category: 'milestone',
        icon: ListTodo,
        condition: (stats) => stats.totalQuestions >= 100
    },
    {
        id: '500-questions',
        title: 'High Volume',
        description: '500 Questions Practiced',
        category: 'milestone',
        icon: BarChart3,
        condition: (stats) => stats.totalQuestions >= 500
    },
    {
        id: 'first-mock',
        title: 'The Real Deal',
        description: 'First Full Mock Attempted',
        category: 'milestone',
        icon: Medal,
        condition: (stats) => stats.fullMockCompleted
    }
];
