import React from "react";
import {
  BookA,
  Sparkles,
  GitFork,
  Headphones,
  Mic,
  Repeat,
  ArrowUpRight,
} from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: BookA,
      title: "Học Hangul Tương tác",
      badge: "Nhập môn 7 ngày",
      description:
        "Bẻ khóa 40 nguyên âm, phụ âm và bảng ghép vần tiếng Hàn qua hình ảnh trực quan, hướng dẫn thứ tự nét bút và audio chuẩn Seoul.",
      koreanExample: "한글 (Hangeul) • 40 Ký tự cơ bản",
      color: "from-blue-500/20 to-blue-600/5 text-blue-600 dark:text-blue-400 border-blue-500/30",
    },
    {
      icon: Sparkles,
      title: "Từ vựng Thông minh Hán - Hàn",
      badge: "Lợi thế người Việt",
      description:
        "Tận dụng hơn 60% từ đồng âm Hán Việt để ghi nhớ từ vựng thần tốc. Hiểu bản chất gốc từ, không học vẹt, nhớ sâu nhiều năm.",
      koreanExample: "학생 [Học sinh] • 시간 [Thời gian]",
      color: "from-indigo-500/20 to-indigo-600/5 text-indigo-600 dark:text-indigo-400 border-indigo-500/30",
    },
    {
      icon: GitFork,
      title: "Ngữ pháp theo Lộ trình",
      badge: "Chuẩn TOPIK I & II",
      description:
        "Hệ thống ngữ pháp chia nhỏ theo từng bước thang bài bản. Giải thích chi tiết đuôi câu trang trọng, thân mật và các cấu trúc biến âm dễ nhầm.",
      koreanExample: "-아/어요 • -(으)ㄹ 수 있다",
      color: "from-purple-500/20 to-purple-600/5 text-purple-600 dark:text-purple-400 border-purple-500/30",
    },
    {
      icon: Headphones,
      title: "Luyện nghe Đa tốc độ",
      badge: "Âm thanh Studio",
      description:
        "Hội thoại đời sống thực tế với phát thanh viên Hàn Quốc. Hỗ trợ tùy chỉnh tốc độ 0.75x, 1.0x, 1.25x và hiển thị phụ đề song ngữ.",
      koreanExample: "Phát âm chuẩn giọng Seoul",
      color: "from-sky-500/20 to-sky-600/5 text-sky-600 dark:text-sky-400 border-sky-500/30",
    },
    {
      icon: Mic,
      title: "Luyện nói & Phản xạ",
      badge: "Shadowing thông minh",
      description:
        "Tập nói theo phương pháp Shadowing phản xạ. Luyện cách ngắt nghỉ tự nhiên, ngữ điệu chuẩn xác như người bản địa.",
      koreanExample: "Ngữ điệu tự nhiên • Phản xạ nhanh",
      color: "from-amber-500/20 to-amber-600/5 text-amber-600 dark:text-amber-400 border-amber-500/30",
    },
    {
      icon: Repeat,
      title: "Ôn tập Spaced Repetition (SRS)",
      badge: "Thuật toán SM-2",
      description:
        "Khoa học trí nhớ tối ưu thời điểm ôn tập trước khi não bộ quên. Chỉ cần 10-15 phút mỗi ngày, từ vựng lưu trữ vĩnh viễn vào trí nhớ dài hạn.",
      koreanExample: "Lặp lại ngắt quãng 1d • 3d • 6d • 14d",
      color: "from-emerald-500/20 to-emerald-600/5 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
    },
  ];

  return (
    <section id="features" className="py-20 md:py-28 bg-slate-50/50 dark:bg-slate-950/30 border-y border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-primary">
            Hệ sinh thái học tập toàn diện
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Phương pháp học thông minh, hiệu quả đột phá
          </h2>
          <p className="text-base text-muted-foreground">
            HanGo tích hợp đầy đủ công cụ cần thiết trên một nền tảng duy nhất, giải quyết triệt để rào cản từ vựng, ngữ âm và sự duy trì đều đặn.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-2xl border border-border/80 bg-card p-6 shadow-sm hover:shadow-premium dark:hover:shadow-premium-dark hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feat.color} flex items-center justify-center border shadow-xs`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground">
                      {feat.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-foreground mb-2 flex items-center gap-1 group-hover:text-primary transition-colors">
                    {feat.title}
                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                {/* Korean Example Footer */}
                <div className="mt-5 pt-4 border-t border-border/60 flex items-center justify-between text-xs">
                  <span className="hangul-text font-semibold text-slate-700 dark:text-slate-300">
                    {feat.koreanExample}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
