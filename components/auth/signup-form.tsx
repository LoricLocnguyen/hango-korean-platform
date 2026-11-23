"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Loader2, Sparkles, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { signupSchema, SignupInput } from "@/lib/validations/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useHanGoStore } from "@/lib/store";

export function SignupForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const login = useHanGoStore((s) => s.login);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeTerms: true,
    },
  });

  const passwordValue = watch("password") || "";
  const hasMinLength = passwordValue.length >= 8;
  const hasUppercase = /[A-Z]/.test(passwordValue);
  const hasNumber = /[0-9]/.test(passwordValue);

  const onSubmit = async (data: SignupInput) => {
    setIsLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 900));
      login(data.email, data.fullName);
      toast.success("Tạo tài khoản thành công! Bắt đầu khảo sát lộ trình.");
      router.push("/onboarding");
    } catch {
      toast.error("Đăng ký không thành công. Vui lòng thử lại!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    setIsLoading(true);
    setTimeout(() => {
      login("newuser.google@gmail.com", "Học viên Google");
      toast.success("Đăng ký thành công cùng Google!");
      router.push("/onboarding");
      setIsLoading(false);
    }, 600);
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Miễn phí 100% trọn bộ Hangul</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
          Bắt đầu hành trình tiếng Hàn
        </h1>
        <p className="text-sm text-muted-foreground">
          Học theo phương pháp Spaced Repetition khoa học nhất
        </p>
      </div>

      {/* Google Signup */}
      <Button
        type="button"
        variant="outline"
        onClick={handleGoogleSignup}
        disabled={isLoading}
        className="w-full h-12 rounded-xl border-border/80 flex items-center justify-center gap-3 font-semibold text-sm hover:bg-secondary transition-all"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path
            fill="#EA4335"
            d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"
          />
          <path
            fill="#4285F4"
            d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
          />
          <path
            fill="#FBBC05"
            d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.8s.2-2.1.4-2.8L1.9 6.3C.7 8.7 0 10.3 0 12s.7 3.3 1.9 5.7l3.7-2.9z"
          />
          <path
            fill="#34A853"
            d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2-6.4-4.8L1.9 16.4C3.7 20.4 7.5 23 12 23z"
          />
        </svg>
        <span>Đăng ký nhanh bằng Google</span>
      </Button>

      {/* Divider */}
      <div className="relative flex items-center justify-center">
        <div className="w-full border-t border-border/80" />
        <span className="absolute bg-background px-3 text-xs text-muted-foreground uppercase font-semibold">
          Hoặc đăng ký bằng email
        </span>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Full Name */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-foreground">
            Họ và tên của bạn
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-muted-foreground absolute left-3.5 top-3.5 pointer-events-none" />
            <Input
              type="text"
              placeholder="Nguyễn Văn A"
              className="pl-10"
              error={!!errors.fullName}
              {...register("fullName")}
            />
          </div>
          {errors.fullName && (
            <p className="text-xs text-destructive font-medium">
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-foreground">
            Địa chỉ Email
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-muted-foreground absolute left-3.5 top-3.5 pointer-events-none" />
            <Input
              type="email"
              placeholder="hocvien@gmail.com"
              className="pl-10"
              error={!!errors.email}
              {...register("email")}
            />
          </div>
          {errors.email && (
            <p className="text-xs text-destructive font-medium">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-foreground">
            Mật khẩu
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-muted-foreground absolute left-3.5 top-3.5 pointer-events-none" />
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Tối thiểu 8 ký tự, chữ hoa, số"
              className="pl-10 pr-10"
              error={!!errors.password}
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-3.5 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {/* Password strength indicators */}
          {passwordValue && (
            <div className="grid grid-cols-3 gap-2 pt-1">
              <span className={`text-[10px] flex items-center gap-1 ${hasMinLength ? "text-emerald-500 font-semibold" : "text-muted-foreground"}`}>
                <CheckCircle2 className="w-3 h-3" /> 8+ ký tự
              </span>
              <span className={`text-[10px] flex items-center gap-1 ${hasUppercase ? "text-emerald-500 font-semibold" : "text-muted-foreground"}`}>
                <CheckCircle2 className="w-3 h-3" /> 1 chữ hoa
              </span>
              <span className={`text-[10px] flex items-center gap-1 ${hasNumber ? "text-emerald-500 font-semibold" : "text-muted-foreground"}`}>
                <CheckCircle2 className="w-3 h-3" /> 1 chữ số
              </span>
            </div>
          )}

          {errors.password && (
            <p className="text-xs text-destructive font-medium">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-foreground">
            Nhập lại mật khẩu
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-muted-foreground absolute left-3.5 top-3.5 pointer-events-none" />
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Nhập lại mật khẩu trên"
              className="pl-10"
              error={!!errors.confirmPassword}
              {...register("confirmPassword")}
            />
          </div>
          {errors.confirmPassword && (
            <p className="text-xs text-destructive font-medium">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Terms agreement */}
        <div className="pt-2">
          <div className="flex items-start space-x-2">
            <input
              type="checkbox"
              id="agreeTerms"
              className="rounded border-border text-primary focus:ring-primary w-4 h-4 mt-0.5"
              {...register("agreeTerms")}
            />
            <label htmlFor="agreeTerms" className="text-xs text-muted-foreground leading-snug cursor-pointer select-none">
              Tôi đồng ý với{" "}
              <span className="text-primary hover:underline">Điều khoản dịch vụ</span> và{" "}
              <span className="text-primary hover:underline">Chính sách quyền riêng tư</span> của HanGo.
            </label>
          </div>
          {errors.agreeTerms && (
            <p className="text-xs text-destructive font-medium mt-1">
              {errors.agreeTerms.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="premium"
          size="lg"
          disabled={isLoading}
          className="w-full gap-2 shadow-md shadow-indigo-500/20 mt-3"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Đang thiết lập tài khoản...</span>
            </>
          ) : (
            <>
              <span>Tiếp tục (Khảo sát lộ trình)</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </Button>
      </form>

      {/* Footer link */}
      <div className="text-center text-xs text-muted-foreground">
        Đã có tài khoản HanGo?{" "}
        <Link href="/login" className="font-bold text-primary hover:underline">
          Đăng nhập
        </Link>
      </div>
    </div>
  );
}
