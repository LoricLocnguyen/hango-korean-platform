import { createClient } from './client';
import {
  fullLevelsData,
  fullVocabulariesData,
  fullGrammarData,
  sampleListeningExercises,
  sampleSpeakingScenarios,
  sampleQuizQuestions,
  type LevelData,
  type FullVocabulary,
  type GrammarPoint,
  type ListeningExercise,
  type SpeakingScenario,
  type QuizQuestion,
} from '../seed-data';
import { sampleLeaderboard, sampleAchievements } from '../mock-data';
import type { LeaderboardEntry, AchievementItem } from '../types';

const supabase = createClient();

export const TOPIC_NAMES: Record<string, string> = {
  greeting: 'Chào hỏi',
  family: 'Gia đình',
  food: 'Ăn uống',
  travel: 'Du lịch',
  shopping: 'Mua sắm',
  school: 'Trường học',
  work: 'Công việc',
  emotion: 'Cảm xúc',
  daily: 'Đời sống',
  topik: 'TOPIK',
};

const POS_VI: Record<string, string> = {
  noun: 'Danh từ',
  verb: 'Động từ',
  adjective: 'Tính từ',
  adverb: 'Phó từ',
  phrase: 'Cụm từ',
};

// ---------------------------------------------------------------- levels tree
export async function getLevelsTree(): Promise<LevelData[]> {
  try {
    const [{ data: levels }, { data: modules }, { data: lessons }] = await Promise.all([
      supabase.from('levels').select('*').order('order_index'),
      supabase.from('modules').select('*').order('order_index'),
      supabase.from('lessons').select('*').order('order_index'),
    ]);
    if (!levels || levels.length === 0) return fullLevelsData;

    return levels.map((lv: any) => ({
      id: lv.id,
      levelNumber: lv.level_number,
      title: lv.title,
      hangulTitle: lv.hangul_title,
      description: lv.description,
      badgeIcon: lv.badge_icon,
      estimatedHours: lv.estimated_hours,
      requiredXp: lv.required_xp ?? 0,
      modules: (modules || [])
        .filter((m: any) => m.level_id === lv.id)
        .map((m: any) => ({
          id: m.id,
          levelId: m.level_id,
          title: m.title,
          hangulTitle: m.hangul_title || '',
          description: m.description || '',
          totalXp: m.total_xp ?? 200,
          lessons: (lessons || [])
            .filter((l: any) => l.module_id === m.id)
            .map((l: any) => ({
              id: l.id,
              moduleId: l.module_id,
              title: l.title,
              hangulTitle: l.hangul_title || '',
              description: l.description || '',
              lessonType: l.lesson_type,
              durationMinutes: l.duration_minutes ?? 15,
              xpReward: l.xp_reward ?? 35,
              completed: false,
              locked: false,
            })),
        })),
    }));
  } catch {
    return fullLevelsData;
  }
}

// ---------------------------------------------------------------- vocabulary
export async function getVocabularies(): Promise<FullVocabulary[]> {
  try {
    const { data } = await supabase
      .from('vocabulary')
      .select(
        'id, hangul, romaja, vietnamese, hanja_vietnamese, topic, level, part_of_speech, audio_url, synonyms, antonyms, difficulty'
      )
      .order('hangul')
      .limit(1000);
    if (!data || data.length === 0) return fullVocabulariesData;

    const ids = data.map((v: any) => v.id);
    const exampleByVocab = new Map<string, { korean: string; vietnamese: string }>();
    const { data: examples } = await supabase
      .from('vocabulary_examples')
      .select('vocabulary_id, korean_sentence, vietnamese_translation')
      .in('vocabulary_id', ids);
    (examples || []).forEach((e: any) => {
      if (!exampleByVocab.has(e.vocabulary_id)) {
        exampleByVocab.set(e.vocabulary_id, {
          korean: e.korean_sentence,
          vietnamese: e.vietnamese_translation,
        });
      }
    });

    return data.map((v: any) => ({
      id: v.id,
      hangul: v.hangul,
      romaja: v.romaja,
      vietnamese: v.vietnamese,
      hanjaVietnamese: v.hanja_vietnamese || undefined,
      topic: v.topic,
      topicName: TOPIC_NAMES[v.topic] || v.topic,
      level: v.level,
      partOfSpeech: POS_VI[v.part_of_speech] || v.part_of_speech,
      exampleKorean: exampleByVocab.get(v.id)?.korean || '',
      exampleVietnamese: exampleByVocab.get(v.id)?.vietnamese || '',
      audioUrl: v.audio_url || undefined,
      synonyms: v.synonyms || undefined,
      antonyms: v.antonyms || undefined,
      difficulty: v.difficulty ?? 1,
    }));
  } catch {
    return fullVocabulariesData;
  }
}

