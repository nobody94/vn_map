import { LEADERS, type Leader } from '../data/history'
import { byCloseness, leaderDist, pickByLevel, shuffle, type Level } from './historyGames'

/**
 * Trò "Nhìn ảnh đoán nhân vật": xem chân dung / tượng / tranh và chọn đúng người lãnh đạo.
 * Chỉ dùng người có `image` trong history.ts; đáp án nhiễu là người lãnh đạo bất kỳ.
 *  - dễ: 4 lựa chọn ở các thời kỳ khác xa
 *  - trung bình: 4 lựa chọn ngẫu nhiên
 *  - khó: 6 lựa chọn cùng thời kỳ
 */
export const PHOTO_OPTIONS: Record<Level, number> = { easy: 4, medium: 4, hard: 6 }

/** Số người có ảnh — số vòng tối đa */
export const PHOTO_LEADERS = LEADERS.filter((l) => l.image)
/** Số vòng mỗi lượt */
export const PHOTO_ROUNDS = Math.min(10, PHOTO_LEADERS.length)

export interface PhotoRound {
  leader: Leader
  options: Leader[]
}

/** `count` vòng, mỗi vòng một người (không lặp) */
export function makePhotoRounds(level: Level, count: number): PhotoRound[] {
  return shuffle(PHOTO_LEADERS)
    .slice(0, count)
    .map((leader) => {
      const others = byCloseness(
        LEADERS.filter((l) => l.id !== leader.id),
        (l) => leaderDist(leader.id, l.id),
      )
      return { leader, options: shuffle([leader, ...pickByLevel(others, PHOTO_OPTIONS[level] - 1, level)]) }
    })
}
