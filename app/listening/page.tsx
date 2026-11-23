"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Headphones,
  Volume2,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Eye,
  EyeOff,
  Sparkles,
  Gauge,
  Edit3,
} from "lucide-react";
import { toast } from "sonner";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { TopNavbar } from "@/components/layout/top-navbar";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { Button } from "@/components/ui/button";
import { sampleListeningExercises, ListeningExercise } from "@/lib/seed-data";
import { getListeningExercises } from "@/lib/supabase/data";
import { speakKorean } from "@/lib/tts";
import { useHanGoStore } from "@/lib/store";

export default function ListeningPage() {
  const [exercises, setExercises] = useState<ListeningExercise[]>(sampleListeningExercises);

  useEffect(() => {
    let active = true;
    getListeningExercises().then((list) => {
      if (active && list.length > 0) setExercises(list);
    });
    return () => {
      active = false;
    };
  }, []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<0.75 | 1 | 1.25>(1);
  const [showTranscript, setShowTranscript] = useState(false);
  const [dictationMode, setDictationMode] = useState(false);
  const [typedDictation, setTypedDictation] = useState("");
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);

  const addXP = useHanGoStore((s) => s.addXP);
  const current = exercises[currentIndex];

  const playSpeech = (text: string) => {
    setIsPlaying(true);
    speakKorean(text, {
      rate: playbackSpeed,
      onEnd: () => setIsPlaying(false),
    });
  };

  const handleCheckAnswer = () => {
    if (!selectedOption) return;
    setIsAnswerChecked(true);
    if (selectedOption === current.correctAnswer) {
      toast.success("Chính xác! Khả năng nghe của bạn rất xuất sắc (+20 XP)");
      addXP(20, 2);
    } else {
      toast.error("Chưa chính xác! Hãy đọc kỹ transcript để hiểu nhé.");
    }
  };

  const handleNext = () => {
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerChecked(false);
      setShowTranscript(false);
      setTypedDictation("");
    } else {
      toast.success("Bạn đã hoàn thành các bài luyện nghe hôm nay!");
      setCurrentIndex(0);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50/50 dark:bg-slate-950/40">
      <AppSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopNavbar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto w-full pb-24">
          {/* Header */}
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 text-xs font-semibold mb-1">
                <Headphones className="w-3.5 h-3.5" />
                <span>Luyện nghe phản xạ chuẩn giọng Seoul</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                Luyện nghe đa tốc độ (Listening Lab)
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                Tùy chỉnh tốc độ 0.75x, 1x, 1.25x và chế độ nghe chép chính tả (Dictation)
              </p>
            </div>

            <div className="text-xs font-semibold text-muted-foreground bg-secondary px-3 py-1.5 rounded-xl">
              Bài {currentIndex + 1} / {exercises.length}
            </div>
          </div>

          {/* Audio Player Card */}
          <div className="rounded-3xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border/60">
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                  {current.level}
                </span>
                <h3 className="font-extrabold text-lg text-foreground mt-1">
                  {current.title}
                </h3>
              </div>

              {/* Speed Controls */}
              <div className="flex items-center gap-2">
                <Gauge className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs font-semibold text-muted-foreground">Tốc độ:</span>
                <div className="flex items-center p-1 rounded-xl bg-secondary border border-border text-xs font-bold">
                  {[0.75, 1, 1.25].map((speed) => (
                    <button
                      key={speed}
                      onClick={() => setPlaybackSpeed(speed as any)}
                      className={`px-2.5 py-1 rounded-lg transition-all ${
                        playbackSpeed === speed
                          ? "bg-background text-foreground shadow-2xs"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {speed}x
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Big Interactive Audio Center */}
            <div className="rounded-2xl bg-gradient-to-b from-sky-500/10 via-primary/5 to-transparent border border-sky-500/20 p-8 text-center space-y-4">
              <button
                onClick={() => playSpeech(current.audioPrompt)}
                className={`w-20 h-20 rounded-full bg-primary text-white flex items-center justify-center mx-auto shadow-xl shadow-primary/25 hover:scale-105 transition-all ${
                  isPlaying ? "ring-8 ring-primary/30 animate-pulse" : ""
                }`}
                title="Bấm để nghe audio"
              >
                {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 fill-white ml-1" />}
              </button>

              <div>
                <p className="text-sm font-bold text-foreground">
                  {isPlaying ? "Đang phát âm thanh giọng Seoul..." : "Bấm nút để nghe đoạn hội thoại"}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Tốc độ hiện tại: <strong>{playbackSpeed}x</strong>
                </p>
              </div>

              {/* Secondary audio buttons */}
              <div className="flex items-center justify-center gap-3 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => playSpeech(current.audioPrompt)}
                  className="text-xs gap-1.5 rounded-full font-semibold"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Nghe lại</span>
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowTranscript(!showTranscript)}
                  className="text-xs gap-1.5 rounded-full font-semibold"
                >
                  {showTranscript ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  <span>{showTranscript ? "Ẩn Transcript" : "Xem Transcript"}</span>
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setDictationMode(!dictationMode)}
                  className="text-xs gap-1.5 rounded-full font-semibold text-indigo-600 dark:text-indigo-400"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Nghe chép chính tả</span>
                </Button>
              </div>

              {/* Transcript Reveal Box */}
              {showTranscript && (
                <div className="p-4 rounded-2xl bg-background border border-border/80 text-left space-y-1.5 animate-in fade-in duration-200">
                  <span className="text-[10px] font-bold text-primary uppercase">
                    Phụ đề song ngữ:
                  </span>
                  <p className="hangul-text font-bold text-base text-foreground">
                    {current.transcript}
                  </p>
                  <p className="text-xs text-muted-foreground italic">
                    {current.vietnamese}
                  </p>
                </div>
              )}

              {/* Dictation Mode Box */}
              {dictationMode && (
                <div className="p-4 rounded-2xl bg-secondary/50 border border-border/80 text-left space-y-2 animate-in fade-in duration-200">
                  <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase">
                    Thử thách Nghe chép chính tả:
                  </span>
                  <p className="text-xs text-muted-foreground">
                    Hãy vừa nghe vừa gõ lại câu tiếng Hàn bạn nghe được vào ô bên dưới:
                  </p>
                  <textarea
                    rows={2}
                    value={typedDictation}
                    onChange={(e) => setTypedDictation(e.target.value)}
                    placeholder="Gõ lại câu tiếng Hàn bạn nghe được..."
                    className="w-full rounded-xl border border-input p-3 text-sm font-semibold bg-background"
                  />
                </div>
              )}
            </div>

            {/* Question Section */}
            <div className="space-y-4 pt-2">
              <h4 className="font-extrabold text-base text-foreground">
                Câu hỏi nghe hiểu: {current.question}
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {current.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      if (!isAnswerChecked) setSelectedOption(opt);
                    }}
                    className={`p-4 rounded-2xl border text-sm font-bold text-left transition-all ${
                      selectedOption === opt
                        ? "border-primary bg-primary/10 ring-2 ring-primary/20"
                        : "border-border bg-card hover:border-primary/40"
                    } ${
                      isAnswerChecked && opt === current.correctAnswer
                        ? "border-emerald-500 bg-emerald-500/10 text-emerald-600"
                        : ""
                    }`}
                  >
                    {idx + 1}. {opt}
                  </button>
                ))}
              </div>

              {!isAnswerChecked ? (
                <div className="pt-2 flex justify-end">
                  <Button
                    variant="premium"
                    size="lg"
                    disabled={!selectedOption}
                    onClick={handleCheckAnswer}
                    className="gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Xác nhận đáp án</span>
                  </Button>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-secondary/60 border border-border/60 space-y-2 animate-in fade-in duration-200">
                  <h4 className="font-bold text-sm text-foreground">Giải thích:</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {current.explanation}
                  </p>
                  <div className="pt-2 flex justify-end">
                    <Button variant="premium" size="sm" onClick={handleNext}>
                      Chuyển sang bài nghe tiếp theo ➔
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>

        <MobileBottomNav />
      </div>
    </div>
  );
}
