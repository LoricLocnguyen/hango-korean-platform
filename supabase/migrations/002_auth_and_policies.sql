-- ================================================================
-- HanGo Migration 002: Auth trigger + missing RLS policies
-- Run ONCE in Supabase SQL Editor, AFTER 001_initial_schema.sql
-- ================================================================

-- 1. Auto-create profile + settings rows when a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', split_part(NEW.email, '@', 1))
  )
  ON CONFLICT (id) DO NOTHING;

  INSERT INTO public.user_settings (user_id)
  VALUES (NEW.id)
  ON CONFLICT (user_id) DO NOTHING;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Backfill for users created before this migration existed
INSERT INTO public.profiles (id, email, full_name)
SELECT id, email, COALESCE(raw_user_meta_data ->> 'full_name', split_part(email, '@', 1))
FROM auth.users
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.user_settings (user_id)
SELECT id FROM auth.users
ON CONFLICT (user_id) DO NOTHING;

-- 2. Profiles: let a signed-in user insert their own row
--    (fallback for clients that create the profile right after signup)
CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- 3. Review logs: enable RLS + owner-only access
ALTER TABLE public.review_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own review logs"
  ON public.review_logs FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 4. User achievements: owner-only access (RLS was on, but no policy existed)
CREATE POLICY "Users manage own achievements"
  ON public.user_achievements FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 5. Community: public read, owners write their own rows
CREATE POLICY "Community posts are readable by all"
  ON public.community_posts FOR SELECT USING (true);
CREATE POLICY "Users create own posts"
  ON public.community_posts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own posts"
  ON public.community_posts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users delete own posts"
  ON public.community_posts FOR DELETE USING (auth.uid() = user_id);

ALTER TABLE public.community_comments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Community comments are readable by all"
  ON public.community_comments FOR SELECT USING (true);
CREATE POLICY "Users create own comments"
  ON public.community_comments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users delete own comments"
  ON public.community_comments FOR DELETE USING (auth.uid() = user_id);

-- 6. Remaining content tables: public read
ALTER TABLE public.lesson_blocks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Lesson blocks are readable by all"
  ON public.lesson_blocks FOR SELECT USING (true);

ALTER TABLE public.vocabulary_examples ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Vocabulary examples are readable by all"
  ON public.vocabulary_examples FOR SELECT USING (true);

ALTER TABLE public.exercises ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Exercises are readable by all"
  ON public.exercises FOR SELECT USING (true);

ALTER TABLE public.listening_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Listening items are readable by all"
  ON public.listening_items FOR SELECT USING (true);

ALTER TABLE public.speaking_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Speaking items are readable by all"
  ON public.speaking_items FOR SELECT USING (true);

ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Achievements are readable by all"
  ON public.achievements FOR SELECT USING (true);

ALTER TABLE public.daily_quests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Daily quests are readable by all"
  ON public.daily_quests FOR SELECT USING (true);

-- 7. Subscriptions: owner read only
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own subscription"
  ON public.subscriptions FOR SELECT USING (auth.uid() = user_id);
