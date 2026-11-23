import { Metadata } from "next";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { TopNavbar } from "@/components/layout/top-navbar";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { GamificationHUD } from "@/components/dashboard/gamification-hud";
import { ContinueLearningCTA } from "@/components/dashboard/continue-learning-cta";
import { ActivityHeatmap } from "@/components/dashboard/activity-heatmap";
import { XPChart } from "@/components/dashboard/xp-chart";
import { SRSReviewWidget } from "@/components/dashboard/srs-review-widget";
import { RecommendedLessons } from "@/components/dashboard/recommended-lessons";
import { AchievementsCard } from "@/components/dashboard/achievements-card";
import { LeaderboardCard } from "@/components/dashboard/leaderboard-card";

export const metadata: Metadata = {
  title: "Bảng điều khiển học tập",
  description: "Theo dõi tiến độ học tiếng Hàn, streak, XP và thẻ từ vựng cần ôn hôm nay.",
};

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-slate-50/50 dark:bg-slate-950/40">
      <AppSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopNavbar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6 pb-24 lg:pb-12">
          {/* Header & HUD */}
          <GamificationHUD />

          {/* 2-Column Responsive Dashboard Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Main Learning Stream (Col 8) */}
            <div className="lg:col-span-8 space-y-6">
              <ContinueLearningCTA />
              <ActivityHeatmap />
              <XPChart />
              <RecommendedLessons />
            </div>

            {/* Sidebar Widgets Stream (Col 4) */}
            <div className="lg:col-span-4 space-y-6">
              <SRSReviewWidget />
              <AchievementsCard />
              <LeaderboardCard />
            </div>
          </div>
        </main>

        <MobileBottomNav />
      </div>
    </div>
  );
}
