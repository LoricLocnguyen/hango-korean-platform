import { create } from 'zustand';
import type { User } from '@supabase/supabase-js';
import { UserProfile, SRSItem, SRSGrade, VocabularyItem } from './types';
import { initialUserProfile, sampleSRSCards } from './mock-data';
import { calculateSM2 } from './srs';
import { createClient } from './supabase/client';

const supabase = createClient();

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const POS_MAP: Record<string, VocabularyItem['partOfSpeech']> = {
  noun: 'Danh từ',
  verb: 'Động từ',
  adjective: 'Tính từ',
  adverb: 'Phó từ',
  phrase: 'Cụm từ',
};

const LEVEL_MAP: Record<string, VocabularyItem['level']> = {
  level_0: 'Hangul',
  level_1: 'Sơ cấp 1',
  level_2: 'Sơ cấp 2',
  level_3: 'Trung cấp',
};

interface ProfileRow {
  id: string;
  email: string;
  full_name: string;
  avatar_url: string | null;
  level: number;
  total_xp: number;
  current_streak: number;
  longest_streak: number;
  daily_goal_minutes: number;
}

function mapProfile(row: ProfileRow, wordsLearned: number): UserProfile {
  return {
    id: row.id,
    email: row.email,
    fullName: row.full_name,
    avatarUrl:
      row.avatar_url ||
      `https://ui-avatars.com/api/?name=${encodeURIComponent(row.full_name)}&background=0B192C&color=fff`,
    level: row.level ?? 1,
    totalXp: row.total_xp ?? 0,
    currentStreak: row.current_streak ?? 0,
    longestStreak: row.longest_streak ?? 0,
    wordsLearned,
    consecutiveDays: row.current_streak ?? 0,
    dailyGoalMinutes: row.daily_goal_minutes ?? 15,
    todayMinutes: 0,
    todayXp: 0,
  };
}

function fallbackProfile(authUser: User): UserProfile {
  const fullName =
    (authUser.user_metadata?.full_name as string) ||
    authUser.email?.split('@')[0] ||
    'Học viên';
  return {
    ...initialUserProfile,
    id: authUser.id,
    email: authUser.email || '',
    fullName,
    totalXp: 0,
    todayXp: 0,
    todayMinutes: 0,
    wordsLearned: 0,
    currentStreak: 0,
    consecutiveDays: 0,
  };
}

export type LessonProgressStatus = 'in_progress' | 'completed';

interface HanGoStore {
  user: UserProfile;
  srsCards: SRSItem[];
  isAuthenticated: boolean;
  authReady: boolean;
  soundEnabled: boolean;
  progressByLesson: Record<string, LessonProgressStatus>;

  // Auth lifecycle
  initAuth: () => Promise<void>;
  loginWithPassword: (email: string, password: string) => Promise<{ error?: string }>;
  signupWithPassword: (
    fullName: string,
    email: string,
    password: string
  ) => Promise<{ error?: string; needsConfirmation?: boolean }>;
  loginWithGoogle: () => Promise<{ error?: string }>;
  resetPassword: (email: string) => Promise<{ error?: string }>;
  logout: () => Promise<void>;

  // Kept for backwards compatibility with existing components
  login: (email: string, name?: string) => void;

  // Learning actions
  completeOnboarding: (data: { goal: string; level: string; dailyMinutes: number; topics: string[] }) => void;
  updateProfile: (fullName: string, email: string, dailyGoalMinutes: number) => void;
  gradeSRSCard: (cardId: string, grade: SRSGrade) => void;
  addXP: (amount: number, minutes?: number) => void;
  markLessonCompleted: (lessonId: string, xpReward: number) => void;
  toggleSound: () => void;
}

let authListenerAttached = false;

