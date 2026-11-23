import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chính sách bảo mật",
  description: "Chính sách bảo mật của HanGo — cách chúng tôi thu thập, sử dụng và bảo vệ dữ liệu của bạn.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50/50 dark:bg-slate-950/40 py-10 px-4 sm:px-6">
      <div className="mx-auto w-full max-w-3xl bg-card border border-border/80 rounded-3xl p-6 sm:p-10 shadow-xl shadow-slate-900/5 prose prose-slate dark:prose-invert max-w-none">
        <h1>Chính sách bảo mật</h1>
        <p><em>Cập nhật lần cuối: 23/11/2026</em></p>

        <h2>1. Dữ liệu chúng tôi thu thập</h2>
        <ul>
          <li><strong>Thông tin tài khoản:</strong> địa chỉ email, họ tên và ảnh đại diện (nếu có) khi bạn đăng ký bằng email hoặc đăng nhập bằng Google.</li>
          <li><strong>Dữ liệu học tập:</strong> tiến độ bài học, điểm kinh nghiệm (XP), lịch sử ôn tập từ vựng và cài đặt cá nhân trong ứng dụng.</li>
          <li><strong>Nội dung cộng đồng:</strong> bài viết và bình luận bạn chủ động đăng trong mục Cộng đồng.</li>
        </ul>

        <h2>2. Mục đích sử dụng</h2>
        <p>Dữ liệu chỉ được dùng để vận hành tài khoản của bạn, đồng bộ tiến độ học tập giữa các thiết bị, hiển thị bảng xếp hạng và cải thiện chất lượng nội dung học. Chúng tôi <strong>không bán</strong> dữ liệu cá nhân của bạn cho bất kỳ bên thứ ba nào.</p>

        <h2>3. Đăng nhập bằng Google</h2>
        <p>Khi bạn chọn đăng nhập bằng Google, HanGo chỉ nhận từ Google các thông tin cơ bản gồm địa chỉ email, họ tên và ảnh đại diện để tạo tài khoản cho bạn. HanGo không truy cập hộp thư, danh bạ hay bất kỳ dữ liệu Google nào khác của bạn.</p>

        <h2>4. Lưu trữ và bảo mật</h2>
        <p>Dữ liệu được lưu trữ trên nền tảng Supabase với cơ chế phân quyền theo từng người dùng (Row Level Security): mỗi người chỉ truy cập được dữ liệu của chính mình, ngoại trừ thông tin hiển thị công khai như tên, XP trên bảng xếp hạng và bài viết cộng đồng do bạn đăng.</p>

        <h2>5. Quyền của bạn</h2>
        <ul>
          <li>Bạn có thể chỉnh sửa thông tin cá nhân bất cứ lúc nào trong mục Cài đặt.</li>
          <li>Bạn có quyền yêu cầu xoá toàn bộ tài khoản và dữ liệu liên quan bằng cách liên hệ email hỗ trợ bên dưới; yêu cầu sẽ được xử lý trong vòng 30 ngày.</li>
        </ul>

        <h2>6. Liên hệ</h2>
        <p>Mọi thắc mắc về chính sách bảo mật, vui lòng liên hệ: <strong>pinkblack0905@gmail.com</strong></p>
      </div>
    </div>
  );
}
