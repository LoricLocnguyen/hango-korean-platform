export interface LevelData {
  id: string;
  levelNumber: number;
  title: string;
  hangulTitle: string;
  description: string;
  badgeIcon: string;
  estimatedHours: number;
  requiredXp: number;
  modules: ModuleData[];
}

export interface ModuleData {
  id: string;
  levelId: string;
  title: string;
  hangulTitle: string;
  description: string;
  totalXp: number;
  lessons: LessonDetail[];
  finalQuizScore?: number;
}

export interface LessonDetail {
  id: string;
  moduleId: string;
  title: string;
  hangulTitle: string;
  description: string;
  lessonType: 'hangul' | 'vocab' | 'grammar' | 'listening' | 'speaking' | 'quiz' | 'review';
  durationMinutes: number;
  xpReward: number;
  completed: boolean;
  locked: boolean;
}

export interface FullVocabulary {
  id: string;
  hangul: string;
  romaja: string;
  vietnamese: string;
  hanjaVietnamese?: string;
  topic: string;
  topicName: string;
  level: string;
  partOfSpeech: string;
  exampleKorean: string;
  exampleVietnamese: string;
  audioUrl?: string;
  synonyms?: string[];
  antonyms?: string[];
  difficulty: number;
  isFavorite?: boolean;
  isKnown?: boolean;
}

export interface GrammarPoint {
  id: string;
  pattern: string;
  name: string;
  level: string;
  meaning: string;
  usageNotes: string;
  formula: string;
  commonMistakes: string;
  examples: { korean: string; vietnamese: string }[];
}

// 1. ALL 7 LEVELS (Level 0 -> Level 6)
export const fullLevelsData: LevelData[] = [
  {
    id: 'level_0',
    levelNumber: 0,
    title: 'Làm quen với Hangul',
    hangulTitle: '한글 입문',
    description: 'Nắm vững 40 ký tự nguyên âm, phụ âm, quy tắc ghép âm và biến âm Batchim.',
    badgeIcon: 'BookA',
    estimatedHours: 6,
    requiredXp: 0,
    modules: [
      {
        id: 'mod_h01',
        levelId: 'level_0',
        title: 'Module 1: Nguyên âm & Phụ âm cơ bản',
        hangulTitle: '기본 모음과 자음',
        description: '10 nguyên âm cơ bản (ㅏ, ㅓ, ㅗ, ㅜ...) và 14 phụ âm đầu (ㄱ, ㄴ, ㄷ, ㄹ...)',
        totalXp: 150,
        finalQuizScore: 100,
        lessons: [
          { id: 'les_h01_1', moduleId: 'mod_h01', title: 'Bài 1: 10 Nguyên âm cơ bản', hangulTitle: '기본 모음 10자', description: 'Học cách đọc và thứ tự nét viết chuẩn', lessonType: 'hangul', durationMinutes: 10, xpReward: 30, completed: true, locked: false },
          { id: 'les_h01_2', moduleId: 'mod_h01', title: 'Bài 2: 14 Phụ âm đầu', hangulTitle: '기본 자음 14자', description: 'Phát âm chuẩn âm thường, âm bật hơi', lessonType: 'hangul', durationMinutes: 12, xpReward: 35, completed: true, locked: false },
          { id: 'les_h01_3', moduleId: 'mod_h01', title: 'Bài 3: Quy tắc ghép âm tiết', hangulTitle: '음절 합성 규칙', description: 'Cách ghép phụ âm + nguyên âm thành chữ', lessonType: 'hangul', durationMinutes: 15, xpReward: 40, completed: true, locked: false },
        ]
      },
      {
        id: 'mod_h02',
        levelId: 'level_0',
        title: 'Module 2: Nguyên âm ghép, Phụ âm đôi & Batchim',
        hangulTitle: '복합 모음과 받침',
        description: 'Bẻ khóa 11 nguyên âm mở rộng, 5 phụ âm căng và quy tắc biến âm Batchim',
        totalXp: 180,
        finalQuizScore: 85,
        lessons: [
          { id: 'les_h02_1', moduleId: 'mod_h02', title: 'Bài 4: 11 Nguyên âm ghép (ㅐ, ㅔ, ㅘ...)', hangulTitle: '이중 모음 11자', description: 'Phân biệt các âm dễ nhầm lẫn', lessonType: 'hangul', durationMinutes: 12, xpReward: 35, completed: true, locked: false },
          { id: 'les_h02_2', moduleId: 'mod_h02', title: 'Bài 5: 5 Phụ âm căng đôi (ㄲ, ㄸ, ㅃ, ㅆ, ㅉ)', hangulTitle: '된소리 5자', description: 'Khẩu hình miệng và độ nén hơi chuẩn', lessonType: 'hangul', durationMinutes: 10, xpReward: 30, completed: true, locked: false },
          { id: 'les_h02_3', moduleId: 'mod_h02', title: 'Bài 6: Phụ âm cuối Batchim & Nối âm', hangulTitle: '받침과 연음 법칙', description: '7 nhóm phát âm phụ âm cuối và quy tắc đọc', lessonType: 'hangul', durationMinutes: 18, xpReward: 45, completed: false, locked: false },
        ]
      }
    ]
  },
  {
    id: 'level_1',
    levelNumber: 1,
    title: 'TOPIK I - Sơ cấp 1',
    hangulTitle: '초급 1단계 (TOPIK I)',
    description: 'Tích lũy 600 từ vựng và 40 ngữ pháp cốt lõi cho giao tiếp sinh hoạt hàng ngày.',
    badgeIcon: 'Compass',
    estimatedHours: 25,
    requiredXp: 300,
    modules: [
      {
        id: 'mod_t1_01',
        levelId: 'level_1',
        title: 'Module 3: Chào hỏi, Giới thiệu & Số đếm',
        hangulTitle: '자기소개와 숫자',
        description: 'Tự tin giới thiệu bản thân, quốc tịch, nghề nghiệp và phân biệt số Hán Hàn / Thuần Hàn',
        totalXp: 200,
        lessons: [
          { id: 'les_t1_01', moduleId: 'mod_t1_01', title: 'Bài 7: Giới thiệu bản thân & Quốc tịch', hangulTitle: '저는 베트남 사람입니다', description: 'Cấu trúc N 은/는 N 이에요/예요', lessonType: 'grammar', durationMinutes: 15, xpReward: 40, completed: false, locked: false },
          { id: 'les_t1_02', moduleId: 'mod_t1_01', title: 'Bài 8: Số Thuần Hàn & Đếm đồ vật', hangulTitle: '하나, 둘, 셋과 단위명사', description: 'Đếm người, tuổi, chén, quyển, cái', lessonType: 'vocab', durationMinutes: 15, xpReward: 35, completed: false, locked: false },
          { id: 'les_t1_03', moduleId: 'mod_t1_01', title: 'Bài 9: Số Hán Hàn & Hỏi giá tiền, ngày tháng', hangulTitle: '일, 이, 삼과 가격 묻기', description: 'Cách đọc tiền Won, tiền Đồng và ngày tháng', lessonType: 'speaking', durationMinutes: 15, xpReward: 40, completed: false, locked: true },
        ]
      },
      {
        id: 'mod_t1_02',
        levelId: 'level_1',
        title: 'Module 4: Sinh hoạt hàng ngày & Địa điểm',
        hangulTitle: '일상생활과 장소',
        description: 'Diễn tả hành động thường nhật, hỏi đường và địa điểm',
        totalXp: 220,
        lessons: [
          { id: 'les_t1_04', moduleId: 'mod_t1_02', title: 'Bài 10: Chia đuôi câu thân mật -아/어요', hangulTitle: '현재 시제 -아/어요', description: 'Quy tắc chia nguyên âm dương tính & âm tính', lessonType: 'grammar', durationMinutes: 18, xpReward: 45, completed: false, locked: true },
          { id: 'les_t1_05', moduleId: 'mod_t1_02', title: 'Bài 11: Địa điểm & Tiểu từ Ở đâu (에 / 에서)', hangulTitle: '장소 조사 에와 에서', description: 'Phân biệt nơi tồn tại và nơi diễn ra hành động', lessonType: 'grammar', durationMinutes: 15, xpReward: 40, completed: false, locked: true },
        ]
      }
    ]
  },
  {
    id: 'level_2',
    levelNumber: 2,
    title: 'TOPIK I - Nâng cao (Cấp 2)',
    hangulTitle: '초급 2단계 (TOPIK I - Level 2)',
    description: 'Nắm chắc quá khứ, tương lai, liên từ nối câu và giao tiếp trôi chảy.',
    badgeIcon: 'Award',
    estimatedHours: 40,
    requiredXp: 800,
    modules: [
      {
        id: 'mod_t2_01',
        levelId: 'level_2',
        title: 'Module 5: Thì Quá khứ & Kế hoạch Tương lai',
        hangulTitle: '과거와 미래 시제',
        description: 'Kể về trải nghiệm đã qua và dự định sắp tới',
        totalXp: 250,
        lessons: [
          { id: 'les_t2_01', moduleId: 'mod_t2_01', title: 'Bài 12: Đuôi câu quá khứ -았/었어요', hangulTitle: '과거 시제 표현', description: 'Kể lại việc đã xảy ra hôm qua, năm ngoái', lessonType: 'grammar', durationMinutes: 15, xpReward: 40, completed: false, locked: true },
          { id: 'les_t2_02', moduleId: 'mod_t2_01', title: 'Bài 13: Dự định tương lai -(으)ㄹ 거예요', hangulTitle: '미래 계획 표현', description: 'Nói về dự định cuối tuần và ước mơ', lessonType: 'grammar', durationMinutes: 15, xpReward: 40, completed: false, locked: true },
        ]
      },
      {
        id: 'mod_t2_02',
        levelId: 'level_2',
        title: 'Module 6: Kính ngữ & Lời khuyên',
        hangulTitle: '높임말과 권유',
        description: 'Văn hóa tôn trọng chuẩn Hàn với -(으)시 và -아/어야 해요',
        totalXp: 280,
        lessons: [
          { id: 'les_t2_03', moduleId: 'mod_t2_02', title: 'Bài 14: Kính ngữ chủ ngữ -(으)시', hangulTitle: '주체 높임법', description: 'Cách xưng hô với người lớn tuổi và cấp trên', lessonType: 'grammar', durationMinutes: 16, xpReward: 45, completed: false, locked: true },
          { id: 'les_t2_04', moduleId: 'mod_t2_02', title: 'Bài 15: Bắt buộc & Cấm đoán (-아/어야 하다, -지 마세요)', hangulTitle: '의무와 금지', description: 'Đưa ra lời khuyên và quy định', lessonType: 'grammar', durationMinutes: 15, xpReward: 40, completed: false, locked: true },
        ]
      }
    ]
  },
  {
    id: 'level_3',
    levelNumber: 3,
    title: 'TOPIK II - Trung cấp (Cấp 3-4)',
    hangulTitle: '중급 1단계 (TOPIK II)',
    description: 'Tích lũy 2,500 từ vựng chuyên sâu, ngữ pháp nối phức tạp và viết văn nghị luận.',
    badgeIcon: 'GraduationCap',
    estimatedHours: 60,
    requiredXp: 2000,
    modules: [
      {
        id: 'mod_t3_01',
        levelId: 'level_3',
        title: 'Module 7: Phỏng đoán & Nguyên nhân Gián tiếp',
        hangulTitle: '추측과 간접 원인',
        description: 'Các cấu trúc -는 것 같다, -기 때문에, -(으)ㄴ/는 탓에',
        totalXp: 320,
        lessons: [
          { id: 'les_t3_01', moduleId: 'mod_t3_01', title: 'Bài 16: Phỏng đoán tinh tế -는 것 같다', hangulTitle: '추측 표현', description: 'Diễn đạt ý kiến một cách lịch sự, nhã nhặn', lessonType: 'grammar', durationMinutes: 18, xpReward: 50, completed: false, locked: true },
          { id: 'les_t3_02', moduleId: 'mod_t3_01', title: 'Bài 17: Chỉ mục đích -(으)려고 하다 & -(으)러 가다', hangulTitle: '목적 표현', description: 'Dự định và mục đích hành động', lessonType: 'grammar', durationMinutes: 16, xpReward: 45, completed: false, locked: true },
        ]
      }
    ]
  },
  {
    id: 'level_4',
    levelNumber: 4,
    title: 'Giao tiếp thực tế & Đời sống Seoul',
    hangulTitle: '실전 회화와 서울 라이프',
    description: 'Phản xạ tự nhiên khi thuê nhà, khám bệnh, ngân hàng, đặt đồ ăn app Baemin.',
    badgeIcon: 'MessageCircle',
    estimatedHours: 35,
    requiredXp: 3500,
    modules: [
      {
        id: 'mod_t4_01',
        levelId: 'level_4',
        title: 'Module 8: Xử lý tình huống sinh hoạt tại Hàn',
        hangulTitle: '생활 상황 대처',
        description: 'Các đoạn thoại thực tế chuẩn ngữ điệu người Seoul',
        totalXp: 300,
        lessons: [
          { id: 'les_t4_01', moduleId: 'mod_t4_01', title: 'Bài 18: Đặt đồ ăn online & Giao hàng tận nơi', hangulTitle: '배달 앱 사용하기', description: 'Ghi chú cho shipper, thanh toán', lessonType: 'speaking', durationMinutes: 15, xpReward: 40, completed: false, locked: true },
          { id: 'les_t4_02', moduleId: 'mod_t4_01', title: 'Bài 19: Khám bệnh & Mua thuốc tại tiệm thuốc tây', hangulTitle: '병원과 약국 이용', description: 'Miêu tả triệu chứng đau bụng, sốt, cảm cúm', lessonType: 'speaking', durationMinutes: 15, xpReward: 40, completed: false, locked: true },
        ]
      }
    ]
  },
  {
    id: 'level_5',
    levelNumber: 5,
    title: 'Tiếng Hàn công sở & Doanh nghiệp',
    hangulTitle: '비즈니스 한국어',
    description: 'Giao tiếp với sếp Hàn, viết email chuẩn chỉnh, họp báo cáo và đàm phán.',
    badgeIcon: 'Briefcase',
    estimatedHours: 45,
    requiredXp: 5000,
    modules: [
      {
        id: 'mod_t5_01',
        levelId: 'level_5',
        title: 'Module 9: Văn hóa công ty Hàn & Viết Email',
        hangulTitle: '직장 예절과 비즈니스 메일',
        description: 'Mẫu câu mở đầu, thân bài, kết thúc thư thương mại',
        totalXp: 350,
        lessons: [
          { id: 'les_t5_01', moduleId: 'mod_t5_01', title: 'Bài 20: Viết email công việc chuyên nghiệp', hangulTitle: '업무 이메일 작성법', description: 'Quy chuẩn kính ngữ thương mại', lessonType: 'vocab', durationMinutes: 20, xpReward: 50, completed: false, locked: true },
          { id: 'les_t5_02', moduleId: 'mod_t5_01', title: 'Bài 21: Phỏng vấn xin việc bằng tiếng Hàn', hangulTitle: '한국어 면접 준비', description: 'Giới thiệu thế mạnh, kinh nghiệm làm việc', lessonType: 'speaking', durationMinutes: 20, xpReward: 50, completed: false, locked: true },
        ]
      }
    ]
  },
  {
    id: 'level_6',
    levelNumber: 6,
    title: 'Chiến thuật Luyện thi TOPIK II',
    hangulTitle: 'TOPIK II 실전 모의고사',
    description: 'Giải đề Nghe - Đọc câu 1-50, bẻ khóa bí kíp viết bài luận 600-700 chữ câu 54.',
    badgeIcon: 'Trophy',
    estimatedHours: 50,
    requiredXp: 7000,
    modules: [
      {
        id: 'mod_t6_01',
        levelId: 'level_6',
        title: 'Module 10: Bí kíp Viết câu 53 & 54',
        hangulTitle: '쓰기 53번과 54번 공략',
        description: 'Phân tích biểu đồ và viết luận xã hội đạt 80+ điểm viết',
        totalXp: 400,
        lessons: [
          { id: 'les_t6_01', moduleId: 'mod_t6_01', title: 'Bài 22: Viết mô tả biểu đồ câu 53', hangulTitle: '도표 설명하기', description: 'Từ vựng tăng trưởng, giảm sút, nguyên nhân', lessonType: 'quiz', durationMinutes: 25, xpReward: 60, completed: false, locked: true },
          { id: 'les_t6_02', moduleId: 'mod_t6_01', title: 'Bài 23: Dàn ý và từ nối nghị luận câu 54', hangulTitle: '논설문 작성 전략', description: 'Cấu trúc bài văn 3 phần hoàn hảo', lessonType: 'quiz', durationMinutes: 25, xpReward: 60, completed: false, locked: true },
        ]
      }
    ]
  }
];

