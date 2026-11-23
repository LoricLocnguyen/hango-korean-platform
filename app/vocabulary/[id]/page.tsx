"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Volume2,
  Heart,
  CheckCircle2,
  Sparkles,
  BookOpen,
  Share2,
} from "lucide-react";
import { toast } from "sonner";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { TopNavbar } from "@/components/layout/top-navbar";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { Button } from "@/components/ui/button";
import { type FullVocabulary } from "@/lib/seed-data";
import { getVocabularyById } from "@/lib/supabase/data";

export default function VocabularyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const wordId = params?.id as string;

  const [word, setWord] = useState<FullVocabulary | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    let active = true;
    setWord(null);
    setNotFound(false);
    getVocabularyById(wordId).then((found) => {
      if (!active) return;
      if (found) {
        setWord(found);
        setIsFavorite(found.isFavorite || false);
      } else {
        setNotFound(true);
      }
    });
    return () => {
      active = false;
    };
  }, [wordId]);

  const playSpeech = (text: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "ko-KR";
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  if (notFound) {
    return (
      <div className="flex min-h-screen bg-slate-50/50 dark:bg-slate-950/40">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <TopNavbar />
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto w-full pb-24">
            <div className="rounded-3xl border border-border/80 bg-card p-8 shadow-sm text-center space-y-3">
              <h2 className="font-bold text-lg text-foreground">Không tìm thấy từ vựng này</h2>
              <p className="text-sm text-muted-foreground">
                Từ vựng có thể đã bị xoá hoặc đường dẫn chưa đúng.
              </p>
              <Link
                href="/vocabulary"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Quay lại Danh sách từ vựng</span>
              </Link>
            </div>
          </main>
          <MobileBottomNav />
        </div>
      </div>
    );
  }

  if (!word) {
    return (
      <div className="flex min-h-screen bg-slate-50/50 dark:bg-slate-950/40">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <TopNavbar />
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto w-full pb-24">
            <div className="rounded-3xl border border-border/80 bg-card p-8 shadow-sm text-center">
              <p className="text-sm text-muted-foreground">Đang tải từ vựng…</p>
            </div>
          </main>
          <MobileBottomNav />
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50/50 dark:bg-slate-950/40">
      <AppSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopNavbar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto w-full pb-24">
          {/* Back button */}
          <div className="mb-6">
            <Link
              href="/vocabulary"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Quay lại Danh sách từ vựng</span>
            </Link>
          </div>

          {/* Word Detail Big Card */}
          <div className="rounded-3xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-start justify-between">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-secondary text-secondary-foreground uppercase">
                Chủ đề: {word.topicName} • {word.partOfSpeech}
              </span>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setIsFavorite(!isFavorite);
                    toast.success("Đã cập nhật trạng thái yêu thích!");
                  }}
                  className="rounded-xl"
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? "fill-rose-500 text-rose-500" : "text-muted-foreground"}`} />
                </Button>
              </div>
            </div>

            {/* Main Word Display */}
            <div className="text-center py-6 border-y border-border/60">
              <div className="inline-block relative">
                <h1 className="hangul-text text-5xl sm:text-6xl font-black text-foreground">
                  {word.hangul}
                </h1>
                <button
                  onClick={() => playSpeech(word.hangul)}
                  className="absolute -right-12 top-2 p-2.5 rounded-full bg-primary/10 text-primary hover:scale-110 transition-transform"
                  title="Nghe phát âm"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>
              <p className="text-base font-semibold text-muted-foreground italic mt-2">
                [{word.romaja}]
              </p>
              <h2 className="text-2xl font-extrabold text-primary mt-2">
                {word.vietnamese}
              </h2>
            </div>

            {/* Hanja Origin Section */}
            {word.hanjaVietnamese && (
              <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-foreground">
                    Gốc từ Hán - Hàn (Lợi thế ghi nhớ cho người Việt)
                  </h4>
                  <p className="text-xs text-indigo-700 dark:text-indigo-300 mt-0.5 leading-relaxed font-semibold">
                    {word.hanjaVietnamese}: Tận dụng liên tưởng âm Hán Việt tương đương để nhớ sâu từ này mà không cần học vẹt!
                  </p>
                </div>
              </div>
            )}

            {/* Example sentence */}
            <div className="space-y-2">
              <h4 className="font-bold text-sm text-foreground">Câu ví dụ trong ngữ cảnh:</h4>
              <div className="p-4 rounded-2xl bg-secondary/50 border border-border/60 flex items-center justify-between">
                <div>
                  <p className="hangul-text text-base font-bold text-foreground">
                    {word.exampleKorean}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 italic">
                    {word.exampleVietnamese}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => playSpeech(word.exampleKorean)}
                  className="shrink-0 text-primary"
                >
                  <Volume2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <Link href="/flashcards" className="flex-1">
                <Button variant="premium" className="w-full gap-2 font-bold">
                  <Sparkles className="w-4 h-4" />
                  <span>Thêm vào phiên Flashcard SRS hôm nay</span>
                </Button>
              </Link>
            </div>
          </div>
        </main>

        <MobileBottomNav />
      </div>
    </div>
  );
}
