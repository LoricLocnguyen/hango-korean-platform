"use client";

import React, { useState } from "react";
import {
  Trophy,
  Flame,
  Sparkles,
  Crown,
  Medal,
  Award,
} from "lucide-react";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { TopNavbar } from "@/components/layout/top-navbar";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { sampleLeaderboard } from "@/lib/mock-data";
import { formatXP } from "@/lib/utils";

export default function LeaderboardPage() {
  const [activeLeague, setActiveLeague] = useState<"ruby" | "gold" | "silver">("ruby");

  const leagues = [
    { id: "ruby", name: "Hạng Ruby (Đỉnh cao)", color: "text-rose-500", border: "border-rose-500/30" },
    { id: "gold", name: "Hạng Vàng", color: "text-amber-500", border: "border-amber-500/30" },
    { id: "silver", name: "Hạng Bạc", color: "text-slate-400", border: "border-slate-400/30" },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50/50 dark:bg-slate-950/40">
      <AppSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopNavbar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto w-full pb-24">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-semibold mb-1">
                <Trophy className="w-3.5 h-3.5" />
                <span>Bảng xếp hạng tuần & Giải đấu League</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                Đấu trường Bảng xếp hạng
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                Top 10 học viên có điểm kinh nghiệm XP cao nhất tuần sẽ được thăng hạng
              </p>
            </div>

            <div className="text-xs font-semibold text-muted-foreground bg-secondary px-3 py-1.5 rounded-xl flex items-center gap-1.5">
              <span>Còn lại: <strong>2 ngày 14 giờ</strong></span>
            </div>
          </div>

          {/* League Selector */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6">
            {leagues.map((lg) => (
              <button
                key={lg.id}
                onClick={() => setActiveLeague(lg.id as any)}
                className={`px-4 py-2.5 rounded-2xl border text-xs font-bold transition-all ${
                  activeLeague === lg.id
                    ? "bg-primary text-primary-foreground border-primary shadow-xs"
                    : "bg-card text-muted-foreground border-border hover:text-foreground"
                }`}
              >
                {lg.name}
              </button>
            ))}
          </div>

          {/* Leaderboard Table Card */}
          <div className="rounded-3xl border border-border/80 bg-card p-6 shadow-sm space-y-3">
            {sampleLeaderboard.map((user) => {
              const isTop3 = user.rank <= 3;
              return (
                <div
                  key={user.userId}
                  className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                    user.isCurrentUser
                      ? "border-primary bg-primary/10 ring-2 ring-primary/20 shadow-2xs"
                      : "border-border/60 bg-card hover:bg-secondary/40"
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <span
                      className={`w-7 text-center text-sm font-black shrink-0 ${
                        user.rank === 1
                          ? "text-amber-500 text-base"
                          : user.rank === 2
                          ? "text-slate-400 text-base"
                          : user.rank === 3
                          ? "text-amber-700 text-base"
                          : "text-muted-foreground"
                      }`}
                    >
                      {user.rank === 1 ? "🥇" : user.rank === 2 ? "🥈" : user.rank === 3 ? "🥉" : `#${user.rank}`}
                    </span>

                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold flex items-center justify-center text-sm shrink-0 shadow-2xs">
                      {user.fullName.charAt(0)}
                    </div>

                    <div className="truncate">
                      <h4 className="font-bold text-sm text-foreground truncate flex items-center gap-1.5">
                        <span>{user.fullName}</span>
                        {user.isCurrentUser && (
                          <span className="text-[10px] font-extrabold px-1.5 py-0.2 rounded-md bg-primary text-white">
                            BẠN
                          </span>
                        )}
                      </h4>
                      <p className="text-xs text-amber-500 font-semibold flex items-center gap-1">
                        <Flame className="w-3.5 h-3.5 fill-amber-500" />
                        <span>Streak: {user.streak} ngày</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 font-black text-indigo-600 dark:text-indigo-400 text-sm shrink-0">
                    <Sparkles className="w-4 h-4" />
                    <span>{formatXP(user.totalXp)} XP</span>
                  </div>
                </div>
              );
            })}
          </div>
        </main>

        <MobileBottomNav />
      </div>
    </div>
  );
}
