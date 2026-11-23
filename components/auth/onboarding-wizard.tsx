"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Compass,
  GraduationCap,
  Clock,
  Heart,
  CheckCircle2,
  Tv,
  Briefcase,
  Plane,
  MessageCircle,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useHanGoStore } from "@/lib/store";

export function OnboardingWizard() {
  const router = useRouter();
  const completeOnboarding = useHanGoStore((s) => s.completeOnboarding);

  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState("daily_communication");
  const [level, setLevel] = useState("zero_hangul");
  const [dailyMinutes, setDailyMinutes] = useState(15);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([
    "travel",
    "food",
    "kpop",
  ]);

  const goals = [
    {
      id: "daily_communication",
      title: "Giao tiếp đời sống hàng ngày",
      description: "Tự tin trò chuyện, kết bạn và làm quen với người Hàn",
      icon: MessageCircle,
    },
    {
      id: "topik_exam",
      title: "Luyện thi chứng chỉ TOPIK",
      description: "Mục tiêu đạt TOPIK cấp 1, 2, 3 hoặc 4 để du học/tốt nghiệp",
      icon: GraduationCap,
    },
    {
      id: "business_work",
      title: "Đi làm công ty Hàn Quốc",
      description: "Tiếng Hàn thương mại, viết email, phỏng vấn xin việc",
      icon: Briefcase,
    },
    {
      id: "kpop_kdrama",
      title: "Đu idol K-Pop & Xem phim K-Drama",
      description: "Hiểu bài hát, livestream của idol và xem phim không cần sub",
      icon: Tv,
    },
    {
      id: "travel",
      title: "Du lịch & Trải nghiệm Hàn Quốc",
      description: "Hỏi đường, gọi món ăn, mua sắm và đi tàu điện ngầm",
      icon: Plane,
    },
  ];

  const levels = [
    {
      id: "zero_hangul",
      title: "Người mới bắt đầu (Level 0)",
      description: "Chưa từng học tiếng Hàn, muốn học bảng chữ cái Hangul từ con số 0",
      badge: "Đề xuất cho bạn",
    },
    {
      id: "know_hangul",
      title: "Đã biết đọc bảng chữ cái Hangul",
      description: "Biết mặt chữ nhưng chưa thuộc từ vựng và chưa ghép câu được",
      badge: "Sơ cấp 1",
    },
    {
      id: "beginner_topik1",
      title: "Đã học một chút ngữ pháp cơ bản",
      description: "Đã biết chia đuôi -아/어요, muốn tích lũy vốn từ và nghe nói",
      badge: "Sơ cấp 2",
    },
    {
      id: "intermediate_topik2",
      title: "Trung cấp (TOPIK 3-4)",
      description: "Muốn nâng cao phản xạ, ngữ pháp phức tạp và luyện thi chuyên sâu",
      badge: "Trung cấp",
    },
  ];

  const timeCommitments = [
    {
      minutes: 10,
      label: "10 phút / ngày",
      desc: "Thảnh thơi • Học nhẹ nhàng duy trì thói quen",
    },
    {
      minutes: 15,
      label: "15 phút / ngày",
      desc: "Đều đặn • Tốc độ lý tưởng để nhớ lâu (Khuyên dùng)",
      popular: true,
    },
    {
      minutes: 20,
      label: "20 phút / ngày",
      desc: "Chăm chỉ • Tiến bộ rõ rệt sau 2 tuần",
    },
    {
      minutes: 30,
      label: "30 phút / ngày",
      desc: "Cấp tốc • Dành cho người sắp thi hoặc đi Hàn",
    },
  ];

  const topics = [
    { id: "food", name: "Ẩm thực & Món ăn Hàn", icon: "🍜" },
    { id: "travel", name: "Du lịch & Khám phá", icon: "✈️" },
    { id: "kpop", name: "K-Pop & Âm nhạc", icon: "🎵" },
    { id: "kdrama", name: "Phim ảnh & Gameshow", icon: "🎬" },
    { id: "shopping", name: "Mua sắm & Thời trang", icon: "🛍️" },
    { id: "school", name: "Trường học & Du học", icon: "🏫" },
    { id: "business", name: "Công sở & Kinh doanh", icon: "💼" },
    { id: "dating", name: "Hẹn hò & Tình cảm", icon: "💖" },
    { id: "slang", name: "Tiếng lóng giới trẻ Hàn", icon: "🔥" },
  ];

  const toggleTopic = (id: string) => {
    if (selectedTopics.includes(id)) {
      if (selectedTopics.length > 1) {
        setSelectedTopics(selectedTopics.filter((t) => t !== id));
      }
    } else {
      setSelectedTopics([...selectedTopics, id]);
    }
  };

  const handleFinish = () => {
    completeOnboarding({
      goal,
      level,
      dailyMinutes,
      topics: selectedTopics,
    });
    toast.success("Lộ trình của bạn đã được thiết lập thành công!");
    router.push("/dashboard");
  };

  return (
    <div className="w-full max-w-2xl mx-auto py-8 px-4 sm:px-6">
      {/* Progress Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground mb-2">
          <span>Bước {step} / 4</span>
          <span>{step * 25}% hoàn tất</span>
        </div>
        <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 transition-all duration-300"
            style={{ width: `${step * 25}%` }}
          />
        </div>
      </div>

      {/* Step 1: Goal */}
      {step === 1 && (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
              Mục tiêu học tiếng Hàn của bạn là gì?
            </h2>
            <p className="text-sm text-muted-foreground">
              HanGo sẽ tối ưu hóa danh sách từ vựng và bài giảng xoay quanh mục tiêu này
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {goals.map((item) => {
              const Icon = item.icon;
              const isSelected = goal === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setGoal(item.id)}
                  className={`flex items-start gap-4 p-4 rounded-2xl border text-left transition-all ${
                    isSelected
                      ? "border-primary bg-primary/5 ring-2 ring-primary/20 shadow-sm"
                      : "border-border bg-card hover:border-primary/40 hover:bg-secondary/40"
                  }`}
                >
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                      isSelected ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-sm text-foreground">{item.title}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
                  </div>
                  {isSelected && <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-1" />}
                </button>
              );
            })}
          </div>

          <div className="pt-4 flex justify-end">
            <Button variant="premium" size="lg" onClick={() => setStep(2)} className="gap-2">
              <span>Tiếp tục</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Step 2: Level */}
      {step === 2 && (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
              Trình độ tiếng Hàn hiện tại của bạn?
            </h2>
            <p className="text-sm text-muted-foreground">
              Đừng lo, dù bạn chưa biết chữ nào hay đã có nền tảng, HanGo đều có lộ trình vừa vặn
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {levels.map((item) => {
              const isSelected = level === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setLevel(item.id)}
                  className={`flex items-start gap-4 p-4 rounded-2xl border text-left transition-all ${
                    isSelected
                      ? "border-primary bg-primary/5 ring-2 ring-primary/20 shadow-sm"
                      : "border-border bg-card hover:border-primary/40 hover:bg-secondary/40"
                  }`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-sm text-foreground">{item.title}</h3>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-secondary text-primary">
                        {item.badge}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                  {isSelected && <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-1" />}
                </button>
              );
            })}
          </div>

          <div className="pt-4 flex items-center justify-between">
            <Button variant="outline" onClick={() => setStep(1)} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Quay lại</span>
            </Button>
            <Button variant="premium" size="lg" onClick={() => setStep(3)} className="gap-2">
              <span>Tiếp tục</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Daily Time Commitment */}
      {step === 3 && (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
              Bạn muốn dành bao nhiêu thời gian mỗi ngày?
            </h2>
            <p className="text-sm text-muted-foreground">
              Học 15 phút mỗi ngày hiệu quả hơn 3 tiếng dồn vào cuối tuần!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {timeCommitments.map((item) => {
              const isSelected = dailyMinutes === item.minutes;
              return (
                <button
                  key={item.minutes}
                  onClick={() => setDailyMinutes(item.minutes)}
                  className={`p-5 rounded-2xl border text-left transition-all relative ${
                    isSelected
                      ? "border-primary bg-primary/5 ring-2 ring-primary/20 shadow-sm"
                      : "border-border bg-card hover:border-primary/40 hover:bg-secondary/40"
                  }`}
                >
                  {item.popular && (
                    <span className="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400">
                      Hiệu quả nhất
                    </span>
                  )}
                  <Clock className={`w-6 h-6 mb-2 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                  <h3 className="font-bold text-base text-foreground">{item.label}</h3>
                  <p className="text-xs text-muted-foreground mt-1 leading-snug">{item.desc}</p>
                </button>
              );
            })}
          </div>

          <div className="pt-4 flex items-center justify-between">
            <Button variant="outline" onClick={() => setStep(2)} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Quay lại</span>
            </Button>
            <Button variant="premium" size="lg" onClick={() => setStep(4)} className="gap-2">
              <span>Tiếp tục</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Step 4: Topics */}
      {step === 4 && (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
              Chọn chủ đề bạn quan tâm nhất
            </h2>
            <p className="text-sm text-muted-foreground">
              Chọn ít nhất 1 chủ đề để gợi ý bài đọc và hội thoại phù hợp
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {topics.map((t) => {
              const isSelected = selectedTopics.includes(t.id);
              return (
                <button
                  key={t.id}
                  onClick={() => toggleTopic(t.id)}
                  className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-2 ${
                    isSelected
                      ? "border-primary bg-primary/10 ring-2 ring-primary/25 shadow-xs"
                      : "border-border bg-card hover:border-primary/30"
                  }`}
                >
                  <span className="text-2xl">{t.icon}</span>
                  <span className="font-bold text-xs text-foreground">{t.name}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-4 flex items-center justify-between">
            <Button variant="outline" onClick={() => setStep(3)} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Quay lại</span>
            </Button>
            <Button variant="premium" size="lg" onClick={handleFinish} className="gap-2 shadow-lg shadow-indigo-500/25">
              <Sparkles className="w-4 h-4" />
              <span>Bắt đầu học ngay</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
