export type LearningGoal = 
  | 'daily_communication' 
  | 'topik_exam' 
  | 'kpop_kdrama' 
  | 'travel' 
  | 'business_work';

export type CurrentLevel = 
  | 'zero_hangul' 
  | 'know_hangul' 
  | 'beginner_topik1' 
  | 'intermediate_topik2';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  avatarUrl: string;
  level: number;
  totalXp: number;
  currentStreak: number;
  longestStreak: number;
  wordsLearned: number;
  consecutiveDays: number;
  dailyGoalMinutes: number;
  todayMinutes: number;
  todayXp: number;
  nextLessonId?: string;
  nextLessonTitle?: string;
}

export interface VocabularyItem {
  id: string;
  hangul: string;
  romaja: string;
  vietnamese: string;
  hanjaVietnamese?: string;
  partOfSpeech: 'Danh từ' | 'Động từ' | 'Tính từ' | 'Phó từ' | 'Cụm từ';
  audioUrl?: string;
  exampleKorean: string;
  exampleVietnamese: string;
  level: 'Hangul' | 'Sơ cấp 1' | 'Sơ cấp 2' | 'Trung cấp';
}

export type SRSGrade = 1 | 2 | 3 | 4; // 1: Quên (Again), 2: Khó (Hard), 3: Tốt (Good), 4: Dễ (Easy)

export interface SRSItem {
  id: string;
  userId: string;
  vocabularyId: string;
  vocabulary: VocabularyItem;
  repetitionCount: number;
  intervalDays: number;
  easeFactor: number;
  nextReviewAt: string;
  lastReviewAt?: string;
  status: 'learning' | 'reviewing' | 'mastered';
}

export interface ActivityDay {
  date: string; // YYYY-MM-DD
  count: number; // XP or lessons
  level: 0 | 1 | 2 | 3 | 4; // for heatmap color intensity
}

export interface AchievementItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  xpReward: number;
  unlockedAt?: string;
  isUnlocked: boolean;
  progressPercent: number;
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  fullName: string;
  avatarUrl: string;
  totalXp: number;
  streak: number;
  isCurrentUser?: boolean;
}

export interface LessonSummary {
  id: string;
  unitId: string;
  courseTitle: string;
  title: string;
  hangulTitle: string;
  durationMinutes: number;
  totalWords: number;
  completedPercent: number;
  xpReward: number;
  isLocked: boolean;
}