export async function getVocabularyById(id: string): Promise<FullVocabulary | null> {
  try {
    const { data } = await supabase
      .from('vocabulary')
      .select(
        'id, hangul, romaja, vietnamese, hanja_vietnamese, topic, level, part_of_speech, audio_url, synonyms, antonyms, difficulty'
      )
      .eq('id', id)
      .maybeSingle();
    if (data) {
      const { data: examples } = await supabase
        .from('vocabulary_examples')
        .select('korean_sentence, vietnamese_translation')
        .eq('vocabulary_id', id)
        .limit(1);
      const ex = (examples || [])[0] as any;
      return {
        id: data.id,
        hangul: data.hangul,
        romaja: data.romaja,
        vietnamese: data.vietnamese,
        hanjaVietnamese: data.hanja_vietnamese || undefined,
        topic: data.topic,
        topicName: TOPIC_NAMES[data.topic] || data.topic,
        level: data.level,
        partOfSpeech: POS_VI[data.part_of_speech] || data.part_of_speech,
        exampleKorean: ex?.korean_sentence || '',
        exampleVietnamese: ex?.vietnamese_translation || '',
        audioUrl: data.audio_url || undefined,
        synonyms: data.synonyms || undefined,
        antonyms: data.antonyms || undefined,
        difficulty: data.difficulty ?? 1,
      } as FullVocabulary;
    }
  } catch {
    // fall through to the bundled data below
  }
  return fullVocabulariesData.find((w) => w.id === id) || null;
}

// ---------------------------------------------------------------- grammar
export async function getGrammarPoints(): Promise<GrammarPoint[]> {
  try {
    const { data } = await supabase.from('grammar_points').select('*').order('id');
    if (!data || data.length === 0) return fullGrammarData;
    return data.map((g: any) => ({
      id: g.id,
      pattern: g.pattern,
      name: g.pattern,
      level: g.level,
      meaning: g.meaning,
      usageNotes: g.usage_notes,
      formula: g.formula,
      commonMistakes: g.common_mistakes || '',
      examples: Array.isArray(g.examples) ? g.examples : [],
    }));
  } catch {
    return fullGrammarData;
  }
}

// ---------------------------------------------------------------- listening / speaking
export async function getListeningExercises(): Promise<ListeningExercise[]> {
  try {
    const { data } = await supabase.from('listening_items').select('*').limit(100);
    if (!data || data.length === 0) return sampleListeningExercises;
    return data.map((it: any) => {
      const q = Array.isArray(it.questions) ? it.questions[0] || {} : it.questions || {};
      return {
        id: it.id,
        title: it.title,
        level: it.level,
        audioPrompt: it.transcript,
        transcript: it.transcript,
        vietnamese: it.vietnamese_translation,
        question: q.question || '',
        options: q.options || [],
        correctAnswer: q.correctAnswer || '',
        explanation: q.explanation || '',
      };
    });
  } catch {
    return sampleListeningExercises;
  }
}

const SPEAKING_CATEGORY_NAMES: Record<string, string> = {
  restaurant: 'Gọi món tại quán ăn',
  shopping: 'Mua sắm',
  directions: 'Hỏi đường',
  introduction: 'Giới thiệu bản thân',
  interview: 'Phỏng vấn',
  hotel: 'Khách sạn',
  'small-talk': 'Trò chuyện',
};

const SPEAKING_CATEGORY_HINTS: Record<string, string> = {
  restaurant: 'Nói rõ ràng, nhấn giọng tự nhiên ở đuôi câu yêu cầu (주세요) và giữ tốc độ vừa phải.',
  shopping: 'Chú ý cách đọc số tiền và đơn vị đếm; hỏi giá bằng cấu trúc 얼마예요?',
  directions: 'Nhấn vào các từ chỉ vị trí (여기, 저기, 오른쪽, 왼쪽) để người nghe dễ nắm ý.',
  introduction: 'Giới thiệu chậm rãi, kết thúc câu bằng -입니다 để giữ phong thái lịch sự.',
  interview: 'Dùng kính ngữ nhất quán, tránh đuôi câu thân mật; trả lời đủ ý, không quá dài.',
  hotel: 'Nhấn rõ thời gian nhận/trả phòng và các yêu cầu đặc biệt trong câu.',
  'small-talk': 'Giữ ngữ điệu thân thiện, lên giọng nhẹ ở cuối câu hỏi.',
};

