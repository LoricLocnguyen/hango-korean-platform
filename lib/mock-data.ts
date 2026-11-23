import { UserProfile, VocabularyItem, SRSItem, ActivityDay, AchievementItem, LeaderboardEntry, LessonSummary } from './types';

export const initialUserProfile: UserProfile = {
  id: 'usr_hango_01',
  email: 'minhquan.edtech@gmail.com',
  fullName: 'Nguyễn Minh Quân',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  level: 3,
  totalXp: 2450,
  currentStreak: 14,
  longestStreak: 21,
  wordsLearned: 186,
  consecutiveDays: 14,
  dailyGoalMinutes: 15,
  todayMinutes: 12,
  todayXp: 65,
  nextLessonId: 'les_hangul_04',
  nextLessonTitle: 'Bài 4: Phụ âm ghép và Quy tắc nối âm (Batchim)',
};

export const sampleVocabularies: VocabularyItem[] = [
  {
    id: 'voc_01',
    hangul: '안녕하세요',
    romaja: 'annyeonghaseyo',
    vietnamese: 'Xin chào',
    hanjaVietnamese: 'An ninh [安寧]',
    partOfSpeech: 'Cụm từ',
    exampleKorean: '선생님, 안녕하세요!',
    exampleVietnamese: 'Thưa thầy, em chào thầy ạ!',
    level: 'Hangul',
  },
  {
    id: 'voc_02',
    hangul: '감사합니다',
    romaja: 'gamsahamnida',
    vietnamese: 'Cảm ơn (trang trọng)',
    hanjaVietnamese: 'Cảm tạ [感謝]',
    partOfSpeech: 'Cụm từ',
    exampleKorean: '도와주셔서 감사합니다.',
    exampleVietnamese: 'Cảm ơn vì đã giúp đỡ tôi.',
    level: 'Hangul',
  },
  {
    id: 'voc_03',
    hangul: '학생',
    romaja: 'haksaeng',
    vietnamese: 'Học sinh, sinh viên',
    hanjaVietnamese: 'Học sinh [學生]',
    partOfSpeech: 'Danh từ',
    exampleKorean: '저는 하노이 대학교 학생입니다.',
    exampleVietnamese: 'Tôi là sinh viên trường Đại học Hà Nội.',
    level: 'Sơ cấp 1',
  },
  {
    id: 'voc_04',
    hangul: '학교',
    romaja: 'hakgyo',
    vietnamese: 'Trường học',
    hanjaVietnamese: 'Học hiệu [學校]',
    partOfSpeech: 'Danh từ',
    exampleKorean: '내일 아침 학교에 가요.',
    exampleVietnamese: 'Sáng mai tôi đến trường.',
    level: 'Sơ cấp 1',
  },
  {
    id: 'voc_05',
    hangul: '시간',
    romaja: 'sigan',
    vietnamese: 'Thời gian, tiếng (đồng hồ)',
    hanjaVietnamese: 'Thời gian [時間]',
    partOfSpeech: 'Danh từ',
    exampleKorean: '지금 이야기할 시간 있어요?',
    exampleVietnamese: 'Bây giờ bạn có thời gian nói chuyện không?',
    level: 'Sơ cấp 1',
  },
  {
    id: 'voc_06',
    hangul: '약속',
    romaja: 'yaksok',
    vietnamese: 'Cuộc hẹn, lời hứa',
    hanjaVietnamese: 'Ước thúc [約束]',
    partOfSpeech: 'Danh từ',
    exampleKorean: '오늘 저녁에 친구와 약속이 있습니다.',
    exampleVietnamese: 'Tối nay tôi có hẹn với bạn.',
    level: 'Sơ cấp 1',
  },
  {
    id: 'voc_07',
    hangul: '도서관',
    romaja: 'doseogwan',
    vietnamese: 'Thư viện',
    hanjaVietnamese: 'Đồ thư quán [圖書館]',
    partOfSpeech: 'Danh từ',
    exampleKorean: '도서관에서 한국어를 공부해요.',
    exampleVietnamese: 'Tôi học tiếng Hàn ở thư viện.',
    level: 'Sơ cấp 2',
  },
  {
    id: 'voc_08',
    hangul: '준비하다',
    romaja: 'junbihada',
    vietnamese: 'Chuẩn bị',
    hanjaVietnamese: 'Chuẩn bị [準備]',
    partOfSpeech: 'Động từ',
    exampleKorean: '시험을 열심히 준비하고 있어요.',
    exampleVietnamese: 'Tôi đang chuẩn bị chăm chỉ cho kỳ thi.',
    level: 'Sơ cấp 2',
  },
];

