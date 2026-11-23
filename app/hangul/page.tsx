"use client";

import React, { useState } from "react";
import {
  BookA,
  Volume2,
  Sparkles,
  Gamepad2,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCw,
  Layers,
  Flame,
} from "lucide-react";
import { toast } from "sonner";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { TopNavbar } from "@/components/layout/top-navbar";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { Button } from "@/components/ui/button";
import { useHanGoStore } from "@/lib/store";

interface HangulLetter {
  char: string;
  name: string;
  romaja: string;
  vietnameseSound: string;
  strokeCount: number;
  strokeGuide: string;
  exampleWord: string;
  exampleRomaja: string;
  exampleVietnamese: string;
}

export default function HangulPage() {
  const [activeTab, setActiveTab] = useState<
    "vowels" | "consonants" | "compound_vowels" | "double_consonants" | "batchim" | "minigame"
  >("vowels");

  const [selectedLetter, setSelectedLetter] = useState<HangulLetter | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const addXP = useHanGoStore((s) => s.addXP);

  // Mini-game state
  const [gameScore, setGameScore] = useState(0);
  const [gameQuestionIdx, setGameQuestionIdx] = useState(0);
  const [confusedLetters, setConfusedLetters] = useState<string[]>(["ㅓ", "ㅕ", "ㅊ"]);

  const vowels: HangulLetter[] = [
    { char: "ㅏ", name: "A", romaja: "a", vietnameseSound: "Đọc như chữ 'a' trong tiếng Việt", strokeCount: 2, strokeGuide: "1. Nét sổ dọc từ trên xuống; 2. Nét ngang ngắn từ trái sang phải ở giữa.", exampleWord: "아이", exampleRomaja: "a-i", exampleVietnamese: "Đứa bé" },
    { char: "ㅑ", name: "Ya", romaja: "ya", vietnameseSound: "Đọc như 'da' hoặc 'ia'", strokeCount: 3, strokeGuide: "1. Nét dọc dài; 2. Nét ngang trên; 3. Nét ngang dưới.", exampleWord: "야구", exampleRomaja: "ya-gu", exampleVietnamese: "Bóng chày" },
    { char: "ㅓ", name: "Ơ / O", romaja: "eo", vietnameseSound: "Mở miệng chữ 'o' phát âm chữ 'ơ'", strokeCount: 2, strokeGuide: "1. Nét ngang ngắn bên trái; 2. Nét sổ dọc dài.", exampleWord: "어머니", exampleRomaja: "eo-meo-ni", exampleVietnamese: "Mẹ" },
    { char: "ㅕ", name: "Yơ / Yo", romaja: "yeo", vietnameseSound: "Đọc như 'dơ'", strokeCount: 3, strokeGuide: "1. Nét ngang trên; 2. Nét ngang dưới; 3. Nét sổ dọc.", exampleWord: "여자", exampleRomaja: "yeo-ja", exampleVietnamese: "Phụ nữ" },
    { char: "ㅗ", name: "Ô", romaja: "o", vietnameseSound: "Tròn môi đọc như chữ 'ô'", strokeCount: 2, strokeGuide: "1. Nét sổ đứng ngắn ở trên; 2. Nét ngang dài ở dưới.", exampleWord: "오이", exampleRomaja: "o-i", exampleVietnamese: "Dưa chuột" },
    { char: "ㅛ", name: "Yô", romaja: "yo", vietnameseSound: "Đọc như 'dô'", strokeCount: 3, strokeGuide: "1. Hai nét đứng ngắn; 2. Nét ngang dài ở dưới.", exampleWord: "요리", exampleRomaja: "yo-ri", exampleVietnamese: "Nấu ăn" },
    { char: "ㅜ", name: "U", romaja: "u", vietnameseSound: "Tròn môi đọc như chữ 'u'", strokeCount: 2, strokeGuide: "1. Nét ngang dài ở trên; 2. Nét sổ đứng ngắn ở dưới.", exampleWord: "우유", exampleRomaja: "u-yu", exampleVietnamese: "Sữa tươi" },
    { char: "ㅠ", name: "Yu", romaja: "yu", vietnameseSound: "Đọc như 'du'", strokeCount: 3, strokeGuide: "1. Nét ngang dài; 2. Hai nét đứng ngắn phía dưới.", exampleWord: "유리", exampleRomaja: "yu-ri", exampleVietnamese: "Thủy tinh, kính" },
    { char: "ㅡ", name: "Ư", romaja: "eu", vietnameseSound: "Dẹt môi sang 2 bên đọc chữ 'ư'", strokeCount: 1, strokeGuide: "1. Kéo một nét ngang từ trái sang phải.", exampleWord: "음식", exampleRomaja: "eum-sik", exampleVietnamese: "Ẩm thực, món ăn" },
    { char: "ㅣ", name: "I", romaja: "i", vietnameseSound: "Đọc như chữ 'i' trong tiếng Việt", strokeCount: 1, strokeGuide: "1. Kéo một nét sổ thẳng đứng từ trên xuống.", exampleWord: "이름", exampleRomaja: "i-reum", exampleVietnamese: "Tên gọi" },
  ];

  const consonants: HangulLetter[] = [
    { char: "ㄱ", name: "Giyeok", romaja: "g / k", vietnameseSound: "Đầu câu đọc nhẹ như 'k', giữa câu đọc như 'g'", strokeCount: 1, strokeGuide: "1. Kéo ngang sang phải rồi bẻ vuông góc xuống dưới.", exampleWord: "가수", exampleRomaja: "ga-su", exampleVietnamese: "Ca sĩ" },
    { char: "ㄴ", name: "Nieun", romaja: "n", vietnameseSound: "Đọc như chữ 'n' tiếng Việt", strokeCount: 1, strokeGuide: "1. Kéo thẳng xuống rồi bẻ ngang sang phải.", exampleWord: "나무", exampleRomaja: "na-mu", exampleVietnamese: "Cái cây" },
    { char: "ㄷ", name: "Digeut", romaja: "d / t", vietnameseSound: "Đầu câu đọc như 't', giữa câu đọc như 'đ'", strokeCount: 2, strokeGuide: "1. Nét ngang trên; 2. Nét bẻ vuông góc như chữ ㄴ.", exampleWord: "다리", exampleRomaja: "da-ri", exampleVietnamese: "Cái chân / Cây cầu" },
    { char: "ㄹ", name: "Rieul", romaja: "r / l", vietnameseSound: "Đầu câu uốn lưỡi đọc 'r', cuối câu đọc 'l'", strokeCount: 3, strokeGuide: "1. Nét ㄱ; 2. Nét ngang nối; 3. Nét ㄴ.", exampleWord: "라디오", exampleRomaja: "ra-di-o", exampleVietnamese: "Máy radio" },
    { char: "ㅁ", name: "Mieum", romaja: "m", vietnameseSound: "Đọc như chữ 'm'", strokeCount: 3, strokeGuide: "1. Nét dọc trái; 2. Nét bẻ góc trên-phải; 3. Đóng đáy.", exampleWord: "모자", exampleRomaja: "mo-ja", exampleVietnamese: "Cái mũ" },
    { char: "ㅂ", name: "Bieup", romaja: "b / p", vietnameseSound: "Đầu câu đọc 'p', giữa câu đọc 'b'", strokeCount: 4, strokeGuide: "1. Hai nét dọc song song; 2. Nét ngang giữa; 3. Nét ngang đáy.", exampleWord: "바지", exampleRomaja: "ba-ji", exampleVietnamese: "Cái quần" },
    { char: "ㅅ", name: "Siot", romaja: "s", vietnameseSound: "Đọc như chữ 'x' nhẹ", strokeCount: 2, strokeGuide: "1. Nét xiên trái; 2. Nét xiên phải từ thân nét 1.", exampleWord: "사과", exampleRomaja: "sa-gwa", exampleVietnamese: "Quả táo" },
    { char: "ㅇ", name: "Ieung", romaja: "ng / âm câm", vietnameseSound: "Đầu âm tiết là câm, cuối âm tiết đọc như 'ng'", strokeCount: 1, strokeGuide: "1. Vẽ một hình tròn khép kín theo chiều kim đồng hồ.", exampleWord: "안경", exampleRomaja: "an-gyeong", exampleVietnamese: "Kính mắt" },
    { char: "ㅈ", name: "Jieut", romaja: "j / ch", vietnameseSound: "Đọc như chữ 'ch' tiếng Việt", strokeCount: 2, strokeGuide: "1. Nét ngang; 2. Nét xiên xuống như chữ ㅅ.", exampleWord: "지도", exampleRomaja: "ji-do", exampleVietnamese: "Bản đồ" },
    { char: "ㅊ", name: "Chieut", romaja: "ch (bật hơi)", vietnameseSound: "Bật hơi mạnh chữ 'ch'", strokeCount: 3, strokeGuide: "1. Dấu chấm trên đầu; 2. Thân chữ ㅈ.", exampleWord: "치마", exampleRomaja: "chi-ma", exampleVietnamese: "Cái váy" },
    { char: "ㅋ", name: "Kieuk", romaja: "k (bật hơi)", vietnameseSound: "Bật hơi mạnh chữ 'k' từ cuống họng", strokeCount: 2, strokeGuide: "1. Chữ ㄱ; 2. Nét ngang phụ ở giữa.", exampleWord: "코", exampleRomaja: "ko", exampleVietnamese: "Cái mũi" },
    { char: "ㅌ", name: "Tieut", romaja: "t (bật hơi)", vietnameseSound: "Bật hơi mạnh chữ 'th'", strokeCount: 3, strokeGuide: "1. Nét ngang trên; 2. Nét ngang giữa; 3. Nét ㄴ.", exampleWord: "토마토", exampleRomaja: "to-ma-to", exampleVietnamese: "Cà chua" },
    { char: "ㅍ", name: "Pieup", romaja: "p (bật hơi)", vietnameseSound: "Bật hơi mạnh chữ 'ph'", strokeCount: 4, strokeGuide: "1. Nét ngang trên; 2. Hai nét đứng; 3. Nét ngang đáy.", exampleWord: "피자", exampleRomaja: "pi-ja", exampleVietnamese: "Bánh pizza" },
    { char: "ㅎ", name: "Hieut", romaja: "h", vietnameseSound: "Đọc như chữ 'h'", strokeCount: 3, strokeGuide: "1. Dấu chấm; 2. Nét ngang dài; 3. Vòng tròn ㅇ.", exampleWord: "하늘", exampleRomaja: "ha-neul", exampleVietnamese: "Bầu trời" },
  ];

  const compoundVowels: HangulLetter[] = [
    { char: "ㅐ", name: "Ae", romaja: "ae", vietnameseSound: "Đọc như chữ 'e' mở rộng miệng", strokeCount: 3, strokeGuide: "ㅏ + ㅣ", exampleWord: "배", exampleRomaja: "bae", exampleVietnamese: "Quả lê / Chiếc thuyền" },
    { char: "ㅒ", name: "Yae", romaja: "yae", vietnameseSound: "Đọc như 'de'", strokeCount: 4, strokeGuide: "ㅑ + ㅣ", exampleWord: "얘기", exampleRomaja: "yae-gi", exampleVietnamese: "Câu chuyện" },
    { char: "ㅔ", name: "E", romaja: "e", vietnameseSound: "Đọc như chữ 'ê'", strokeCount: 3, strokeGuide: "ㅓ + ㅣ", exampleWord: "베개", exampleRomaja: "be-gae", exampleVietnamese: "Cái gối" },
    { char: "ㅖ", name: "Ye", romaja: "ye", vietnameseSound: "Đọc như 'dê'", strokeCount: 4, strokeGuide: "ㅕ + ㅣ", exampleWord: "시계", exampleRomaja: "si-gye", exampleVietnamese: "Đồng hồ" },
    { char: "ㅘ", name: "Wa", romaja: "wa", vietnameseSound: "Đọc như 'oa'", strokeCount: 4, strokeGuide: "ㅗ + ㅏ", exampleWord: "화가", exampleRomaja: "hwa-ga", exampleVietnamese: "Họa sĩ" },
    { char: "ㅙ", name: "Wae", romaja: "wae", vietnameseSound: "Đọc như 'oe'", strokeCount: 5, strokeGuide: "ㅗ + ㅐ", exampleWord: "돼지", exampleRomaja: "dwae-ji", exampleVietnamese: "Con lợn" },
    { char: "ㅚ", name: "Oe", romaja: "oe", vietnameseSound: "Đọc như 'uê'", strokeCount: 3, strokeGuide: "ㅗ + ㅣ", exampleWord: "회사", exampleRomaja: "hoe-sa", exampleVietnamese: "Công ty" },
    { char: "ㅝ", name: "Wo", romaja: "wo", vietnameseSound: "Đọc như 'uơ'", strokeCount: 4, strokeGuide: "ㅜ + ㅓ", exampleWord: "월요일", exampleRomaja: "wol-yo-il", exampleVietnamese: "Thứ Hai" },
    { char: "ㅞ", name: "We", romaja: "we", vietnameseSound: "Đọc như 'uê'", strokeCount: 5, strokeGuide: "ㅜ + ㅔ", exampleWord: "웨딩", exampleRomaja: "we-ding", exampleVietnamese: "Đám cưới" },
    { char: "ㅟ", name: "Wi", romaja: "wi", vietnameseSound: "Đọc như 'uy'", strokeCount: 3, strokeGuide: "ㅜ + ㅣ", exampleWord: "위", exampleRomaja: "wi", exampleVietnamese: "Phía trên / Dạ dày" },
    { char: "ㅢ", name: "Ui", romaja: "ui", vietnameseSound: "Đọc như 'ưi', làm sở hữu cách đọc 'ê'", strokeCount: 2, strokeGuide: "ㅡ + ㅣ", exampleWord: "의사", exampleRomaja: "ui-sa", exampleVietnamese: "Bác sĩ" },
  ];

  const doubleConsonants: HangulLetter[] = [
    { char: "ㄲ", name: "Ssang-giyeok", romaja: "kk", vietnameseSound: "Âm căng 'c' không bật hơi", strokeCount: 2, strokeGuide: "ㄱ + ㄱ", exampleWord: "꼬리", exampleRomaja: "kko-ri", exampleVietnamese: "Cái đuôi" },
    { char: "ㄸ", name: "Ssang-digeut", romaja: "tt", vietnameseSound: "Âm căng 't' nén hơi mạnh", strokeCount: 4, strokeGuide: "ㄷ + ㄷ", exampleWord: "딸기", exampleRomaja: "ttal-gi", exampleVietnamese: "Quả dâu tây" },
    { char: "ㅃ", name: "Ssang-bieup", romaja: "pp", vietnameseSound: "Âm căng 'p' mím chặt môi", strokeCount: 8, strokeGuide: "ㅂ + ㅂ", exampleWord: "빵", exampleRomaja: "ppang", exampleVietnamese: "Bánh mì" },
    { char: "ㅆ", name: "Ssang-siot", romaja: "ss", vietnameseSound: "Âm căng 'x' rít mạnh qua kẽ răng", strokeCount: 4, strokeGuide: "ㅅ + ㅅ", exampleWord: "쌀", exampleRomaja: "ssal", exampleVietnamese: "Gạo" },
    { char: "ㅉ", name: "Ssang-jieut", romaja: "jj", vietnameseSound: "Âm căng 'ch' gắt giọng", strokeCount: 4, strokeGuide: "ㅈ + ㅈ", exampleWord: "찌개", exampleRomaja: "jji-gae", exampleVietnamese: "Món canh hầm" },
  ];

  const minigameQuestions = [
    { question: "Âm đọc của ký tự [ ㅓ ] là gì?", options: ["a", "eo (ơ)", "o (ô)", "u"], answer: "eo (ơ)" },
    { question: "Ký tự nào sau đây là nguyên âm [ U ]?", options: ["ㅗ", "ㅜ", "ㅡ", "ㅣ"], answer: "ㅜ" },
    { question: "Phát âm phụ âm bật hơi [ ㅋ ] tương đương với âm nào?", options: ["k bật hơi", "t", "p", "ch"], answer: "k bật hơi" },
    { question: "Ký tự [ ㅃ ] thuộc nhóm nào?", options: ["Nguyên âm ghép", "Phụ âm cơ bản", "Phụ âm đôi (căng)", "Batchim đôi"], answer: "Phụ âm đôi (căng)" },
    { question: "Ký tự [ ㅢ ] trong từ '의사' (Bác sĩ) được phát âm là:", options: ["i", "ui (ưi)", "ê", "e"], answer: "ui (ưi)" },
  ];

  const playKoreanLetterAudio = (text: string) => {
    setIsPlayingAudio(true);
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "ko-KR";
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
    setTimeout(() => setIsPlayingAudio(false), 900);
  };

  const handleAnswerMinigame = (selectedOpt: string) => {
    const currentQ = minigameQuestions[gameQuestionIdx];
    if (selectedOpt === currentQ.answer) {
      toast.success("Chính xác! +10 XP");
      addXP(10, 1);
      setGameScore((s) => s + 1);
    } else {
      toast.error(`Chưa đúng rồi! Đáp án đúng là: ${currentQ.answer}`);
      // Add to confused tracker
      if (!confusedLetters.includes(currentQ.question.slice(0, 10))) {
        setConfusedLetters((prev) => [...prev, currentQ.question]);
      }
    }

    if (gameQuestionIdx < minigameQuestions.length - 1) {
      setGameQuestionIdx((prev) => prev + 1);
    } else {
      toast.success(`Hoàn thành thử thách Hangul! Điểm: ${gameScore + (selectedOpt === currentQ.answer ? 1 : 0)} / ${minigameQuestions.length}`);
    }
  };

  const activeLetterList =
    activeTab === "vowels"
      ? vowels
      : activeTab === "consonants"
      ? consonants
      : activeTab === "compound_vowels"
      ? compoundVowels
      : activeTab === "double_consonants"
      ? doubleConsonants
      : [];

  return (
    <div className="flex min-h-screen bg-slate-50/50 dark:bg-slate-950/40">
      <AppSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopNavbar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full pb-24">
          {/* Header */}
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-1">
                <BookA className="w-3.5 h-3.5" />
                <span>Bảng chữ cái Vua Sejong sáng tạo</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                Làm chủ Bảng chữ cái Hangul (한글)
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                Bấm vào từng ký tự để nghe âm thanh chuẩn Seoul và xem thứ tự nét viết
              </p>
            </div>

            <Button
              variant={activeTab === "minigame" ? "default" : "premium"}
              size="sm"
              onClick={() => setActiveTab("minigame")}
              className="gap-2 font-bold shadow-sm"
            >
              <Gamepad2 className="w-4 h-4" />
              <span>Mini Game nhận diện âm</span>
            </Button>
          </div>

          {/* Navigation Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 text-xs font-bold">
            <button
              onClick={() => { setActiveTab("vowels"); setSelectedLetter(null); }}
              className={`px-4 py-2.5 rounded-2xl border transition-all ${
                activeTab === "vowels"
                  ? "bg-primary text-primary-foreground border-primary shadow-xs"
                  : "bg-card text-muted-foreground border-border hover:text-foreground"
              }`}
            >
              10 Nguyên âm cơ bản
            </button>
            <button
              onClick={() => { setActiveTab("consonants"); setSelectedLetter(null); }}
              className={`px-4 py-2.5 rounded-2xl border transition-all ${
                activeTab === "consonants"
                  ? "bg-primary text-primary-foreground border-primary shadow-xs"
                  : "bg-card text-muted-foreground border-border hover:text-foreground"
              }`}
            >
              14 Phụ âm cơ bản
            </button>
            <button
              onClick={() => { setActiveTab("compound_vowels"); setSelectedLetter(null); }}
              className={`px-4 py-2.5 rounded-2xl border transition-all ${
                activeTab === "compound_vowels"
                  ? "bg-primary text-primary-foreground border-primary shadow-xs"
                  : "bg-card text-muted-foreground border-border hover:text-foreground"
              }`}
            >
              11 Nguyên âm ghép
            </button>
            <button
              onClick={() => { setActiveTab("double_consonants"); setSelectedLetter(null); }}
              className={`px-4 py-2.5 rounded-2xl border transition-all ${
                activeTab === "double_consonants"
                  ? "bg-primary text-primary-foreground border-primary shadow-xs"
                  : "bg-card text-muted-foreground border-border hover:text-foreground"
              }`}
            >
              5 Phụ âm đôi (Căng)
            </button>
            <button
              onClick={() => { setActiveTab("batchim"); setSelectedLetter(null); }}
              className={`px-4 py-2.5 rounded-2xl border transition-all ${
                activeTab === "batchim"
                  ? "bg-primary text-primary-foreground border-primary shadow-xs"
                  : "bg-card text-muted-foreground border-border hover:text-foreground"
              }`}
            >
              Quy tắc Batchim (Phụ âm cuối)
            </button>
          </div>

          {/* Tab 1-4: Alphabet Letter Grid & Detail Panel */}
          {activeTab !== "batchim" && activeTab !== "minigame" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Grid: Letter Cards */}
              <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {activeLetterList.map((item) => {
                  const isSelected = selectedLetter?.char === item.char;
                  return (
                    <div
                      key={item.char}
                      onClick={() => {
                        setSelectedLetter(item);
                        playKoreanLetterAudio(item.char);
                      }}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col items-center justify-center gap-1 group relative ${
                        isSelected
                          ? "border-primary bg-primary/10 ring-2 ring-primary/30 shadow-md scale-105"
                          : "border-border/80 bg-card hover:border-primary/40 hover:shadow-xs hover:-translate-y-0.5"
                      }`}
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          playKoreanLetterAudio(item.char);
                        }}
                        className="absolute top-2 right-2 p-1 rounded-full text-muted-foreground group-hover:text-primary hover:scale-110"
                        title="Nghe âm"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>

                      <span className="hangul-text text-4xl sm:text-5xl font-black text-foreground group-hover:text-primary transition-colors">
                        {item.char}
                      </span>
                      <span className="text-xs font-bold text-muted-foreground mt-1">
                        [{item.romaja}]
                      </span>
                      <span className="text-[11px] text-primary/80 font-semibold line-clamp-1 text-center">
                        {item.name}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Right Panel: Selected Letter Detail Inspector */}
              <div className="lg:col-span-4 rounded-3xl border border-border/80 bg-card p-6 shadow-sm sticky top-20">
                {selectedLetter ? (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <div className="text-center pb-4 border-b border-border/60">
                      <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-black text-6xl flex items-center justify-center mx-auto shadow-lg shadow-indigo-500/20 mb-3">
                        <span className="hangul-text">{selectedLetter.char}</span>
                      </div>
                      <h3 className="font-extrabold text-xl text-foreground">
                        Ký tự {selectedLetter.char} ({selectedLetter.name})
                      </h3>
                      <p className="text-sm font-semibold text-primary mt-0.5">
                        Phiên âm: [{selectedLetter.romaja}]
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => playKoreanLetterAudio(selectedLetter.char)}
                        className="mt-3 gap-2 rounded-full text-xs font-bold"
                      >
                        <Volume2 className="w-4 h-4 text-primary" />
                        <span>Nghe phát âm chuẩn</span>
                      </Button>
                    </div>

                    {/* How to sound */}
                    <div className="space-y-1">
                      <span className="text-xs font-bold text-foreground">Cách phát âm chuẩn cho người Việt:</span>
                      <p className="text-xs text-muted-foreground leading-relaxed bg-secondary/50 p-3 rounded-xl border border-border/60">
                        {selectedLetter.vietnameseSound}
                      </p>
                    </div>

                    {/* Stroke order */}
                    <div className="space-y-1">
                      <span className="text-xs font-bold text-foreground">
                        Quy tắc nét viết ({selectedLetter.strokeCount} nét):
                      </span>
                      <p className="text-xs text-muted-foreground leading-relaxed bg-secondary/50 p-3 rounded-xl border border-border/60">
                        {selectedLetter.strokeGuide}
                      </p>
                    </div>

                    {/* Example word */}
                    <div className="pt-2 border-t border-border/60">
                      <span className="text-xs font-bold text-foreground">Từ vựng ứng dụng:</span>
                      <div className="mt-2 p-3 rounded-xl bg-primary/5 border border-primary/20 flex items-center justify-between">
                        <div>
                          <p className="hangul-text font-black text-lg text-foreground">
                            {selectedLetter.exampleWord}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            [{selectedLetter.exampleRomaja}] • {selectedLetter.exampleVietnamese}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => playKoreanLetterAudio(selectedLetter.exampleWord)}
                          className="h-8 w-8 text-primary"
                        >
                          <Volume2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center mx-auto text-muted-foreground">
                      <HelpCircle className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-sm text-foreground">Chọn một ký tự bên trái</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Bấm vào bất kỳ nguyên âm hoặc phụ âm nào để xem khẩu hình, phát âm và hướng dẫn viết nét chuẩn.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tab 5: Batchim (7 sound groups) */}
          {activeTab === "batchim" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="rounded-3xl border border-border/80 bg-card p-6 shadow-sm">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  7 Nhóm Phát âm Phụ âm cuối (Batchim - 받침)
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-6">
                  Trong tiếng Hàn có tới 27 phụ âm có thể đứng ở vị trí Patchim (cuối âm tiết), nhưng khi phát âm thực tế chỉ được thu gọn vào <strong>7 đại diện âm chuẩn</strong> sau:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { rep: "[ ㄱ ]", chars: "ㄱ, ㅋ, ㄲ, ㄳ, ㄺ", example: "책 (Sách), 밖 (Bên ngoài), 닭 (Con gà)", sound: "Phát âm như âm 'c / k' kết thúc trong tiếng Việt" },
                    { rep: "[ ㄴ ]", chars: "ㄴ, ㄵ, ㄶ", example: "눈 (Mắt / Tuyết), 편지 (Lá thư)", sound: "Phát âm như âm 'n'" },
                    { rep: "[ ㄷ ]", chars: "ㄷ, ㅅ, ㅈ, ㅊ, ㅌ, ㅎ, ㅆ", example: "옷 (Áo), 낮 (Ban ngày), 꽃 (Bông hoa)", sound: "Tất cả đều đọc như âm 't' trong tiếng Việt" },
                    { rep: "[ ㄹ ]", chars: "ㄹ, ㄼ, ㄽ, ㄾ, ㅀ", example: "달 (Mặt trăng), 말 (Lời nói), 팔 (Số 8)", sound: "Uốn đầu lưỡi chạm vòm miệng trên tạo âm 'l'" },
                    { rep: "[ ㅁ ]", chars: "ㅁ, ㄻ", example: "밤 (Ban đêm / Hạt dẻ), 삶 (Cuộc sống)", sound: "Khép chặt môi đọc âm 'm'" },
                    { rep: "[ ㅂ ]", chars: "ㅂ, ㅍ, ㅄ, ㄿ", example: "밥 (Cơm), 입 (Miệng), 앞 (Phía trước)", sound: "Khép môi ngắt hơi như âm 'p'" },
                    { rep: "[ ㅇ ]", chars: "ㅇ", example: "강 (Dòng sông), 가방 (Cái cặp sách)", sound: "Phát âm như âm 'ng' tròn miệng" },
                  ].map((group, idx) => (
                    <div key={idx} className="p-4 rounded-2xl border border-border bg-secondary/30 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="hangul-text text-xl font-black text-primary bg-primary/10 px-3 py-1 rounded-xl">
                          {group.rep}
                        </span>
                        <span className="text-[11px] font-semibold text-muted-foreground">
                          Nhóm {idx + 1}
                        </span>
                      </div>
                      <p className="text-xs font-bold text-foreground">
                        Các ký tự thuộc nhóm: <span className="text-indigo-600 dark:text-indigo-400">{group.chars}</span>
                      </p>
                      <p className="text-xs text-muted-foreground leading-snug">
                        {group.sound}
                      </p>
                      <div className="pt-2 border-t border-border/60 text-xs text-slate-700 dark:text-slate-300">
                        Ví dụ: <strong>{group.example}</strong>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 6: Minigame & Tracker */}
          {activeTab === "minigame" && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start animate-in fade-in duration-200">
              <div className="md:col-span-8 rounded-3xl border border-border/80 bg-card p-6 shadow-sm space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-border/60">
                  <div>
                    <h3 className="font-bold text-base text-foreground">
                      Thử thách Nhận diện Âm thanh Hangul
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Câu hỏi {gameQuestionIdx + 1} / {minigameQuestions.length}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      Điểm: {gameScore}
                    </span>
                  </div>
                </div>

                <div className="my-6 text-center py-6">
                  <h2 className="text-xl sm:text-2xl font-extrabold text-foreground mb-6">
                    {minigameQuestions[gameQuestionIdx].question}
                  </h2>

                  <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
                    {minigameQuestions[gameQuestionIdx].options.map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        onClick={() => handleAnswerMinigame(opt)}
                        className="py-3.5 px-4 rounded-xl border border-border bg-card hover:bg-primary/10 hover:border-primary text-sm font-bold transition-all text-foreground"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Confused Letters Tracker */}
              <div className="md:col-span-4 rounded-3xl border border-border/80 bg-card p-6 shadow-sm space-y-4">
                <h4 className="font-bold text-sm text-foreground flex items-center gap-2">
                  <Flame className="w-4 h-4 text-rose-500" />
                  Ký tự bạn thường nhầm lẫn
                </h4>
                <p className="text-xs text-muted-foreground">
                  Hệ thống thông minh tự động ghi nhận các ký tự bạn trả lời sai để nhắc nhở ôn tập kỹ hơn:
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {confusedLetters.map((char, cIdx) => (
                    <span
                      key={cIdx}
                      className="px-3 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 font-black text-sm"
                    >
                      {char}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-border/60">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setGameQuestionIdx(0);
                      setGameScore(0);
                      toast.info("Đã đặt lại thử thách!");
                    }}
                    className="w-full text-xs gap-1.5"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>Luyện tập lại từ đầu</span>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </main>

        <MobileBottomNav />
      </div>
    </div>
  );
}
