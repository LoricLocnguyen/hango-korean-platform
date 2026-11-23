import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, BookOpen, ShieldCheck, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardPreview } from "./dashboard-preview";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32">
      {/* Decorative Gradient Background Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-blue-600/15 via-indigo-500/15 to-purple-600/15 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-2xl -z-10 pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Badges & Headline */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-700 dark:text-blue-300 text-xs font-semibold shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Nền tảng học tiếng Hàn thế hệ mới cho người Việt</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
            {"Chinh phục tiếng Hàn theo "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              cách thông minh hơn
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            Kết hợp khoa học trí nhớ <strong>Spaced Repetition (SRS)</strong> của Anki, tính năng gây nghiện của <strong>Duolingo</strong> và phương pháp liên tưởng <strong>từ vựng Hán - Hàn</strong> độc quyền giúp bạn thuộc nhanh gấp 3 lần.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link href="/signup" className="w-full sm:w-auto">
              <Button size="xl" variant="premium" className="w-full gap-2 shadow-xl shadow-indigo-600/20">
                <span>Học miễn phí ngay</span>
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>

            <Link href="/#roadmap" className="w-full sm:w-auto">
              <Button size="xl" variant="outline" className="w-full gap-2 border-slate-300 dark:border-slate-700">
                <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <span>Khám phá bài học</span>
              </Button>
            </Link>
          </div>

          {/* Trust Highlights */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              Không cần thẻ tín dụng
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-500" />
              Lộ trình chuẩn kỳ thi TOPIK
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Cài đặt PWA trên điện thoại
            </span>
          </div>
        </div>

        {/* Dashboard Preview Component */}
        <div className="mt-14 sm:mt-16">
          <DashboardPreview />
        </div>
      </div>
    </section>
  );
}
