"use client";

import React from "react";
import { Flame, Sparkles, BookOpen, Calendar, Target, Award } from "lucide-react";
import { useHanGoStore } from "@/lib/store";
import { formatXP, getGreeting } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

export function GamificationHUD() {
  const user = useHanGoStore((s) => s.user);
  const greeting = getGreeting();

  const dailyGoalPercent = Math.min(
    100,
    Math.round((user.todayMinutes / user.dailyGoalMinutes) * 100)
  );

  return (
    <div className="space-y-6">
      {/* Greeting Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-bold tracking-wider text-primary">
            Trung tâm học tập thông minh
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight mt-0.5">
            {greeting}, {user.fullName}! 👋
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Bạn đang có phong độ học tập tuyệt vời! Hãy duy trì ngọn lửa streak hôm nay.
          </p>
        </div>

        {/* Level Badge Pill */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-purple-600/10 border border-primary/20">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-blue-600 to-purple-600 text-white font-black text-xs flex items-center justify-center">
              L{user.level}
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground uppercase font-bold">Cấp độ</p>
              <p className="text-xs font-bold text-foreground">Học giả Sơ cấp</p>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Quick Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Streak */}
        <div className="rounded-2xl border border-border/80 bg-card p-4 shadow-2xs hover:shadow-sm transition-all flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
            <Flame className="w-6 h-6 fill-amber-500" />
          </div>
          <div>
            <p className="text-xs font-semibold text-muted-foreground">Streak hiện tại</p>
            <p className="text-xl font-extrabold text-foreground">{user.currentStreak} ngày</p>
            <p className="text-[10px] text-amber-600 dark:text-amber-400 font-medium">Kỷ lục: {user.longestStreak} ngày</p>
          </div>
        </div>

        {/* Total XP */}
        <div className="rounded-2xl border border-border/80 bg-card p-4 shadow-2xs hover:shadow-sm transition-all flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-muted-foreground">Tổng điểm XP</p>
            <p className="text-xl font-extrabold text-foreground">{formatXP(user.totalXp)}</p>
            <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">+{user.todayXp} XP hôm nay</p>
          </div>
        </div>

        {/* Words Learned */}
        <div className="rounded-2xl border border-border/80 bg-card p-4 shadow-2xs hover:shadow-sm transition-all flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-muted-foreground">Từ vựng đã thuộc</p>
            <p className="text-xl font-extrabold text-foreground">{user.wordsLearned} từ</p>
            <p className="text-[10px] text-blue-600 dark:text-blue-400 font-medium">SRS lưu giữ lâu dài</p>
          </div>
        </div>

        {/* Daily Goal */}
        <div className="rounded-2xl border border-border/80 bg-card p-4 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-primary" />
              Mục tiêu hôm nay
            </span>
            <span className="text-xs font-bold text-primary">{dailyGoalPercent}%</span>
          </div>

          <div className="my-1.5">
            <Progress value={dailyGoalPercent} />
          </div>

          <p className="text-[10px] text-muted-foreground">
            {user.todayMinutes} / {user.dailyGoalMinutes} phút học
          </p>
        </div>
      </div>
    </div>
  );
}
