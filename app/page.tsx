import { Metadata } from "next";
import { HeroSection } from "@/components/landing/hero";
import { FeaturesSection } from "@/components/landing/features";
import { RoadmapSection } from "@/components/landing/roadmap";
import { StatsCounterSection } from "@/components/landing/stats-counter";
import { TestimonialsSection } from "@/components/landing/testimonials";
import { PricingSection } from "@/components/landing/pricing";
import { FAQSection } from "@/components/landing/faq";

export const metadata: Metadata = {
  title: "HanGo - Học tiếng Hàn thông minh cho người Việt | SRS & Chuẩn TOPIK",
  description:
    "Nền tảng học tiếng Hàn trực tuyến cao cấp dành cho người Việt. Kết hợp Spaced Repetition (SRS), mẹo nhớ từ gốc Hán - Hàn và lộ trình chuẩn TOPIK từ sơ cấp đến trung cấp.",
  keywords: [
    "học tiếng hàn",
    "tiếng hàn cho người việt",
    "bảng chữ cái hangul",
    "ôn thi topik",
    "spaced repetition",
    "từ vựng hán hàn",
    "hango",
  ],
  openGraph: {
    title: "HanGo - Chinh phục tiếng Hàn theo cách thông minh hơn",
    description:
      "Học tiếng Hàn với thuật toán ghi nhớ ngắt quãng SRS, luyện phát âm chuẩn Seoul và phương pháp từ vựng Hán - Hàn độc quyền.",
    url: "https://hango-korean-platform.vercel.app",
    siteName: "HanGo EdTech",
    images: [
      {
        url: "https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=1200&auto=format&fit=crop&q=80",
        width: 1200,
        height: 630,
        alt: "HanGo Korean Learning Platform",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HanGo - Nền tảng học tiếng Hàn thông minh",
    description:
      "Tối ưu hóa khả năng ghi nhớ tiếng Hàn với Spaced Repetition và lộ trình chuẩn TOPIK cho người Việt.",
    images: ["https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=1200&auto=format&fit=crop&q=80"],
  },
};

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <RoadmapSection />
      <StatsCounterSection />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
    </div>
  );
}
