"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Play, Sparkles, BookA, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useHanGoStore } from "@/lib/store";

export function ContinueLearningCTA() {
  const user = useHanGoStore((s) => s.user);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-indigo-500/30 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 p-6 sm:p-8 text-white shadow-xl shadow-indigo-950/20">
      {/* Background glow effects */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-48 h-48 bg-purple-500/20 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-amber-300 text-xs font-bold border border-white/10">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Bài học sẵn sàng • +35 XP</span>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight">
            {user.nextLessonTitle || "Bài 4: Phụ âm kép & Nguyên tắc nối âm Batchim"}
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 flex flex-wrap items-center gap-4 pt-1">
            <span className="flex items-center gap-1.5">
              <BookA className="w-4 h-4 text-indigo-400" />
              Khóa Nhập môn Hangul (Level 0)
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-blue-400" />
              Ước tính: 12 phút
            </span>
          </p>
        </div>

        {/* Big Action Button */}
        <div className="shrink-0 w-full sm:w-auto">
          <Link href="/lesson/les_hangul_04">
            <Button
              size="xl"
              className="w-full sm:w-auto bg-white text-indigo-900 hover:bg-slate-100 shadow-xl shadow-black/20 font-extrabold gap-2 rounded-2xl group transition-all"
            >
              <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
              </div>
              <span className="text-base">Tiếp tục học ngay</span>
              <ArrowRight className="w-4 h-4 text-indigo-600 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
