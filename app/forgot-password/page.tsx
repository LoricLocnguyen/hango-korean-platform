import { Metadata } from "next";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";

export const metadata: Metadata = {
  title: "Quên mật khẩu",
  description: "Khôi phục mật khẩu tài khoản HanGo nhanh chóng và an toàn.",
};

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 sm:p-6 bg-slate-50/50 dark:bg-slate-950/40">
      <div className="w-full max-w-md bg-card border border-border/80 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-900/5">
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