// 2. 100+ REALISTIC KOREAN VOCABULARIES (10 TOPICS)
export const fullVocabulariesData: FullVocabulary[] = [
  // Chào hỏi (Greeting)
  { id: 'v1', hangul: '안녕하세요', romaja: 'annyeonghaseyo', vietnamese: 'Xin chào', hanjaVietnamese: 'An ninh [安寧]', topic: 'greeting', topicName: 'Chào hỏi', level: 'level_0', partOfSpeech: 'Cụm từ', exampleKorean: '선생님, 안녕하세요!', exampleVietnamese: 'Thưa thầy, em chào thầy ạ!', difficulty: 1, isFavorite: true, isKnown: true },
  { id: 'v2', hangul: '감사합니다', romaja: 'gamsahamnida', vietnamese: 'Cảm ơn (trang trọng)', hanjaVietnamese: 'Cảm tạ [感謝]', topic: 'greeting', topicName: 'Chào hỏi', level: 'level_0', partOfSpeech: 'Cụm từ', exampleKorean: '도와주셔서 감사합니다.', exampleVietnamese: 'Cảm ơn vì đã giúp đỡ tôi.', difficulty: 1, isKnown: true },
  { id: 'v3', hangul: '죄송합니다', romaja: 'joesonghamnida', vietnamese: 'Xin lỗi (trang trọng)', hanjaVietnamese: 'Tội tùng [罪悚]', topic: 'greeting', topicName: 'Chào hỏi', level: 'level_0', partOfSpeech: 'Cụm từ', exampleKorean: '늦어서 정말 죄송합니다.', exampleVietnamese: 'Tôi thành thật xin lỗi vì đã đến muộn.', difficulty: 1, isKnown: true },
  { id: 'v4', hangul: '안녕히 가세요', romaja: 'annyeonghi gaseyo', vietnamese: 'Tạm biệt (chúc người đi bình an)', topic: 'greeting', topicName: 'Chào hỏi', level: 'level_0', partOfSpeech: 'Cụm từ', exampleKorean: '내일 봐요, 안녕히 가세요!', exampleVietnamese: 'Hẹn gặp lại ngày mai, bạn đi bình an nhé!', difficulty: 2 },
  { id: 'v5', hangul: '안녕히 계세요', romaja: 'annyeonghi gyeseyo', vietnamese: 'Tạm biệt (chúc người ở lại bình an)', topic: 'greeting', topicName: 'Chào hỏi', level: 'level_0', partOfSpeech: 'Cụm từ', exampleKorean: '먼저 들어갈게요, 안녕히 계세요.', exampleVietnamese: 'Tôi xin phép về trước, chúc bạn ở lại bình an.', difficulty: 2 },
  { id: 'v6', hangul: '만나서 반갑습니다', romaja: 'mannaseo bangapseumnida', vietnamese: 'Rất vui được gặp bạn', topic: 'greeting', topicName: 'Chào hỏi', level: 'level_0', partOfSpeech: 'Cụm từ', exampleKorean: '처음 뵙겠습니다. 만나서 반갑습니다.', exampleVietnamese: 'Lần đầu gặp mặt, rất hân hạnh được làm quen với bạn.', difficulty: 2 },
  { id: 'v7', hangul: '잘 부탁드립니다', romaja: 'jal butakdeurimnida', vietnamese: 'Mong được giúp đỡ nhiều', hanjaVietnamese: 'Phụ thác [付託]', topic: 'greeting', topicName: 'Chào hỏi', level: 'level_1', partOfSpeech: 'Cụm từ', exampleKorean: '앞으로 잘 부탁드립니다.', exampleVietnamese: 'Từ nay về sau mong được mọi người giúp đỡ nhiều.', difficulty: 2 },
  { id: 'v8', hangul: '오랜만이에요', romaja: 'oraenmanieyo', vietnamese: 'Lâu rồi không gặp', topic: 'greeting', topicName: 'Chào hỏi', level: 'level_1', partOfSpeech: 'Cụm từ', exampleKorean: '민수 씨, 정말 오랜만이에요!', exampleVietnamese: 'Anh Minsoo, thật sự lâu quá rồi mới gặp!', difficulty: 2 },
  { id: 'v9', hangul: '잘 자요', romaja: 'jal jayo', vietnamese: 'Ngủ ngon nhé (thân mật)', topic: 'greeting', topicName: 'Chào hỏi', level: 'level_0', partOfSpeech: 'Cụm từ', exampleKorean: '좋은 꿈 꾸고 잘 자요.', exampleVietnamese: 'Mơ đẹp và ngủ ngon nhé.', difficulty: 1 },
  { id: 'v10', hangul: '수고하셨습니다', romaja: 'sugohasyeosseumnida', vietnamese: 'Bạn đã vất vả rồi (sau giờ làm)', topic: 'greeting', topicName: 'Chào hỏi', level: 'level_1', partOfSpeech: 'Cụm từ', exampleKorean: '오늘 모두 수고하셨습니다!', exampleVietnamese: 'Hôm nay mọi người đã vất vả nhiều rồi!', difficulty: 2 },

  // Gia đình (Family)
  { id: 'v11', hangul: '가족', romaja: 'gajok', vietnamese: 'Gia đình', hanjaVietnamese: 'Gia tộc [家族]', topic: 'family', topicName: 'Gia đình', level: 'level_1', partOfSpeech: 'Danh từ', exampleKorean: '우리 가족은 네 명이에요.', exampleVietnamese: 'Gia đình tôi có 4 người.', difficulty: 1, isFavorite: true },
  { id: 'v12', hangul: '부모님', romaja: 'bumonim', vietnamese: 'Bố mẹ, phụ mẫu', hanjaVietnamese: 'Phụ mẫu [父母] + nim', topic: 'family', topicName: 'Gia đình', level: 'level_1', partOfSpeech: 'Danh từ', exampleKorean: '부모님께 편지를 썼어요.', exampleVietnamese: 'Tôi đã viết thư cho bố mẹ.', difficulty: 2 },
  { id: 'v13', hangul: '아버지', romaja: 'abeoji', vietnamese: 'Bố, cha', topic: 'family', topicName: 'Gia đình', level: 'level_0', partOfSpeech: 'Danh từ', exampleKorean: '아버지는 회사원입니다.', exampleVietnamese: 'Bố tôi là nhân viên công ty.', difficulty: 1 },
  { id: 'v14', hangul: '어머니', romaja: 'eomeoni', vietnamese: 'Mẹ', topic: 'family', topicName: 'Gia đình', level: 'level_0', partOfSpeech: 'Danh từ', exampleKorean: '어머니는 요리를 잘하세요.', exampleVietnamese: 'Mẹ tôi nấu ăn rất giỏi.', difficulty: 1 },
  { id: 'v15', hangul: '형', romaja: 'hyeong', vietnamese: 'Anh trai (em trai gọi)', topic: 'family', topicName: 'Gia đình', level: 'level_0', partOfSpeech: 'Danh từ', exampleKorean: '형은 대학교에 다녀요.', exampleVietnamese: 'Anh trai tôi đang học đại học.', difficulty: 1 },
  { id: 'v16', hangul: '오빠', romaja: 'oppa', vietnamese: 'Anh trai (em gái gọi)', topic: 'family', topicName: 'Gia đình', level: 'level_0', partOfSpeech: 'Danh từ', exampleKorean: '오빠, 밥 먹었어?', exampleVietnamese: 'Anh ơi, anh đã ăn cơm chưa?', difficulty: 1 },
  { id: 'v17', hangul: '누나', romaja: 'nuna', vietnamese: 'Chị gái (em trai gọi)', topic: 'family', topicName: 'Gia đình', level: 'level_0', partOfSpeech: 'Danh từ', exampleKorean: '누나는 선생님이에요.', exampleVietnamese: 'Chị gái tôi là giáo viên.', difficulty: 1 },
  { id: 'v18', hangul: '언니', romaja: 'eonni', vietnamese: 'Chị gái (em gái gọi)', topic: 'family', topicName: 'Gia đình', level: 'level_0', partOfSpeech: 'Danh từ', exampleKorean: '언니와 쇼핑을 갔어요.', exampleVietnamese: 'Tôi đã đi mua sắm cùng chị gái.', difficulty: 1 },
  { id: 'v19', hangul: '동생', romaja: 'dongsaeng', vietnamese: 'Em (trai hoặc gái)', hanjaVietnamese: 'Đồng sinh [同生]', topic: 'family', topicName: 'Gia đình', level: 'level_1', partOfSpeech: 'Danh từ', exampleKorean: '여동생이 한 명 있어요.', exampleVietnamese: 'Tôi có một cô em gái.', difficulty: 1 },
  { id: 'v20', hangul: '할아버지', romaja: 'harabeoji', vietnamese: 'Ông nội/ngoại', topic: 'family', topicName: 'Gia đình', level: 'level_1', partOfSpeech: 'Danh từ', exampleKorean: '할아버지는 건강하십니다.', exampleVietnamese: 'Ông tôi rất khỏe mạnh.', difficulty: 2 },

  // Ăn uống (Food)
  { id: 'v21', hangul: '음식', romaja: 'eumsik', vietnamese: 'Món ăn, ẩm thực', hanjaVietnamese: 'Ẩm thực [飮食]', topic: 'food', topicName: 'Ăn uống', level: 'level_1', partOfSpeech: 'Danh từ', exampleKorean: '한국 음식을 좋아해요.', exampleVietnamese: 'Tôi rất thích món ăn Hàn Quốc.', difficulty: 1, isFavorite: true },
  { id: 'v22', hangul: '밥', romaja: 'bap', vietnamese: 'Cơm, bữa cơm', topic: 'food', topicName: 'Ăn uống', level: 'level_0', partOfSpeech: 'Danh từ', exampleKorean: '같이 밥 먹으러 가요.', exampleVietnamese: 'Chúng mình cùng đi ăn cơm nhé.', difficulty: 1 },
  { id: 'v23', hangul: '물', romaja: 'mul', vietnamese: 'Nước lọc', topic: 'food', topicName: 'Ăn uống', level: 'level_0', partOfSpeech: 'Danh từ', exampleKorean: '시원한 물 한 잔 주세요.', exampleVietnamese: 'Cho tôi xin một ly nước mát.', difficulty: 1 },
  { id: 'v24', hangul: '김치', romaja: 'gimchi', vietnamese: 'Kim chi', topic: 'food', topicName: 'Ăn uống', level: 'level_0', partOfSpeech: 'Danh từ', exampleKorean: '김치는 매워요.', exampleVietnamese: 'Kim chi có vị cay.', difficulty: 1 },
  { id: 'v25', hangul: '맛있다', romaja: 'masitda', vietnamese: 'Ngon miệng', topic: 'food', topicName: 'Ăn uống', level: 'level_0', partOfSpeech: 'Tính từ', exampleKorean: '이 불고기는 정말 맛있어요.', exampleVietnamese: 'Món thịt nướng Bulgogi này ngon thật đấy.', difficulty: 1 },
  { id: 'v26', hangul: '맵다', romaja: 'maepda', vietnamese: 'Cay', topic: 'food', topicName: 'Ăn uống', level: 'level_1', partOfSpeech: 'Tính từ', exampleKorean: '너무 매운 음식은 못 먹어요.', exampleVietnamese: 'Món ăn cay quá tôi không ăn được.', difficulty: 2 },
  { id: 'v27', hangul: '달다', romaja: 'dalda', vietnamese: 'Ngọt', topic: 'food', topicName: 'Ăn uống', level: 'level_1', partOfSpeech: 'Tính từ', exampleKorean: '이 사과는 아주 달아요.', exampleVietnamese: 'Quả táo này rất ngọt.', difficulty: 2 },
  { id: 'v28', hangul: '짜다', romaja: 'jjada', vietnamese: 'Mặn', topic: 'food', topicName: 'Ăn uống', level: 'level_1', partOfSpeech: 'Tính từ', exampleKorean: '국물이 조금 짜요.', exampleVietnamese: 'Nước canh hơi mặn một chút.', difficulty: 2 },
  { id: 'v29', hangul: '식당', romaja: 'sikdang', vietnamese: 'Nhà hàng, quán ăn', hanjaVietnamese: 'Thực đường [食堂]', topic: 'food', topicName: 'Ăn uống', level: 'level_1', partOfSpeech: 'Danh từ', exampleKorean: '학생 식당에서 점심을 먹어요.', exampleVietnamese: 'Tôi ăn trưa ở căng tin nhà ăn sinh viên.', difficulty: 1 },
  { id: 'v30', hangul: '주문하다', romaja: 'jumunhada', vietnamese: 'Gọi món, đặt hàng', hanjaVietnamese: 'Chú văn [注文]', topic: 'food', topicName: 'Ăn uống', level: 'level_1', partOfSpeech: 'Động từ', exampleKorean: '여기 주문할게요!', exampleVietnamese: 'Cho tôi gọi món với ạ!', difficulty: 2 },

  // Du lịch & Địa điểm (Travel)
  { id: 'v31', hangul: '여행', romaja: 'yeohaeng', vietnamese: 'Du lịch', hanjaVietnamese: 'Lữ hành [旅行]', topic: 'travel', topicName: 'Du lịch', level: 'level_1', partOfSpeech: 'Danh từ', exampleKorean: '제주도로 여행을 가고 싶어요.', exampleVietnamese: 'Tôi muốn đi du lịch đến đảo Jeju.', difficulty: 1 },
  { id: 'v32', hangul: '비행기', romaja: 'bihaenggi', vietnamese: 'Máy bay', hanjaVietnamese: 'Phi hành cơ [飛行機]', topic: 'travel', topicName: 'Du lịch', level: 'level_1', partOfSpeech: 'Danh từ', exampleKorean: '비행기 표를 예매했어요.', exampleVietnamese: 'Tôi đã đặt trước vé máy bay rồi.', difficulty: 2 },
  { id: 'v33', hangul: '호텔', romaja: 'hotel', vietnamese: 'Khách sạn', topic: 'travel', topicName: 'Du lịch', level: 'level_1', partOfSpeech: 'Danh từ', exampleKorean: '호텔을 예약해야 해요.', exampleVietnamese: 'Tôi phải đặt phòng khách sạn.', difficulty: 1 },
  { id: 'v34', hangul: '여권', romaja: 'yeogwon', vietnamese: 'Hộ chiếu', hanjaVietnamese: 'Lữ khoán [旅券]', topic: 'travel', topicName: 'Du lịch', level: 'level_1', partOfSpeech: 'Danh từ', exampleKorean: '여권을 잊지 마세요.', exampleVietnamese: 'Đừng quên mang theo hộ chiếu nhé.', difficulty: 2 },
  { id: 'v35', hangul: '공항', romaja: 'gonghang', vietnamese: 'Sân bay, phi trường', hanjaVietnamese: 'Không cảng [空港]', topic: 'travel', topicName: 'Du lịch', level: 'level_1', partOfSpeech: 'Danh từ', exampleKorean: '인천공항에 도착했습니다.', exampleVietnamese: 'Tôi đã đến sân bay Incheon rồi.', difficulty: 2 },
  { id: 'v36', hangul: '지하철', romaja: 'jihacheol', vietnamese: 'Tàu điện ngầm', hanjaVietnamese: 'Địa hạ thiết [地下鐵]', topic: 'travel', topicName: 'Du lịch', level: 'level_1', partOfSpeech: 'Danh từ', exampleKorean: '지하철을 타고 이동해요.', exampleVietnamese: 'Tôi di chuyển bằng tàu điện ngầm.', difficulty: 2 },
  { id: 'v37', hangul: '지도', romaja: 'jido', vietnamese: 'Bản đồ', hanjaVietnamese: 'Địa đồ [地圖]', topic: 'travel', topicName: 'Du lịch', level: 'level_1', partOfSpeech: 'Danh từ', exampleKorean: '지도를 보고 길을 찾았어요.', exampleVietnamese: 'Tôi đã nhìn bản đồ và tìm thấy đường.', difficulty: 2 },
  { id: 'v38', hangul: '관광지', romaja: 'gwangwangji', vietnamese: 'Địa điểm tham quan du lịch', hanjaVietnamese: 'Quan quang địa [觀光地]', topic: 'travel', topicName: 'Du lịch', level: 'level_2', partOfSpeech: 'Danh từ', exampleKorean: '유명한 관광지가 많아요.', exampleVietnamese: 'Có rất nhiều địa danh tham quan nổi tiếng.', difficulty: 3 },
  { id: 'v39', hangul: '사진을 찍다', romaja: 'sajineul jjikda', vietnamese: 'Chụp ảnh', hanjaVietnamese: 'Tả chân [寫眞]', topic: 'travel', topicName: 'Du lịch', level: 'level_1', partOfSpeech: 'Cụm từ', exampleKorean: '여기서 사진 한 장 찍어 주세요.', exampleVietnamese: 'Xin hãy chụp giúp tôi một tấm ảnh ở đây.', difficulty: 2 },
  { id: 'v40', hangul: '기념품', romaja: 'ginyeompum', vietnamese: 'Đồ lưu niệm', hanjaVietnamese: 'Kỷ niệm phẩm [記念品]', topic: 'travel', topicName: 'Du lịch', level: 'level_2', partOfSpeech: 'Danh từ', exampleKorean: '친구들에게 줄 기념품을 샀어요.', exampleVietnamese: 'Tôi đã mua đồ lưu niệm để tặng bạn bè.', difficulty: 3 },

  // Mua sắm (Shopping)
  { id: 'v41', hangul: '쇼핑', romaja: 'syoping', vietnamese: 'Mua sắm', topic: 'shopping', topicName: 'Mua sắm', level: 'level_1', partOfSpeech: 'Danh từ', exampleKorean: '주말에 명동에서 쇼핑해요.', exampleVietnamese: 'Cuối tuần tôi đi mua sắm ở Myeongdong.', difficulty: 1 },
  { id: 'v42', hangul: '가격', romaja: 'gagyeok', vietnamese: 'Giá cả', hanjaVietnamese: 'Giá cách [價格]', topic: 'shopping', topicName: 'Mua sắm', level: 'level_1', partOfSpeech: 'Danh từ', exampleKorean: '이 옷의 가격은 얼마예요?', exampleVietnamese: 'Giá của bộ quần áo này là bao nhiêu vậy?', difficulty: 2 },
  { id: 'v43', hangul: '비싸다', romaja: 'bissada', vietnamese: 'Đắt', topic: 'shopping', topicName: 'Mua sắm', level: 'level_1', partOfSpeech: 'Tính từ', exampleKorean: '조금 비싸서 못 샀어요.', exampleVietnamese: 'Hơi đắt nên tôi đã không mua.', difficulty: 1 },
  { id: 'v44', hangul: '싸다', romaja: 'ssada', vietnamese: 'Rẻ', topic: 'shopping', topicName: 'Mua sắm', level: 'level_1', partOfSpeech: 'Tính từ', exampleKorean: '여기는 물건이 아주 싸요.', exampleVietnamese: 'Ở đây đồ đạc rất rẻ.', difficulty: 1 },
  { id: 'v45', hangul: '할인', romaja: 'harin', vietnamese: 'Giảm giá', hanjaVietnamese: 'Cát dẫn [割引]', topic: 'shopping', topicName: 'Mua sắm', level: 'level_2', partOfSpeech: 'Danh từ', exampleKorean: '20% 할인 행사 중입니다.', exampleVietnamese: 'Đang trong chương trình giảm giá 20%.', difficulty: 2 },
  { id: 'v46', hangul: '영수증', romaja: 'yeongsujeung', vietnamese: 'Hóa đơn thanh toán', hanjaVietnamese: 'Lãnh thụ chứng [領收證]', topic: 'shopping', topicName: 'Mua sắm', level: 'level_2', partOfSpeech: 'Danh từ', exampleKorean: '영수증 버려 주세요.', exampleVietnamese: 'Xin hãy vứt hóa đơn giúp tôi.', difficulty: 2 },
  { id: 'v47', hangul: '환불하다', romaja: 'hwanbulhada', vietnamese: 'Hoàn tiền, trả lại hàng', hanjaVietnamese: 'Hoán phất [換拂]', topic: 'shopping', topicName: 'Mua sắm', level: 'level_2', partOfSpeech: 'Động từ', exampleKorean: '이 제품 환불하고 싶어요.', exampleVietnamese: 'Tôi muốn trả lại sản phẩm này và nhận lại tiền.', difficulty: 3 },
  { id: 'v48', hangul: '카드', romaja: 'kadeu', vietnamese: 'Thẻ ngân hàng', topic: 'shopping', topicName: 'Mua sắm', level: 'level_0', partOfSpeech: 'Danh từ', exampleKorean: '카드로 계산할게요.', exampleVietnamese: 'Tôi sẽ thanh toán bằng thẻ.', difficulty: 1 },
  { id: 'v49', hangul: '현금', romaja: 'hyeongeum', vietnamese: 'Tiền mặt', hanjaVietnamese: 'Hiện kim [現金]', topic: 'shopping', topicName: 'Mua sắm', level: 'level_1', partOfSpeech: 'Danh từ', exampleKorean: '현금으로 내면 더 깎아 줘요.', exampleVietnamese: 'Nếu trả bằng tiền mặt thì được giảm thêm.', difficulty: 2 },
  { id: 'v50', hangul: '백화점', romaja: 'baekhwajeom', vietnamese: 'Trung tâm thương mại', hanjaVietnamese: 'Bách hóa điếm [百貨店]', topic: 'shopping', topicName: 'Mua sắm', level: 'level_2', partOfSpeech: 'Danh từ', exampleKorean: '백화점에서 선물을 샀어요.', exampleVietnamese: 'Tôi đã mua quà ở trung tâm thương mại.', difficulty: 2 },

  // Trường học (School)
  { id: 'v51', hangul: '학생', romaja: 'haksaeng', vietnamese: 'Học sinh, sinh viên', hanjaVietnamese: 'Học sinh [學生]', topic: 'school', topicName: 'Trường học', level: 'level_0', partOfSpeech: 'Danh từ', exampleKorean: '저는 하노이 대학교 학생입니다.', exampleVietnamese: 'Tôi là sinh viên trường Đại học Hà Nội.', difficulty: 1, isFavorite: true },
  { id: 'v52', hangul: '선생님', romaja: 'seonsaengnim', vietnamese: 'Thầy / Cô giáo', hanjaVietnamese: 'Tiên sinh [先生] + nim', topic: 'school', topicName: 'Trường học', level: 'level_0', partOfSpeech: 'Danh từ', exampleKorean: '선생님, 질문이 있습니다.', exampleVietnamese: 'Thưa cô, em có câu hỏi ạ.', difficulty: 1 },
  { id: 'v53', hangul: '학교', romaja: 'hakgyo', vietnamese: 'Trường học', hanjaVietnamese: 'Học hiệu [學校]', topic: 'school', topicName: 'Trường học', level: 'level_0', partOfSpeech: 'Danh từ', exampleKorean: '내일 아침 학교에 가요.', exampleVietnamese: 'Sáng mai tôi đến trường.', difficulty: 1 },
  { id: 'v54', hangul: '도서관', romaja: 'doseogwan', vietnamese: 'Thư viện', hanjaVietnamese: 'Đồ thư quán [圖書館]', topic: 'school', topicName: 'Trường học', level: 'level_1', partOfSpeech: 'Danh từ', exampleKorean: '도서관에서 책을 빌렸어요.', exampleVietnamese: 'Tôi đã mượn sách ở thư viện.', difficulty: 2 },
  { id: 'v55', hangul: '시험', romaja: 'siheom', vietnamese: 'Kỳ thi, bài kiểm tra', hanjaVietnamese: 'Thí nghiệm [試驗]', topic: 'school', topicName: 'Trường học', level: 'level_1', partOfSpeech: 'Danh từ', exampleKorean: '다음 주에 한국어 시험이 있어요.', exampleVietnamese: 'Tuần sau tôi có bài thi tiếng Hàn.', difficulty: 2 },
  { id: 'v56', hangul: '공부하다', romaja: 'gongbuhada', vietnamese: 'Học tập', hanjaVietnamese: 'Công phu [工夫]', topic: 'school', topicName: 'Trường học', level: 'level_0', partOfSpeech: 'Động từ', exampleKorean: '매일 저녁 한국어를 공부해요.', exampleVietnamese: 'Mỗi tối tôi đều học tiếng Hàn.', difficulty: 1 },
  { id: 'v57', hangul: '숙제', romaja: 'sukje', vietnamese: 'Bài tập về nhà', hanjaVietnamese: 'Túc đề [宿題]', topic: 'school', topicName: 'Trường học', level: 'level_1', partOfSpeech: 'Danh từ', exampleKorean: '숙제를 다 끝냈어요.', exampleVietnamese: 'Tôi đã hoàn thành xong bài tập về nhà.', difficulty: 2 },
  { id: 'v58', hangul: '사전', romaja: 'sajeon', vietnamese: 'Từ điển', hanjaVietnamese: 'Từ điển [辭典]', topic: 'school', topicName: 'Trường học', level: 'level_1', partOfSpeech: 'Danh từ', exampleKorean: '모르는 단어는 사전을 찾아봐요.', exampleVietnamese: 'Từ vựng không biết thì tra từ điển.', difficulty: 2 },
  { id: 'v59', hangul: '교실', romaja: 'gyosil', vietnamese: 'Phòng học, lớp học', hanjaVietnamese: 'Giáo thất [敎室]', topic: 'school', topicName: 'Trường học', level: 'level_1', partOfSpeech: 'Danh từ', exampleKorean: '교실에 컴퓨터가 있어요.', exampleVietnamese: 'Trong phòng học có máy vi tính.', difficulty: 2 },
  { id: 'v60', hangul: '장학금', romaja: 'janghakgeum', vietnamese: 'Học bổng', hanjaVietnamese: 'Tưởng học kim [奬學金]', topic: 'school', topicName: 'Trường học', level: 'level_2', partOfSpeech: 'Danh từ', exampleKorean: '열심히 공부해서 장학금을 받았어요.', exampleVietnamese: 'Nhờ học tập chăm chỉ nên tôi đã nhận được học bổng.', difficulty: 3 },

  // Công việc & Công sở (Work)
  { id: 'v61', hangul: '회사', romaja: 'hoesa', vietnamese: 'Công ty', hanjaVietnamese: 'Hội xã [會社]', topic: 'work', topicName: 'Công việc', level: 'level_1', partOfSpeech: 'Danh từ', exampleKorean: '한국 회사에서 일하고 있어요.', exampleVietnamese: 'Tôi đang làm việc ở công ty Hàn Quốc.', difficulty: 1 },
  { id: 'v62', hangul: '회사원', romaja: 'hoesawon', vietnamese: 'Nhân viên công ty', hanjaVietnamese: 'Hội xã viên [會社員]', topic: 'work', topicName: 'Công việc', level: 'level_1', partOfSpeech: 'Danh từ', exampleKorean: '민수 씨는 대기업 회사원이에요.', exampleVietnamese: 'Anh Minsoo là nhân viên của tập đoàn lớn.', difficulty: 1 },
  { id: 'v63', hangul: '회의', romaja: 'hoe-ui', vietnamese: 'Cuộc họp', hanjaVietnamese: 'Hội nghị [會議]', topic: 'work', topicName: 'Công việc', level: 'level_2', partOfSpeech: 'Danh từ', exampleKorean: '오후 2시에 중요한 회의가 있습니다.', exampleVietnamese: '2 giờ chiều nay có cuộc họp quan trọng.', difficulty: 2 },
  { id: 'v64', hangul: '보고서', romaja: 'bogoseo', vietnamese: 'Bản báo cáo', hanjaVietnamese: 'Báo cáo thư [報告書]', topic: 'work', topicName: 'Công việc', level: 'level_2', partOfSpeech: 'Danh từ', exampleKorean: '팀장님께 보고서를 제출했습니다.', exampleVietnamese: 'Tôi đã nộp bản báo cáo cho trưởng nhóm.', difficulty: 3 },
  { id: 'v65', hangul: '월급', romaja: 'wolgeup', vietnamese: 'Lương tháng', hanjaVietnamese: 'Nguyệt cấp [月給]', topic: 'work', topicName: 'Công việc', level: 'level_2', partOfSpeech: 'Danh từ', exampleKorean: '오늘이 바로 월급날이에요!', exampleVietnamese: 'Hôm nay chính là ngày nhận lương!', difficulty: 2 },
  { id: 'v66', hangul: '출근하다', romaja: 'chulgeunhada', vietnamese: 'Đi làm (bắt đầu giờ làm)', hanjaVietnamese: 'Xuất cần [出勤]', topic: 'work', topicName: 'Công việc', level: 'level_2', partOfSpeech: 'Động từ', exampleKorean: '매일 아침 8시 반에 출근해요.', exampleVietnamese: 'Mỗi sáng tôi đi làm lúc 8 giờ rưỡi.', difficulty: 2 },
  { id: 'v67', hangul: '퇴근하다', romaja: 'toegeunhada', vietnamese: 'Tan sở, hết giờ làm', hanjaVietnamese: 'Thoái cần [退勤]', topic: 'work', topicName: 'Công việc', level: 'level_2', partOfSpeech: 'Động từ', exampleKorean: '일찍 퇴근해서 친구를 만났어요.', exampleVietnamese: 'Tôi tan làm sớm rồi đi gặp bạn.', difficulty: 2 },
  { id: 'v68', hangul: '야근', romaja: 'yageun', vietnamese: 'Làm thêm giờ ban đêm (OT)', hanjaVietnamese: 'Dạ cần [夜勤]', topic: 'work', topicName: 'Công việc', level: 'level_2', partOfSpeech: 'Danh từ', exampleKorean: '오늘은 야근을 해야 할 것 같아요.', exampleVietnamese: 'Có vẻ như hôm nay tôi phải làm tăng ca đêm.', difficulty: 3 },
  { id: 'v69', hangul: '이력서', romaja: 'iryeokseo', vietnamese: 'Bản sơ yếu lý lịch (CV)', hanjaVietnamese: 'Lý lịch thư [履歷書]', topic: 'work', topicName: 'Công việc', level: 'level_3', partOfSpeech: 'Danh từ', exampleKorean: '이력서를 메일로 보냈습니다.', exampleVietnamese: 'Tôi đã gửi CV qua email rồi.', difficulty: 3 },
  { id: 'v70', hangul: '면접', romaja: 'myeonjeop', vietnamese: 'Phỏng vấn', hanjaVietnamese: 'Diện tiếp [面接]', topic: 'work', topicName: 'Công việc', level: 'level_3', partOfSpeech: 'Danh từ', exampleKorean: '내일 오전 면접을 봅니다.', exampleVietnamese: 'Sáng mai tôi có buổi phỏng vấn xin việc.', difficulty: 3 },

  // Cảm xúc & Tâm trạng (Emotion)
  { id: 'v71', hangul: '행복하다', romaja: 'haengbokhada', vietnamese: 'Hạnh phúc', hanjaVietnamese: 'Hạnh phúc [幸福]', topic: 'emotion', topicName: 'Cảm xúc', level: 'level_1', partOfSpeech: 'Tính từ', exampleKorean: '가족과 함께 있어서 행복해요.', exampleVietnamese: 'Ở bên gia đình tôi cảm thấy rất hạnh phúc.', difficulty: 1 },
  { id: 'v72', hangul: '기쁘다', romaja: 'gippeuda', vietnamese: 'Vui mừng, phấn khởi', topic: 'emotion', topicName: 'Cảm xúc', level: 'level_1', partOfSpeech: 'Tính từ', exampleKorean: '시험에 합격해서 정말 기뻐요.', exampleVietnamese: 'Vì thi đỗ nên tôi vui mừng khôn xiết.', difficulty: 2 },
  { id: 'v73', hangul: '슬프다', romaja: 'seulpeuda', vietnamese: 'Buồn bã', topic: 'emotion', topicName: 'Cảm xúc', level: 'level_1', partOfSpeech: 'Tính từ', exampleKorean: '영화가 너무 슬퍼서 울었어요.', exampleVietnamese: 'Bộ phim buồn quá làm tôi khóc.', difficulty: 2 },
  { id: 'v74', hangul: '화나다', romaja: 'hwanada', vietnamese: 'Tức giận, phát cáu', hanjaVietnamese: 'Hỏa [火]', topic: 'emotion', topicName: 'Cảm xúc', level: 'level_1', partOfSpeech: 'Động từ', exampleKorean: '왜 그렇게 화가 났어요?', exampleVietnamese: 'Sao bạn lại tức giận đến thế?', difficulty: 2 },
  { id: 'v75', hangul: '걱정하다', romaja: 'geokjeonghada', vietnamese: 'Lo lắng', topic: 'emotion', topicName: 'Cảm xúc', level: 'level_1', partOfSpeech: 'Động từ', exampleKorean: '너무 걱정하지 마세요, 잘 될 거예요.', exampleVietnamese: 'Đừng lo lắng quá, mọi chuyện sẽ ổn thôi.', difficulty: 2 },
  { id: 'v76', hangul: '심심하다', romaja: 'simsimhada', vietnamese: 'Buồn chán (không có việc gì làm)', topic: 'emotion', topicName: 'Cảm xúc', level: 'level_1', partOfSpeech: 'Tính từ', exampleKorean: '주말인데 심심해요.', exampleVietnamese: 'Cuối tuần mà chán quá chẳng có gì làm.', difficulty: 2 },
  { id: 'v77', hangul: '피곤하다', romaja: 'pigonhada', vietnamese: 'Mệt mỏi, kiệt sức', hanjaVietnamese: 'Bì khốn [疲困]', topic: 'emotion', topicName: 'Cảm xúc', level: 'level_1', partOfSpeech: 'Tính từ', exampleKorean: '오늘 일을 많이 해서 피곤해요.', exampleVietnamese: 'Hôm nay làm nhiều việc quá nên tôi mệt.', difficulty: 2 },
  { id: 'v78', hangul: '긴장되다', romaja: 'ginjangdoeda', vietnamese: 'Căng thẳng, hồi hộp', hanjaVietnamese: 'Khẩn trương [緊張]', topic: 'emotion', topicName: 'Cảm xúc', level: 'level_2', partOfSpeech: 'Tính từ', exampleKorean: '무대에 서니까 너무 긴장돼요.', exampleVietnamese: 'Đứng lên sân khấu làm tôi rất hồi hộp.', difficulty: 3 },
  { id: 'v79', hangul: '자랑스럽다', romaja: 'jarangseureopda', vietnamese: 'Tự hào', topic: 'emotion', topicName: 'Cảm xúc', level: 'level_2', partOfSpeech: 'Tính từ', exampleKorean: '네가 정말 자랑스러워!', exampleVietnamese: 'Bố mẹ rất tự hào về con!', difficulty: 3 },
  { id: 'v80', hangul: '설레다', romaja: 'seolleda', vietnamese: 'Xao xuyến, háo hức', topic: 'emotion', topicName: 'Cảm xúc', level: 'level_2', partOfSpeech: 'Động từ', exampleKorean: '한국에 갈 생각을 하니 가슴이 설레요.', exampleVietnamese: 'Cứ nghĩ đến chuyện sắp đi Hàn là lòng tôi lại rạo rực háo hức.', difficulty: 3 },

  // Đời sống hàng ngày (Daily life)
  { id: 'v81', hangul: '시간', romaja: 'sigan', vietnamese: 'Thời gian', hanjaVietnamese: 'Thời gian [時間]', topic: 'daily', topicName: 'Đời sống', level: 'level_0', partOfSpeech: 'Danh từ', exampleKorean: '지금 이야기할 시간 있어요?', exampleVietnamese: 'Bây giờ bạn có thời gian nói chuyện không?', difficulty: 1 },
  { id: 'v82', hangul: '약속', romaja: 'yaksok', vietnamese: 'Cuộc hẹn, lời hứa', hanjaVietnamese: 'Ước thúc [約束]', topic: 'daily', topicName: 'Đời sống', level: 'level_1', partOfSpeech: 'Danh từ', exampleKorean: '오늘 저녁에 친구와 약속이 있어요.', exampleVietnamese: 'Tối nay tôi có hẹn với bạn.', difficulty: 2 },
  { id: 'v83', hangul: '전화하다', romaja: 'jeonhwahada', vietnamese: 'Gọi điện thoại', hanjaVietnamese: 'Điện thoại [電話]', topic: 'daily', topicName: 'Đời sống', level: 'level_0', partOfSpeech: 'Động từ', exampleKorean: '집에 도착해서 전화할게요.', exampleVietnamese: 'Về đến nhà tôi sẽ gọi điện nhé.', difficulty: 1 },
  { id: 'v84', hangul: '청소하다', romaja: 'cheongsohada', vietnamese: 'Dọn dẹp vệ sinh', hanjaVietnamese: 'Thanh tảo [淸掃]', topic: 'daily', topicName: 'Đời sống', level: 'level_1', partOfSpeech: 'Động từ', exampleKorean: '주말마다 방을 청소해요.', exampleVietnamese: 'Cứ mỗi cuối tuần tôi đều dọn phòng.', difficulty: 2 },
  { id: 'v85', hangul: '세수하다', romaja: 'sesuhada', vietnamese: 'Rửa mặt', hanjaVietnamese: 'Tẩy thủ [洗手]', topic: 'daily', topicName: 'Đời sống', level: 'level_1', partOfSpeech: 'Động từ', exampleKorean: '일어나자마자 세수했어요.', exampleVietnamese: 'Vừa ngủ dậy là tôi đi rửa mặt ngay.', difficulty: 2 },
  { id: 'v86', hangul: '운동하다', romaja: 'undonghada', vietnamese: 'Tập thể dục thể thao', hanjaVietnamese: 'Vận động [運動]', topic: 'daily', topicName: 'Đời sống', level: 'level_1', partOfSpeech: 'Động từ', exampleKorean: '건강을 위해서 매일 운동해요.', exampleVietnamese: 'Vì sức khỏe nên tôi tập thể dục mỗi ngày.', difficulty: 2 },
  { id: 'v87', hangul: '날씨', romaja: 'nalssi', vietnamese: 'Thời tiết', topic: 'daily', topicName: 'Đời sống', level: 'level_1', partOfSpeech: 'Danh từ', exampleKorean: '오늘 날씨가 정말 맑고 따뜻해요.', exampleVietnamese: 'Thời tiết hôm nay thật trong lành và ấm áp.', difficulty: 1 },
  { id: 'v88', hangul: '비가 오다', romaja: 'biga oda', vietnamese: 'Trời mưa', topic: 'daily', topicName: 'Đời sống', level: 'level_1', partOfSpeech: 'Cụm từ', exampleKorean: '우산을 챙기세요, 밖에 비가 와요.', exampleVietnamese: 'Hãy mang theo ô nhé, ngoài trời đang mưa đấy.', difficulty: 1 },
  { id: 'v89', hangul: '버스', romaja: 'beoseu', vietnamese: 'Xe buýt', topic: 'daily', topicName: 'Đời sống', level: 'level_0', partOfSpeech: 'Danh từ', exampleKorean: '몇 번 버스를 타야 해요?', exampleVietnamese: 'Tôi phải bắt tuyến xe buýt số mấy ạ?', difficulty: 1 },
  { id: 'v90', hangul: '택시', romaja: 'taeksi', vietnamese: 'Xe taxi', topic: 'daily', topicName: 'Đời sống', level: 'level_0', partOfSpeech: 'Danh từ', exampleKorean: '늦어서 택시를 탔어요.', exampleVietnamese: 'Vì muộn nên tôi đã đi taxi.', difficulty: 1 },

  // Ôn thi TOPIK chuyên sâu (TOPIK)
  { id: 'v91', hangul: '증가하다', romaja: 'jeunggahada', vietnamese: 'Gia tăng, tăng lên', hanjaVietnamese: 'Tăng gia [增加]', topic: 'topik', topicName: 'TOPIK', level: 'level_3', partOfSpeech: 'Động từ', exampleKorean: '외국인 유학생 수가 크게 증가했다.', exampleVietnamese: 'Số lượng du học sinh nước ngoài đã tăng mạnh.', difficulty: 4 },
  { id: 'v92', hangul: '감소하다', romaja: 'gamsohada', vietnamese: 'Giảm xuống, sụt giảm', hanjaVietnamese: 'Giảm thiểu [減少]', topic: 'topik', topicName: 'TOPIK', level: 'level_3', partOfSpeech: 'Động từ', exampleKorean: '출산율이 급격히 감소하고 있다.', exampleVietnamese: 'Tỷ lệ sinh con đang giảm sút nhanh chóng.', difficulty: 4 },
  { id: 'v93', hangul: '원인', romaja: 'won-in', vietnamese: 'Nguyên nhân', hanjaVietnamese: 'Nguyên nhân [原因]', topic: 'topik', topicName: 'TOPIK', level: 'level_3', partOfSpeech: 'Danh từ', exampleKorean: '사고의 원인을 철저히 조사 중이다.', exampleVietnamese: 'Đang điều tra kỹ lưỡng nguyên nhân vụ tai nạn.', difficulty: 4 },
  { id: 'v94', hangul: '결과', romaja: 'gyeolgwa', vietnamese: 'Kết quả', hanjaVietnamese: 'Kết quả [結果]', topic: 'topik', topicName: 'TOPIK', level: 'level_3', partOfSpeech: 'Danh từ', exampleKorean: '노력한 만큼 좋은 결과가 나왔다.', exampleVietnamese: 'Nỗ lực bao nhiêu thì kết quả tốt bấy nhiêu.', difficulty: 4 },
  { id: 'v95', hangul: '영향을 미치다', romaja: 'yeonghyangeul michida', vietnamese: 'Gây ảnh hưởng, tác động', hanjaVietnamese: 'Ảnh hưởng [影響]', topic: 'topik', topicName: 'TOPIK', level: 'level_3', partOfSpeech: 'Cụm từ', exampleKorean: '환경 오염은 인류 건강에 큰 영향을 미친다.', exampleVietnamese: 'Ô nhiễm môi trường gây ảnh hưởng to lớn đến sức khỏe nhân loại.', difficulty: 4 },
  { id: 'v96', hangul: '발전하다', romaja: 'baljeonhada', vietnamese: 'Phát triển', hanjaVietnamese: 'Phát triển [發展]', topic: 'topik', topicName: 'TOPIK', level: 'level_3', partOfSpeech: 'Động từ', exampleKorean: '과학 기술이 눈부시게 발전했다.', exampleVietnamese: 'Khoa học kỹ thuật đã phát triển vượt bậc.', difficulty: 4 },
  { id: 'v97', hangul: '문제점', romaja: 'munjejeom', vietnamese: 'Điểm nan giải, vấn đề', hanjaVietnamese: 'Vấn đề điểm [問題點]', topic: 'topik', topicName: 'TOPIK', level: 'level_3', partOfSpeech: 'Danh từ', exampleKorean: '이 제도의 문제점을 지적했다.', exampleVietnamese: 'Đã chỉ ra các điểm bất cập của chế độ này.', difficulty: 4 },
  { id: 'v98', hangul: '해결 방안', romaja: 'haegyeol bangan', vietnamese: 'Phương án giải quyết', hanjaVietnamese: 'Giải quyết phương án [解決方案]', topic: 'topik', topicName: 'TOPIK', level: 'level_3', partOfSpeech: 'Danh từ', exampleKorean: '효과적인 해결 방안을 모색해야 한다.', exampleVietnamese: 'Cần tìm kiếm các phương án giải quyết mang lại hiệu quả.', difficulty: 5 },
  { id: 'v99', hangul: '반면에', romaja: 'banmyeone', vietnamese: 'Ngược lại, mặt khác', hanjaVietnamese: 'Phản diện [反面]', topic: 'topik', topicName: 'TOPIK', level: 'level_3', partOfSpeech: 'Phó từ', exampleKorean: '장점이 있는 반면에 단점도 존재한다.', exampleVietnamese: 'Có ưu điểm nhưng ngược lại cũng tồn tại nhược điểm.', difficulty: 4 },
  { id: 'v100', hangul: '주장하다', romaja: 'jujanghada', vietnamese: 'Chủ trương, khẳng định quan điểm', hanjaVietnamese: 'Chủ trương [主張]', topic: 'topik', topicName: 'TOPIK', level: 'level_3', partOfSpeech: 'Động từ', exampleKorean: '자신의 의견을 논리적으로 주장했다.', exampleVietnamese: 'Đã khẳng định quan điểm của mình một cách chặt chẽ theo logic.', difficulty: 5 },
];

