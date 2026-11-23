"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Map,
  BookA,
  Compass,
  Award,
  GraduationCap,
  MessageCircle,
  Briefcase,
  Trophy,
  CheckCircle2,
  Lock,
  Clock,
  Sparkles,
  ChevronRight,
  Play,
  RotateCw,
} from "lucide-react";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { TopNavbar } from "@/components/layout/top-navbar";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { fullLevelsData } from "@/lib/seed-data";

export default function LearnPage() {
  const [selectedLevelId, setSelectedLevelId] = useState("level_0");

  const currentLevel =
    fullLevelsData.find((l) => l.id === selectedLevelId) || fullLevelsData[0];

  const iconMap: Record<string, React.ReactNode> = {
    BookA: <BookA className="w-5 h-5 text-blue-500" />,
    Compass: <Compass className="w-5 h-5 text-indigo-500" />,
    Award: <Award className="w-5 h-5 text-amber-500" />,
    GraduationCap: <GraduationCap className="w-5 h-5 text-purple-500" />,
    MessageCircle: <MessageCircle className="w-5 h-5 text-emerald-500" />,
    Briefcase: <Briefcase className="w-5 h-5 text-sky-500" />,
    Trophy: <Trophy className="w-5 h-5 text-rose-500" />,
  };

  // Calculate progress for current level
  const totalLessonsInLevel = currentLevel.modules.reduce(
    (acc, m) => acc + m.lessons.length,
    0
  );
  const completedLessonsInLevel = currentLevel.modules.reduce(
    (acc, m) => acc + m.lessons.filter((l) => l.completed).length,
    0
  );
  const percentCompleted =
    totalLessonsInLevel > 0
      ? Math.round((completedLessonsInLevel / totalLessonsInLevel) * 100)
      : 0;

  return (
    <div className="flex min-h-screen bg-slate-50/50 dark:bg-slate-950/40">
      <AppSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopNavbar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full pb-24">
          {/* Header */}
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-1">
                <Map className="w-3.5 h-3.5" />
                <span>Lộ trình chuẩn khung tham chiếu TOPIK</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                Lộ trình học tiếng Hàn thông minh
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                Chinh phục từng cấp bậc từ con số 0 đến tự tin thi đỗ chứng chỉ TOPIK II
              </p>
            </div>

            <Link href="/hangul">
              <Button variant="premium" size="sm" className="gap-2 text-xs font-bold shadow-md shadow-indigo-500/20">
                <BookA className="w-4 h-4" />
                <span>Bảng chữ cái Hangul</span>
              </Button>
            </Link>
          </div>

          {/* Level Switcher Horizontal Tabs */}
          <div className="overflow-x-auto pb-2 mb-6">
            <div className="flex items-center gap-2 min-w-max">
              {fullLevelsData.map((lvl) => {
                const isSelected = lvl.id === selectedLevelId;
                return (
                  <button
                    key={lvl.id}
                    onClick={() => setSelectedLevelId(lvl.id)}
                    className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border text-xs font-bold transition-all ${
                      isSelected
                        ? "border-primary bg-primary text-primary-foreground shadow-sm shadow-primary/25 scale-[1.02]"
                        : "border-border/80 bg-card text-muted-foreground hover:text-foreground hover:bg-secondary/70"
                    }`}
                  >
                    <span>L{lvl.levelNumber}</span>
                    <span>{lvl.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Level Overview Card */}
          <div className="rounded-3xl border border-primary/20 bg-gradient-to-r from-blue-900/90 via-indigo-900/90 to-slate-900/90 p-6 sm:p-8 text-white shadow-xl mb-8 relative overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
              <div className="space-y-2 max-w-xl">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-bold uppercase tracking-wider">
                    Cấp độ {currentLevel.levelNumber}
                  </span>
                  <span className="hangul-text text-sm font-semibold text-indigo-300">
                    {currentLevel.hangulTitle}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                  {currentLevel.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {currentLevel.description}
                </p>

                <div className="flex items-center gap-4 text-xs text-slate-300 pt-2 font-medium">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-amber-400" />
                    Ước tính: {currentLevel.estimatedHours} giờ học
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-indigo-400" />
                    Yêu cầu: {currentLevel.requiredXp} XP
                  </span>
                </div>
              </div>

              {/* Level Progress Gauge */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 w-full md:w-64 space-y-3 shrink-0">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-300">Tiến độ cấp độ</span>
                  <span className="text-emerald-400">{percentCompleted}%</span>
                </div>
                <Progress value={percentCompleted} className="h-2 bg-white/20" />
                <p className="text-[11px] text-slate-300 text-center">
                  Đã hoàn thành {completedLessonsInLevel} / {totalLessonsInLevel} bài học
                </p>
              </div>
            </div>
          </div>

          {/* Modules & Lessons List */}
          <div className="space-y-6">
            {currentLevel.modules.map((mod, mIdx) => (
              <div
                key={mod.id}
                className="rounded-3xl border border-border/80 bg-card p-6 shadow-sm space-y-4"
              >
                {/* Module Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-border/60 gap-2">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-primary tracking-wider">
                      Module {mIdx + 1}
                    </span>
                    <h3 className="font-bold text-lg text-foreground mt-0.5">
                      {mod.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {mod.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    {mod.finalQuizScore !== undefined && (
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        Điểm kiểm tra: {mod.finalQuizScore}/100
                      </span>
                    )}
                    <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      +{mod.totalXp} XP
                    </span>
                  </div>
                </div>

                {/* Lesson Cards in Module */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mod.lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                        lesson.locked
                          ? "border-border/60 bg-secondary/30 opacity-70"
                          : lesson.completed
                          ? "border-emerald-500/30 bg-emerald-500/5 hover:border-emerald-500/50"
                          : "border-primary/30 bg-primary/5 hover:shadow-2xs"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground uppercase">
                            {lesson.lessonType}
                          </span>
                          {lesson.completed ? (
                            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              Đã hoàn thành
                            </span>
                          ) : lesson.locked ? (
                            <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                              <Lock className="w-3 h-3" />
                              Đang khóa
                            </span>
                          ) : (
                            <span className="text-[10px] font-bold text-primary flex items-center gap-1">
                              <Play className="w-3 h-3 fill-primary" />
                              Sẵn sàng học
                            </span>
                          )}
                        </div>

                        <h4 className="font-bold text-sm text-foreground line-clamp-1">
                          {lesson.title}
                        </h4>
                        <p className="hangul-text text-xs text-primary font-medium mt-0.5">
                          {lesson.hangulTitle}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
                          {lesson.description}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between text-xs">
                        <span className="text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {lesson.durationMinutes} phút
                        </span>

                        {lesson.locked ? (
                          <span className="text-[11px] text-muted-foreground">
                            Cần đạt 80% bài trước
                          </span>
                        ) : (
                          <Link href={`/lesson/${lesson.id}`}>
                            <Button
                              size="sm"
                              variant={lesson.completed ? "outline" : "premium"}
                              className="h-8 text-xs px-3 gap-1"
                            >
                              {lesson.completed ? (
                                <>
                                  <RotateCw className="w-3 h-3" />
                                  <span>Ôn lại</span>
                                </>
                              ) : (
                                <>
                                  <Play className="w-3 h-3 fill-white" />
                                  <span>Bắt đầu</span>
                                </>
                              )}
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
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