export async function getSpeakingScenarios(): Promise<SpeakingScenario[]> {
  try {
    const { data } = await supabase.from('speaking_items').select('*').limit(100);
    if (!data || data.length === 0) return sampleSpeakingScenarios;
    // The bundled samples carry the Vietnamese category names and study
    // hints; recover them by matching the Korean sentence.
    const sampleBySentence = new Map(
      sampleSpeakingScenarios.map((s) => [s.koreanText, s])
    );
    return data.map((it: any) => {
      const sample = sampleBySentence.get(it.korean_sentence);
      return {
        id: it.id,
        category: it.scenario,
        categoryName:
          sample?.categoryName ||
          SPEAKING_CATEGORY_NAMES[it.scenario] ||
          it.scenario,
        koreanText: it.korean_sentence,
        romaja: it.romaja,
        vietnameseMeaning: it.vietnamese_meaning,
        hint:
          sample?.hint ||
          SPEAKING_CATEGORY_HINTS[it.scenario] ||
          'Đọc to từng cụm từ, chú ý nối âm và ngữ điệu cuối câu.',
      };
    });
  } catch {
    return sampleSpeakingScenarios;
  }
}

// ---------------------------------------------------------------- quiz / exercises
export async function getQuizQuestions(): Promise<QuizQuestion[]> {
  try {
    const { data } = await supabase.from('exercises').select('*').limit(200);
    if (!data || data.length === 0) return sampleQuizQuestions;
    return data.map((e: any) => ({
      id: e.id,
      type: e.exercise_type,
      prompt: e.prompt,
      options: Array.isArray(e.options) ? e.options : undefined,
      correctAnswer: e.correct_answer,
      explanation: e.explanation || '',
      xpReward: e.xp_reward ?? 10,
    }));
  } catch {
    return sampleQuizQuestions;
  }
}

