"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Volume2,
  CheckCircle2,
  XCircle,
  Sparkles,
  RotateCw,
  Trophy,
  ArrowRight,
  Heart,
} from "lucide-react";
import confetti from "canvas-confetti";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useHanGoStore } from "@/lib/store";

interface LessonBlock {
  type: "explanation" | "vocab" | "quiz" | "translation" | "summary";
  title: string;
  content: string;
  koreanText?: string;
  romaja?: string;
  vietnamese?: string;
  options?: string[];
  correctAnswer?: string;
  explanation?: string;
}

export default function LessonPlayerPage() {
  const params = useParams();
  const router = useRouter();
  const lessonId = params?.id as string;
  const addXP = useHanGoStore((s) => s.addXP);

  const blocks: LessonBlock[] = [
    {
      type: "explanation",
      title: "Khái niệm cốt lõi: Phụ âm cuối Batchim",
      content:
        "Trong tiếng Hàn, âm tiết được tạo thành từ Phụ âm đầu + Nguyên âm + (Phụ âm cuối). Phụ âm đứng ở vị trí cuối cùng dưới đáy âm tiết được gọi là Batchim (받침). Khi gặp nguyên âm phía sau, Batchim sẽ nối âm lên để tạo sự liền mạch trong phát âm.",
      koreanText: "받침 (Batchim)",
      romaja: "bat-chim",
      vietnamese: "Phụ âm cuối",
    },
    {
      type: "vocab",
      title: "Từ vựng mẫu có Batchim",
      content: "Quan sát từ '한국' (Hàn Quốc): Âm tiết thứ nhất '한' có batchim là 'ㄴ', âm tiết thứ hai '국' có batchim là 'ㄱ'.",
      koreanText: "한국",
      romaja: "han-guk",
      vietnamese: "Hàn Quốc [Hàn Quốc]",
    },
    {
      type: "quiz",
      title: "Câu hỏi củng cố 1",
      content: "Trong âm tiết '밥' (Cơm), phụ âm cuối (Batchim) là ký tự nào?",
      options: ["ㅂ (Bieup)", "ㅏ (A)", "ㄱ (Giyeok)", "ㅁ (Mieum)"],
      correctAnswer: "ㅂ (Bieup)",
      explanation: "Chữ 밥 gồm phụ âm đầu ㅂ, nguyên âm ㅏ và phụ âm cuối ㅂ.",
    },
    {
      type: "translation",
      title: "Luyện dịch và nối âm",
      content: "Dịch cụm từ 'Học sinh Hàn Quốc' sang tiếng Hàn:",
      options: [
        "한국 학생 (Han-guk hak-saeng)",
        "미국 사람 (Mi-guk sa-ram)",
        "선생님 (Seon-saeng-nim)",
        "친구 (Chin-gu)",
      ],
      correctAnswer: "한국 학생 (Han-guk hak-saeng)",
      explanation: "한국 (Hàn Quốc) + 학생 (Học sinh) = 한국 학생.",
    },
    {
      type: "summary",
      title: "Tổng kết bài học",
      content:
        "Chúc mừng bạn đã nắm vững nền tảng Batchim! Đây là bước nhảy vọt quan trọng nhất giúp bạn đọc thông viết thạo bảng chữ cái Hangul.",
      koreanText: "참 잘했어요!",
      romaja: "cham jal-haess-eo-yo!",
      vietnamese: "Bạn làm rất tốt!",
    },
  ];

  const [currentBlockIdx, setCurrentBlockIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [hearts, setHearts] = useState(5);

  const currentBlock = blocks[currentBlockIdx];
  const progressPercent = Math.round(((currentBlockIdx + 1) / blocks.length) * 100);

  const playSpeech = (text: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "ko-KR";
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleCheckAnswer = () => {
    if (!selectedOption) return;
    setIsAnswerChecked(true);

    if (selectedOption === currentBlock.correctAnswer) {
      toast.success("Chính xác tuyệt vời! +10 XP");
      addXP(10, 1);
    } else {
      toast.error("Chưa chính xác! Bạn bị trừ 1 tim.");
      setHearts((h) => Math.max(1, h - 1));
    }
  };

  const handleNextBlock = () => {
    setSelectedOption(null);
    setIsAnswerChecked(false);

    if (currentBlockIdx < blocks.length - 1) {
      setCurrentBlockIdx((prev) => prev + 1);
    } else {
      // Trigger celebration
      setIsCompleted(true);
      addXP(35, 10);
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {}
      toast.success("Hoàn thành xuất sắc bài học! Nhận được +35 XP!");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Learning Bar */}
      <header className="h-16 border-b border-border/80 px-4 sm:px-8 flex items-center justify-between max-w-4xl mx-auto w-full">
        <Link href="/learn" className="p-2 rounded-xl text-muted-foreground hover:bg-secondary">
          <ArrowLeft className="w-5 h-5" />
        </Link>

        {/* Progress Bar */}
        <div className="flex-1 max-w-md mx-4">
          <Progress value={progressPercent} className="h-3 rounded-full" />
        </div>

        {/* Hearts */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-600 font-bold text-xs">
          <Heart className="w-4 h-4 fill-rose-500 text-rose-500 animate-pulse" />
          <span>{hearts}</span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-2xl mx-auto w-full p-4 sm:p-6 flex flex-col justify-center">
        {!isCompleted ? (
          <div className="rounded-3xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in zoom-in-95 duration-200">
            <div>
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-primary/10 text-primary uppercase">
                Phần {currentBlockIdx + 1} / {blocks.length} • {currentBlock.type}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-foreground mt-2">
                {currentBlock.title}
              </h2>
            </div>

            {/* Korean highlight box if present */}
            {currentBlock.koreanText && (
              <div className="p-6 rounded-2xl bg-gradient-to-b from-primary/10 to-transparent border border-primary/20 text-center space-y-2">
                <div className="inline-block relative">
                  <h3 className="hangul-text text-4xl sm:text-5xl font-black text-foreground">
                    {currentBlock.koreanText}
                  </h3>
                  <button
                    onClick={() => playSpeech(currentBlock.koreanText!)}
                    className="absolute -right-10 top-1 p-2 rounded-full bg-secondary text-primary hover:scale-110"
                    title="Phát âm"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                {currentBlock.romaja && (
                  <p className="text-xs text-muted-foreground italic">[{currentBlock.romaja}]</p>
                )}
                {currentBlock.vietnamese && (
                  <p className="text-base font-bold text-primary">{currentBlock.vietnamese}</p>
                )}
              </div>
            )}

            {/* Explanation / Description Text */}
            <p className="text-sm text-foreground/90 leading-relaxed bg-secondary/30 p-4 rounded-2xl border border-border/60">
              {currentBlock.content}
            </p>

            {/* Options if quiz/translation */}
            {currentBlock.options && (
              <div className="space-y-3 pt-2">
                <p className="text-xs font-bold text-muted-foreground">Chọn câu trả lời đúng:</p>
                <div className="grid grid-cols-1 gap-2.5">
                  {currentBlock.options.map((opt, oIdx) => (
                    <button
                      key={oIdx}
                      onClick={() => {
                        if (!isAnswerChecked) setSelectedOption(opt);
                      }}
                      className={`p-4 rounded-2xl border text-sm font-bold text-left transition-all ${
                        selectedOption === opt
                          ? "border-primary bg-primary/10 ring-2 ring-primary/25"
                          : "border-border bg-card hover:border-primary/40"
                      } ${
                        isAnswerChecked && opt === currentBlock.correctAnswer
                          ? "border-emerald-500 bg-emerald-500/10 text-emerald-600 font-extrabold"
                          : ""
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Action Footer */}
            <div className="pt-4 flex items-center justify-between border-t border-border/60">
              {currentBlock.options && !isAnswerChecked ? (
                <Button
                  variant="premium"
                  size="lg"
                  disabled={!selectedOption}
                  onClick={handleCheckAnswer}
                  className="w-full"
                >
                  Kiểm tra đáp án
                </Button>
              ) : (
                <Button
                  variant="premium"
                  size="lg"
                  onClick={handleNextBlock}
                  className="w-full gap-2 font-bold"
                >
                  <span>{currentBlockIdx === blocks.length - 1 ? "Hoàn thành bài học" : "Tiếp tục"}</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        ) : (
          /* Completion Modal */
          <div className="rounded-3xl border border-primary/30 bg-card p-8 sm:p-12 shadow-2xl text-center space-y-6 animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center mx-auto ring-8 ring-emerald-500/10">
              <Trophy className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Hoàn thành xuất sắc
              </span>
              <h2 className="text-3xl font-black text-foreground">
                Chúc mừng bạn đã vượt qua bài học!
              </h2>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                Bạn đã tích lũy thêm kiến thức mới và tăng thêm điểm kinh nghiệm XP.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
              <div className="p-4 rounded-2xl bg-secondary/50 border border-border">
                <p className="text-xs text-muted-foreground font-semibold">Điểm XP</p>
                <p className="text-2xl font-black text-primary mt-1">+35 XP</p>
              </div>
              <div className="p-4 rounded-2xl bg-secondary/50 border border-border">
                <p className="text-xs text-muted-foreground font-semibold">Độ chính xác</p>
                <p className="text-2xl font-black text-emerald-500 mt-1">100%</p>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/learn">
                <Button variant="premium" size="lg" className="w-full sm:w-auto font-bold px-8">
                  Quay lại Lộ trình học
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Về Trang chủ
                </Button>
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
