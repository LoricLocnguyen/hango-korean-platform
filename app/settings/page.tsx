"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  User,
  Lock,
  Clock,
  Shield,
  Trash2,
  Save,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { useHanGoStore } from "@/lib/store";
import {
  updateProfileSchema,
  changePasswordSchema,
  UpdateProfileInput,
  ChangePasswordInput,
} from "@/lib/validations/auth";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { TopNavbar } from "@/components/layout/top-navbar";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";

export default function SettingsPage() {
  const { user, updateProfile, logout } = useHanGoStore();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Profile Form
  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    formState: { errors: profileErrors, isSubmitting: isSubmittingProfile },
  } = useForm<UpdateProfileInput>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      fullName: user.fullName,
      email: user.email,
      dailyGoalMinutes: user.dailyGoalMinutes,
    },
  });

  // Password Form
  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    reset: resetPasswordForm,
    formState: { errors: passwordErrors, isSubmitting: isSubmittingPassword },
  } = useForm<ChangePasswordInput>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const onProfileSubmit = async (data: UpdateProfileInput) => {
    await new Promise((r) => setTimeout(r, 600));
    updateProfile(data.fullName, data.email, data.dailyGoalMinutes);
    toast.success("Cập nhật thông tin cá nhân thành công!");
  };

  const onPasswordSubmit = async (data: ChangePasswordInput) => {
    await new Promise((r) => setTimeout(r, 800));
    resetPasswordForm();
    toast.success("Đổi mật khẩu thành công! Hãy đăng nhập lại bằng mật khẩu mới vào lần tới.");
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    await new Promise((r) => setTimeout(r, 1000));
    toast.info("Tài khoản của bạn đã được xóa thành công khỏi hệ thống HanGo.");
    logout();
    window.location.href = "/";
  };

  return (
    <div className="flex min-h-screen bg-slate-50/50 dark:bg-slate-950/40">
      <AppSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopNavbar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto w-full pb-24">
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground">
              Cài đặt tài khoản
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Quản lý thông tin cá nhân, bảo mật mật khẩu và mục tiêu học tập hàng ngày
            </p>
          </div>

          <div className="space-y-8">
            {/* Section 1: Thông tin cá nhân */}
            <div className="rounded-3xl border border-border/80 bg-card p-6 shadow-sm">
              <div className="flex items-center gap-3 pb-4 border-b border-border/60 mb-6">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-bold text-base text-foreground">Hồ sơ cá nhân</h2>
                  <p className="text-xs text-muted-foreground">Tên hiển thị và email liên kết</p>
                </div>
              </div>

              <form onSubmit={handleSubmitProfile(onProfileSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-foreground">Họ và tên</label>
                    <Input
                      type="text"
                      error={!!profileErrors.fullName}
                      {...registerProfile("fullName")}
                    />
                    {profileErrors.fullName && (
                      <p className="text-xs text-destructive">{profileErrors.fullName.message}</p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-foreground">Email</label>
                    <Input
                      type="email"
                      error={!!profileErrors.email}
                      {...registerProfile("email")}
                    />
                    {profileErrors.email && (
                      <p className="text-xs text-destructive">{profileErrors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-1.5 pt-2">
                  <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-primary" />
                    <span>Mục tiêu học mỗi ngày (phút)</span>
                  </label>
                  <select
                    className="flex h-11 w-full rounded-xl border border-input bg-background/50 px-3.5 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    {...registerProfile("dailyGoalMinutes", { valueAsNumber: true })}
                  >
                    <option value={10}>10 phút / ngày (Thảnh thơi)</option>
                    <option value={15}>15 phút / ngày (Đều đặn - Khuyên dùng)</option>
                    <option value={20}>20 phút / ngày (Chăm chỉ)</option>
                    <option value={30}>30 phút / ngày (Cấp tốc)</option>
                    <option value={45}>45 phút / ngày (Chuyên sâu)</option>
                  </select>
                </div>

                <div className="pt-2 flex justify-end">
                  <Button
                    type="submit"
                    variant="premium"
                    size="sm"
                    disabled={isSubmittingProfile}
                    className="gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Lưu thay đổi</span>
                  </Button>
                </div>
              </form>
            </div>

            {/* Section 2: Đổi mật khẩu */}
            <div className="rounded-3xl border border-border/80 bg-card p-6 shadow-sm">
              <div className="flex items-center gap-3 pb-4 border-b border-border/60 mb-6">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-bold text-base text-foreground">Bảo mật mật khẩu</h2>
                  <p className="text-xs text-muted-foreground">Thay đổi mật khẩu đăng nhập an toàn</p>
                </div>
              </div>

              <form onSubmit={handleSubmitPassword(onPasswordSubmit)} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">Mật khẩu hiện tại</label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    error={!!passwordErrors.currentPassword}
                    {...registerPassword("currentPassword")}
                  />
                  {passwordErrors.currentPassword && (
                    <p className="text-xs text-destructive">{passwordErrors.currentPassword.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-foreground">Mật khẩu mới</label>
                    <Input
                      type="password"
                      placeholder="Ít nhất 8 ký tự, chữ hoa, số"
                      error={!!passwordErrors.newPassword}
                      {...registerPassword("newPassword")}
                    />
                    {passwordErrors.newPassword && (
                      <p className="text-xs text-destructive">{passwordErrors.newPassword.message}</p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-foreground">Nhập lại mật khẩu mới</label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      error={!!passwordErrors.confirmNewPassword}
                      {...registerPassword("confirmNewPassword")}
                    />
                    {passwordErrors.confirmNewPassword && (
                      <p className="text-xs text-destructive">{passwordErrors.confirmNewPassword.message}</p>
                    )}
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <Button
                    type="submit"
                    variant="outline"
                    size="sm"
                    disabled={isSubmittingPassword}
                    className="gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Cập nhật mật khẩu</span>
                  </Button>
                </div>
              </form>
            </div>

            {/* Section 3: Vùng nguy hiểm (Xóa tài khoản) */}
            <div className="rounded-3xl border border-destructive/30 bg-destructive/5 p-6 shadow-sm">
              <div className="flex items-center gap-3 pb-4 border-b border-destructive/20 mb-4">
                <div className="w-10 h-10 rounded-xl bg-destructive/10 text-destructive flex items-center justify-center">
                  <Trash2 className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-bold text-base text-destructive">Xóa tài khoản</h2>
                  <p className="text-xs text-muted-foreground">Hành động này không thể hoàn tác</p>
                </div>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                Khi xóa tài khoản, toàn bộ dữ liệu học tập, số ngày streak ({user.currentStreak} ngày), tổng điểm XP ({user.totalXp} XP) và thẻ từ vựng đã ôn tập sẽ bị xóa vĩnh viễn khỏi hệ thống.
              </p>

              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => setIsDeleteDialogOpen(true)}
                className="gap-2"
              >
                <Trash2 className="w-4 h-4" />
                <span>Yêu cầu xóa tài khoản</span>
              </Button>
            </div>
          </div>
        </main>

        <MobileBottomNav />

        {/* Delete Account Confirmation Dialog */}
        <ConfirmDialog
          isOpen={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          onConfirm={handleDeleteAccount}
          title="Xác nhận xóa tài khoản?"
          description="Bạn có chắc chắn muốn xóa vĩnh viễn tài khoản HanGo này không? Mọi tiến độ học tập và thành tích sẽ bị xóa hoàn toàn và không thể khôi phục."
          confirmText="Xác nhận xóa vĩnh viễn"
          isDestructive={true}
          isLoading={isDeleting}
        />
      </div>
    </div>
  );
}