export const sampleSRSCards: SRSItem[] = [
  {
    id: 'srs_01',
    userId: 'usr_hango_01',
    vocabularyId: 'voc_03',
    vocabulary: sampleVocabularies[2],
    repetitionCount: 2,
    intervalDays: 3,
    easeFactor: 2.5,
    nextReviewAt: '2026-11-23T09:00:00Z',
    status: 'reviewing',
  },
  {
    id: 'srs_02',
    userId: 'usr_hango_01',
    vocabularyId: 'voc_05',
    vocabulary: sampleVocabularies[4],
    repetitionCount: 1,
    intervalDays: 1,
    easeFactor: 2.36,
    nextReviewAt: '2026-11-23T10:00:00Z',
    status: 'learning',
  },
  {
    id: 'srs_03',
    userId: 'usr_hango_01',
    vocabularyId: 'voc_06',
    vocabulary: sampleVocabularies[5],
    repetitionCount: 4,
    intervalDays: 12,
    easeFactor: 2.6,
    nextReviewAt: '2026-11-23T11:00:00Z',
    status: 'reviewing',
  },
  {
    id: 'srs_04',
    userId: 'usr_hango_01',
    vocabularyId: 'voc_07',
    vocabulary: sampleVocabularies[6],
    repetitionCount: 0,
    intervalDays: 1,
    easeFactor: 2.5,
    nextReviewAt: '2026-11-23T08:00:00Z',
    status: 'learning',
  },
];

export const sampleRecommendedLessons: LessonSummary[] = [
  {
    id: 'les_hangul_04',
    unitId: 'unit_hangul_02',
    courseTitle: 'Khóa Nhập môn Hangul',
    title: 'Bài 4: Phụ âm kép & Nguyên tắc nối âm Batchim',
    hangulTitle: '받침과 겹받침 발음 규칙',
    durationMinutes: 12,
    totalWords: 16,
    completedPercent: 40,
    xpReward: 35,
    isLocked: false,
  },
  {
    id: 'les_topik1_01',
    unitId: 'unit_topik1_01',
    courseTitle: 'TOPIK I: Giao tiếp đời sống',
    title: 'Bài 5: Mua sắm & Hỏi giá tiền bằng số thuần Hàn',
    hangulTitle: '쇼핑과 물건 값 묻기',
    durationMinutes: 15,
    totalWords: 24,
    completedPercent: 0,
    xpReward: 50,
    isLocked: false,
  },
  {
    id: 'les_topik1_02',
    unitId: 'unit_topik1_02',
    courseTitle: 'TOPIK I: Ngữ pháp cốt lõi',
    title: 'Bài 6: Cấu trúc đuôi câu -아/어요 & -ㅂ/습니까',
    hangulTitle: '격식체와 비격식체 어미',
    durationMinutes: 18,
    totalWords: 20,
    completedPercent: 0,
    xpReward: 45,
    isLocked: true,
  },
];

// Heatmap generator for the past 16 weeks (approx 112 days)
export function generateActivityHeatmap(): ActivityDay[] {
  const days: ActivityDay[] = [];
  const today = new Date('2026-11-23');

  for (let i = 111; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];

    // Seed realistic activity pattern (active streak in last 14 days, random before)
    let level: 0 | 1 | 2 | 3 | 4 = 0;
    let count = 0;

    if (i <= 14) {
      // Current streak: active every day!
      level = (i % 3 === 0 ? 4 : i % 2 === 0 ? 3 : 2) as 0 | 1 | 2 | 3 | 4;
      count = level * 25 + 10;
    } else {
      const rand = Math.sin(i * 997) * 10000;
      const val = Math.abs(rand - Math.floor(rand));
      if (val > 0.45) {
        level = (Math.floor(val * 4) + 1) as 1 | 2 | 3 | 4;
        count = level * 20;
      }
    }

    days.push({
      date: dateStr,
      count,
      level,
    });
  }
  return days;
}

