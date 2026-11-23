import { SRSGrade } from './types';

export interface SM2Result {
  repetitionCount: number;
  intervalDays: number;
  easeFactor: number;
  status: 'learning' | 'reviewing' | 'mastered';
}

/**
 * Thuật toán SuperMemo SM-2 tinh chỉnh cho người học tiếng Hàn HanGo.
 * @param grade Điểm đánh giá: 1 (Quên), 2 (Khó), 3 (Tốt), 4 (Dễ)
 * @param prevRepetition Số lần lặp lại liên tiếp trước đó
 * @param prevInterval Khoảng cách ngày trước đó
 * @param prevEaseFactor Hệ số ghi nhớ (mặc định 2.5)
 */
export function calculateSM2(
  grade: SRSGrade,
  prevRepetition: number = 0,
  prevInterval: number = 1,
  prevEaseFactor: number = 2.5
): SM2Result {
  // Map 1-4 scale to SM2 quality (0-5 scale):
  // 1 (Quên) -> 1 (Incorrect, easy recall failed)
  // 2 (Khó)  -> 3 (Correct with serious difficulty)
  // 3 (Tốt)  -> 4 (Correct after hesitation)
  // 4 (Dễ)   -> 5 (Perfect recall)
  const qualityMap: Record<SRSGrade, number> = {
    1: 1,
    2: 3,
    3: 4,
    4: 5,
  };

  const q = qualityMap[grade];

  // Tính lại Ease Factor theo công thức chuẩn:
  // EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
  let newEaseFactor = prevEaseFactor + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
  if (newEaseFactor < 1.3) {
    newEaseFactor = 1.3;
  }
  newEaseFactor = Math.round(newEaseFactor * 100) / 100;

  let newRepetition = prevRepetition;
  let newInterval = prevInterval;
  let status: 'learning' | 'reviewing' | 'mastered' = 'learning';

  if (grade === 1) {
    // Thất bại: reset chuỗi lặp
    newRepetition = 0;
    newInterval = 1;
    status = 'learning';
  } else {
    // Thành công
    if (prevRepetition === 0) {
      newInterval = 1;
    } else if (prevRepetition === 1) {
      newInterval = grade === 2 ? 3 : 6;
    } else {
      const modifier = grade === 2 ? 0.8 : grade === 4 ? 1.3 : 1.0;
      newInterval = Math.max(1, Math.round(prevInterval * newEaseFactor * modifier));
    }
    newRepetition = prevRepetition + 1;

    if (newInterval >= 21) {
      status = 'mastered';
    } else {
      status = 'reviewing';
    }
  }

  return {
    repetitionCount: newRepetition,
    intervalDays: newInterval,
    easeFactor: newEaseFactor,
    status,
  };
}
