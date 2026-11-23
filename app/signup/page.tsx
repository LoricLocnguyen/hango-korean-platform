import { Metadata } from "next";
import { SignupForm } from "@/components/auth/signup-form";

export const metadata: Metadata = {
  title: "Đăng ký tài khoản",
  description: "Tạo tài khoản học tiếng Hàn HanGo miễn phí, bắt đầu học ngay hôm nay.",
};

export default function SignupPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 sm:p-6 bg-slate-50/50 dark:bg-slate-950/40">
      <div className="w-full max-w-md bg-card border border-border/80 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-900/5 my-8">
        <SignupForm />
      </div>
    </div>
  );
}
