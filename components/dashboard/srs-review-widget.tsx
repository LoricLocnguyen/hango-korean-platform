"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Layers,
  Volume2,
  RotateCw,
  Sparkles,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useHanGoStore } from "@/lib/store";
import { SRSGrade } from "@/lib/types";

export function SRSReviewWidget() {
  const { srsCards, gradeSRSCard } = useHanGoStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const activeCard = srsCards[currentIndex];

  const handleGrade = (grade: SRSGrade) => {
    if (!activeCard) return;

    gradeSRSCard(activeCard.id, grade);
    setIsFlipped(false);

    const gradeLabels: Record<SRSGrade, string> = {
      1: "Quên (Sẽ ôn lại sớm)",
      2: "Khó (+5 XP)",
      3: "Tốt (+15 XP)",
      4: "Dễ (+15 XP)",
    };

    toast.success(`Đã đánh giá: ${gradeLabels[grade]}`);

    if (currentIndex < srsCards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0);
      toast.info("Bạn đã hoàn thành phiên ôn tập thẻ hôm nay!");
    }
  };

  const playSpeech = (text: string) => {
    setIsPlayingAudio(true);
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "ko-KR";
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
    setTimeout(() => setIsPlayingAudio(false), 1000);
  };

  if (!activeCard) {
    return (
      <div className="rounded-3xl border border-border/80 bg-card p-6 shadow-sm text-center">
        <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
        <h3 className="font-bold text-base">Tuyệt vời! Không còn thẻ nào cần ôn</h3>
        <p className="text-xs text-muted-foreground mt-1">
          Hệ thống SRS SM-2 sẽ tự động nhắc bạn khi có từ đến hạn ghi nhớ tiếp theo.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-border/80 bg-card p-6 shadow-sm flex flex-col justify-between">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between pb-4 border-b border-border/60">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-foreground">
                Từ vựng cần ôn hôm nay (SRS)
              </h3>
              <p className="text-[11px] text-muted-foreground">
                Thẻ {currentIndex + 1} / {srsCards.length} • Thuật toán SuperMemo SM-2
              </p>
            </div>
          </div>

          <Link href="/flashcards">
            <span className="text-xs font-semibold text-primary hover:underline flex items-center gap-1">
              <span>Xem tất cả</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>
        </div>

        {/* Flashcard Box */}
        <div className="my-5 rounded-2xl border border-primary/20 bg-gradient-to-b from-primary/5 via-background to-background p-6 text-center relative group min-h-[190px] flex flex-col justify-center items-center">
          <div className="relative inline-block">
            <h2 className="hangul-text text-3xl sm:text-4xl font-black text-foreground">
              {activeCard.vocabulary.hangul}
            </h2>
            <button
              onClick={() => playSpeech(activeCard.vocabulary.hangul)}
              className={`absolute -right-9 top-0.5 p-1.5 rounded-full bg-secondary text-primary hover:scale-110 transition-transform ${
                isPlayingAudio ? "ring-2 ring-primary" : ""
              }`}
              title="Phát âm tiếng Hàn"
            >
              <Volume2 className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-xs font-semibold text-muted-foreground italic mt-1">
            [{activeCard.vocabulary.romaja}]
          </p>

          {/* Flipped Reveal */}
          <div className="mt-4 pt-3 w-full border-t border-dashed border-border/80">
            {isFlipped ? (
              <div className="space-y-1 animate-in zoom-in-95 duration-200">
                <p className="text-base font-extrabold text-primary">
                  {activeCard.vocabulary.vietnamese}
                </p>
                {activeCard.vocabulary.hanjaVietnamese && (
                  <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
                    Gốc Hán - Hàn: {activeCard.vocabulary.hanjaVietnamese}
                  </p>
                )}
                <p className="text-[11px] text-muted-foreground italic mt-1">
                  &ldquo;{activeCard.vocabulary.exampleKorean}&rdquo; ({activeCard.vocabulary.exampleVietnamese})
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
                <span>Bấm để lật thẻ xem nghĩa</span>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* 4 SuperMemo Grading Buttons */}
      <div className="pt-2">
        <p className="text-[11px] font-semibold text-muted-foreground mb-2 text-center">
          Đánh giá mức độ nhớ của bạn:
        </p>
        <div className="grid grid-cols-4 gap-2">
          <button
            onClick={() => handleGrade(1)}
            className="py-2 px-1 rounded-xl text-xs font-bold bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500/20 transition-colors"
          >
            Quên (1)
          </button>
          <button
            onClick={() => handleGrade(2)}
            className="py-2 px-1 rounded-xl text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 transition-colors"
          >
            Khó (2)
          </button>
          <button
            onClick={() => handleGrade(3)}
            className="py-2 px-1 rounded-xl text-xs font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20 transition-colors"
          >
            Tốt (3)
          </button>
          <button
            onClick={() => handleGrade(4)}
            className="py-2 px-1 rounded-xl text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 transition-colors"
          >
            Dễ (4)
          </button>
        </div>
      </div>
    </div>
  );
}
