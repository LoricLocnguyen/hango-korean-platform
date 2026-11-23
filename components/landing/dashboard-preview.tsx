"use client";

import React, { useState } from "react";
import { Flame, Volume2, Sparkles, CheckCircle2, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DashboardPreview() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const playKoreanSound = () => {
    setIsPlayingAudio(true);
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance("안녕하세요");
      utterance.lang = "ko-KR";
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
    setTimeout(() => setIsPlayingAudio(false), 1200);
  };

  return (
    <div className="relative mx-auto max-w-4xl rounded-3xl border border-blue-500/20 bg-gradient-to-b from-white/90 via-slate-50/80 to-blue-50/40 dark:from-slate-900/90 dark:via-slate-900/60 dark:to-blue-950/30 p-4 sm:p-7 shadow-2xl backdrop-blur-xl">
      {/* Top Window Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-border/60">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500/80" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          <span className="ml-2 text-xs font-medium text-muted-foreground hidden sm:inline">
            HanGo Smart Dashboard v1.0 • Phiên học hôm nay
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 font-bold text-xs">
            <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500 animate-pulse" />
            <span>Streak: 14 ngày</span>
          </div>
          <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 font-bold text-xs">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            <span>2,450 XP</span>
          </div>
        </div>
      </div>

      {/* Main Interactive Preview Body */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 pt-5">
        {/* Left Column: Interactive SRS Flashcard */}
        <div className="md:col-span-7 flex flex-col justify-between rounded-2xl border border-border/80 bg-white dark:bg-slate-900/80 p-5 shadow-sm relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
              Thẻ ôn tập thông minh (SRS SM-2)
            </span>
            <span className="text-[11px] text-muted-foreground bg-secondary px-2.5 py-0.5 rounded-full font-medium">
              Đến hạn ôn: 1/8 từ
            </span>
          </div>

          {/* Flashcard Content */}
          <div className="my-6 text-center py-4">
            <div className="inline-block relative">
              <h3 className="hangul-text text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                안녕하세요
              </h3>
              <button
                onClick={playKoreanSound}
                className={`absolute -right-10 top-1 p-2 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 hover:scale-110 transition-all ${
                  isPlayingAudio ? "ring-4 ring-blue-400/40" : ""
                }`}
                title="Nghe phát âm chuẩn Seoul"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-2 italic">
              [annyeonghaseyo]
            </p>

            {/* Flip Reveal */}
            <div className="mt-4 pt-4 border-t border-dashed border-border/80">
              {isFlipped ? (
                <div className="space-y-1 animate-in fade-in zoom-in-95 duration-200">
                  <p className="text-lg font-bold text-primary">
                    Xin chào / Chúc bạn bình an
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Gốc từ Hán - Hàn: <span className="text-indigo-600 dark:text-indigo-400 font-semibold">An Ninh (安寧)</span>
                  </p>
                </div>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsFlipped(true)}
                  className="text-xs gap-1.5 rounded-full font-semibold"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  Bấm để lật thẻ xem nghĩa
                </Button>
              )}
            </div>
          </div>

          {/* SRS Grading Buttons */}
          <div className="grid grid-cols-4 gap-2 pt-2 border-t border-border/60">
            <button
              onClick={() => setIsFlipped(false)}
              className="py-1.5 px-1 rounded-xl text-xs font-semibold bg-rose-500/10 text-rose-600 hover:bg-rose-500/20 transition-colors"
            >
              Quên (1d)
            </button>
            <button
              onClick={() => setIsFlipped(false)}
              className="py-1.5 px-1 rounded-xl text-xs font-semibold bg-amber-500/10 text-amber-600 hover:bg-amber-500/20 transition-colors"
            >
              Khó (3d)
            </button>
            <button
              onClick={() => setIsFlipped(false)}
              className="py-1.5 px-1 rounded-xl text-xs font-semibold bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 transition-colors"
            >
              Tốt (6d)
            </button>
            <button
              onClick={() => setIsFlipped(false)}
              className="py-1.5 px-1 rounded-xl text-xs font-semibold bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 transition-colors"
            >
              Dễ (14d)
            </button>
          </div>
        </div>

        {/* Right Column: Mini Stats & Next Lesson */}
        <div className="md:col-span-5 flex flex-col justify-between space-y-4">
          {/* Today's Goal Box */}
          <div className="rounded-2xl border border-border/80 bg-white dark:bg-slate-900/80 p-4 shadow-sm">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-semibold text-foreground">Mục tiêu hôm nay</span>
              <span className="font-bold text-primary">12 / 15 phút (80%)</span>
            </div>
            <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 w-4/5 rounded-full" />
            </div>
            <p className="text-[11px] text-muted-foreground mt-2 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              Chỉ còn 3 phút để giữ trọn Streak hôm nay!
            </p>
          </div>

          {/* Next Lesson Box */}
          <div className="rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent p-4 shadow-sm">
            <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-600 dark:text-indigo-400">
              Bài học tiếp theo
            </span>
            <h4 className="font-bold text-sm text-foreground mt-1 line-clamp-1">
              Bài 4: Phụ âm kép & Biến âm Batchim
            </h4>
            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
              Khóa Nhập môn Hangul • 15 phút • +35 XP
            </p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                Đã hoàn thành 40%
              </span>
              <Button size="sm" variant="premium" className="h-8 text-xs px-3">
                Tiếp tục học
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
