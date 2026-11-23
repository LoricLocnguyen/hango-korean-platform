"use client";

import React, { useState } from "react";
import {
  ShieldAlert,
  BookOpen,
  Users,
  Flag,
  Sparkles,
  BarChart3,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { TopNavbar } from "@/components/layout/top-navbar";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { Button } from "@/components/ui/button";
import { fullVocabulariesData, fullGrammarData, fullLevelsData } from "@/lib/seed-data";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"stats" | "courses" | "vocab" | "grammar" | "users" | "reports">("stats");

  const [vocabList, setVocabList] = useState(fullVocabulariesData.slice(0, 10));

  const handleDeleteVocab = (id: string) => {
    setVocabList((prev) => prev.filter((v) => v.id !== id));
    toast.success("Đã xóa từ vựng khỏi hệ thống!");
  };

  return (
    <div className="flex min-h-screen bg-slate-50/50 dark:bg-slate-950/40">
      <AppSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopNavbar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full pb-24 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-semibold mb-1">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Quyền Quản trị viên tối cao (Role-Based Access)</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                Bảng điều khiển Quản trị (Admin Panel)
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                Quản lý toàn bộ khóa học, ngân hàng từ vựng, điểm ngữ pháp và duyệt báo cáo cộng đồng
              </p>
            </div>
          </div>

          {/* Admin Navigation Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs font-bold">
            {[
              { id: "stats", label: "Tổng quan & Thống kê", icon: BarChart3 },
              { id: "courses", label: "Quản lý Khóa học", icon: BookOpen },
              { id: "vocab", label: "Quản lý Từ vựng", icon: Sparkles },
              { id: "users", label: "Quản lý Học viên", icon: Users },
              { id: "reports", label: "Duyệt Báo cáo", icon: Flag },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl border transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? "bg-primary text-primary-foreground border-primary shadow-xs"
                      : "bg-card text-muted-foreground border-border hover:text-foreground"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab 1: Stats Overview */}
          {activeTab === "stats" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="p-6 rounded-3xl border border-border/80 bg-card space-y-1">
                  <p className="text-xs text-muted-foreground font-semibold">Tổng học viên</p>
                  <p className="text-3xl font-black text-foreground">45,820</p>
                  <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">+12% tháng này</p>
                </div>

                <div className="p-6 rounded-3xl border border-border/80 bg-card space-y-1">
                  <p className="text-xs text-muted-foreground font-semibold">Doanh thu Hội viên Pro</p>
                  <p className="text-3xl font-black text-foreground">284.5M đ</p>
                  <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">3,420 gói Pro</p>
                </div>

                <div className="p-6 rounded-3xl border border-border/80 bg-card space-y-1">
                  <p className="text-xs text-muted-foreground font-semibold">Kho từ vựng & Ngữ pháp</p>
                  <p className="text-3xl font-black text-foreground">3,240</p>
                  <p className="text-[10px] text-primary font-bold">100% chuẩn kiểm định</p>
                </div>

                <div className="p-6 rounded-3xl border border-border/80 bg-card space-y-1">
                  <p className="text-xs text-muted-foreground font-semibold">Báo cáo chờ xử lý</p>
                  <p className="text-3xl font-black text-rose-600 dark:text-rose-400">2</p>
                  <p className="text-[10px] text-muted-foreground">Mức an toàn cao</p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Vocab CRUD */}
          {activeTab === "vocab" && (
            <div className="rounded-3xl border border-border/80 bg-card p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-border/60">
                <h3 className="font-bold text-base text-foreground">Danh sách Từ vựng Hệ thống</h3>
                <Button
                  variant="premium"
                  size="sm"
                  onClick={() => toast.info("Mở modal thêm từ vựng mới...")}
                  className="gap-1.5 text-xs font-bold"
                >
                  <Plus className="w-4 h-4" />
                  <span>Thêm từ mới</span>
                </Button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="text-[11px] uppercase tracking-wider text-muted-foreground border-b border-border/60">
                    <tr>
                      <th className="py-3 px-3">Hangul</th>
                      <th className="py-3 px-3">Phiên âm</th>
                      <th className="py-3 px-3">Nghĩa tiếng Việt</th>
                      <th className="py-3 px-3">Gốc Hán - Hàn</th>
                      <th className="py-3 px-3">Chủ đề</th>
                      <th className="py-3 px-3 text-right">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {vocabList.map((v) => (
                      <tr key={v.id} className="hover:bg-secondary/40">
                        <td className="py-3 px-3 font-bold hangul-text text-sm text-foreground">{v.hangul}</td>
                        <td className="py-3 px-3 text-muted-foreground italic">[{v.romaja}]</td>
                        <td className="py-3 px-3 font-semibold text-foreground">{v.vietnamese}</td>
                        <td className="py-3 px-3 text-indigo-600 dark:text-indigo-400 font-bold">{v.hanjaVietnamese || "-"}</td>
                        <td className="py-3 px-3">{v.topicName}</td>
                        <td className="py-3 px-3 text-right">
                          <button
                            onClick={() => handleDeleteVocab(v.id)}
                            className="p-1 text-muted-foreground hover:text-destructive"
                            title="Xóa từ"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab 3: Courses */}
          {activeTab === "courses" && (
            <div className="rounded-3xl border border-border/80 bg-card p-6 shadow-sm space-y-4">
              <h3 className="font-bold text-base text-foreground">Quản lý Lộ trình 7 Cấp độ</h3>
              <div className="space-y-3">
                {fullLevelsData.map((lvl) => (
                  <div key={lvl.id} className="p-4 rounded-2xl border border-border flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-foreground">
                        Level {lvl.levelNumber}: {lvl.title} ({lvl.hangulTitle})
                      </h4>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {lvl.modules.length} modules • Ước tính {lvl.estimatedHours} giờ học
                      </p>
                    </div>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                      Đang phát hành
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 4: Users */}
          {activeTab === "users" && (
            <div className="rounded-3xl border border-border/80 bg-card p-6 shadow-sm text-center py-12">
              <Users className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
              <h3 className="font-bold text-base text-foreground">Danh sách 45,820 Học viên</h3>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto mt-1">
                Tất cả tài khoản học viên đều được phân quyền Role-Based và mã hóa thông tin an toàn.
              </p>
            </div>
          )}

          {/* Tab 5: Reports */}
          {activeTab === "reports" && (
            <div className="rounded-3xl border border-border/80 bg-card p-6 shadow-sm text-center py-12">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-2" />
              <h3 className="font-bold text-base text-foreground">Không có bài viết vi phạm mới</h3>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto mt-1">
                Hệ thống lọc tự động đã xử lý các spam và ngôn từ không phù hợp trên diễn đàn.
              </p>
            </div>
          )}
        </main>

        <MobileBottomNav />
      </div>
    </div>
  );
}
