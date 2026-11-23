"use client";

import React, { useState } from "react";
import {
  Users,
  MessageSquare,
  Heart,
  Share2,
  Send,
  Flag,
  Sparkles,
  Search,
  Filter,
} from "lucide-react";
import { toast } from "sonner";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { TopNavbar } from "@/components/layout/top-navbar";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { Button } from "@/components/ui/button";
import { useHanGoStore } from "@/lib/store";

interface Post {
  id: string;
  author: string;
  avatar: string;
  time: string;
  category: "Hỏi đáp" | "Tiến độ" | "Kinh nghiệm TOPIK" | "Thảo luận";
  title: string;
  content: string;
  likes: number;
  comments: number;
  isLiked?: boolean;
}

export default function CommunityPage() {
  const { user } = useHanGoStore();
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "p1",
      author: "Lê Hoàng Anh",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
      time: "2 giờ trước",
      category: "Kinh nghiệm TOPIK",
      title: "Kinh nghiệm đạt 84 điểm Viết TOPIK II (Câu 53 và 54) của mình",
      content:
        "Chào mọi người, bí quyết lớn nhất của mình khi viết câu 53 là nắm chắc các cấu trúc tăng trưởng (증가하다, 급증하다) và giảm (감소하다). Đừng dùng từ quá phức tạp, quan trọng là không sai chính tả và dùng đúng tiểu từ!",
      likes: 42,
      comments: 15,
      isLiked: false,
    },
    {
      id: "p2",
      author: "Trần Bảo Ngọc",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      time: "5 giờ trước",
      category: "Hỏi đáp",
      title: "Cách phân biệt -아/어야 하다 và -아/어야 되다 trong thực tế?",
      content:
        "Mình thấy sách bảo hai cấu trúc này đều là 'Phải làm gì', nhưng người Hàn khi nói chuyện hay dùng '되다' hơn đúng không ạ?",
      likes: 18,
      comments: 9,
      isLiked: true,
    },
    {
      id: "p3",
      author: "Nguyễn Minh Quân (Bạn)",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      time: "1 ngày trước",
      category: "Tiến độ",
      title: "Chạm mốc Streak 14 ngày trên HanGo! 🔥",
      content:
        "Cảm giác học mỗi ngày 15 phút với Flashcard SRS nhàn hơn nhiều so với việc ngồi cày một đống từ vựng một lúc. Cố gắng giữ ngọn lửa streak đến 30 ngày!",
      likes: 56,
      comments: 7,
      isLiked: false,
    },
  ]);

  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newCategory, setNewCategory] = useState<Post["category"]>("Hỏi đáp");

  const handleLike = (id: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        const isLiked = !p.isLiked;
        return {
          ...p,
          isLiked,
          likes: isLiked ? p.likes + 1 : p.likes - 1,
        };
      })
    );
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newPost: Post = {
      id: `p_${Date.now()}`,
      author: `${user.fullName} (Bạn)`,
      avatar: user.avatarUrl,
      time: "Vừa xong",
      category: newCategory,
      title: newTitle,
      content: newContent,
      likes: 1,
      comments: 0,
      isLiked: true,
    };

    setPosts([newPost, ...posts]);
    setNewTitle("");
    setNewContent("");
    toast.success("Đăng bài viết lên cộng đồng thành công!");
  };

  return (
    <div className="flex min-h-screen bg-slate-50/50 dark:bg-slate-950/40">
      <AppSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopNavbar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto w-full pb-24">
          <div className="mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold mb-1">
              <Users className="w-3.5 h-3.5" />
              <span>Cộng đồng 45,000+ học viên HanGo</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground">
              Diễn đàn & Chia sẻ Tiến độ
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              Hỏi đáp thắc mắc ngữ pháp, chia sẻ mẹo học tập và lan tỏa động lực cùng nhau
            </p>
          </div>

          {/* Create Post Box */}
          <form
            onSubmit={handleCreatePost}
            className="rounded-3xl border border-border/80 bg-card p-5 sm:p-6 shadow-sm space-y-3 mb-6"
          >
            <h3 className="font-bold text-sm text-foreground">Tạo bài viết thảo luận mới</h3>

            <input
              type="text"
              placeholder="Tiêu đề câu hỏi hoặc chia sẻ của bạn..."
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full h-11 px-4 rounded-xl border border-input text-sm font-semibold bg-background"
            />

            <textarea
              rows={3}
              placeholder="Nội dung chi tiết (Ví dụ: Câu này dịch thế nào cho chuẩn...)"
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              className="w-full p-4 rounded-xl border border-input text-sm font-medium bg-background"
            />

            <div className="flex items-center justify-between pt-2">
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as any)}
                className="h-9 px-3 rounded-lg border border-input text-xs font-semibold bg-background"
              >
                <option value="Hỏi đáp">Chủ đề: Hỏi đáp</option>
                <option value="Tiến độ">Chủ đề: Khoe tiến độ / Streak</option>
                <option value="Kinh nghiệm TOPIK">Chủ đề: Kinh nghiệm TOPIK</option>
                <option value="Thảo luận">Chủ đề: Thảo luận chung</option>
              </select>

              <Button type="submit" variant="premium" size="sm" className="gap-2">
                <Send className="w-3.5 h-3.5" />
                <span>Đăng bài</span>
              </Button>
            </div>
          </form>

          {/* Posts Feed */}
          <div className="space-y-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="rounded-3xl border border-border/80 bg-card p-6 shadow-sm space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold flex items-center justify-center text-sm shadow-2xs">
                      {post.author.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-foreground">{post.author}</h4>
                      <p className="text-[11px] text-muted-foreground">{post.time}</p>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-secondary text-primary">
                    {post.category}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-bold text-base text-foreground">{post.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {post.content}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-border/60 text-xs">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center gap-1.5 font-bold transition-colors ${
                        post.isLiked
                          ? "text-rose-500"
                          : "text-muted-foreground hover:text-rose-500"
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${post.isLiked ? "fill-rose-500" : ""}`} />
                      <span>{post.likes}</span>
                    </button>

                    <button className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground font-semibold">
                      <MessageSquare className="w-4 h-4" />
                      <span>{post.comments} bình luận</span>
                    </button>
                  </div>

                  <button
                    onClick={() => toast.info("Đã gửi báo cáo vi phạm tới đội ngũ kiểm duyệt.")}
                    className="text-muted-foreground hover:text-destructive text-[11px] flex items-center gap-1"
                  >
                    <Flag className="w-3 h-3" />
                    <span>Báo cáo</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>

        <MobileBottomNav />
      </div>
    </div>
  );
}
