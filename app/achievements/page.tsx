"use client";

import React, { useState } from "react";
import {
  Award,
  Crown,
  Flame,
  BookOpen,
  Zap,
  Target,
  Trophy,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { TopNavbar } from "@/components/layout/top-navbar";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { Progress } from "@/components/ui/progress";

interface Achievement {
  id: string;
  name: string;
  desc: string;
  category: "streak" | "vocab" | "quiz" | "special";
  icon: string;
  xpReward: number;
  isUnlocked: boolean;
  progress: number;
  unlockedAt?: string;
}

export default function AchievementsPage() {
  const [filter, setFilter] = useState<string>("all");

  const achievements: Achievement[] = [
    { id: "a1", name: "Bậc thầy Bảng chữ cái", desc: "Nắm vững toàn bộ 40 ký tự Hangul", category: "special", icon: "Crown", xpReward: 100, isUnlocked: true, progress: 100, unlockedAt: "15/11/2026" },
    { id: "a2", name: "Ngọn lửa bền bỉ 7 ngày", desc: "Duy trì streak 7 ngày liên tiếp", category: "streak", icon: "Flame", xpReward: 70, isUnlocked: true, progress: 100, unlockedAt: "16/11/2026" },
    { id: "a3", name: "Bất khả chiến bại 14 ngày", desc: "Duy trì streak 14 ngày không đứt đoạn", category: "streak", icon: "Flame", xpReward: 140, isUnlocked: true, progress: 100, unlockedAt: "23/11/2026" },
    { id: "a4", name: "Chiến thần 30 ngày", desc: "Duy trì streak 30 ngày học liên tục", category: "streak", icon: "Flame", xpReward: 300, isUnlocked: false, progress: 46 },
    { id: "a5", name: "Kho từ vựng 100 từ", desc: "Ghi nhớ 100 từ vựng với Spaced Repetition", category: "vocab", icon: "BookOpen", xpReward: 100, isUnlocked: true, progress: 100, unlockedAt: "20/11/2026" },
    { id: "a6", name: "Kho từ vựng 300 từ", desc: "Ghi nhớ 300 từ vựng với Spaced Repetition", category: "vocab", icon: "BookOpen", xpReward: 250, isUnlocked: false, progress: 62 },
    { id: "a7", name: "Thần tốc phản xạ", desc: "Đạt 100% điểm bài tập trong dưới 2 phút", category: "quiz", icon: "Zap", xpReward: 80, isUnlocked: false, progress: 60 },
    { id: "a8", name: "Top 3 Bảng xếp hạng", desc: "Lọt vào top 3 người dẫn đầu tuần", category: "special", icon: "Trophy", xpReward: 200, isUnlocked: true, progress: 100, unlockedAt: "22/11/2026" },
  ];

  const filtered = achievements.filter(
    (a) => filter === "all" || a.category === filter
  );

  return (
    <div className="flex min-h-screen bg-slate-50/50 dark:bg-slate-950/40">
      <AppSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopNavbar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto w-full pb-24">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-semibold mb-1">
                <Award className="w-3.5 h-3.5" />
                <span>Hệ thống Gamification & Vinh danh</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                Huy hiệu & Thành tích
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                Mở khóa các cột mốc vinh quang và nhận thưởng điểm kinh nghiệm XP
              </p>
            </div>

            <div className="text-xs font-bold px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20">
              Đã mở khóa 5 / {achievements.length} huy hiệu
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 text-xs font-bold">
            {["all", "streak", "vocab", "quiz", "special"].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-2xl border transition-all uppercase text-[11px] ${
                  filter === cat
                    ? "bg-primary text-primary-foreground border-primary shadow-xs"
                    : "bg-card text-muted-foreground border-border hover:text-foreground"
                }`}
              >
                {cat === "all" ? "Tất cả" : cat}
              </button>
            ))}
          </div>

          {/* Achievements Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filtered.map((item) => (
              <div
                key={item.id}
                className={`p-5 rounded-3xl border transition-all flex items-start gap-4 ${
                  item.isUnlocked
                    ? "border-amber-500/30 bg-amber-500/5 dark:bg-amber-500/10 shadow-sm"
                    : "border-border/80 bg-card opacity-75"
                }`}
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 text-xl font-bold ${
                    item.isUnlocked
                      ? "bg-gradient-to-tr from-amber-500 to-amber-600 text-white shadow-md shadow-amber-500/25"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  <Award className="w-7 h-7" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-extrabold text-sm text-foreground truncate">
                      {item.name}
                    </h3>
                    <span className="text-xs font-bold text-amber-600 dark:text-amber-400 shrink-0">
                      +{item.xpReward} XP
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-snug">
                    {item.desc}
                  </p>

                  <div className="mt-3">
                    {item.isUnlocked ? (
                      <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Đã mở khóa: {item.unlockedAt}
                      </span>
                    ) : (
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-[10px] text-muted-foreground font-semibold">
                          <span>Tiến độ</span>
                          <span>{item.progress}%</span>
                        </div>
                        <Progress value={item.progress} className="h-1.5" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>

        <MobileBottomNav />
      </div>
    </div>
  );
}
