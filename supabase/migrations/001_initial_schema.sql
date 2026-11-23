-- ================================================================
-- HanGo Database Schema (PostgreSQL + Supabase RLS)
-- Version: 1.0.0
-- ================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES & USERS
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    avatar_url TEXT,
    bio TEXT,
    role TEXT DEFAULT 'student' CHECK (role IN ('student', 'mentor', 'admin')),
    level INTEGER DEFAULT 1,
    total_xp INTEGER DEFAULT 0,
    coins INTEGER DEFAULT 50,
    hearts INTEGER DEFAULT 5,
    current_streak INTEGER DEFAULT 0,
    longest_streak INTEGER DEFAULT 0,
    last_active_date DATE DEFAULT CURRENT_DATE,
    daily_goal_minutes INTEGER DEFAULT 15,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. USER SETTINGS
CREATE TABLE IF NOT EXISTS public.user_settings (
    user_id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
    show_romanization BOOLEAN DEFAULT TRUE,
    auto_play_audio BOOLEAN DEFAULT TRUE,
    sound_effects BOOLEAN DEFAULT TRUE,
    audio_speed NUMERIC(3,2) DEFAULT 1.00,
    dark_mode TEXT DEFAULT 'system',
    reduced_motion BOOLEAN DEFAULT FALSE,
    reminder_time TIME DEFAULT '20:00:00',
    email_notifications BOOLEAN DEFAULT TRUE
);

-- 3. LEVELS (Level 0 -> 6)
CREATE TABLE IF NOT EXISTS public.levels (
    id TEXT PRIMARY KEY, -- 'level_0', 'level_1', etc.
    level_number INTEGER NOT NULL UNIQUE,
    title TEXT NOT NULL,
    hangul_title TEXT NOT NULL,
    description TEXT NOT NULL,
    badge_icon TEXT NOT NULL,
    estimated_hours INTEGER NOT NULL,
    required_xp INTEGER DEFAULT 0,
    order_index INTEGER NOT NULL
);

-- 4. MODULES
CREATE TABLE IF NOT EXISTS public.modules (
    id TEXT PRIMARY KEY,
    level_id TEXT NOT NULL REFERENCES public.levels(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    hangul_title TEXT,
    description TEXT,
    order_index INTEGER NOT NULL,
    total_xp INTEGER DEFAULT 200,
    is_published BOOLEAN DEFAULT TRUE
);

-- 5. LESSONS
CREATE TABLE IF NOT EXISTS public.lessons (
    id TEXT PRIMARY KEY,
    module_id TEXT NOT NULL REFERENCES public.modules(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    hangul_title TEXT,
    description TEXT,
    lesson_type TEXT NOT NULL CHECK (lesson_type IN ('hangul', 'vocab', 'grammar', 'listening', 'speaking', 'quiz', 'review')),
    duration_minutes INTEGER DEFAULT 15,
    xp_reward INTEGER DEFAULT 35,
    coin_reward INTEGER DEFAULT 5,
    order_index INTEGER NOT NULL,
    is_published BOOLEAN DEFAULT TRUE
);

-- 6. LESSON BLOCKS (Cấu trúc khối bài học phong phú)
CREATE TABLE IF NOT EXISTS public.lesson_blocks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lesson_id TEXT NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
    block_type TEXT NOT NULL CHECK (block_type IN ('explanation', 'vocabulary', 'flashcard', 'multiple_choice', 'fill_blank', 'matching', 'listening', 'speaking', 'sentence_order', 'translation', 'summary')),
    content JSONB NOT NULL,
    order_index INTEGER NOT NULL
);

-- 7. VOCABULARY BANK
CREATE TABLE IF NOT EXISTS public.vocabulary (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hangul TEXT NOT NULL,
    romaja TEXT NOT NULL,
    vietnamese TEXT NOT NULL,
    hanja_vietnamese TEXT,
    topic TEXT NOT NULL, -- 'greeting', 'family', 'food', 'travel', 'shopping', 'school', 'work', 'emotion', 'daily', 'topik'
    level TEXT NOT NULL, -- 'level_0', 'level_1', 'level_2', 'level_3'
    part_of_speech TEXT NOT NULL, -- 'noun', 'verb', 'adjective', 'adverb', 'phrase'
    audio_url TEXT,
    image_url TEXT,
    synonyms TEXT[],
    antonyms TEXT[],
    difficulty INTEGER DEFAULT 1 CHECK (difficulty BETWEEN 1 AND 5),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. VOCABULARY EXAMPLES
CREATE TABLE IF NOT EXISTS public.vocabulary_examples (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vocabulary_id UUID NOT NULL REFERENCES public.vocabulary(id) ON DELETE CASCADE,
    korean_sentence TEXT NOT NULL,
    romaja_sentence TEXT,
    vietnamese_translation TEXT NOT NULL,
    audio_url TEXT
);

-- 9. GRAMMAR POINTS
CREATE TABLE IF NOT EXISTS public.grammar_points (
    id TEXT PRIMARY KEY,
    pattern TEXT NOT NULL, -- e.g. '은/는', '이/가', '았/었어요'
    meaning TEXT NOT NULL,
    level TEXT NOT NULL,
    usage_notes TEXT NOT NULL,
    formula TEXT NOT NULL,
    common_mistakes TEXT,
    examples JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. EXERCISES & QUIZ QUESTIONS
CREATE TABLE IF NOT EXISTS public.exercises (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lesson_id TEXT REFERENCES public.lessons(id) ON DELETE CASCADE,
    exercise_type TEXT NOT NULL CHECK (exercise_type IN ('multiple_choice', 'true_false', 'fill_blank', 'matching', 'listening', 'speaking', 'sentence_order', 'translation')),
    prompt TEXT NOT NULL,
    audio_url TEXT,
    options JSONB,
    correct_answer TEXT NOT NULL,
    explanation TEXT,
    xp_reward INTEGER DEFAULT 10
);

-- 11. USER LESSON PROGRESS
CREATE TABLE IF NOT EXISTS public.user_lesson_progress (
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    lesson_id TEXT REFERENCES public.lessons(id) ON DELETE CASCADE,
    status TEXT DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'completed')),
    last_block_index INTEGER DEFAULT 0,
    score INTEGER DEFAULT 0,
    completed_at TIMESTAMPTZ,
    PRIMARY KEY (user_id, lesson_id)
);

-- 12. REVIEW CARDS (Spaced Repetition System - SM-2)
CREATE TABLE IF NOT EXISTS public.review_cards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    vocabulary_id UUID NOT NULL REFERENCES public.vocabulary(id) ON DELETE CASCADE,
    repetition_count INTEGER DEFAULT 0,
    interval_days INTEGER DEFAULT 1,
    ease_factor NUMERIC(4,2) DEFAULT 2.50,
    status TEXT DEFAULT 'learning' CHECK (status IN ('learning', 'reviewing', 'mastered')),
    next_review_at TIMESTAMPTZ DEFAULT NOW(),
    last_review_at TIMESTAMPTZ,
    UNIQUE(user_id, vocabulary_id)
);