export const useHanGoStore = create<HanGoStore>((set, get) => {
  // Load (or create) the profile row + all per-user data for a signed-in user.
  async function hydrate(authUser: User) {
    let profileRow: ProfileRow | null = null;

    const { data } = await supabase
      .from('profiles')
      .select('id, email, full_name, avatar_url, level, total_xp, current_streak, longest_streak, daily_goal_minutes')
      .eq('id', authUser.id)
      .maybeSingle();

    if (data) {
      profileRow = data as ProfileRow;
    } else {
      // Profile row missing (e.g. trigger migration not run yet) — try to
      // create it from the client; the INSERT policy from migration 002
      // allows a user to insert their own row.
      const fullName =
        (authUser.user_metadata?.full_name as string) ||
        authUser.email?.split('@')[0] ||
        'Học viên';
      const { data: inserted } = await supabase
        .from('profiles')
        .insert({ id: authUser.id, email: authUser.email, full_name: fullName })
        .select('id, email, full_name, avatar_url, level, total_xp, current_streak, longest_streak, daily_goal_minutes')
        .maybeSingle();
      if (inserted) profileRow = inserted as ProfileRow;
    }

    // Settings (sound effects toggle)
    const { data: settings } = await supabase
      .from('user_settings')
      .select('sound_effects')
      .eq('user_id', authUser.id)
      .maybeSingle();

    // Lesson progress
    const { data: progressRows } = await supabase
      .from('user_lesson_progress')
      .select('lesson_id, status')
      .eq('user_id', authUser.id);
    const progressByLesson: Record<string, LessonProgressStatus> = {};
    (progressRows || []).forEach((r: { lesson_id: string; status: string }) => {
      if (r.status === 'completed' || r.status === 'in_progress') {
        progressByLesson[r.lesson_id] = r.status;
      }
    });

    // SRS cards — create them from the vocabulary bank on first login
    let cards = await loadCards(authUser.id);
    if (cards.length === 0) {
      const { data: vocab } = await supabase.from('vocabulary').select('id').limit(500);
      if (vocab && vocab.length > 0) {
        await supabase
          .from('review_cards')
          .upsert(
            vocab.map((v: { id: string }) => ({ user_id: authUser.id, vocabulary_id: v.id })),
            { onConflict: 'user_id,vocabulary_id', ignoreDuplicates: true }
          );
        cards = await loadCards(authUser.id);
      }
    }

    const wordsLearned = cards.filter((c) => c.repetitionCount > 0).length;

    set({
      isAuthenticated: true,
      authReady: true,
      user: profileRow ? mapProfile(profileRow, wordsLearned) : fallbackProfile(authUser),
      srsCards: cards.length > 0 ? cards : sampleSRSCards,
      progressByLesson,
      soundEnabled: settings ? settings.sound_effects !== false : get().soundEnabled,
    });
  }

  async function loadCards(userId: string): Promise<SRSItem[]> {
    const { data } = await supabase
      .from('review_cards')
      .select(
        'id, vocabulary_id, repetition_count, interval_days, ease_factor, status, next_review_at, last_review_at, vocabulary:vocabulary_id ( id, hangul, romaja, vietnamese, hanja_vietnamese, part_of_speech, level )'
      )
      .eq('user_id', userId)
      .order('next_review_at', { ascending: true });

    if (!data) return [];

    const vocabIds = data.map((c: any) => c.vocabulary_id);
    const exampleByVocab = new Map<string, { korean: string; vietnamese: string }>();
    if (vocabIds.length > 0) {
      const { data: examples } = await supabase
        .from('vocabulary_examples')
        .select('vocabulary_id, korean_sentence, vietnamese_translation')
        .in('vocabulary_id', vocabIds);
      (examples || []).forEach((e: any) => {
        if (!exampleByVocab.has(e.vocabulary_id)) {
          exampleByVocab.set(e.vocabulary_id, {
            korean: e.korean_sentence,
            vietnamese: e.vietnamese_translation,
          });
        }
      });
    }

    return data
      .filter((c: any) => c.vocabulary)
      .map((c: any) => {
        const v = c.vocabulary;
        const ex = exampleByVocab.get(c.vocabulary_id);
        const vocabulary: VocabularyItem = {
          id: v.id,
          hangul: v.hangul,
          romaja: v.romaja,
          vietnamese: v.vietnamese,
          hanjaVietnamese: v.hanja_vietnamese || undefined,
          partOfSpeech: POS_MAP[v.part_of_speech] || 'Danh từ',
          exampleKorean: ex?.korean || '',
          exampleVietnamese: ex?.vietnamese || '',
          level: LEVEL_MAP[v.level] || 'Sơ cấp 1',
        };
        return {
          id: c.id,
          userId,
          vocabularyId: c.vocabulary_id,
          vocabulary,
          repetitionCount: c.repetition_count ?? 0,
          intervalDays: c.interval_days ?? 1,
          easeFactor: Number(c.ease_factor ?? 2.5),
          nextReviewAt: c.next_review_at,
          lastReviewAt: c.last_review_at || undefined,
          status: (c.status as SRSItem['status']) || 'learning',
        } as SRSItem;
      });
  }

  // Neutral profile shown to signed-out visitors. The bundled demo persona
  // (initialUserProfile) must never pose as the visitor's own account —
  // guests start from a clean slate and only see real numbers after login.
  const guestProfile: UserProfile = {
    ...initialUserProfile,
    id: 'guest',
    email: '',
    fullName: 'Khách',
    avatarUrl:
      'https://ui-avatars.com/api/?name=K&background=64748b&color=fff',
    level: 1,
    totalXp: 0,
    currentStreak: 0,
    longestStreak: 0,
    wordsLearned: 0,
    consecutiveDays: 0,
    todayMinutes: 0,
    todayXp: 0,
    nextLessonId: 'les_h01_1',
    nextLessonTitle: 'Bài 1: 10 Nguyên âm cơ bản',
  };

  function resetToGuest() {
    set({
      isAuthenticated: false,
      authReady: true,
      user: guestProfile,
      srsCards: sampleSRSCards,
      progressByLesson: {},
    });
  }

  return {
    user: guestProfile,
    srsCards: sampleSRSCards,
    isAuthenticated: false,
    authReady: false,
    soundEnabled: true,
    progressByLesson: {},

    initAuth: async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user) {
        await hydrate(session.user);
      } else {
        set({ authReady: true });
      }

      if (!authListenerAttached) {
        authListenerAttached = true;
        supabase.auth.onAuthStateChange((_event, newSession) => {
          if (newSession?.user) {
            void hydrate(newSession.user);
          } else {
            resetToGuest();
          }
        });
      }
    },

    loginWithPassword: async (email, password) => {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        return {
          error:
            error.message === 'Invalid login credentials'
              ? 'Email hoặc mật khẩu chưa đúng. Anh kiểm tra lại giúp em nhé!'
              : error.message,
        };
      }
      return {};
    },

    signupWithPassword: async (fullName, email, password) => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName },
          emailRedirectTo: `${window.location.origin}/auth/callback?next=/onboarding`,
        },
      });
      if (error) {
        return {
          error:
            error.message === 'User already registered'
              ? 'Email này đã có tài khoản rồi. Anh đăng nhập nhé!'
              : error.message,
        };
      }
      return { needsConfirmation: !data.session };
    },

    loginWithGoogle: async () => {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
        },
      });
      if (error) return { error: error.message };
      return {};
    },

    resetPassword: async (email) => {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
      });
      if (error) return { error: error.message };
      return {};
    },

    logout: async () => {
      await supabase.auth.signOut();
      resetToGuest();
    },

    // Legacy local-only login (kept so older components keep compiling;
    // the auth forms now use the real Supabase actions above).
    login: (email: string, name?: string) => {
      set((state) => ({
        isAuthenticated: true,
        user: {
          ...state.user,
          email,
          fullName: name || email.split('@')[0],
        },
      }));
    },

    completeOnboarding: (data) => {
      set((state) => ({
        user: {
          ...state.user,
          dailyGoalMinutes: data.dailyMinutes,
        },
      }));
      if (get().isAuthenticated) {
        void supabase
          .from('profiles')
          .update({ daily_goal_minutes: data.dailyMinutes })
          .eq('id', get().user.id);
        void supabase.auth.updateUser({
          data: { goal: data.goal, level: data.level, topics: data.topics, onboarded: true },
        });
      }
    },

    updateProfile: (fullName, email, dailyGoalMinutes) => {
      set((state) => ({
        user: {
          ...state.user,
          fullName,
          email,
          dailyGoalMinutes,
        },
      }));
      if (get().isAuthenticated) {
        void supabase
          .from('profiles')
          .update({ full_name: fullName, daily_goal_minutes: dailyGoalMinutes })
          .eq('id', get().user.id);
      }
    },

    gradeSRSCard: (cardId: string, grade: SRSGrade) => {
      const state = get();
      const card = state.srsCards.find((c) => c.id === cardId);
      const earnedXp = grade >= 3 ? 15 : 5;

      set((s) => {
        const updatedCards = s.srsCards.map((c) => {
          if (c.id !== cardId) return c;
          const res = calculateSM2(grade, c.repetitionCount, c.intervalDays, c.easeFactor);
          const nextDate = new Date();
          nextDate.setDate(nextDate.getDate() + res.intervalDays);
          return {
            ...c,
            repetitionCount: res.repetitionCount,
            intervalDays: res.intervalDays,
            easeFactor: res.easeFactor,
            status: res.status,
            nextReviewAt: nextDate.toISOString(),
            lastReviewAt: new Date().toISOString(),
          };
        });

        return {
          srsCards: updatedCards,
          user: {
            ...s.user,
            totalXp: s.user.totalXp + earnedXp,
            todayXp: s.user.todayXp + earnedXp,
            wordsLearned: grade >= 3 ? s.user.wordsLearned + 1 : s.user.wordsLearned,
          },
        };
      });

      // Persist to Supabase when this is a real DB-backed card
      if (state.isAuthenticated && card && UUID_RE.test(card.id)) {
        const updated = get().srsCards.find((c) => c.id === cardId);
        if (updated) {
          void supabase
            .from('review_cards')
            .update({
              repetition_count: updated.repetitionCount,
              interval_days: updated.intervalDays,
              ease_factor: updated.easeFactor,
              status: updated.status,
              next_review_at: updated.nextReviewAt,
              last_review_at: updated.lastReviewAt,
            })
            .eq('id', cardId);
          void supabase.from('review_logs').insert({
            card_id: cardId,
            user_id: state.user.id,
            grade,
          });
          void supabase
            .from('profiles')
            .update({ total_xp: get().user.totalXp })
            .eq('id', state.user.id);
        }
      }
    },

    addXP: (amount: number, minutes = 5) => {
      set((state) => ({
        user: {
          ...state.user,
          totalXp: state.user.totalXp + amount,
          todayXp: state.user.todayXp + amount,
          todayMinutes: state.user.todayMinutes + minutes,
        },
      }));
      if (get().isAuthenticated) {
        void supabase
          .from('profiles')
          .update({
            total_xp: get().user.totalXp,
            last_active_date: new Date().toISOString().slice(0, 10),
          })
          .eq('id', get().user.id);
      }
    },

    markLessonCompleted: (lessonId: string, xpReward: number) => {
      set((state) => ({
        progressByLesson: { ...state.progressByLesson, [lessonId]: 'completed' },
      }));
      if (get().isAuthenticated) {
        void supabase.from('user_lesson_progress').upsert(
          {
            user_id: get().user.id,
            lesson_id: lessonId,
            status: 'completed',
            score: 100,
            completed_at: new Date().toISOString(),
          },
          { onConflict: 'user_id,lesson_id' }
        );
      }
      if (xpReward > 0) get().addXP(xpReward, 10);
    },

    toggleSound: () => {
      set((state) => ({ soundEnabled: !state.soundEnabled }));
      if (get().isAuthenticated) {
        void supabase.from('user_settings').upsert(
          { user_id: get().user.id, sound_effects: get().soundEnabled },
          { onConflict: 'user_id' }
        );
      }
    },
  };
});
