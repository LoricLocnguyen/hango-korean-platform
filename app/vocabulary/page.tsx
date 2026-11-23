"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  BookOpen,
  Search,
  Filter,
  Volume2,
  Heart,
  CheckCircle2,
  EyeOff,
  Sparkles,
  HelpCircle,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { TopNavbar } from "@/components/layout/top-navbar";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fullVocabulariesData, FullVocabulary } from "@/lib/seed-data";
import { getVocabularies } from "@/lib/supabase/data";

export default function VocabularyPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState<string | null>(null);

  // Local state for interactive word toggles — starts with the bundled
  // data, then swaps in the live Supabase vocabulary bank when available.
  const [words, setWords] = useState<FullVocabulary[]>(fullVocabulariesData);

  useEffect(() => {
    let active = true;
    getVocabularies().then((list) => {
      if (active && list.length > 0) setWords(list);
    });
    return () => {
      active = false;
    };
  }, []);

  const topics = [
    { id: "all", name: "Tất cả chủ đề" },
    { id: "greeting", name: "Chào hỏi" },
    { id: "family", name: "Gia đình" },
    { id: "food", name: "Ăn uống" },
    { id: "travel", name: "Du lịch" },
    { id: "shopping", name: "Mua sắm" },
    { id: "school", name: "Trường học" },
    { id: "work", name: "Công việc" },
    { id: "emotion", name: "Cảm xúc" },
    { id: "daily", name: "Đời sống" },
    { id: "topik", name: "TOPIK Chuyên sâu" },
  ];

  const filteredWords = useMemo(() => {
    return words.filter((w) => {
      const matchSearch =
        w.hangul.toLowerCase().includes(searchTerm.toLowerCase()) ||
        w.vietnamese.toLowerCase().includes(searchTerm.toLowerCase()) ||
        w.romaja.toLowerCase().includes(searchTerm.toLowerCase());

      const matchTopic = selectedTopic === "all" || w.topic === selectedTopic;
      const matchLevel = selectedLevel === "all" || w.level === selectedLevel;
      const matchFavorite = !onlyFavorites || w.isFavorite;

      return matchSearch && matchTopic && matchLevel && matchFavorite;
    });
  }, [words, searchTerm, selectedTopic, selectedLevel, onlyFavorites]);

  const toggleFavorite = (id: string) => {
    setWords((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isFavorite: !w.isFavorite } : w))
    );
    toast.success("Đã cập nhật danh sách yêu thích!");
  };

  const toggleKnown = (id: string) => {
    setWords((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isKnown: !w.isKnown } : w))
    );
    toast.success("Đã cập nhật trạng thái đã biết từ này!");
  };

  const hideWord = (id: string) => {
    setWords((prev) => prev.filter((w) => w.id !== id));
    toast.info("Đã ẩn từ khỏi danh sách hiển thị.");
  };

  const playSpeech = (text: string, id: string) => {
    setIsPlayingAudio(id);
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "ko-KR";
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
    setTimeout(() => setIsPlayingAudio(null), 1000);
  };

  return (
    <div className="flex min-h-screen bg-slate-50/50 dark:bg-slate-950/40">
      <AppSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopNavbar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full pb-24">
          {/* Header */}
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-1">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Kho 100+ từ vựng thực tế có âm Hán - Hàn</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                Từ vựng tiếng Hàn thông minh
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                Ghi nhớ siêu tốc nhờ liên tưởng gốc từ Hán - Việt, phát âm chuẩn và ví dụ đời sống
              </p>
            </div>

            <Link href="/flashcards">
              <Button variant="premium" size="sm" className="gap-2 text-xs font-bold shadow-md shadow-indigo-500/20">
                <Sparkles className="w-4 h-4" />
                <span>Ôn tập Flashcard SRS</span>
              </Button>
            </Link>
          </div>

          {/* Search & Filter Bar */}
          <div className="rounded-3xl border border-border/80 bg-card p-5 shadow-sm space-y-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
              {/* Search input */}
              <div className="md:col-span-6 relative">
                <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-3.5 pointer-events-none" />
                <Input
                  type="text"
                  placeholder="Tìm theo chữ Hàn, phiên âm hoặc nghĩa tiếng Việt..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Topic Select */}
              <div className="md:col-span-3">
                <select
                  value={selectedTopic}
                  onChange={(e) => setSelectedTopic(e.target.value)}
                  className="flex h-11 w-full rounded-xl border border-input bg-background/50 px-3.5 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  {topics.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Level Select */}
              <div className="md:col-span-3">
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="flex h-11 w-full rounded-xl border border-input bg-background/50 px-3.5 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <option value="all">Tất cả cấp độ</option>
                  <option value="level_0">Level 0 (Hangul)</option>
                  <option value="level_1">Level 1 (Sơ cấp 1)</option>
                  <option value="level_2">Level 2 (Sơ cấp 2)</option>
                  <option value="level_3">Level 3 (Trung cấp)</option>
                </select>
              </div>
            </div>

            {/* Quick Filter Pill Buttons */}
            <div className="flex items-center justify-between text-xs pt-1 border-t border-border/60">
              <span className="text-muted-foreground font-medium">
                Tìm thấy <strong>{filteredWords.length}</strong> từ vựng phù hợp
              </span>

              <button
                onClick={() => setOnlyFavorites(!onlyFavorites)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-bold transition-all ${
                  onlyFavorites
                    ? "bg-rose-500/15 text-rose-600 border border-rose-500/30"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${onlyFavorites ? "fill-rose-500 text-rose-500" : ""}`} />
                <span>Chỉ xem từ yêu thích</span>
              </button>
            </div>
          </div>

          {/* Vocabulary Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredWords.map((word) => (
              <div
                key={word.id}
                className="rounded-2xl border border-border/80 bg-card p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                      {word.topicName} • {word.partOfSpeech}
                    </span>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => toggleFavorite(word.id)}
                        className="p-1 rounded-lg text-muted-foreground hover:text-rose-500 transition-colors"
                        title="Yêu thích"
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            word.isFavorite ? "fill-rose-500 text-rose-500" : ""
                          }`}
                        />
                      </button>
                      <button
                        onClick={() => toggleKnown(word.id)}
                        className={`p-1 rounded-lg transition-colors ${
                          word.isKnown ? "text-emerald-500" : "text-muted-foreground hover:text-emerald-500"
                        }`}
                        title="Đã biết từ này"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => hideWord(word.id)}
                        className="p-1 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
                        title="Ẩn từ"
                      >
                        <EyeOff className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Hangul + Audio Button */}
                  <div className="flex items-center justify-between mt-1">
                    <div>
                      <h3 className="hangul-text text-2xl font-black text-foreground group-hover:text-primary transition-colors">
                        {word.hangul}
                      </h3>
                      <p className="text-xs font-semibold text-muted-foreground italic">
                        [{word.romaja}]
                      </p>
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => playSpeech(word.hangul, word.id)}
                      className={`h-9 w-9 rounded-xl ${
                        isPlayingAudio === word.id ? "bg-primary text-white" : "text-primary hover:bg-primary/10"
                      }`}
                      title="Phát âm"
                    >
                      <Volume2 className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Vietnamese Meaning & Hanja Origin */}
                  <div className="mt-3 space-y-1">
                    <p className="font-extrabold text-sm text-foreground">
                      {word.vietnamese}
                    </p>
                    {word.hanjaVietnamese && (
                      <p className="text-xs text-indigo-600 dark:text-indigo-400 font-bold flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        Gốc Hán - Hàn: {word.hanjaVietnamese}
                      </p>
                    )}
                  </div>

                  {/* Example sentence */}
                  <div className="mt-3 p-3 rounded-xl bg-secondary/40 border border-border/50 text-xs space-y-1">
                    <p className="hangul-text font-semibold text-foreground/90">
                      {word.exampleKorean}
                    </p>
                    <p className="text-muted-foreground italic">
                      {word.exampleVietnamese}
                    </p>
                  </div>
                </div>

                {/* Difficulty & Quick Action */}
                <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-muted-foreground">
                    Độ khó: {"⭐".repeat(word.difficulty)}
                  </span>

                  <Link href={`/vocabulary/${word.id}`}>
                    <span className="text-xs font-semibold text-primary hover:underline flex items-center gap-1">
                      <span>Chi tiết</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </main>

        <MobileBottomNav />
      </div>
    </div>
  );
}
