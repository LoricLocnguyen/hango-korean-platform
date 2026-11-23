import { describe, it, expect } from 'vitest';
import { calculateSM2 } from './srs';

describe('SuperMemo SM-2 Algorithm for HanGo', () => {
  it('resets repetition and interval when user forgets (grade 1)', () => {
    const result = calculateSM2(1, 4, 15, 2.5);
    expect(result.repetitionCount).toBe(0);
    expect(result.intervalDays).toBe(1);
    expect(result.status).toBe('learning');
    expect(result.easeFactor).toBeLessThan(2.5);
  });

  it('sets interval to 1 on first successful recall (repetition 0 -> 1)', () => {
    const result = calculateSM2(3, 0, 1, 2.5);
    expect(result.repetitionCount).toBe(1);
    expect(result.intervalDays).toBe(1);
  });

  it('sets interval to 6 on second successful recall (repetition 1 -> 2)', () => {
    const result = calculateSM2(3, 1, 1, 2.5);
    expect(result.repetitionCount).toBe(2);
    expect(result.intervalDays).toBe(6);
  });

  it('multiplies interval on third successful recall and flags mastered when >= 21 days', () => {
    const result = calculateSM2(4, 2, 6, 2.6);
    expect(result.repetitionCount).toBe(3);
    expect(result.intervalDays).toBeGreaterThanOrEqual(20);
    expect(result.status).toBe('mastered');
  });

  it('never drops ease factor below 1.3', () => {
    let ef = 1.4;
    for (let i = 0; i < 5; i++) {
      const res = calculateSM2(1, 0, 1, ef);
      ef = res.easeFactor;
    }
    expect(ef).toBeGreaterThanOrEqual(1.3);
  });
});
