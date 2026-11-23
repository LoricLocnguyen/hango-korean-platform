import React from "react";
import Link from "next/link";
import { Sparkles, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-slate-50 dark:bg-slate-950/50 text-muted-foreground transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-700 via-indigo-600 to-purple-600 text-white font-bold shadow-md shadow-indigo-500/20">
                <span className="hangul-text text-base">한</span>
              </div>
              <span className="font-extrabold text-xl tracking-tight text-foreground">
                HanGo
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-sm">
              Nền tảng học tiếng Hàn thông minh cho người Việt. Kết hợp Spaced Repetition (SRS), liên tưởng từ Hán - Hàn và lộ trình bài bản chuẩn TOPIK.
            </p>
            <div className="text-xs text-muted-foreground flex items-center gap-1 pt-2">
              Phát triển với <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" /> dành riêng cho thế hệ người học Việt Nam.
            </div>
          </div>

          {/* Column 1: Khóa học */}
          <div>
            <h4 className="font-semibold text-sm text-foreground mb-3.5">Khóa học</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/#roadmap" className="hover:text-primary transition-colors">
                  Nhập môn Hangul 7 ngày
                </Link>
              </li>
              <li>
                <Link href="/#roadmap" className="hover:text-primary transition-colors">
                  TOPIK I (Sơ cấp 1 & 2)
                </Link>
              </li>
              <li>
                <Link href="/#roadmap" className="hover:text-primary transition-colors">
                  TOPIK II (Trung cấp)
                </Link>
              </li>
              <li>
                <Link href="/#features" className="hover:text-primary transition-colors">
                  Từ vựng Hán - Hàn 3000 từ
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Tính năng */}
          <div>
            <h4 className="font-semibold text-sm text-foreground mb-3.5">Phương pháp</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/#features" className="hover:text-primary transition-colors">
                  Thuật toán SRS SM-2
                </Link>
              </li>
              <li>
                <Link href="/#features" className="hover:text-primary transition-colors">
                  Luyện phản xạ nghe nói
                </Link>
              </li>
              <li>
                <Link href="/#features" className="hover:text-primary transition-colors">
                  Gamification & Streak
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="hover:text-primary transition-colors">
                  Gói Hội viên Pro
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Hỗ trợ & Điều khoản */}
          <div>
            <h4 className="font-semibold text-sm text-foreground mb-3.5">Hỗ trợ</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/#faq" className="hover:text-primary transition-colors">
                  Câu hỏi thường gặp
                </Link>
              </li>
              <li>
                <Link href="/settings" className="hover:text-primary transition-colors">
                  Cài đặt tài khoản
                </Link>
              </li>
              <li>
                <a href="mailto:pinkblack0905@gmail.com" className="hover:text-primary transition-colors">
                  pinkblack0905@gmail.com
                </a>
              </li>
              <li>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Hệ thống hoạt động 99.9%
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between text-xs gap-4">
          <p>© 2026 HanGo Inc. Bảo lưu mọi quyền.</p>
          <div className="flex gap-6">
            <span className="hover:text-foreground cursor-pointer">Điều khoản sử dụng</span>
            <span className="hover:text-foreground cursor-pointer">Chính sách bảo mật</span>
            <span className="hover:text-foreground cursor-pointer">Bản quyền nội dung</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
