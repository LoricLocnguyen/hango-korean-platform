import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Điều khoản sử dụng",
  description: "Điều khoản sử dụng dịch vụ học tiếng Hàn HanGo.",
};

export default function TermsPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50/50 dark:bg-slate-950/40 py-10 px-4 sm:px-6">
      <div className="mx-auto w-full max-w-3xl bg-card border border-border/80 rounded-3xl p-6 sm:p-10 shadow-xl shadow-slate-900/5 prose prose-slate dark:prose-invert max-w-none">
        <h1>Điều khoản sử dụng</h1>
        <p><em>Cập nhật lần cuối: 23/11/2026</em></p>

        <h2>1. Giới thiệu</h2>
        <p>HanGo là nền tảng học tiếng Hàn trực tuyến dành cho người Việt, cung cấp bài học theo cấp độ, hệ thống ôn tập ngắt quãng (SRS), bài luyện nghe — nói và cộng đồng học tập. Bằng việc tạo tài khoản và sử dụng HanGo, bạn đồng ý với các điều khoản dưới đây.</p>

        <h2>2. Tài khoản</h2>
        <ul>
          <li>Bạn chịu trách nhiệm bảo mật thông tin đăng nhập của mình.</li>
          <li>Thông tin đăng ký cần chính xác; mỗi người chỉ nên sử dụng một tài khoản cá nhân.</li>
          <li>Bạn có thể đăng nhập bằng email/mật khẩu hoặc bằng tài khoản Google.</li>
        </ul>

        <h2>3. Quy tắc sử dụng</h2>
        <ul>
          <li>Không đăng nội dung vi phạm pháp luật, quấy rối, spam hoặc xâm phạm quyền của người khác trong mục Cộng đồng.</li>
          <li>Không cố gắng truy cập trái phép vào hệ thống hoặc dữ liệu của người dùng khác.</li>
          <li>Nội dung bài học thuộc quyền sở hữu của HanGo và chỉ phục vụ mục đích học tập cá nhân.</li>
        </ul>

        <h2>4. Dịch vụ</h2>
        <p>HanGo hiện được cung cấp miễn phí và "theo hiện trạng". Chúng tôi nỗ lực duy trì dịch vụ ổn định nhưng không cam kết nội dung học tập thay thế cho các chương trình đào tạo chính quy hay đảm bảo kết quả thi cử cụ thể.</p>

        <h2>5. Thay đổi điều khoản</h2>
        <p>HanGo có thể cập nhật điều khoản này theo thời gian. Phiên bản mới sẽ được đăng tại trang này và có hiệu lực ngay khi đăng tải.</p>

        <h2>6. Liên hệ</h2>
        <p>Mọi thắc mắc về điều khoản sử dụng, vui lòng liên hệ: <strong>pinkblack0905@gmail.com</strong></p>
      </div>
    </div>
  );
}