// 3. 30 GRAMMAR POINTS
export const fullGrammarData: GrammarPoint[] = [
  {
    id: 'g01',
    pattern: 'N 은/는',
    name: 'Tiểu từ chủ đề',
    level: 'Sơ cấp 1',
    meaning: 'Đứng sau danh từ để nhấn mạnh chủ đề của câu hoặc thể hiện sự so sánh, đối chiếu.',
    formula: 'Danh từ có patchim + 은 / Không patchim + 는',
    usageNotes: 'Khác với 이/가 (nhấn mạnh tân ngữ/chủ ngữ cụ thể), 은/는 nhấn mạnh thông tin mới phía sau vị ngữ.',
    commonMistakes: 'Dùng nhầm 은 cho từ không có patchim (ví dụ: 저은 -> sai, phải là 저는).',
    examples: [
      { korean: '저는 베트남 사람입니다.', vietnamese: 'Tôi là người Việt Nam.' },
      { korean: '이 책은 재미있어요.', vietnamese: 'Cuốn sách này rất hay.' }
    ]
  },
  {
    id: 'g02',
    pattern: 'N 이/가',
    name: 'Tiểu từ chủ ngữ',
    level: 'Sơ cấp 1',
    meaning: 'Gắn sau danh từ để biểu thị danh từ đó là chủ ngữ thực hiện hành động hoặc trạng thái.',
    formula: 'Danh từ có patchim + 이 / Không patchim + 가',
    usageNotes: 'Thường đi kèm với 있다/없다, 좋다/싫다, 아니다 hoặc khi xuất hiện chủ ngữ mới lần đầu.',
    commonMistakes: 'Nhầm lẫn giữa 은/는 và 이/가 khi miêu tả thời tiết (phải dùng 날씨가 좋아요).',
    examples: [
      { korean: '비가 와요.', vietnamese: 'Trời đang mưa.' },
      { korean: '시간이 없어요.', vietnamese: 'Tôi không có thời gian.' }
    ]
  },
  {
    id: 'g03',
    pattern: 'N 을/를',
    name: 'Tiểu từ tân ngữ',
    level: 'Sơ cấp 1',
    meaning: 'Gắn sau danh từ chịu tác động trực tiếp của ngoại động từ.',
    formula: 'Danh từ có patchim + 을 / Không patchim + 를',
    usageNotes: 'Trong khẩu ngữ đời thường, 을/를 có thể được lược bỏ nếu câu văn đã rõ nghĩa.',
    commonMistakes: 'Dùng 을/를 với nội động từ hoặc tính từ (ví dụ: 한국어를 좋아요 -> Sai, phải là 한국어가 좋아요).',
    examples: [
      { korean: '밥을 먹어요.', vietnamese: 'Tôi ăn cơm.' },
      { korean: '한국어를 배워요.', vietnamese: 'Tôi học tiếng Hàn.' }
    ]
  },
  {
    id: 'g04',
    pattern: 'N 이에요/예요',
    name: 'Đuôi câu danh từ Là...',
    level: 'Sơ cấp 1',
    meaning: 'Đuôi câu thân mật lịch sự dùng để định nghĩa hoặc giới thiệu danh từ.',
    formula: 'Có patchim + 이에요 / Không patchim + 예요',
    usageNotes: 'Tương đương với 입니다 ở phong cách trang trọng.',
    commonMistakes: 'Nhầm giữa 이에요 và 예요 với các từ kết thúc bằng nguyên âm.',
    examples: [
      { korean: '저는 학생이에요.', vietnamese: 'Tôi là học sinh.' },
      { korean: '여기는 학교예요.', vietnamese: 'Đây là trường học.' }
    ]
  },
  {
    id: 'g05',
    pattern: 'N이/가 있어요/없어요',
    name: 'Có / Không có...',
    level: 'Sơ cấp 1',
    meaning: 'Diễn tả sự tồn tại hoặc sở hữu một đồ vật, người hoặc thời gian.',
    formula: 'Danh từ + 이/가 + 있어요/없어요',
    usageNotes: 'Cũng dùng để chỉ sự hiện diện ở một địa điểm nào đó (N에 있어요).',
    commonMistakes: 'Dùng tiểu từ 을/를 trước 있어요/없어요 (Sai).',
    examples: [
      { korean: '한국 친구가 있어요.', vietnamese: 'Tôi có bạn người Hàn Quốc.' },
      { korean: '돈이 없어요.', vietnamese: 'Tôi không có tiền.' }
    ]
  },
  {
    id: 'g06',
    pattern: '안 / V-지 않다',
    name: 'Phủ định Không...',
    level: 'Sơ cấp 1',
    meaning: 'Diễn tả hành động hoặc trạng thái không xảy ra do ý chí của chủ thể.',
    formula: '안 + Động từ/Tính từ HOẶC Gốc ĐT/TT + -지 않아요',
    usageNotes: 'Với động từ 하다, đặt 안 trước 하다 (ví dụ: 공부 안 해요).',
    commonMistakes: 'Dùng 안 với tính từ phức tạp hoặc nhầm sang 못 (không thể).',
    examples: [
      { korean: '오늘은 학교에 안 가요.', vietnamese: 'Hôm nay tôi không đến trường.' },
      { korean: '이 음식은 맵지 않아요.', vietnamese: 'Món này không cay.' }
    ]
  },
  {
    id: 'g07',
    pattern: 'V-고 싶어요',
    name: 'Muốn làm gì đó...',
    level: 'Sơ cấp 1',
    meaning: 'Thể hiện mong muốn, nguyện vọng của người nói ở ngôi thứ nhất.',
    formula: 'Gốc động từ + -고 싶어요 (Ngôi 3: -고 싶어해요)',
    usageNotes: 'Chỉ đi với động từ, không gắn trực tiếp với tính từ.',
    commonMistakes: 'Dùng -고 싶어요 cho ngôi thứ ba (Anh ấy muốn đi -> phải dùng 가고 싶어해요).',
    examples: [
      { korean: '한국에 여행 가고 싶어요.', vietnamese: 'Tôi muốn đi du lịch Hàn Quốc.' },
      { korean: '커피를 마시고 싶어요.', vietnamese: 'Tôi muốn uống cà phê.' }
    ]
  },
  {
    id: 'g08',
    pattern: 'V-아/어야 해요',
    name: 'Phải làm gì đó...',
    level: 'Sơ cấp 2',
    meaning: 'Biểu thị nghĩa vụ, bổn phận hoặc việc bắt buộc phải làm.',
    formula: 'Gốc ĐT chia theo nguyên âm + -아/어야 해요 (hoặc 하다/되다)',
    usageNotes: '-아/어야 되다 thường dùng trong văn nói, 하다 dùng trong cả văn viết.',
    commonMistakes: 'Chia sai nguyên âm khi kết thúc bằng đuôi bất quy tắc ㅂ hoặc ㄷ.',
    examples: [
      { korean: '내일 시험이 있어서 공부해야 해요.', vietnamese: 'Mai có bài thi nên tôi phải học bài.' },
      { korean: '약속 시간에 늦지 않아야 해요.', vietnamese: 'Không được đến muộn giờ hẹn.' }
    ]
  },
  {
    id: 'g09',
    pattern: 'V-(으)려고 하다',
    name: 'Định làm gì...',
    level: 'Sơ cấp 2',
    meaning: 'Diễn tả ý định, kế hoạch trong tương lai gần của chủ ngữ.',
    formula: 'Có patchim + 으려고 하다 / Không patchim + 려고 하다',
    usageNotes: 'Không dùng đuôi này với câu mệnh lệnh (-(으)세요) hoặc rủ rê (-(으)ㅂ시다).',
    commonMistakes: 'Nhầm lẫn với -(으)러 가다 (chỉ mục đích di chuyển).',
    examples: [
      { korean: '이번 주말에 한국 영화를 보려고 해요.', vietnamese: 'Cuối tuần này tôi định xem phim Hàn.' },
      { korean: '새 노트북을 사려고 해요.', vietnamese: 'Tôi định mua một chiếc laptop mới.' }
    ]
  },
  {
    id: 'g10',
    pattern: 'V/A-기 때문에',
    name: 'Bởi vì... cho nên...',
    level: 'Trung cấp 1',
    meaning: 'Nêu rõ nguyên nhân, lý do khách quan dẫn đến kết quả ở vế sau.',
    formula: 'Gốc ĐT/TT + -기 때문에 / Danh từ + -때문에',
    usageNotes: 'Mang sắc thái trang trọng, lập luận rõ ràng hơn -(으)니까.',
    commonMistakes: 'Không dùng vế sau là câu mệnh lệnh hoặc rủ rê.',
    examples: [
      { korean: '비가 오기 때문에 길이 많이 막혀요.', vietnamese: 'Bởi vì trời mưa nên đường tắc nhiều.' },
      { korean: '바쁜 일 때문에 연락을 못 했어요.', vietnamese: 'Vì bận việc nên tôi đã không thể liên lạc được.' }
    ]
  },
  {
    id: 'g11',
    pattern: 'V/A-(으)ㄴ/는 것 같다',
    name: 'Hình như, dường như là...',
    level: 'Trung cấp 1',
    meaning: 'Phỏng đoán nhẹ nhàng hoặc biểu đạt ý kiến cá nhân lịch sự, không khẳng định gay gắt.',
    formula: 'Hiện tại ĐT: -는 것 같다 / Quá khứ ĐT: -(으)ㄴ 것 같다 / Tính từ: -(으)ㄴ 것 같다',
    usageNotes: 'Là cấu trúc được người Hàn sử dụng nhiều bậc nhất trong giao tiếp để tránh nói quá thẳng thừng.',
    commonMistakes: 'Nhầm lẫn thì thời gian khi chia động từ quá khứ và hiện tại.',
    examples: [
      { korean: '밖에 비가 오는 것 같아요.', vietnamese: 'Hình như ngoài trời đang mưa.' },
      { korean: '이 옷이 저한테 조금 작은 것 같아요.', vietnamese: 'Dường như chiếc áo này hơi chật với tôi.' }
    ]
  }
];

