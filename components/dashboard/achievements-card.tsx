"use client";

import React from "react";
import Link from "next/link";
import { Award, ChevronRight, Crown, Flame, BookOpen, Zap, Sparkles } from "lucide-react";
import { sampleAchievements } from "@/lib/mock-data";
import { Progress } from "@/components/ui/progress";

export function AchievementsCard() {
  const iconMap: Record<string, React.ReactNode> = {
    Crown: <Crown className="w-5 h-5 text-amber-500" />,
    Flame: <Flame className="w-5 h-5 text-amber-500 fill-amber-500" />,
    BookOpen: <BookOpen className="w-5 h-5 text-blue-500" />,
    Zap: <Zap className="w-5 h-5 text-purple-500" />,
  };

  return (
    <div className="rounded-3xl border border-border/80 bg-card p-6 shadow-sm">
      <div className="flex items-center justify-between pb-4 border-b border-border/60 mb-4">
        <div>
          <h3 className="font-bold text-base text-foreground flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-500" />
            Huy hiệu & Thành tích
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            2/4 huy hiệu đã mở khóa
          </p>
        </div>

        <Link href="/achievements">
          <span className="text-xs font-semibold text-primary hover:underline flex items-center gap-1">
            <span>Tất cả</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </Link>
      </div>

      <div className="space-y-3">
        {sampleAchievements.map((ach) => (
          <div
            key={ach.id}
            className={`p-3.5 rounded-2xl border transition-all ${
              ach.isUnlocked
                ? "border-amber-500/20 bg-amber-500/5 dark:bg-amber-500/10"
                : "border-border/60 bg-secondary/30"
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  ach.isUnlocked ? "bg-amber-500/15" : "bg-secondary text-muted-foreground"
                }`}
              >
                {iconMap[ach.icon] || <Sparkles className="w-5 h-5 text-amber-500" />}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-bold text-xs text-foreground truncate">
                    {ach.title}
                  </h4>
                  <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 shrink-0">
                    +{ach.xpReward} XP
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug line-clamp-1">
                  {ach.description}
                </p>

                {!ach.isUnlocked && (
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center justify-between text-[10px] text-muted-foreground font-semibold">
                      <span>Tiến độ</span>
                      <span>{ach.progressPercent}%</span>
                    </div>
                    <Progress value={ach.progressPercent} className="h-1.5" />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
