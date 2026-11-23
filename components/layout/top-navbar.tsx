"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  Heart,
  Flame,
  Sparkles,
  Bot,
  Bell,
  Shield,
  Layers,
  BookA,
  BookOpen,
  Headphones,
  Mic,
  Dumbbell,
  Award,
  Trophy,
  Users,
  Settings,
} from "lucide-react";
import { useHanGoStore } from "@/lib/store";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { formatXP } from "@/lib/utils";

export function TopNavbar() {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const { user } = useHanGoStore();

  const drawerLinks = [
    { href: "/dashboard", label: "Tổng quan Dashboard" },
    { href: "/learn", label: "Lộ trình học (Level 0 - 6)" },
    { href: "/hangul", label: "Bảng chữ cái Hangul" },
    { href: "/vocabulary", label: "Từ vựng thông minh" },
    { href: "/flashcards", label: "Ôn tập Flashcard SRS" },
    { href: "/grammar", label: "Ngữ pháp tiếng Hàn" },
    { href: "/listening", label: "Luyện nghe đa tốc độ" },
    { href: "/speaking", label: "Luyện nói & Phản xạ" },
    { href: "/practice", label: "Luyện tập & Quiz" },
    { href: "/ai-tutor", label: "Gia sư AI HanGo" },
    { href: "/achievements", label: "Huy hiệu & Thành tích" },
    { href: "/leaderboard", label: "Bảng xếp hạng" },
    { href: "/community", label: "Cộng đồng học viên" },
    { href: "/profile", label: "Hồ sơ cá nhân" },
    { href: "/settings", label: "Cài đặt tài khoản" },
    { href: "/admin", label: "Khu vực Quản trị (Admin)" },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full h-16 border-b border-border/80 bg-background/80 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between">
        {/* Left: Mobile Menu Trigger + Breadcrumb Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileDrawerOpen(true)}
            className="lg:hidden p-2 rounded-xl text-muted-foreground hover:bg-secondary transition-colors"
            aria-label="Mở menu điều hướng"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link href="/" className="lg:hidden flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-700 to-purple-600 text-white font-bold flex items-center justify-center text-xs">
              <span className="hangul-text">한</span>
            </div>
            <span className="font-extrabold text-base tracking-tight">HanGo</span>
          </Link>
        </div>

        {/* Right Gamification HUD & Action Icons */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Duolingo Hearts (5/5) */}
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 font-bold text-xs" title="Lượt tim / Số lần thử">
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 animate-pulse" />
            <span>5</span>
          </div>

          {/* Streak Flame */}
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 font-bold text-xs" title="Chuỗi ngày học liên tiếp">
            <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>{user.currentStreak}d</span>
          </div>

          {/* Total XP */}
          <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-bold text-xs" title="Điểm kinh nghiệm">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            <span>{formatXP(user.totalXp)} XP</span>
          </div>

          {/* AI Tutor Quick Access Button */}
          <Link
            href="/ai-tutor"
            className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-xl bg-purple-600/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 text-xs font-bold hover:bg-purple-600/20 transition-colors"
          >
            <Bot className="w-3.5 h-3.5" />
            <span>Gia sư AI</span>
          </Link>

          {/* Dark Mode Switcher */}
          <ThemeToggle />

          {/* User Profile Avatar */}
          <Link
            href="/profile"
            className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold flex items-center justify-center text-sm shadow-xs hover:scale-105 transition-transform shrink-0"
            title="Hồ sơ cá nhân"
          >
            {user.fullName.charAt(0)}
          </Link>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
            onClick={() => setMobileDrawerOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-72 bg-background border-r border-border p-5 flex flex-col justify-between shadow-2xl z-10 animate-in slide-in-from-left duration-200">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-border/80">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-700 to-purple-600 text-white font-bold flex items-center justify-center text-xs">
                    <span className="hangul-text">한</span>
                  </div>
                  <span className="font-extrabold text-lg">HanGo</span>
                </div>
                <button
                  onClick={() => setMobileDrawerOpen(false)}
                  className="p-1 rounded-lg text-muted-foreground hover:bg-secondary"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-4 space-y-1 max-h-[75vh] overflow-y-auto">
                {drawerLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileDrawerOpen(false)}
                    className="block px-3 py-2 rounded-xl text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-border/80 text-xs text-muted-foreground">
              <p className="font-bold text-foreground">{user.fullName}</p>
              <p>{user.email}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
