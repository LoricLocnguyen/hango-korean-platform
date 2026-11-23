"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  BookOpen,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  HelpCircle,
} from "lucide-react";
import { toast } from "sonner";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { TopNavbar } from "@/components/layout/top-navbar";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fullGrammarData, GrammarPoint } from "@/lib/seed-data";
import { getGrammarPoints } from "@/lib/supabase/data";

export default function GrammarPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [grammarList, setGrammarList] = useState<GrammarPoint[]>(fullGrammarData);
  const [selectedGrammar, setSelectedGrammar] = useState<GrammarPoint | null>(
    fullGrammarData[0]
  );

  useEffect(() => {
    let active = true;
    getGrammarPoints().then((list) => {
      if (active && list.length > 0) {
        setGrammarList(list);
        setSelectedGrammar((prev) =>
          prev ? list.find((g) => g.id === prev.id) || list[0] : list[0]
        );
      }
    });
    return () => {
      active = false;
    };
  }, []);

  const filteredGrammar = grammarList.filter((g) => {
    const matchSearch =
      g.pattern.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.meaning.toLowerCase().includes(searchTerm.toLowerCase());

    const matchLevel = selectedLevel === "all" || g.level === selectedLevel;

    return matchSearch && matchLevel;
  });

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
                <Sparkles className="w-3.5 h-3.5" />
                <span>Kho ngữ pháp toàn diện từ Sơ cấp đến Trung cấp</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                Cẩm nang Ngữ pháp tiếng Hàn
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                Giải thích công thức, cách chia đuôi câu, phân tích lỗi sai và ví dụ sinh động
              </p>
            </div>
          </div>

          {/* Search & Filter */}
          <div className="rounded-3xl border border-border/80 bg-card p-4 shadow-sm mb-6 flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-3.5 pointer-events-none" />
              <Input
                type="text"
                placeholder="Tìm ngữ pháp (ví dụ: 은/는, 아/어요, 기 때문에...)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="sm:w-56">
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="flex h-11 w-full rounded-xl border border-input bg-background/50 px-3.5 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <option value="all">Tất cả trình độ</option>
                <option value="Sơ cấp 1">Sơ cấp 1</option>
                <option value="Sơ cấp 2">Sơ cấp 2</option>
                <option value="Trung cấp 1">Trung cấp 1</option>
              </select>
            </div>
          </div>

          {/* 2-Column Layout: Grammar List (col-5) & Grammar Detail (col-7) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left: Grammar Cards List */}
            <div className="lg:col-span-5 space-y-3">
              {filteredGrammar.map((item) => {
                const isSelected = selectedGrammar?.id === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedGrammar(item)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                      isSelected
                        ? "border-primary bg-primary/10 ring-2 ring-primary/20 shadow-sm"
                        : "border-border/80 bg-card hover:border-primary/40 hover:bg-secondary/40"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="hangul-text text-xl font-black text-foreground">
                        {item.pattern}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-secondary text-primary">
                        {item.level}
                      </span>
                    </div>

                    <h4 className="font-bold text-xs text-foreground">{item.name}</h4>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                      {item.meaning}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Right: Active Grammar Detail Reader */}
            <div className="lg:col-span-7 rounded-3xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm space-y-6 sticky top-20">
              {selectedGrammar ? (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="pb-4 border-b border-border/60">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-primary/10 text-primary">
                        {selectedGrammar.level}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Mã cấu trúc: {selectedGrammar.id}
                      </span>
                    </div>
                    <h2 className="hangul-text text-3xl font-black text-foreground">
                      {selectedGrammar.pattern}
                    </h2>
                    <h3 className="text-lg font-bold text-primary mt-1">
                      {selectedGrammar.name}
                    </h3>
                  </div>

                  {/* Formula Box */}
                  <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                      Công thức liên kết
                    </span>
                    <p className="text-sm font-extrabold text-foreground mt-1">
                      {selectedGrammar.formula}
                    </p>
                  </div>

                  {/* Meaning & Usage */}
                  <div className="space-y-2">
                    <h4 className="font-bold text-sm text-foreground">Ý nghĩa & Cách dùng:</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {selectedGrammar.meaning}
                    </p>
                    <p className="text-xs text-foreground/90 leading-relaxed bg-secondary/50 p-3.5 rounded-xl border border-border/60">
                      {selectedGrammar.usageNotes}
                    </p>
                  </div>

                  {/* Common Mistakes */}
                  <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-xs text-rose-600 dark:text-rose-400">
                        Lỗi người Việt thường nhầm:
                      </h4>
                      <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                        {selectedGrammar.commonMistakes}
                      </p>
                    </div>
                  </div>

                  {/* Examples */}
                  <div className="space-y-2">
                    <h4 className="font-bold text-sm text-foreground">Ví dụ minh họa:</h4>
                    <div className="space-y-2">
                      {selectedGrammar.examples.map((ex, eIdx) => (
                        <div
                          key={eIdx}
                          className="p-3.5 rounded-xl bg-secondary/40 border border-border/60 space-y-0.5 text-xs"
                        >
                          <p className="hangul-text font-bold text-foreground">
                            {ex.korean}
                          </p>
                          <p className="text-muted-foreground italic">
                            {ex.vietnamese}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <Link href={`/grammar/${selectedGrammar.id}`}>
                      <Button variant="premium" size="sm" className="gap-2 text-xs font-bold">
                        <span>Làm bài tập áp dụng cấu trúc này</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  Chọn một cấu trúc ngữ pháp bên trái để xem giải thích chi tiết
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
