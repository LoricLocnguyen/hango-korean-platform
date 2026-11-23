"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Map,
  BookA,
  BookOpen,
  Layers,
  Sparkles,
  Headphones,
  Mic,
  Dumbbell,
  Award,
  Trophy,
  Users,
  Bot,
  User,
  Settings,
  ShieldAlert,
  Flame,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useHanGoStore } from "@/lib/store";

export function AppSidebar() {
  const pathname = usePathname();
  const { user, logout } = useHanGoStore();

  const mainNavItems = [
    { href: "/dashboard", label: "Tổng quan", icon: LayoutDashboard },
    { href: "/learn", label: "Lộ trình học", icon: Map },
    { href: "/hangul", label: "Học Hangul", icon: BookA, badge: "Cơ bản" },
    { href: "/vocabulary", label: "Từ vựng thông minh", icon: BookOpen },
    { href: "/flashcards", label: "Flashcard (SRS)", icon: Layers, badge: "SM-2" },
    { href: "/grammar", label: "Ngữ pháp", icon: Sparkles },
    { href: "/listening", label: "Luyện nghe", icon: Headphones },
    { href: "/speaking", label: "Luyện nói AI", icon: Mic },
    { href: "/practice", label: "Luyện tập & Quiz", icon: Dumbbell },
    { href: "/achievements", label: "Thành tích", icon: Award },
    { href: "/leaderboard", label: "Bảng xếp hạng", icon: Trophy },
    { href: "/community", label: "Cộng đồng", icon: Users },
    { href: "/ai-tutor", label: "Gia sư AI HanGo", icon: Bot, badge: "AI" },
  ];

  const bottomNavItems = [
    { href: "/profile", label: "Hồ sơ cá nhân", icon: User },
    { href: "/settings", label: "Cài đặt tài khoản", icon: Settings },
    { href: "/admin", label: "Quản trị viên", icon: ShieldAlert, badge: "Admin" },
  ];

  return (
    <aside className="hidden lg:flex w-64 flex-col border-r border-border/80 bg-background/95 backdrop-blur-md h-screen sticky top-0 shrink-0">
      {/* Brand Header */}
      <div className="h-16 flex items-center px-6 border-b border-border/60 justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-700 via-indigo-600 to-purple-600 text-white font-bold shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <span className="hangul-text text-base">한</span>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 dark:from-blue-400 dark:via-indigo-300 dark:to-purple-400 bg-clip-text text-transparent">
              HanGo
            </span>
            <span className="text-[9px] uppercase font-bold tracking-widest text-muted-foreground -mt-1">
              Học Tiếng Hàn
            </span>
          </div>
        </Link>

        {/* Streak indicator */}
        <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-xs border border-amber-500/20">
          <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500 animate-pulse" />
          <span>{user.currentStreak}d</span>
        </div>
      </div>

      {/* Main Navigation Scroll Area */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <div className="px-3 pb-2 text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
          Chương trình học
        </div>
        {mainNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname?.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all group",
                isActive
                  ? "bg-primary text-primary-foreground shadow-xs shadow-primary/25 font-bold"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/70"
              )}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={cn("w-4 h-4 transition-transform group-hover:scale-110", isActive ? "text-primary-foreground" : "text-muted-foreground")} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={cn(
                    "text-[10px] px-1.5 py-0.2 rounded-md font-bold uppercase",
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-secondary text-primary dark:text-primary-foreground"
                  )}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}

        <div className="pt-4 px-3 pb-2 text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
          Hệ thống & Tài khoản
        </div>
        {bottomNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all group",
                isActive
                  ? "bg-primary text-primary-foreground font-bold"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/70"
              )}
            >
              <div className="flex items-center gap-2.5">
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="text-[10px] px-1.5 py-0.2 rounded-md font-bold uppercase bg-rose-500/10 text-rose-600 dark:text-rose-400">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* User Info & Quick Logout Footer */}
      <div className="p-3 border-t border-border/60 bg-secondary/30 flex items-center justify-between">
        <Link href="/profile" className="flex items-center gap-2.5 min-w-0 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold flex items-center justify-center text-xs shrink-0 shadow-xs">
            {user.fullName.charAt(0)}
          </div>
          <div className="truncate">
            <p className="text-xs font-bold text-foreground truncate">{user.fullName}</p>
            <p className="text-[10px] text-muted-foreground truncate">{user.totalXp} XP • Cấp {user.level}</p>
          </div>
        </Link>

        <button
          onClick={logout}
          className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
          title="Đăng xuất"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
}
