"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Trophy, ChevronRight, Flame, Sparkles } from "lucide-react";
import { sampleLeaderboard } from "@/lib/mock-data";
import { getLeaderboard } from "@/lib/supabase/data";
import { useHanGoStore } from "@/lib/store";
import type { LeaderboardEntry } from "@/lib/types";
import { formatXP } from "@/lib/utils";

export function LeaderboardCard() {
  const currentUserId = useHanGoStore((s) => s.user.id);
  const isAuthenticated = useHanGoStore((s) => s.isAuthenticated);
  const [entries, setEntries] = useState<LeaderboardEntry[]>(sampleLeaderboard);

  useEffect(() => {
    let active = true;
    getLeaderboard(isAuthenticated ? currentUserId : undefined).then((list) => {
      if (active && list.length > 0) setEntries(list);
    });
    return () => {
      active = false;
    };
  }, [currentUserId, isAuthenticated]);

  const getRankBadge = (rank: number) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return `#${rank}`;
  };

  return (
    <div className="rounded-3xl border border-border/80 bg-card p-6 shadow-sm">
      <div className="flex items-center justify-between pb-4 border-b border-border/60 mb-4">
        <div>
          <h3 className="font-bold text-base text-foreground flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-500" />
            Bảng xếp hạng tuần
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Cạnh tranh cùng cộng đồng học viên
          </p>
        </div>

        <Link href="/leaderboard">
          <span className="text-xs font-semibold text-primary hover:underline flex items-center gap-1">
            <span>Bảng đầy đủ</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </Link>
      </div>

      <div className="space-y-2.5">
        {entries.slice(0, 5).map((item) => (
          <div
            key={item.userId}
            className={`p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
              item.isCurrentUser
                ? "border-primary bg-primary/10 ring-2 ring-primary/20 shadow-2xs font-semibold"
                : "border-border/60 bg-card hover:bg-secondary/40"
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="w-6 text-center text-sm font-black shrink-0">
                {getRankBadge(item.rank)}
              </span>

              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold flex items-center justify-center text-xs shrink-0 shadow-2xs">
                {item.fullName.charAt(0)}
              </div>

              <div className="truncate">
                <p className="text-xs font-bold text-foreground truncate">
                  {item.fullName}
                </p>
                <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                  <span className="flex items-center gap-0.5 text-amber-500 font-bold">
                    <Flame className="w-3 h-3 fill-amber-500" />
                    {item.streak}d
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 text-xs font-extrabold text-indigo-600 dark:text-indigo-400 shrink-0">
              <Sparkles className="w-3 h-3" />
              <span>{formatXP(item.totalXp)} XP</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
