"use client";

import React from "react";
import Link from "next/link";
import {
  User,
  Flame,
  Sparkles,
  BookOpen,
  Calendar,
  Clock,
  Award,
  Settings,
  Shield,
  Layers,
} from "lucide-react";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { TopNavbar } from "@/components/layout/top-navbar";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { Button } from "@/components/ui/button";
import { useHanGoStore } from "@/lib/store";
import { formatXP } from "@/lib/utils";

export default function ProfilePage() {
  const { user } = useHanGoStore();

  return (
    <div className="flex min-h-screen bg-slate-50/50 dark:bg-slate-950/40">
      <AppSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopNavbar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto w-full pb-24 space-y-6">
          {/* Profile Header Banner Card */}
          <div className="rounded-3xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm relative overflow-hidden">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 text-white font-black text-4xl flex items-center justify-center shadow-xl shadow-indigo-500/20 shrink-0">
                {user.fullName.charAt(0)}
              </div>

              <div className="flex-1 text-center sm:text-left space-y-1.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h1 className="text-2xl font-black text-foreground">
                    {user.fullName}
                  </h1>
                  <Link href="/settings">
                    <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                      <Settings className="w-3.5 h-3.5" />
                      <span>Cài đặt tài khoản</span>
                    </Button>
                  </Link>
                </div>

                <p className="text-xs text-muted-foreground">{user.email}</p>
                <p className="text-xs font-semibold text-primary">
                  Cấp độ {user.level} • Học viên Chăm chỉ • Gia nhập tháng 11/2026
                </p>

                <p className="text-xs text-foreground/80 leading-relaxed pt-2">
                  Mục tiêu cá nhân: Đạt TOPIK cấp 3 trong 6 tháng và tự tin giao tiếp đời sống tại Hàn Quốc! 🎯
                </p>
              </div>
            </div>
          </div>

          {/* 4 Core Learning Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-5 rounded-3xl border border-border/80 bg-card text-center space-y-1">
              <Flame className="w-6 h-6 text-amber-500 fill-amber-500 mx-auto" />
              <p className="text-2xl font-black text-foreground">{user.currentStreak} ngày</p>
              <p className="text-xs text-muted-foreground">Streak hiện tại</p>
            </div>

            <div className="p-5 rounded-3xl border border-border/80 bg-card text-center space-y-1">
              <Sparkles className="w-6 h-6 text-indigo-500 mx-auto" />
              <p className="text-2xl font-black text-foreground">{formatXP(user.totalXp)}</p>
              <p className="text-xs text-muted-foreground">Tổng kinh nghiệm</p>
            </div>

            <div className="p-5 rounded-3xl border border-border/80 bg-card text-center space-y-1">
              <BookOpen className="w-6 h-6 text-blue-500 mx-auto" />
              <p className="text-2xl font-black text-foreground">{user.wordsLearned}</p>
              <p className="text-xs text-muted-foreground">Từ vựng đã thuộc</p>
            </div>

            <div className="p-5 rounded-3xl border border-border/80 bg-card text-center space-y-1">
              <Clock className="w-6 h-6 text-emerald-500 mx-auto" />
              <p className="text-2xl font-black text-foreground">38.5h</p>
              <p className="text-xs text-muted-foreground">Tổng giờ học</p>
            </div>
          </div>

          {/* Weak / Strong Vocabulary Insights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-3xl border border-emerald-500/30 bg-card p-6 space-y-3">
              <h3 className="font-extrabold text-sm text-foreground flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span>Từ vựng thế mạnh (Ghi nhớ sâu)</span>
              </h3>
              <div className="flex flex-wrap gap-2 text-xs">
                {["안녕하세요", "감사합니다", "학생", "학교", "물", "김치", "식당"].map((w, idx) => (
                  <span key={idx} className="hangul-text px-3 py-1 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-bold">
                    {w}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-rose-500/30 bg-card p-6 space-y-3">
              <h3 className="font-extrabold text-sm text-foreground flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <span>Từ vựng cần củng cố thêm (SRS Queue)</span>
              </h3>
              <div className="flex flex-wrap gap-2 text-xs">
                {["환불하다", "기념품", "장학금", "문제점", "긴장되다"].map((w, idx) => (
                  <span key={idx} className="hangul-text px-3 py-1 rounded-xl bg-rose-500/10 text-rose-700 dark:text-rose-300 font-bold">
                    {w}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </main>

        <MobileBottomNav />
      </div>
    </div>
  );
}
