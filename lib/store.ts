import { create } from 'zustand';
import { UserProfile, SRSItem, SRSGrade } from './types';
import { initialUserProfile, sampleSRSCards } from './mock-data';
import { calculateSM2 } from './srs';

interface HanGoStore {
  user: UserProfile;
  srsCards: SRSItem[];
  isAuthenticated: boolean;
  soundEnabled: boolean;
  
  // Actions
  login: (email: string, name?: string) => void;
  logout: () => void;
  completeOnboarding: (data: { goal: string; level: string; dailyMinutes: number; topics: string[] }) => void;
  updateProfile: (fullName: string, email: string, dailyGoalMinutes: number) => void;
  gradeSRSCard: (cardId: string, grade: SRSGrade) => void;
  addXP: (amount: number, minutes?: number) => void;
  toggleSound: () => void;
}

export const useHanGoStore = create<HanGoStore>((set, get) => ({
  user: initialUserProfile,
  srsCards: sampleSRSCards,
  isAuthenticated: true, // Default to true for showcase/testing
  soundEnabled: true,

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

  logout: () => {
    set({ isAuthenticated: false });
  },

  completeOnboarding: (data) => {
    set((state) => ({
      user: {
        ...state.user,
        dailyGoalMinutes: data.dailyMinutes,
      },
    }));
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
  },

  gradeSRSCard: (cardId: string, grade: SRSGrade) => {
    set((state) => {
      const updatedCards = state.srsCards.map((card) => {
        if (card.id !== cardId) return card;
        const res = calculateSM2(grade, card.repetitionCount, card.intervalDays, card.easeFactor);
        const nextDate = new Date();
        nextDate.setDate(nextDate.getDate() + res.intervalDays);
        return {
          ...card,
          repetitionCount: res.repetitionCount,
          intervalDays: res.intervalDays,
          easeFactor: res.easeFactor,
          status: res.status,
          nextReviewAt: nextDate.toISOString(),
          lastReviewAt: new Date().toISOString(),
        };
      });

      // Bonus XP for reviewing
      const earnedXp = grade >= 3 ? 15 : 5;
      const newTotalXp = state.user.totalXp + earnedXp;
      const newWordsLearned = grade >= 3 ? state.user.wordsLearned + 1 : state.user.wordsLearned;

      return {
        srsCards: updatedCards,
        user: {
          ...state.user,
          totalXp: newTotalXp,
          todayXp: state.user.todayXp + earnedXp,
          wordsLearned: newWordsLearned,
        },
      };
    });
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
  },

  toggleSound: () => {
    set((state) => ({ soundEnabled: !state.soundEnabled }));
  },
}));