export const weeklyXPData = [
  { day: 'Thứ 2', xp: 45, minutes: 15 },
  { day: 'Thứ 3', xp: 70, minutes: 22 },
  { day: 'Thứ 4', xp: 50, minutes: 18 },
  { day: 'Thứ 5', xp: 85, minutes: 26 },
  { day: 'Thứ 6', xp: 60, minutes: 20 },
  { day: 'Thứ 7', xp: 110, minutes: 35 },
  { day: 'CN', xp: 65, minutes: 21 },
];

export const monthlyXPData = [
  { day: 'Tuần 1', xp: 420, minutes: 130 },
  { day: 'Tuần 2', xp: 510, minutes: 165 },
  { day: 'Tuần 3', xp: 630, minutes: 190 },
  { day: 'Tuần 4', xp: 890, minutes: 245 },
];

export const sampleAchievements: AchievementItem[] = [
  {
    id: 'ach_01',
    title: 'Bậc thầy Hangul',
    description: 'Nắm vững 40 ký tự nguyên âm và phụ âm tiếng Hàn',
    icon: 'Crown',
    xpReward: 100,
    unlockedAt: '2026-11-15',
    isUnlocked: true,
    progressPercent: 100,
  },
  {
    id: 'ach_02',
    title: 'Ngọn lửa bền bỉ',
    description: 'Duy trì streak học liên tiếp 14 ngày không ngắt quãng',
    icon: 'Flame',
    xpReward: 150,
    unlockedAt: '2026-11-23',
    isUnlocked: true,
    progressPercent: 100,
  },
  {
    id: 'ach_03',
    title: 'Kho từ vựng 200 từ',
    description: 'Ghi nhớ thành công 200 từ vựng với Spaced Repetition',
    icon: 'BookOpen',
    xpReward: 200,
    isUnlocked: false,
    progressPercent: 93,
  },
  {
    id: 'ach_04',
    title: 'Thần tốc phản xạ',
    description: 'Hoàn thành bài kiểm tra ôn tập đạt 100% trong dưới 2 phút',
    icon: 'Zap',
    xpReward: 120,
    isUnlocked: false,
    progressPercent: 60,
  },
];

export const sampleLeaderboard: LeaderboardEntry[] = [
  {
    rank: 1,
    userId: 'usr_top_01',
    fullName: 'Lê Hoàng Anh',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
    totalXp: 4120,
    streak: 35,
  },
  {
    rank: 2,
    userId: 'usr_top_02',
    fullName: 'Trần Thị Thu Thảo',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
    totalXp: 3890,
    streak: 28,
  },
  {
    rank: 3,
    userId: 'usr_hango_01',
    fullName: 'Nguyễn Minh Quân (Bạn)',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    totalXp: 2450,
    streak: 14,
    isCurrentUser: true,
  },
  {
    rank: 4,
    userId: 'usr_top_04',
    fullName: 'Đỗ Quỳnh Chi',
    avatarUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80',
    totalXp: 2180,
    streak: 11,
  },
  {
    rank: 5,
    userId: 'usr_top_05',
    fullName: 'Phạm Đức Duy',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    totalXp: 1940,
    streak: 9,
  },
];

