import React from "react";
import { CheckCircle2, ChevronRight, Layers, Award, Sparkles, BookCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function RoadmapSection() {
  const roadmapSteps = [
    {
      step: "01",
      level: "Nhập môn Bảng chữ cái",
      hangul: "한글 마스터",
      time: "7 ngày • 15 phút/ngày",
      target: "Đọc thông viết thạo bảng chữ cái Hangul",
      skills: [
        "19 phụ âm cơ bản & phụ âm kép",
        "21 nguyên âm đơn & nguyên âm đôi",
        "Quy tắc ghép âm và biến âm Batchim",
        "Chào hỏi cơ bản & giới thiệu tên",
      ],
      xp: "500 XP",
      isFree: true,
    },
    {
      step: "02",
      level: "Sơ cấp 1 (TOPIK I - Level 1)",
      hangul: "초급 1단계",
      time: "30 ngày • 20 phút/ngày",
      target: "Tích lũy 600 từ vựng và 45 mẫu câu đời sống",
      skills: [
        "Đuôi câu thân mật -아/어요 & trang trọng -ㅂ/습니까",
        "Số thuần Hàn (đếm đồ vật, giờ) & Số Hán Hàn (tiền, ngày)",
        "Giao tiếp mua sắm, gọi món, hỏi đường",
        "Phương pháp liên tưởng từ gốc Hán - Hàn",
      ],
      xp: "1,800 XP",
      isFree: false,
    },
    {
      step: "03",
      level: "Sơ cấp 2 (TOPIK I - Level 2)",
      hangul: "초급 2단계",
      time: "60 ngày • 25 phút/ngày",
      target: "Làm chủ 1,500 từ vựng, tự tin đậu TOPIK cấp 2",
      skills: [
        "Thì quá khứ, tương lai, phủ định và liên từ nối",
        "Kính ngữ -(으)시 và văn hóa xưng hô chuẩn Hàn",
        "Hội thoại hẹn gặp, du lịch, cảm xúc, công việc",
        "Luyện đề nghe hiểu & đọc hiểu TOPIK I thực chiến",
      ],
      xp: "3,500 XP",
      isFree: false,
    },
    {
      step: "04",
      level: "Trung cấp (TOPIK II - Level 3 & 4)",
      hangul: "중급 마스터",
      time: "90 ngày • 30 phút/ngày",
      target: "Tự tin xem phim không phụ đề, phỏng vấn xin việc",
      skills: [
        "Ngữ pháp nối câu phức, quán dụng ngữ & thành ngữ",
        "Từ vựng chuyên sâu văn phòng, công sở, thương mại",
        "Luyện viết văn nghị luận TOPIK câu 51-54",
        "Phản xạ đàm thoại chuyên nghiệp với người Hàn",
      ],
      xp: "6,000 XP",
      isFree: false,
    },
  ];

  return (
    <section id="roadmap" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-primary">
            Lộ trình học tập cá nhân hóa
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Từ số 0 đến tự tin chinh phục TOPIK
          </h2>
          <p className="text-base text-muted-foreground">
            Từng chặng đường được thiết kế theo cấu trúc vi mô (Microlearning), giúp bạn thấy rõ sự tiến bộ qua từng ngày mà không bị ngợp.
          </p>
        </div>

        {/* Roadmap Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {roadmapSteps.map((step, idx) => (
            <div
              key={idx}
              className={`rounded-2xl border p-6 flex flex-col justify-between relative transition-all duration-300 hover:shadow-lg ${
                step.isFree
                  ? "border-primary/50 bg-gradient-to-b from-primary/5 via-background to-background"
                  : "border-border/80 bg-card hover:border-primary/30"
              }`}
            >
              {/* Header Box */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-black text-primary/40">
                    {step.step}
                  </span>
                  {step.isFree ? (
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      Miễn phí 100%
                    </span>
                  ) : (
                    <span className="text-[11px] font-semibold text-muted-foreground flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-500" />
                      +{step.xp}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-foreground">
                  {step.level}
                </h3>
                <p className="hangul-text text-xs text-primary font-semibold mt-0.5">
                  {step.hangul}
                </p>
                <p className="text-xs text-muted-foreground mt-2 font-medium">
                  ⏱ {step.time}
                </p>

                <div className="my-4 py-3 border-y border-border/60">
                  <p className="text-xs font-semibold text-foreground/90">
                    Mục tiêu chặng:
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-snug">
                    {step.target}
                  </p>
                </div>

                {/* Skills list */}
                <ul className="space-y-2 text-xs text-muted-foreground">
                  {step.skills.map((skill, sIdx) => (
                    <li key={sIdx} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action */}
              <div className="mt-6 pt-4 border-t border-border/60">
                <Link href={step.isFree ? "/signup" : "/#pricing"}>
                  <Button
                    variant={step.isFree ? "default" : "outline"}
                    size="sm"
                    className="w-full text-xs font-semibold gap-1"
                  >
                    <span>{step.isFree ? "Học ngay chặng này" : "Xem chi tiết"}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