// 4. PRACTICE & QUIZ QUESTIONS (50 QUESTIONS)
export interface QuizQuestion {
  id: string;
  type: 'multiple_choice' | 'fill_blank' | 'listening' | 'translation';
  prompt: string;
  audioText?: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  xpReward: number;
}

export const sampleQuizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    type: 'multiple_choice',
    prompt: 'Từ nào sau đây có nghĩa là "Học sinh"?',
    options: ['선생님', '학생', '의사', '회사원'],
    correctAnswer: '학생',
    explanation: '학생 (haksaeng) là "Học sinh", có gốc từ chữ Hán [學生]. 선생님 là giáo viên, 의사 là bác sĩ.',
    xpReward: 10
  },
  {
    id: 'q2',
    type: 'multiple_choice',
    prompt: 'Điền tiểu từ thích hợp: "저는 베트남 사람____."',
    options: ['이에요', '예요', '은', '를'],
    correctAnswer: '이에요',
    explanation: '사람 kết thúc bằng patchim "ㅁ" nên đi với "이에요".',
    xpReward: 10
  },
  {
    id: 'q3',
    type: 'fill_blank',
    prompt: 'Điền từ tiếng Hàn chào hỏi trang trọng: "감사_____ (Cảm ơn)"',
    correctAnswer: '합니다',
    explanation: '감사합니다 (gamsahamnida) là cách nói cảm ơn trang trọng chuẩn mực.',
    xpReward: 15
  },
  {
    id: 'q4',
    type: 'multiple_choice',
    prompt: 'Chọn âm đọc đúng của từ "학교" (Trường học):',
    options: ['hak-gyo', 'hak-saeng', 'sik-dang', 'do-seo-gwan'],
    correctAnswer: 'hak-gyo',
    explanation: '학교 được phiên âm là hak-gyo, âm Hán là Học Hiệu.',
    xpReward: 10
  },
  {
    id: 'q5',
    type: 'translation',
    prompt: 'Dịch câu sau sang tiếng Hàn: "Tôi muốn uống nước."',
    options: [
      '물을 마시고 싶어요.',
      '밥을 먹고 싶어요.',
      '물을 마셨어요.',
      '물이 없어요.'
    ],
    correctAnswer: '물을 마시고 싶어요.',
    explanation: 'Nước = 물, uống = 마시다, cấu trúc muốn = -고 싶어요.',
    xpReward: 20
  }
];

