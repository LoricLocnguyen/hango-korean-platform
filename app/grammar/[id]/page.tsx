"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, XCircle, Sparkles, HelpCircle } from "lucide-react";
import { toast } from "sonner";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { TopNavbar } from "@/components/layout/top-navbar";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { Button } from "@/components/ui/button";
import { fullGrammarData, type GrammarPoint } from "@/lib/seed-data";
import { getGrammarPoints } from "@/lib/supabase/data";
import { useHanGoStore } from "@/lib/store";

export default function GrammarPracticePage() {
  const params = useParams();
  const grammarId = params?.id as string;
  const [item, setItem] = useState<GrammarPoint>(
    fullGrammarData.find((g) => g.id === grammarId) || fullGrammarData[0]
  );

  useEffect(() => {
    let active = true;
    getGrammarPoints().then((list) => {
      if (!active) return;
      const found = list.find((g) => g.id === grammarId);
      if (found) setItem(found);
    });
    return () => {
      active = false;
    };
  }, [grammarId]);
  const addXP = useHanGoStore((s) => s.addXP);

  // Exercise state
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);

  const practiceQuestion = {
    prompt: `Chọn cách điền cấu trúc [ ${item.pattern} ] thích hợp nhất vào chỗ trống:`,
    sentence: `저는 한국 영화를 좋아해서 주말마다 한국 영화를 보_______.`,
    options: ["고 싶어요", "지 않아요", "기 때문에", "는 것 같아요"],
    correct: "고 싶어요",
    explanation: "Vì thích phim Hàn nên cuối tuần muốn xem phim -> Dùng cấu trúc nguyện vọng -고 싶어요.",
  };

  const handleCheck = () => {
    if (!selectedAnswer) return;
    setIsAnswerChecked(true);
    if (selectedAnswer === practiceQuestion.correct) {
      toast.success("Chính xác! +15 XP");
      addXP(15, 2);
    } else {
      toast.error("Chưa chính xác, hãy đọc phần giải thích nhé!");
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50/50 dark:bg-slate-950/40">
      <AppSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopNavbar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto w-full pb-24">
          <div className="mb-6">
            <Link
              href="/grammar"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Quay lại Danh sách Ngữ pháp</span>
            </Link>
          </div>

          <div className="rounded-3xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm space-y-6">
            <div className="pb-4 border-b border-border/60">
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-primary/10 text-primary">
                {item.level} • Thực hành
              </span>
              <h1 className="hangul-text text-3xl font-black text-foreground mt-2">
                Bài tập: Cấu trúc {item.pattern}
              </h1>
              <p className="text-xs text-muted-foreground mt-1">
                {item.meaning}
              </p>
            </div>

            {/* Question */}
            <div className="space-y-4">
              <h3 className="font-bold text-base text-foreground">
                {practiceQuestion.prompt}
              </h3>
              <div className="p-5 rounded-2xl bg-secondary/50 border border-border/60 text-base sm:text-lg font-bold text-foreground text-center">
                {practiceQuestion.sentence}
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {practiceQuestion.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      if (!isAnswerChecked) setSelectedAnswer(opt);
                    }}
                    className={`p-4 rounded-2xl border text-sm font-bold transition-all text-left ${
                      selectedAnswer === opt
                        ? "border-primary bg-primary/10 ring-2 ring-primary/20"
                        : "border-border bg-card hover:border-primary/40"
                    } ${
                      isAnswerChecked && opt === practiceQuestion.correct
                        ? "border-emerald-500 bg-emerald-500/10 text-emerald-600"
                        : ""
                    }`}
                  >
                    {idx + 1}. {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Check CTA */}
            {!isAnswerChecked ? (
              <div className="pt-4 flex justify-end">
                <Button
                  variant="premium"
                  size="lg"
                  disabled={!selectedAnswer}
                  onClick={handleCheck}
                  className="gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Kiểm tra đáp án</span>
                </Button>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-secondary/60 border border-border/60 space-y-2 animate-in fade-in duration-200">
                <h4 className="font-bold text-sm text-foreground">Giải thích chi tiết:</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {practiceQuestion.explanation}
                </p>
                <div className="pt-2 flex justify-end">
                  <Link href="/grammar">
                    <Button variant="outline" size="sm">
                      Tiếp tục học các cấu trúc khác
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </main>

        <MobileBottomNav />
      </div>
    </div>
  );
}
