import React from "react";
import { Users, CheckCircle, Repeat, Star } from "lucide-react";

export function StatsCounterSection() {
  const stats = [
    {
      icon: Users,
      value: "45,000+",
      label: "Học viên năng động",
      sublabel: "Đang rèn luyện mỗi ngày trên HanGo",
      color: "text-blue-600 dark:text-blue-400",
    },
    {
      icon: CheckCircle,
      value: "98.4%",
      label: "Thuộc Hangul sau 3 ngày",
      sublabel: "Tỷ lệ ghi nhớ ký tự ngay lần học đầu",
      color: "text-emerald-600 dark:text-emerald-400",
    },
    {
      icon: Repeat,
      value: "1.2 Triệu+",
      label: "Thẻ SRS đã ôn tập",
      sublabel: "Ghi nhớ ngắt quãng theo thuật toán SM-2",
      color: "text-purple-600 dark:text-purple-400",
    },
    {
      icon: Star,
      value: "4.9 / 5.0",
      label: "Độ hài lòng trải nghiệm",
      sublabel: "Từ hơn 8,500 lượt đánh giá thực tế",
      color: "text-amber-500",
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center sm:text-left">
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex flex-col items-center sm:items-start space-y-2">
                <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-md mb-1">
                  <Icon className={`w-6 h-6 ${item.color}`} />
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                  {item.value}
                </div>
                <div className="font-semibold text-sm text-slate-200">
                  {item.label}
                </div>
                <div className="text-xs text-slate-400">
                  {item.sublabel}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
