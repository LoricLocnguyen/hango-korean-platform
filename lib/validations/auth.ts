import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Vui lòng nhập địa chỉ email" })
    .email("Email không hợp lệ. Ví dụ: hocvien@gmail.com"),
  password: z
    .string({ required_error: "Vui lòng nhập mật khẩu" })
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  rememberMe: z.boolean().default(false).optional(),
});

export const signupSchema = z
  .object({
    fullName: z
      .string({ required_error: "Vui lòng nhập họ và tên" })
      .min(2, "Họ và tên phải có ít nhất 2 ký tự")
      .max(50, "Họ và tên không quá 50 ký tự"),
    email: z
      .string({ required_error: "Vui lòng nhập địa chỉ email" })
      .email("Email không hợp lệ. Ví dụ: hocvien@gmail.com"),
    password: z
      .string({ required_error: "Vui lòng nhập mật khẩu" })
      .min(8, "Mật khẩu phải từ 8 ký tự trở lên")
      .regex(/[A-Z]/, "Mật khẩu phải chứa ít nhất 1 chữ hoa")
      .regex(/[0-9]/, "Mật khẩu phải chứa ít nhất 1 số"),
    confirmPassword: z.string({
      required_error: "Vui lòng xác nhận lại mật khẩu",
    }),
    agreeTerms: z.literal(true, {
      errorMap: () => ({ message: "Bạn cần đồng ý với Điều khoản và Chính sách của HanGo" }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu xác nhận không trùng khớp",
    path: ["confirmPassword"],
  });

export const forgotPasswordSchema = z.object({
  email: z
    .string({ required_error: "Vui lòng nhập email để nhận liên kết đặt lại mật khẩu" })
    .email("Email không đúng định dạng"),
});

export const onboardingSchema = z.object({
  goal: z.string({ required_error: "Vui lòng chọn mục tiêu của bạn" }),
  level: z.string({ required_error: "Vui lòng chọn trình độ hiện tại" }),
  dailyMinutes: z.number().min(5, "Tối thiểu 5 phút mỗi ngày"),
  topics: z.array(z.string()).min(1, "Vui lòng chọn ít nhất 1 chủ đề bạn yêu thích"),
});

export const updateProfileSchema = z.object({
  fullName: z.string().min(2, "Họ tên phải từ 2 ký tự"),
  email: z.string().email("Email không hợp lệ"),
  dailyGoalMinutes: z.number().min(5).max(120),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(6, "Mật khẩu hiện tại không đúng"),
    newPassword: z
      .string()
      .min(8, "Mật khẩu mới phải từ 8 ký tự")
      .regex(/[A-Z]/, "Cần ít nhất 1 ký tự viết hoa")
      .regex(/[0-9]/, "Cần ít nhất 1 chữ số"),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmNewPassword"],
  });

export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type OnboardingInput = z.infer<typeof onboardingSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
