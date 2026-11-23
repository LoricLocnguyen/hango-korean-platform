import { Metadata } from "next";
import { OnboardingWizard } from "@/components/auth/onboarding-wizard";

export const metadata: Metadata = {
  title: "Khảo sát lộ trình học tập",
  description: "Thiết lập mục tiêu và cá nhân hóa lộ trình tiếng Hàn của bạn.",
};

export default function OnboardingPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 sm:p-6 bg-slate-50/50 dark:bg-slate-950/40">
      <div className="w-full max-w-2xl bg-card border border-border/80 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-900/5 my-8">
        <OnboardingWizard />
      </div>
    </div>
  );
}