export const landingFaqs = [
  {
    q: 'Người hoàn toàn chưa biết gì về tiếng Hàn có học được không?',
    a: 'Hoàn toàn được! HanGo có riêng Lộ trình Nhập môn Bảng chữ cái Hangul 7 ngày với hướng dẫn từng nét viết, phân tích phát âm trực quan, và các bài tập nối âm đặc thù cho người Việt.',
  },
  {
    q: 'Phương pháp Spaced Repetition (SRS) trên HanGo hoạt động như thế nào?',
    a: 'HanGo áp dụng thuật toán SuperMemo SM-2 cải tiến. Mỗi khi bạn học một từ mới, hệ thống sẽ tự động xếp lịch nhắc bạn ôn lại vào đúng thời điểm não bộ sắp bắt đầu quên (sau 1 ngày, 3 ngày, 6 ngày, 14 ngày...). Nhờ đó, từ vựng chuyển từ trí nhớ ngắn hạn vào trí nhớ dài hạn mà không cần học vẹt.',
  },
  {
    q: 'Từ vựng Hán - Hàn (Hanja) trên HanGo có gì đặc biệt?',
    a: 'Hơn 60% từ vựng tiếng Hàn có gốc từ chữ Hán tương tự như tiếng Việt (Hán - Việt). HanGo chỉ rõ liên tưởng ngữ âm (ví dụ: 학생 = Học sinh, 학교 = Học hiệu, 시간 = Thời gian). Nhờ mẹo này, bạn có thể đoán nghĩa và thuộc hàng ngàn từ mới cực nhanh!',
  },
  {
    q: 'HanGo có thể cài đặt và học trên điện thoại được không?',
    a: 'Có! HanGo hỗ trợ Progressive Web App (PWA) đầy đủ. Bạn chỉ cần mở trình duyệt Safari (iOS) hoặc Chrome (Android) và chọn "Thêm vào màn hình chính" (Add to Home Screen) là có thể sử dụng mượt mà như một ứng dụng Native.',
  },
  {
    q: 'Làm sao để được hỗ trợ khi gặp khó khăn trong quá trình học?',
    a: 'Đội ngũ mentor tiếng Hàn trình độ TOPIK 5, 6 cùng cộng đồng học viên HanGo luôn sẵn sàng giải đáp thắc mắc của bạn qua diễn đàn hỏi đáp và nhóm thảo luận chuyên sâu.',
  },
];

export const pricingPlans = [
  {
    id: 'free',
    name: 'Khởi động Miễn phí',
    price: '0đ',
    period: 'Mãi mãi',
    description: 'Hoàn hảo để bắt đầu làm quen với bảng chữ cái Hangul và các cấu trúc giao tiếp cơ bản.',
    features: [
      'Trọn bộ Khóa học Nhập môn Hangul',
      '5 lượt luyện tập mỗi ngày',
      'Hệ thống Spaced Repetition cơ bản',
      'Theo dõi Streak & Heatmap học tập',
      'Huy hiệu và bảng xếp hạng cộng đồng',
    ],
    ctaText: 'Bắt đầu Miễn phí',
    popular: false,
  },
  {
    id: 'pro',
    name: 'HanGo Pro Hội viên',
    price: '69.000đ',
    period: '/tháng (hoặc 699k/năm)',
    description: 'Dành cho người học nghiêm túc muốn thi TOPIK và giao tiếp tự nhiên trong thời gian ngắn nhất.',
    features: [
      'Không giới hạn số lượt bài học mỗi ngày',
      'Mở khóa toàn bộ lộ trình Sơ cấp 1, 2 và Trung cấp',
      'Kho từ vựng Hán - Hàn mở rộng 3,000+ từ',
      'Phát âm mẫu chuẩn người bản xứ (Seoul standard)',
      'Thuật toán SRS thông minh tối ưu không giới hạn',
      'Chế độ Ngoại tuyến (PWA Offline mode)',
      'Hỗ trợ giải đáp 1-1 cùng trợ giảng TOPIK 6',
    ],
    ctaText: 'Trải nghiệm Pro 7 ngày',
    popular: true,
  },
  {
    id: 'lifetime',
    name: 'Trọn đời (Lifetime VIP)',
    price: '1.490.000đ',
    period: 'Thanh toán một lần',
    description: 'Đầu tư một lần, sở hữu trọn đời mọi bản cập nhật và khóa học mới trong tương lai.',
    features: [
      'Tất cả quyền lợi của gói Pro trọn đời',
      'Tặng trọn bộ Ebook & Flashcard độc quyền HanGo',
      'Ưu tiên kết nối cố vấn học tập riêng',
      'Huy hiệu VIP vĩnh viễn trên bảng xếp hạng',
      'Cập nhật miễn phí các khóa học TOPIK II nâng cao',
    ],
    ctaText: 'Sở hữu Trọn đời',
    popular: false,
  },
];
