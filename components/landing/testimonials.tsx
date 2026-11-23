import React from "react";
import Image from "next/image";
import { Star, Quote } from "lucide-react";

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Trần Bảo Ngọc",
      role: "Du học sinh Thạc sĩ tại ĐH Yonsei (Seoul)",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      content:
        "Trước đây mình học từ vựng rất hay quên, mở sách ra đọc thì buồn ngủ. Khi chuyển sang HanGo, nhờ tính năng Spaced Repetition và các mẹo từ gốc Hán - Hàn, mình thuộc vèo 1,200 từ vựng và tự tin đỗ TOPIK 4 chỉ sau 5 tháng!",
      badge: "Đạt TOPIK 4 sau 5 tháng",
      stars: 5,
    },
    {
      name: "Nguyễn Tuấn Dũng",
      role: "Kỹ sư phần mềm tại Samsung Electronics VN",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      content:
        "Do đặc thù công việc bận rộn, mình chỉ có tầm 15-20 phút giờ nghỉ trưa. Tính năng Streak và Daily Goal của HanGo thiết kế hệt như chơi game, cực kỳ cuốn. Mình đã duy trì chuỗi học 120 ngày liên tiếp mà không hề nản.",
      badge: "Streak 120 ngày liên tiếp",
      stars: 5,
    },
    {
      name: "Hoàng Mai Chi",
      role: "Biên phiên dịch tiếng Hàn tự do",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
      content:
        "Rất ấn tượng với phần phát âm chuẩn Seoul và hệ thống giải thích ngữ pháp bằng tiếng Việt chi tiết của HanGo. Giao diện cực kỳ đẹp, mượt mà và trực quan hơn hẳn các ứng dụng quốc tế dịch máy vụng về.",
      badge: "Đạt TOPIK 5 năm 2025",
      stars: 5,
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-primary">
            Câu chuyện thành công
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Được tin yêu bởi hàng chục nghìn người học
          </h2>
          <p className="text-base text-muted-foreground">
            Lắng nghe chia sẻ thực tế từ các học viên đã hiện thực hóa ước mơ du học, nâng tầm sự nghiệp và vượt qua kỳ thi TOPIK cùng HanGo.
          </p>
        </div>

        {/* Testimonials Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="rounded-3xl border border-border/80 bg-card p-7 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative group"
            >
              <Quote className="w-8 h-8 text-primary/15 absolute top-6 right-6" />

              <div>
                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(item.stars)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                <p className="text-sm text-foreground/90 leading-relaxed italic mb-6">
                  &ldquo;{item.content}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-border/60 flex items-center gap-3.5">
                <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0 border border-border">
                  <Image
                    src={item.avatar}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-foreground">
                    {item.name}
                  </h4>
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {item.role}
                  </p>
                  <span className="inline-block mt-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