// ---------------------------------------------------------------- leaderboard
export async function getLeaderboard(currentUserId?: string): Promise<LeaderboardEntry[]> {
  try {
    const { data } = await supabase
      .from('profiles')
      .select('id, full_name, avatar_url, total_xp, current_streak')
      .order('total_xp', { ascending: false })
      .limit(20);
    if (!data || data.length === 0) return sampleLeaderboard;
    return data.map((p: any, i: number) => ({
      rank: i + 1,
      userId: p.id,
      fullName: p.full_name,
      avatarUrl:
        p.avatar_url ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(p.full_name)}&background=0B192C&color=fff`,
      totalXp: p.total_xp ?? 0,
      streak: p.current_streak ?? 0,
      isCurrentUser: currentUserId ? p.id === currentUserId : false,
    }));
  } catch {
    return sampleLeaderboard;
  }
}

// ---------------------------------------------------------------- achievements
export async function getAchievements(userId?: string): Promise<AchievementItem[]> {
  try {
    const { data } = await supabase.from('achievements').select('*').order('id');
    if (!data || data.length === 0) return sampleAchievements;

    const progressById = new Map<string, { progress: number; unlocked: boolean; unlockedAt?: string }>();
    if (userId) {
      const { data: ua } = await supabase
        .from('user_achievements')
        .select('achievement_id, current_progress, is_unlocked, unlocked_at')
        .eq('user_id', userId);
      (ua || []).forEach((r: any) =>
        progressById.set(r.achievement_id, {
          progress: r.current_progress ?? 0,
          unlocked: !!r.is_unlocked,
          unlockedAt: r.unlocked_at || undefined,
        })
      );
    }

    return data.map((a: any) => {
      const p = progressById.get(a.id);
      const max = a.max_progress ?? 1;
      return {
        id: a.id,
        title: a.name,
        description: a.description,
        icon: a.icon_name,
        xpReward: a.xp_reward ?? 50,
        unlockedAt: p?.unlockedAt,
        isUnlocked: p?.unlocked ?? false,
        progressPercent: Math.min(100, Math.round(((p?.progress ?? 0) / max) * 100)),
      };
    });
  } catch {
    return sampleAchievements;
  }
}

// ------------------------------------------------------- achievements catalog
export interface AchievementCatalogItem {
  id: string;
  name: string;
  desc: string;
  category: string;
  icon: string;
  xpReward: number;
  isUnlocked: boolean;
  progress: number; // percent 0-100
  unlockedAt?: string;
}

export async function getAchievementsCatalog(
  userId?: string
): Promise<AchievementCatalogItem[]> {
  try {
    const { data } = await supabase.from('achievements').select('*').order('id');
    if (!data || data.length === 0) return [];

    const progressById = new Map<string, { progress: number; unlocked: boolean; unlockedAt?: string }>();
    if (userId) {
      const { data: ua } = await supabase
        .from('user_achievements')
        .select('achievement_id, current_progress, is_unlocked, unlocked_at')
        .eq('user_id', userId);
      (ua || []).forEach((r: any) =>
        progressById.set(r.achievement_id, {
          progress: r.current_progress ?? 0,
          unlocked: !!r.is_unlocked,
          unlockedAt: r.unlocked_at
            ? new Date(r.unlocked_at).toLocaleDateString('vi-VN')
            : undefined,
        })
      );
    }

    return data.map((a: any) => {
      const p = progressById.get(a.id);
      const max = a.max_progress ?? 1;
      return {
        id: a.id,
        name: a.name,
        desc: a.description,
        category: a.category,
        icon: a.icon_name,
        xpReward: a.xp_reward ?? 50,
        isUnlocked: p?.unlocked ?? false,
        progress: p?.unlocked ? 100 : Math.min(100, Math.round(((p?.progress ?? 0) / max) * 100)),
        unlockedAt: p?.unlockedAt,
      };
    });
  } catch {
    return [];
  }
}

// ---------------------------------------------------------------- community
export interface CommunityPost {
  id: string;
  author: string;
  avatar: string;
  time: string;
  category: 'question' | 'progress' | 'tips' | 'discussion';
  title: string;
  content: string;
  likes: number;
  comments: number;
}

export async function getCommunityPosts(): Promise<CommunityPost[]> {
  try {
    const { data } = await supabase
      .from('community_posts')
      .select(
        'id, title, content, category, likes_count, comments_count, created_at, author:profiles!community_posts_user_id_fkey ( full_name, avatar_url )'
      )
      .order('created_at', { ascending: false })
      .limit(50);
    if (!data) return [];
    return data.map((p: any) => ({
      id: p.id,
      author: p.author?.full_name || 'Học viên',
      avatar:
        p.author?.avatar_url ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(p.author?.full_name || 'H V')}&background=0B192C&color=fff`,
      time: p.created_at,
      category: p.category,
      title: p.title,
      content: p.content,
      likes: p.likes_count ?? 0,
      comments: p.comments_count ?? 0,
    }));
  } catch {
    return [];
  }
}

export async function createCommunityPost(
  userId: string,
  title: string,
  content: string,
  category: CommunityPost['category']
): Promise<{ error?: string }> {
  const { error } = await supabase
    .from('community_posts')
    .insert({ user_id: userId, title, content, category });
  return error ? { error: error.message } : {};
}

export interface CommunityComment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  time: string;
}

export async function getCommunityComments(
  postId: string
): Promise<CommunityComment[]> {
  try {
    const { data } = await supabase
      .from('community_comments')
      .select(
        'id, content, created_at, author:profiles!community_comments_user_id_fkey ( full_name, avatar_url )'
      )
      .eq('post_id', postId)
      .order('created_at', { ascending: true })
      .limit(200);
    if (!data) return [];
    return data.map((c: any) => ({
      id: c.id,
      author: c.author?.full_name || 'Học viên',
      avatar:
        c.author?.avatar_url ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(c.author?.full_name || 'H V')}&background=0B192C&color=fff`,
      content: c.content,
      time: c.created_at,
    }));
  } catch {
    return [];
  }
}

export async function createCommunityComment(
  postId: string,
  userId: string,
  content: string
): Promise<{ error?: string }> {
  const { error } = await supabase
    .from('community_comments')
    .insert({ post_id: postId, user_id: userId, content });
  return error ? { error: error.message } : {};
}