-- 13. REVIEW LOGS
CREATE TABLE IF NOT EXISTS public.review_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    card_id UUID NOT NULL REFERENCES public.review_cards(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    grade INTEGER NOT NULL CHECK (grade BETWEEN 1 AND 4),
    review_duration_ms INTEGER,
    reviewed_at TIMESTAMPTZ DEFAULT NOW()
);

-- 14. LISTENING & SPEAKING PRACTICE
CREATE TABLE IF NOT EXISTS public.listening_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    audio_url TEXT NOT NULL,
    transcript TEXT NOT NULL,
    vietnamese_translation TEXT NOT NULL,
    level TEXT NOT NULL,
    questions JSONB NOT NULL
);

CREATE TABLE IF NOT EXISTS public.speaking_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    scenario TEXT NOT NULL, -- 'restaurant', 'shopping', 'directions', 'interview'
    korean_sentence TEXT NOT NULL,
    romaja TEXT NOT NULL,
    vietnamese_meaning TEXT NOT NULL,
    sample_audio_url TEXT
);

-- 15. ACHIEVEMENTS & GAMIFICATION
CREATE TABLE IF NOT EXISTS public.achievements (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    icon_name TEXT NOT NULL,
    xp_reward INTEGER DEFAULT 50,
    max_progress INTEGER DEFAULT 1
);

CREATE TABLE IF NOT EXISTS public.user_achievements (
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    achievement_id TEXT REFERENCES public.achievements(id) ON DELETE CASCADE,
    current_progress INTEGER DEFAULT 0,
    is_unlocked BOOLEAN DEFAULT FALSE,
    unlocked_at TIMESTAMPTZ,
    PRIMARY KEY(user_id, achievement_id)
);

-- 16. DAILY QUESTS
CREATE TABLE IF NOT EXISTS public.daily_quests (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    xp_reward INTEGER DEFAULT 30,
    coin_reward INTEGER DEFAULT 5,
    target_count INTEGER NOT NULL,
    quest_type TEXT NOT NULL
);

-- 17. SUBSCRIPTIONS
CREATE TABLE IF NOT EXISTS public.subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    tier TEXT DEFAULT 'free' CHECK (tier IN ('free', 'pro', 'lifetime')),
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'expired')),
    expires_at TIMESTAMPTZ
);

-- 18. COMMUNITY POSTS & INTERACTION
CREATE TABLE IF NOT EXISTS public.community_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT DEFAULT 'question' CHECK (category IN ('question', 'progress', 'tips', 'discussion')),
    likes_count INTEGER DEFAULT 0,
    comments_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.community_comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id UUID NOT NULL REFERENCES public.community_posts(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.review_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_posts ENABLE ROW LEVEL SECURITY;

-- Profiles: Public read, User can update own
CREATE POLICY "Profiles are publicly readable" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- User Settings: Private to user
CREATE POLICY "Users access own settings" ON public.user_settings FOR ALL USING (auth.uid() = user_id);

-- Review Cards: Private to user
CREATE POLICY "Users manage own SRS cards" ON public.review_cards FOR ALL USING (auth.uid() = user_id);

-- Progress: Private to user
CREATE POLICY "Users manage own progress" ON public.user_lesson_progress FOR ALL USING (auth.uid() = user_id);

-- Content (Levels, Modules, Lessons, Vocab, Grammar): Public read
ALTER TABLE public.levels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vocabulary ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.grammar_points ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Levels are readable by all" ON public.levels FOR SELECT USING (true);
CREATE POLICY "Modules are readable by all" ON public.modules FOR SELECT USING (true);
CREATE POLICY "Lessons are readable by all" ON public.lessons FOR SELECT USING (true);
CREATE POLICY "Vocabulary is readable by all" ON public.vocabulary FOR SELECT USING (true);
CREATE POLICY "Grammar points are readable by all" ON public.grammar_points FOR SELECT USING (true);

-- Indexes for optimal lookup performance
CREATE INDEX IF NOT EXISTS idx_vocab_topic ON public.vocabulary(topic);
CREATE INDEX IF NOT EXISTS idx_vocab_level ON public.vocabulary(level);
CREATE INDEX IF NOT EXISTS idx_review_cards_due ON public.review_cards(user_id, next_review_at);
CREATE INDEX IF NOT EXISTS idx_lessons_module ON public.lessons(module_id);
