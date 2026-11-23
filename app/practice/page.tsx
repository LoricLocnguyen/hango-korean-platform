"use client";

import React, { useEffect, useState } from "react";
import {
  Dumbbell,
  Sparkles,
  CheckCircle2,
  XCircle,
  RotateCw,
  Trophy,
  HelpCircle,
} from "lucide-react";
import { toast } from "sonner";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { TopNavbar } from "@/components/layout/top-navbar";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { Button } from "@/components/ui/button";
import { sampleQuizQuestions, QuizQuestion } from "@/lib/seed-data";
import { getQuizQuestions } from "@/lib/supabase/data";
import { useHanGoStore } from "@/lib/store";

export default function PracticePage() {
  const [questions, setQuestions] = useState<QuizQuestion[]>(sampleQuizQuestions);

  useEffect(() => {
    let active = true;
    getQuizQuestions().then((list) => {
      if (active && list.length > 0) setQuestions(list);
    });
    return () => {
      active = false;
    };
  }, []);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [typedAnswer, setTypedAnswer] = useState("");
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQ = questions[currentIdx];
  const addXP = useHanGoStore((s) => s.addXP);

  const handleCheck = () => {
    setIsAnswerChecked(true);
    const answer =
      currentQ.type === "fill_blank" ? typedAnswer.trim() : selectedOption;

    if (answer?.toLowerCase() === currentQ.correctAnswer.toLowerCase()) {
      toast.success(`Chính xác! +${currentQ.xpReward} XP`);
      addXP(currentQ.xpReward, 2);
      setScore((s) => s + 1);
    } else {
      toast.error(`Chưa chính xác! Đáp án đúng: ${currentQ.correctAnswer}`);
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setTypedAnswer("");
    setIsAnswerChecked(false);

    if (currentIdx < questions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50/50 dark:bg-slate-950/40">
      <AppSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopNavbar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto w-full pb-24">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-1">
                <Dumbbell className="w-3.5 h-3.5" />
                <span>Kho bài tập tương tác đa dạng</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                Luyện tập & Quiz Engine
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                Trắc nghiệm, điền từ, dịch câu và phản xạ ngữ cảnh
              </p>
            </div>

            <span className="text-xs font-bold text-muted-foreground bg-secondary px-3 py-1.5 rounded-xl">
              Câu {currentIdx + 1} / {questions.length}
            </span>
          </div>

          {!isCompleted ? (
            <div className="rounded-3xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm space-y-6">
              <div>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-secondary text-secondary-foreground uppercase">
                  {currentQ.type} • +{currentQ.xpReward} XP
                </span>
                <h2 className="text-xl font-bold text-foreground mt-2">
                  {currentQ.prompt}
                </h2>
              </div>

              {/* Multiple choice options */}
              {currentQ.options && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {currentQ.options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        if (!isAnswerChecked) setSelectedOption(opt);
                      }}
                      className={`p-4 rounded-2xl border text-sm font-bold text-left transition-all ${
                        selectedOption === opt
                          ? "border-primary bg-primary/10 ring-2 ring-primary/25"
                          : "border-border bg-card hover:border-primary/40"
                      } ${
                        isAnswerChecked && opt === currentQ.correctAnswer
                          ? "border-emerald-500 bg-emerald-500/10 text-emerald-600"
                          : ""
                      }`}
                    >
                      {idx + 1}. {opt}
                    </button>
                  ))}
                </div>
              )}

              {/* Fill in blank input */}
              {currentQ.type === "fill_blank" && (
                <div className="space-y-3 pt-2 max-w-sm">
                  <input
                    type="text"
                    placeholder="Nhập từ còn thiếu..."
                    value={typedAnswer}
                    onChange={(e) => setTypedAnswer(e.target.value)}
                    className="w-full h-12 px-4 rounded-xl border border-input text-base font-bold bg-background text-center"
                  />
                </div>
              )}

              {/* Explanation upon check */}
              {isAnswerChecked && (
                <div className="p-4 rounded-2xl bg-secondary/60 border border-border/60 text-xs text-muted-foreground space-y-1 animate-in fade-in duration-200">
                  <p className="font-bold text-foreground">Giải thích chi tiết:</p>
                  <p>{currentQ.explanation}</p>
                </div>
              )}

              <div className="pt-4 flex justify-end border-t border-border/60">
                {!isAnswerChecked ? (
                  <Button
                    variant="premium"
                    size="lg"
                    disabled={currentQ.type === "fill_blank" ? !typedAnswer : !selectedOption}
                    onClick={handleCheck}
                  >
                    Kiểm tra đáp án
                  </Button>
                ) : (
                  <Button variant="premium" size="lg" onClick={handleNext}>
                    Câu hỏi tiếp theo ➔
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className="rounded-3xl border border-primary/20 bg-card p-8 text-center space-y-6">
              <Trophy className="w-16 h-16 text-amber-500 mx-auto" />
              <h2 className="text-2xl font-black text-foreground">Hoàn thành bài luyện tập!</h2>
              <p className="text-sm text-muted-foreground">
                Bạn đã đạt {score} / {questions.length} câu trả lời chính xác.
              </p>
              <Button
                variant="premium"
                onClick={() => {
                  setCurrentIdx(0);
                  setScore(0);
                  setIsCompleted(false);
                }}
                className="gap-2"
              >
                <RotateCw className="w-4 h-4" />
                <span>Luyện tập lại</span>
              </Button>
            </div>
          )}
        </main>

        <MobileBottomNav />
      </div>
    </div>
  );
}
