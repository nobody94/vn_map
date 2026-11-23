import { LEADERS, WARS, type Battle, type War } from '../data/history'

/** Phần dùng chung cho các trò chơi Lịch sử: độ khó, xáo trộn, năm của trận, điểm cao nhất */

export type Level = 'easy' | 'medium' | 'hard'

export const LEVELS: { id: Level; label: string }[] = [
  { id: 'easy', label: 'Dễ' },
  { id: 'medium', label: 'Trung bình' },
  { id: 'hard', label: 'Khó' },
]
export const LEVEL_LABEL: Record<Level, string> = { easy: 'Dễ', medium: 'Trung bình', hard: 'Khó' }

export const shuffle = <T>(arr: readonly T[]): T[] => {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export const pick = <T>(arr: readonly T[]): T => arr[Math.floor(Math.random() * arr.length)]

/** Xếp từ gần đến xa theo `dist` (bằng nhau thì ngẫu nhiên) */
export const byCloseness = <T>(arr: readonly T[], dist: (t: T) => number): T[] =>
  shuffle(arr).sort((a, b) => dist(a) - dist(b))

/**
 * Chọn `n` mục từ danh sách đã xếp gần → xa theo độ khó:
 * dễ: lấy ở nửa xa · trung bình: ngẫu nhiên · khó: lấy trong nhóm gần nhất.
 */
export function pickByLevel<T>(sorted: readonly T[], n: number, level: Level): T[] {
  const len = sorted.length
  const pool =
    level === 'easy'
      ? sorted.slice(Math.min(Math.floor(len / 2), Math.max(0, len - n)))
      : level === 'hard'
        ? sorted.slice(0, Math.min(len, n + 2))
        : sorted
  return shuffle(pool).slice(0, n)
}

/** Năm của trận (số 3–4 chữ số trong `date`); nhiều năm khác nhau thì null */
export function battleYear(b: Battle): number | null {
  const years = new Set((b.date.match(/\d+/g) ?? []).filter((n) => n.length >= 3).map(Number))
  return years.size === 1 ? [...years][0] : null
}

export interface BattleEntry {
  battle: Battle
  war: War
  /** Thứ tự cuộc kháng chiến trong WARS (theo thời gian) */
  warIndex: number
  year: number | null
}

export const BATTLES: BattleEntry[] = WARS.flatMap((war, warIndex) =>
  war.battles.map((battle) => ({ battle, war, warIndex, year: battleYear(battle) })),
)

/** Thời kỳ của người lãnh đạo: thứ tự các cuộc kháng chiến người đó lãnh đạo */
const LEADER_ERAS = new Map(LEADERS.map((l) => [l.id, WARS.flatMap((w, i) => (w.leaders.includes(l.id) ? [i] : []))]))

/** Khoảng cách thời kỳ giữa một người lãnh đạo và cuộc kháng chiến thứ `warIndex` */
export const eraDist = (leaderId: string, warIndex: number) =>
  Math.min(99, ...(LEADER_ERAS.get(leaderId) ?? []).map((i) => Math.abs(i - warIndex)))

/** Khoảng cách thời kỳ giữa hai người lãnh đạo */
export const leaderDist = (a: string, b: string) =>
  Math.min(99, ...(LEADER_ERAS.get(b) ?? []).map((i) => eraDist(a, i)))

export function readBest(key: string): number {
  try {
    return Number(localStorage.getItem(key)) || 0
  } catch {
    return 0
  }
}

export function saveBest(key: string, n: number) {
  try {
    localStorage.setItem(key, String(n))
  } catch {
    // không lưu được (chế độ riêng tư…) — bỏ qua
  }
}

export const bestKey = (game: string, level: Level) => `vn-map:${game}-best:${level}`