// 5. 10 LISTENING EXERCISES
export interface ListeningExercise {
  id: string;
  title: string;
  level: string;
  audioPrompt: string;
  transcript: string;
  vietnamese: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export const sampleListeningExercises: ListeningExercise[] = [
  {
    id: 'list_01',
    title: 'Hội thoại 1: Chào hỏi lần đầu gặp gỡ',
    level: 'Sơ cấp 1',
    audioPrompt: '안녕하세요? 저는 민수예요. 만나서 반가워요.',
    transcript: '안녕하세요? 저는 민수예요. 만나서 반가워요.',
    vietnamese: 'Xin chào bạn? Tôi là Minsoo. Rất vui được gặp bạn.',
    question: 'Người nói trong đoạn hội thoại tên là gì?',
    options: ['민수 (Minsoo)', '지훈 (Jihoon)', '영희 (Younghee)', '민호 (Minho)'],
    correctAnswer: '민수 (Minsoo)',
    explanation: 'Trong audio, nhân vật tự giới thiệu rõ ràng: "저는 민수예요" (Tôi là Minsoo).',
  },
  {
    id: 'list_02',
    title: 'Hội thoại 2: Gọi món ăn tại nhà hàng',
    level: 'Sơ cấp 1',
    audioPrompt: '여기 김치찌개 하나하고 불고기 일 인분 주세요.',
    transcript: '여기 김치찌개 하나하고 불고기 일 인분 주세요.',
    vietnamese: 'Ở đây cho tôi xin 1 canh kim chi và 1 suất thịt nướng Bulgogi với ạ.',
    question: 'Khách hàng đã gọi những món ăn nào?',
    options: ['Kimchi jjigae và Bulgogi', 'Bibimbap và Kimbap', 'Mì lạnh và Thịt nướng', 'Canh sườn và Cơm trộn'],
    correctAnswer: 'Kimchi jjigae và Bulgogi',
    explanation: 'Khách hàng nói: "김치찌개 하나하고 불고기 일 인분" (1 canh kim chi và 1 phần bulgogi).',
  },
  {
    id: 'list_03',
    title: 'Hội thoại 3: Hỏi đường đến ga tàu điện ngầm',
    level: 'Sơ cấp 2',
    audioPrompt: '실례지만, 서울역 지하철역이 어디에 있어요? 저쪽으로 곧장 가시면 오른쪽에 있어요.',
    transcript: '실례지만, 서울역 지하철역이 어디에 있어요? 저쪽으로 곧장 가시면 오른쪽에 있어요.',
    vietnamese: 'Xin lỗi, ga tàu điện ngầm Seoul nằm ở đâu vậy ạ? Đi thẳng về hướng kia là nó nằm ở bên tay phải.',
    question: 'Ga tàu điện ngầm nằm ở phía nào khi đi thẳng?',
    options: ['Bên tay phải (오른쪽)', 'Bên tay trái (왼쪽)', 'Bên trong tòa nhà', 'Dưới tầng hầm thứ 2'],
    correctAnswer: 'Bên tay phải (오른쪽)',
    explanation: 'Người hướng dẫn nói: "오른쪽에 있어요" (Ở bên tay phải).',
  }
];

// 6. 5 SPEAKING SCENARIOS
export interface SpeakingScenario {
  id: string;
  category: string;
  categoryName: string;
  koreanText: string;
  romaja: string;
  vietnameseMeaning: string;
  hint: string;
}

export const sampleSpeakingScenarios: SpeakingScenario[] = [
  {
    id: 'spk_01',
    category: 'restaurant',
    categoryName: 'Gọi món tại quán ăn',
    koreanText: '여기 주문할게요! 비빔밥 하나 주세요.',
    romaja: 'yeogi jumunhalgeyo! bibimbap hana juseyo.',
    vietnameseMeaning: 'Cho tôi gọi món! Cho tôi một phần cơm trộn bibimbap nhé.',
    hint: 'Phát âm rõ ràng đuôi câu -할게요 và nhấn giọng tự nhiên ở từ 주세요.',
  },
  {
    id: 'spk_02',
    category: 'shopping',
    categoryName: 'Mua hàng & Hỏi giá',
    koreanText: '이거 얼마예요? 조금만 깎아 주세요.',
    romaja: 'igeo eolmayeyo? jogeumman kkakka juseyo.',
    vietnameseMeaning: 'Cái này bao nhiêu tiền ạ? Bớt cho tôi một chút nhé.',
    hint: '깎아 주세요 (kkakka juseyo) là câu mặc cả kinh điển khi đi chợ Dongdaemun!',
  },
  {
    id: 'spk_03',
    category: 'directions',
    categoryName: 'Hỏi đường đi',
    koreanText: '실례지만, 화장실이 어디에 있어요?',
    romaja: 'sillyejiman, hwajangsiri eodie isseoyo?',
    vietnameseMeaning: 'Xin lỗi làm phiền, nhà vệ sinh ở đâu vậy ạ?',
    hint: '화장실 (Hóa trang thất) là nhà vệ sinh trong tiếng Hàn.',
  },
  {
    id: 'spk_04',
    category: 'introduction',
    categoryName: 'Giới thiệu bản thân',
    koreanText: '안녕하세요, 저는 베트남에서 온 응우옌입니다.',
    romaja: 'annyeonghaseyo, jeoneun beteunameseoon eung-uyen-imnida.',
    vietnameseMeaning: 'Xin chào, tôi là Nguyễn đến từ Việt Nam.',
    hint: 'Nói rõ họ tên và phát âm chuẩn 베트남 (Bê-thư-nam).',
  },
  {
    id: 'spk_05',
    category: 'interview',
    categoryName: 'Phỏng vấn xin việc',
    koreanText: '회사 발전을 위해 최선을 다해 노력하겠습니다.',
    romaja: 'hoesa baljeoneul wihae choeseoneul dahae noryeokhagessseumnida.',
    vietnameseMeaning: 'Tôi sẽ nỗ lực hết mình vì sự phát triển của công ty.',
    hint: 'Thể hiện thái độ tự tin, kiên định với đuôi câu trang trọng -겠습니다.',
  }
];
