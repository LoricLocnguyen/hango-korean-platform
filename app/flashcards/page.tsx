"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Layers,
  Sparkles,
  RotateCw,
  Volume2,
  CheckCircle2,
  Play,
  ArrowRight,
  TrendingUp,
  Brain,
  Clock,
} from "lucide-react";
import { toast } from "sonner";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { TopNavbar } from "@/components/layout/top-navbar";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useHanGoStore } from "@/lib/store";
import { SRSGrade } from "@/lib/types";

export default function FlashcardsPage() {
  const { srsCards, gradeSRSCard } = useHanGoStore();
  const [activeSession, setActiveSession] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [mode, setMode] = useState<"hangul_to_meaning" | "meaning_to_hangul" | "type_answer">("hangul_to_meaning");
  const [typedAnswer, setTypedAnswer] = useState("");
  const [answerEvaluated, setAnswerEvaluated] = useState<boolean | null>(null);

  const currentCard = srsCards[currentIndex];
  const progressPercent = Math.round(((currentIndex + 1) / srsCards.length) * 100);

  const playSpeech = (text: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "ko-KR";
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleGrade = (grade: SRSGrade) => {
    if (!currentCard) return;
    gradeSRSCard(currentCard.id, grade);
    setIsFlipped(false);
    setTypedAnswer("");
    setAnswerEvaluated(null);

    if (currentIndex < srsCards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setActiveSession(false);
      setCurrentIndex(0);
      toast.success("Chúc mừng! Bạn đã hoàn thành toàn bộ thẻ ôn tập SRS hôm nay! 🎉");
    }
  };

  const checkTypedAnswer = () => {
    if (!typedAnswer.trim()) return;
    const isCorrect = typedAnswer.trim().toLowerCase() === currentCard.vocabulary.hangul.toLowerCase();
    setAnswerEvaluated(isCorrect);
    setIsFlipped(true);
    if (isCorrect) {
      toast.success("Chính xác tuyệt đối! Hãy chọn điểm đánh giá.");
    } else {
      toast.error(`Chưa chính xác! Đáp án đúng là: ${currentCard.vocabulary.hangul}`);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50/50 dark:bg-slate-950/40">
      <AppSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopNavbar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto w-full pb-24">
          {/* Header */}
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-semibold mb-1">
                <Brain className="w-3.5 h-3.5" />
                <span>Khoa học trí nhớ Spaced Repetition (Anki/SM-2)</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                Hệ thống Flashcard SRS Thông Minh
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                Nhắc bạn ôn lại đúng thời điểm vàng trước khi não bộ quên
              </p>
            </div>

            {!activeSession ? (
              <Button
                variant="premium"
                size="lg"
                onClick={() => {
                  setActiveSession(true);
                  setCurrentIndex(0);
                  setIsFlipped(false);
                }}
                className="gap-2 font-bold shadow-lg shadow-indigo-500/25"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Bắt đầu phiên ôn tập ({srsCards.length} thẻ)</span>
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setActiveSession(false)}
                className="text-xs"
              >
                Tạm dừng phiên ôn
              </Button>
            )}
          </div>

          {!activeSession ? (
            /* Idle Overview Screen */
            <div className="space-y-6">
              {/* Stat overview cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-3xl border border-border/80 bg-card p-6 shadow-sm">
                  <div className="w-10 h-10 rounded-2xl bg-purple-500/10 text-purple-600 flex items-center justify-center mb-3">
                    <Clock className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl font-black text-foreground">{srsCards.length} thẻ</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">Cần ôn tập trong ngày hôm nay</p>
                </div>

                <div className="rounded-3xl border border-border/80 bg-card p-6 shadow-sm">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-3">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl font-black text-foreground">186 từ</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">Đã lưu trữ vào trí nhớ dài hạn</p>
                </div>

                <div className="rounded-3xl border border-border/80 bg-card p-6 shadow-sm">
                  <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center mb-3">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl font-black text-foreground">2.50 EF</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">Hệ số ghi nhớ trung bình (Ease Factor)</p>
                </div>
              </div>

              {/* Mode Select */}
              <div className="rounded-3xl border border-border/80 bg-card p-6 shadow-sm space-y-4">
                <h3 className="font-bold text-base text-foreground">
                  Chọn chế độ hiển thị mặt thẻ:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: "hangul_to_meaning", title: "Mặt trước Hangul ➔ Nghĩa", desc: "Đọc chữ Hàn rồi đoán nghĩa tiếng Việt" },
                    { id: "meaning_to_hangul", title: "Mặt trước Nghĩa ➔ Hangul", desc: "Xem tiếng Việt rồi nhớ lại cách viết chữ Hàn" },
                    { id: "type_answer", title: "Gõ câu trả lời (Typing)", desc: "Nhập bàn phím chữ Hangul để luyện phản xạ viết" },
                  ].map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setMode(m.id as any)}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        mode === m.id
                          ? "border-primary bg-primary/10 ring-2 ring-primary/20 shadow-xs"
                          : "border-border bg-card hover:border-primary/40"
                      }`}
                    >
                      <h4 className="font-bold text-sm text-foreground">{m.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{m.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Active SRS Flashcard Review Player */
            <div className="space-y-6 max-w-2xl mx-auto animate-in zoom-in-95 duration-200">
              {/* Session Progress Header */}
              <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
                <span>Thẻ {currentIndex + 1} / {srsCards.length}</span>
                <span>Tiến độ session: {progressPercent}%</span>
              </div>
              <Progress value={progressPercent} className="h-2" />

              {/* Big Flashcard Surface */}
              <div className="rounded-3xl border border-primary/25 bg-card p-8 sm:p-12 shadow-xl text-center min-h-[340px] flex flex-col justify-between items-center relative overflow-hidden">
                <div className="w-full">
                  <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-secondary text-secondary-foreground uppercase tracking-wider">
                    Chủ đề: {currentCard.vocabulary.level} • {currentCard.vocabulary.partOfSpeech}
                  </span>

                  {/* Front side content */}
                  <div className="my-8">
                    {mode === "hangul_to_meaning" && (
                      <div className="space-y-2">
                        <div className="inline-block relative">
                          <h2 className="hangul-text text-5xl sm:text-6xl font-black text-foreground">
                            {currentCard.vocabulary.hangul}
                          </h2>
                          <button
                            onClick={() => playSpeech(currentCard.vocabulary.hangul)}
                            className="absolute -right-12 top-2 p-2 rounded-full bg-secondary text-primary hover:scale-110"
                            title="Nghe phát âm"
                          >
                            <Volume2 className="w-5 h-5" />
                          </button>
                        </div>
                        <p className="text-sm text-muted-foreground italic">
                          [{currentCard.vocabulary.romaja}]
                        </p>
                      </div>
                    )}

                    {mode === "meaning_to_hangul" && (
                      <div className="space-y-2">
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">
                          {currentCard.vocabulary.vietnamese}
                        </h2>
                        {currentCard.vocabulary.hanjaVietnamese && (
                          <p className="text-xs text-indigo-600 dark:text-indigo-400 font-bold">
                            Gợi ý Hán - Hàn: {currentCard.vocabulary.hanjaVietnamese}
                          </p>
                        )}
                      </div>
                    )}

                    {mode === "type_answer" && (
                      <div className="space-y-4 max-w-sm mx-auto">
                        <h3 className="text-2xl font-bold text-foreground">
                          {currentCard.vocabulary.vietnamese}
                        </h3>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Nhập chữ Hangul..."
                            value={typedAnswer}
                            onChange={(e) => setTypedAnswer(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") checkTypedAnswer();
                            }}
                            className="flex-1 h-11 px-3.5 rounded-xl border border-input text-center text-lg font-bold"
                          />
                          <Button size="sm" onClick={checkTypedAnswer}>
                            Kiểm tra
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Flipped Back Content */}
                    {isFlipped && (
                      <div className="mt-8 pt-6 border-t border-dashed border-border/80 space-y-2 animate-in fade-in zoom-in-95 duration-200">
                        {mode === "hangul_to_meaning" && (
                          <>
                            <h3 className="text-2xl font-extrabold text-primary">
                              {currentCard.vocabulary.vietnamese}
                            </h3>
                            {currentCard.vocabulary.hanjaVietnamese && (
                              <p className="text-xs text-indigo-600 dark:text-indigo-400 font-bold">
                                Gốc Hán - Hàn: {currentCard.vocabulary.hanjaVietnamese}
                              </p>
                            )}
                          </>
                        )}

                        {mode === "meaning_to_hangul" && (
                          <>
                            <h3 className="hangul-text text-3xl font-black text-primary">
                              {currentCard.vocabulary.hangul}
                            </h3>
                            <p className="text-xs text-muted-foreground">
                              [{currentCard.vocabulary.romaja}]
                            </p>
                          </>
                        )}

                        <p className="text-xs text-muted-foreground italic pt-2">
                          &ldquo;{currentCard.vocabulary.exampleKorean}&rdquo; ({currentCard.vocabulary.exampleVietnamese})
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {!isFlipped ? (
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => {
                      setIsFlipped(true);
                      playSpeech(currentCard.vocabulary.hangul);
                    }}
                    className="gap-2 font-bold rounded-2xl text-sm"
                  >
                    <RotateCw className="w-4 h-4" />
                    <span>Lật thẻ xem đáp án</span>
                  </Button>
                ) : (
                  /* 4 Anki Grades */
                  <div className="w-full pt-4 space-y-2">
                    <p className="text-xs font-semibold text-muted-foreground">
                      Đánh giá độ nhớ để thuật toán xếp lịch ôn tiếp theo:
                    </p>
                    <div className="grid grid-cols-4 gap-2">
                      <button
                        onClick={() => handleGrade(1)}
                        className="py-3 px-2 rounded-2xl bg-rose-500/10 text-rose-600 hover:bg-rose-500/20 font-bold text-xs transition-all"
                      >
                        <div>Quên (1)</div>
                        <div className="text-[10px] font-normal opacity-80">&lt; 1 ngày</div>
                      </button>
                      <button
                        onClick={() => handleGrade(2)}
                        className="py-3 px-2 rounded-2xl bg-amber-500/10 text-amber-600 hover:bg-amber-500/20 font-bold text-xs transition-all"
                      >
                        <div>Khó (2)</div>
                        <div className="text-[10px] font-normal opacity-80">3 ngày</div>
                      </button>
                      <button
                        onClick={() => handleGrade(3)}
                        className="py-3 px-2 rounded-2xl bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 font-bold text-xs transition-all"
                      >
                        <div>Tốt (3)</div>
                        <div className="text-[10px] font-normal opacity-80">6 ngày</div>
                      </button>
                      <button
                        onClick={() => handleGrade(4)}
                        className="py-3 px-2 rounded-2xl bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 font-bold text-xs transition-all"
                      >
                        <div>Dễ (4)</div>
                        <div className="text-[10px] font-normal opacity-80">14 ngày</div>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </main>

        <MobileBottomNav />
      </div>
    </div>
  );
}
