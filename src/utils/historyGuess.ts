import { battlesOf, LEADERS, warsOf, type Leader } from '../data/history'
import { byCloseness, leaderDist, pickByLevel, shuffle, type Level } from './historyGames'

/**
 * Trò "Đoán nhân vật": mở dần gợi ý (thời kỳ → vai trò → trận đánh → chân dung) và đoán người lãnh đạo.
 * Gợi ý lấy từ history.ts, đã che tên / tên khác của người đó ("…").
 *  - dễ: 4 lựa chọn ở các thời kỳ khác xa
 *  - trung bình: 6 lựa chọn ngẫu nhiên
 *  - khó: 6 lựa chọn cùng thời kỳ
 */
export const OPTION_COUNT: Record<Level, number> = { easy: 4, medium: 6, hard: 6 }
/** Điểm tối đa mỗi vòng (đoán đúng khi mới có gợi ý đầu, chưa đoán sai) */
export const MAX_POINTS = 4

export type Hint = { label: string; text: string } | { label: string; portrait: true }

export interface GuessRound {
  leader: Leader
  hints: Hint[]
  options: Leader[]
}

/** Che tên và tên khác của người lãnh đạo trong gợi ý */
function masker(l: Leader): (s: string) => string {
  const names = [l.name, ...(l.alias?.split(',') ?? [])].map((s) => s.trim()).filter(Boolean)
  names.sort((a, b) => b.length - a.length)
  return (s) => names.reduce((acc, n) => acc.split(n).join('…'), s)
}

export function hintsOf(l: Leader): Hint[] {
  const mask = masker(l)
  const wars = warsOf(l.id).map((w) => mask(w.name))
  const battles = battlesOf(l.id).map(({ battle }) => battle.name)
  const hints: Hint[] = [
    { label: 'Thời kỳ', text: `${l.lifespan} · ${wars.join('; ')}` },
    { label: 'Vai trò', text: mask(l.role) },
  ]
  // Không có trận nào → dùng tóm tắt; không có ảnh → dùng tóm tắt (nếu chưa dùng)
  let summaryUsed = false
  if (battles.length) hints.push({ label: 'Trận đã chỉ huy', text: battles.join('; ') })
  else {
    hints.push({ label: 'Tóm tắt', text: mask(l.summary) })
    summaryUsed = true
  }
  if (l.image) hints.push({ label: 'Chân dung', portrait: true })
  else if (!summaryUsed) hints.push({ label: 'Tóm tắt', text: mask(l.summary) })
  return hints
}

/** `count` vòng, mỗi vòng một người (không lặp) */
export function makeGuessRounds(level: Level, count: number): GuessRound[] {
  return shuffle(LEADERS)
    .slice(0, count)
    .map((leader) => {
      const others = byCloseness(
        LEADERS.filter((l) => l.id !== leader.id),
        (l) => leaderDist(leader.id, l.id),
      )
      return {
        leader,
        hints: hintsOf(leader),
        options: shuffle([leader, ...pickByLevel(others, OPTION_COUNT[level] - 1, level)]),
      }
    })
}
