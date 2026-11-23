"use client";

import React from "react";
import Link from "next/link";
import { BookA, Clock, Lock, CheckCircle2, ChevronRight, Play } from "lucide-react";
import { sampleRecommendedLessons } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";

export function RecommendedLessons() {
  return (
    <div className="rounded-3xl border border-border/80 bg-card p-6 shadow-sm">
      <div className="flex items-center justify-between pb-4 border-b border-border/60 mb-4">
        <div>
          <h3 className="font-bold text-base text-foreground flex items-center gap-2">
            <BookA className="w-4 h-4 text-primary" />
            Bài học đề xuất tiếp theo
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Dựa trên tiến độ và mục tiêu cá nhân của bạn
          </p>
        </div>

        <Link href="/learn">
          <Button variant="ghost" size="sm" className="text-xs font-semibold text-primary">
            <span>Toàn bộ lộ trình</span>
            <ChevronRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </Link>
      </div>

      <div className="space-y-3">
        {sampleRecommendedLessons.map((lesson) => (
          <div
            key={lesson.id}
            className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
              lesson.isLocked
                ? "border-border/60 bg-secondary/30 opacity-70"
                : "border-border bg-card hover:border-primary/40 hover:shadow-2xs"
            }`}
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                  {lesson.courseTitle}
                </span>
                <span className="text-[10px] font-semibold text-amber-600 dark:text-amber-400">
                  +{lesson.xpReward} XP
                </span>
              </div>
              <h4 className="font-bold text-sm text-foreground">
                {lesson.title}
              </h4>
              <p className="hangul-text text-xs text-primary font-medium">
                {lesson.hangulTitle}
              </p>
              <div className="flex items-center gap-3 text-xs text-muted-foreground pt-1">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {lesson.durationMinutes} phút
                </span>
                <span>•</span>
                <span>{lesson.totalWords} từ mới</span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {lesson.isLocked ? (
                <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-secondary text-muted-foreground text-xs font-semibold">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Hoàn thành bài trước để mở</span>
                </div>
              ) : (
                <Link href={`/lesson/${lesson.id}`}>
                  <Button size="sm" variant="premium" className="gap-1.5 text-xs">
                    <Play className="w-3 h-3 fill-white" />
                    <span>Học ngay</span>
                  </Button>
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
