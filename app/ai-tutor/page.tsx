"use client";

import React, { useState } from "react";
import {
  Bot,
  Send,
  Sparkles,
  RotateCcw,
  BookOpen,
  Volume2,
  HelpCircle,
  MessageSquare,
} from "lucide-react";
import { toast } from "sonner";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { TopNavbar } from "@/components/layout/top-navbar";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { Button } from "@/components/ui/button";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function AITutorPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "안녕하세요! Chào bạn, tôi là Gia sư tiếng Hàn AI HanGo. Tôi có thể giúp bạn giải thích ngữ pháp, sửa câu viết tiếng Hàn, tạo ví dụ thực tế hoặc nhập vai luyện hội thoại. Bạn muốn bắt đầu từ đâu?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const presets = [
    "Giải thích sự khác nhau giữa 은/는 và 이/가",
    "Sửa câu: '저는 어제 도서관에서 책을 사요'",
    "Đóng vai nhân viên quán cà phê ở Seoul để tôi gọi món",
    "Cho 3 ví dụ thực tế của cấu trúc -기 때문에",
  ];

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    const newMsgs: Message[] = [...messages, { role: "user", content: text }];
    setMessages(newMsgs);
    setInput("");
    setIsLoading(true);

    // Mock intelligent EdTech streaming response
    setTimeout(() => {
      let reply = "";
      if (text.includes("은/는") || text.includes("이/가")) {
        reply = `**Phân biệt 은/는 và 이/가 cực dễ nhớ:**

1. **은/는 (Tiểu từ chủ đề - Topic marker):**
   - Dùng để giới thiệu chủ đề chung hoặc so sánh/đối chiếu.
   - Trọng tâm câu nằm ở **vị ngữ** (thông tin mới phía sau).
   - *Ví dụ:* 저는 베트남 사람이에요. (Tôi là người Việt Nam - Nhấn mạnh người Việt).

2. **이/가 (Tiểu từ chủ ngữ - Subject marker):**
   - Nhấn mạnh **chính danh từ đó** thực hiện hành động, loại trừ các đối tượng khác.
   - Thường dùng khi miêu tả thời tiết, hiện tượng tự nhiên hoặc trả lời câu hỏi "Ai làm?".
   - *Ví dụ:* 비가 와요 (Trời đang mưa), 누가 왔어요? - 민수가 왔어요. (Ai đã đến? - Chính Minsoo đến).`;
      } else if (text.includes("Sửa câu") || text.includes("어제")) {
        reply = `**Phân tích và sửa câu cho bạn:**

- **Câu gốc của bạn:** "저는 어제 도서관에서 책을 사요"
- **Lỗi sai:** Từ "어제" (hôm qua) là thời gian quá khứ, nhưng đuôi câu "사요" lại chia ở thì hiện tại. Ngoài ra ở thư viện thường là mượn sách (빌리다) hoặc đọc sách (읽다), nếu mua sách thì là ở hiệu sách (서점).
- **Câu sửa chuẩn:**
  1. Nếu là mua sách: **"저는 어제 서점에서 책을 샀어요."** (Tôi đã mua sách ở hiệu sách hôm qua).
  2. Nếu là đọc sách ở thư viện: **"저는 어제 도서관에서 책을 읽었어요."**`;
      } else {
        reply = `Tôi đã nhận được yêu cầu: "${text}". Với tiếng Hàn, việc kết hợp ngữ cảnh và biến âm rất quan trọng. Bạn có muốn tôi tạo thêm các câu ví dụ đàm thoại thực tế hay bài tập trắc nghiệm ngắn về phần này không?`;
      }

      setMessages([...newMsgs, { role: "assistant", content: reply }]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex min-h-screen bg-slate-50/50 dark:bg-slate-950/40">
      <AppSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopNavbar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto w-full pb-24 flex flex-col h-[calc(100vh-4rem)]">
          {/* Header */}
          <div className="pb-4 border-b border-border/60 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-purple-500/20">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-xl font-extrabold text-foreground flex items-center gap-2">
                  <span>Gia sư AI HanGo (Korean AI Tutor)</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-600 border border-purple-500/20">
                    Pro Model
                  </span>
                </h1>
                <p className="text-xs text-muted-foreground">
                  Hỏi đáp ngữ pháp 24/7, sửa phát âm và đàm thoại nhập vai
                </p>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setMessages([
                  {
                    role: "assistant",
                    content: "Hộp thoại đã được làm mới. Tôi sẵn sàng giải đáp câu hỏi tiếp theo của bạn!",
                  },
                ])
              }
              className="text-xs gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Đoạn chat mới</span>
            </Button>
          </div>

          {/* Chat Messages Scroll */}
          <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-3 ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.role === "assistant" && (
                  <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center text-xs shrink-0 mt-1">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`p-4 rounded-2xl max-w-xl text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground font-semibold rounded-tr-xs"
                      : "bg-card border border-border/80 text-foreground rounded-tl-xs shadow-2xs"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3 justify-start items-center">
                <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center text-xs shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="p-3.5 rounded-2xl bg-card border border-border text-xs text-muted-foreground animate-pulse">
                  Gia sư AI đang soạn câu trả lời...
                </div>
              </div>
            )}
          </div>

          {/* Presets & Input Bar */}
          <div className="pt-2 border-t border-border/60 space-y-3 shrink-0">
            {/* Quick preset chips */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
              {presets.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(p)}
                  className="px-3 py-1.5 rounded-full bg-secondary hover:bg-primary/10 hover:text-primary transition-colors text-muted-foreground whitespace-nowrap text-[11px] font-semibold border border-border/60"
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Nhập câu hỏi tiếng Việt hoặc câu tiếng Hàn bạn cần sửa..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSend();
                }}
                className="flex-1 h-12 px-4 rounded-2xl border border-input bg-card text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              />
              <Button
                variant="premium"
                size="icon"
                onClick={() => handleSend()}
                disabled={isLoading || !input.trim()}
                className="h-12 w-12 rounded-2xl shrink-0"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </main>

        <MobileBottomNav />
      </div>
    </div>
  );
}
