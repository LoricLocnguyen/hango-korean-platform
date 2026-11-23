# HanGo - Nền Tảng Học Tiếng Hàn Thông Minh 🇰🇷✨

> Nền tảng học tiếng Hàn trực tuyến cao cấp dành riêng cho người Việt, kết hợp giữa **Duolingo** (Gamification), **Anki** (Spaced Repetition SM-2), **Memrise** (Ngữ cảnh & âm thanh thực tế), và khóa học chuyên nghiệp chuẩn TOPIK.

---

## 🚀 Tính năng Nổi Bật

1. **Lộ trình học 7 Cấp độ (Level 0 ➔ 6):**
   - Level 0: Nhập môn Bảng chữ cái Hangul
   - Level 1: TOPIK I - Sơ cấp 1
   - Level 2: TOPIK I - Nâng cao (Cấp 2)
   - Level 3: TOPIK II - Trung cấp (Cấp 3-4)
   - Level 4: Giao tiếp đời sống Seoul
   - Level 5: Tiếng Hàn công sở & Doanh nghiệp
   - Level 6: Luyện thi chiến thuật TOPIK II

2. **Làm chủ Bảng chữ cái Hangul:**
   - 10 nguyên âm cơ bản, 14 phụ âm cơ bản, 11 nguyên âm ghép, 5 phụ âm căng đôi.
   - 7 quy tắc biến âm Patchim chuẩn mực.
   - Hướng dẫn nét viết từng bước, phát âm chuẩn giọng Seoul.
   - Mini game nhận diện âm thanh và bộ theo dõi ký tự hay nhầm lẫn.

3. **Từ vựng Thông minh Hán - Hàn (Hanja):**
   - 100+ từ vựng thực tế theo 10 chủ đề sinh hoạt.
   - Khai thác hơn 60% từ đồng âm Hán - Việt để người Việt thuộc từ siêu tốc.
   - Tìm kiếm, lọc theo chủ đề, cấp độ, lưu yêu thích, ẩn từ.

4. **Hệ thống Flashcard Spaced Repetition (Anki SM-2):**
   - 4 mức đánh giá: Quên (Again), Khó (Hard), Tốt (Good), Dễ (Easy).
   - Tự động tính toán chu kỳ lặp lại theo thuật toán SuperMemo SM-2.
   - 3 chế độ ôn: Hangul ➔ Nghĩa, Nghĩa ➔ Hangul, Gõ câu trả lời (Typing).

5. **Cẩm nang Ngữ pháp Toàn diện:**
   - 30 điểm ngữ pháp trọng yếu: 은/는, 이/가, 을/를, 이에요/예요, 있어요/없어요, 안/못, -고 싶어요, -아/어야 해요, -(으)려고 하다, -기 때문에, -(으)ㄴ/는 것 같다...
   - Phân tích công thức, lỗi người Việt hay mắc và bài tập áp dụng.

6. **Phòng Luyện nghe Đa tốc độ (Listening Lab):**
   - Tùy chỉnh tốc độ 0.75x, 1x, 1.25x.
   - Hiển thị transcript song ngữ linh hoạt.
   - Chế độ nghe chép chính tả (Dictation) và câu hỏi trắc nghiệm.

7. **Luyện nói & Chấm điểm Phát âm AI:**
   - Nhận diện giọng nói qua Web Speech API / Audio Recorder.
   - Chấm điểm độ chính xác (Accuracy) và độ trôi chảy (Fluency).
   - 5 kịch bản đàm thoại thực tế: Quán ăn, Mua sắm, Hỏi đường, Phỏng vấn, Giới thiệu.

8. **Gia sư AI HanGo (Korean AI Tutor):**
   - Giải thích ngữ pháp 24/7, phân tích lỗi sai, sửa câu văn, nhập vai đàm thoại.

9. **Gamification & Cộng đồng:**
   - Streak lửa, cấp độ, điểm kinh nghiệm (XP), huy hiệu thành tích, bảng xếp hạng tuần.
   - Diễn đàn học viên trao đổi thắc mắc và chia sẻ kinh nghiệm ôn thi TOPIK.

10. **Bảng điều khiển Quản trị (Admin Panel):**
    - Thống kê học viên, doanh thu, CRUD khóa học, từ vựng, ngữ pháp, kiểm duyệt báo cáo.

---

## 🛠 Tech Stack

- **Framework:** Next.js 15 (App Router, React 19)
- **Language:** TypeScript 5.7+
- **Styling:** Tailwind CSS, Lucide React, Glassmorphism, Semantic Tokens
- **State Management:** Zustand, TanStack React Query
- **Charts:** Recharts
- **Forms & Validation:** React Hook Form + Zod
- **Testing:** Vitest
- **Database & Auth:** Supabase PostgreSQL + Row Level Security (RLS)
- **PWA Ready:** Manifest.json, Responsive Mobile-first

---

## 📦 Hướng dẫn Cài đặt & Chạy Dự án

### 1. Cài đặt Dependencies
```bash
cd hango
npm install --legacy-peer-deps
```

### 2. Thiết lập Biến môi trường
Tạo file `.env.local` từ file mẫu:
```bash
cp .env.example .env.local
```

### 3. Chạy môi trường Phát triển (Development)
```bash
npm run dev
```
Mở trình duyệt tại: `http://localhost:3000`

### 4. Chạy Unit Test
```bash
npm test
```

### 5. Build Kiểm tra Production
```bash
npm run build
```

---

## 📜 Cấu trúc Thư mục

```
hango/
├── app/                  # Next.js 15 App Router pages & routes
│   ├── page.tsx          # Landing Page
│   ├── dashboard/        # Dashboard học tập
│   ├── learn/            # Lộ trình 7 cấp độ
│   ├── hangul/           # Học bảng chữ cái Hangul
│   ├── vocabulary/       # Từ vựng & chi tiết từ
│   ├── flashcards/       # Flashcard SRS (SM-2)
│   ├── grammar/          # Cẩm nang ngữ pháp
│   ├── listening/        # Luyện nghe đa tốc độ
│   ├── speaking/         # Luyện nói & Chấm điểm AI
│   ├── practice/         # Quiz Engine
│   ├── lesson/[id]/      # Trình phát bài học đa khối
│   ├── ai-tutor/         # Gia sư AI HanGo
│   ├── community/        # Diễn đàn học viên
│   ├── achievements/     # Huy hiệu thành tích
│   ├── leaderboard/      # Bảng xếp hạng tuần
│   ├── profile/          # Hồ sơ cá nhân
│   ├── settings/         # Cài đặt tài khoản
│   ├── admin/            # Quản trị viên
│   └── (auth)/           # Đăng nhập, Đăng ký, Quên MK, Onboarding
├── components/           # Reusable UI & Feature components
├── lib/                  # Tiện ích, Types, Seed data, Thuật toán SRS
├── supabase/migrations/  # SQL Schema DDL & RLS Policies
└── public/               # Static assets & PWA manifest
```
