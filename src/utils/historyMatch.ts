import { LEADER_BY_ID, WARS, type Leader } from '../data/history'
import { BATTLES, byCloseness, pick, shuffle, type Level } from './historyGames'

/**
 * Trò "Ghép cặp": nối người lãnh đạo ↔ trận họ chỉ huy (`Battle.commanders`) hoặc
 * cuộc kháng chiến họ lãnh đạo (`War.leaders`).
 * Mỗi vòng đảm bảo chỉ có MỘT cách ghép đúng: mỗi mục bên phải chỉ hợp lệ với đúng người được ghép
 * (không đưa vào cùng vòng hai người cùng chỉ huy một trận / cùng lãnh đạo một cuộc kháng chiến).
 *  - dễ: 4 cặp, người lãnh đạo ↔ cuộc kháng chiến, có gợi ý thời gian
 *  - trung bình: 5 cặp, xen kẽ trận / cuộc kháng chiến, có gợi ý thời gian
 *  - khó: 6 cặp, người lãnh đạo ↔ trận, các cặp cùng thời kỳ, không gợi ý
 */
export type MatchKind = 'battle' | 'war'

export interface MatchItem {
  id: string
  kind: MatchKind
  label: string
  /** Gợi ý thời gian (ngày trận / thời kỳ) */
  meta: string
}

export interface MatchPair {
  leader: Leader
  item: MatchItem
}

export interface MatchRound {
  kind: MatchKind
  pairs: MatchPair[]
}

export const PAIR_COUNT: Record<Level, number> = { easy: 4, medium: 5, hard: 6 }

export const roundKind = (level: Level, round: number): MatchKind =>
  level === 'easy' ? 'war' : level === 'hard' ? 'battle' : round % 2 === 0 ? 'battle' : 'war'

interface Candidate {
  leaderId: string
  item: MatchItem
  /** Thứ tự cuộc kháng chiến (thời kỳ) */
  era: number
  /** Những người hợp lệ với mục này */
  valid: string[]
}

/** Trận trùng tên (hai trận Bạch Đằng) thêm năm để phân biệt */
const dupName = (name: string) => BATTLES.filter((e) => e.battle.name === name).length > 1

const CANDIDATES: Record<MatchKind, Candidate[]> = {
  battle: BATTLES.flatMap(({ battle, warIndex, year }) =>
    (battle.commanders ?? []).map((leaderId) => ({
      leaderId,
      era: warIndex,
      valid: battle.commanders ?? [],
      item: {
        id: battle.id,
        kind: 'battle' as const,
        label: dupName(battle.name) ? `${battle.name} (${year})` : battle.name,
        meta: battle.date,
      },
    })),
  ),
  war: WARS.flatMap((war, era) =>
    war.leaders
      // "Khởi nghĩa Hai Bà Trưng" ↔ Hai Bà Trưng: lộ đáp án
      .filter((leaderId) => !war.name.includes(LEADER_BY_ID.get(leaderId)!.name))
      .map((leaderId) => ({
        leaderId,
        era,
        valid: war.leaders,
        item: { id: war.id, kind: 'war' as const, label: war.name, meta: war.period },
      })),
  ),
}

/** Chọn tham lam theo thứ tự cho trước, giữ điều kiện ghép duy nhất */
function greedy(order: Candidate[], n: number): Candidate[] {
  const out: Candidate[] = []
  for (const c of order) {
    const clash = out.some(
      (p) => p.leaderId === c.leaderId || p.item.id === c.item.id || c.valid.includes(p.leaderId) || p.valid.includes(c.leaderId),
    )
    if (!clash) out.push(c)
    if (out.length === n) break
  }
  return out
}

export function makeMatchRound(level: Level, round: number): MatchRound {
  const kind = roundKind(level, round)
  const n = PAIR_COUNT[level]
  const cands = CANDIDATES[kind]
  let best: Candidate[] = []
  for (let attempt = 0; attempt < 40 && best.length < n; attempt++) {
    // Khó: ưu tiên các cặp gần một thời kỳ mốc ngẫu nhiên → cùng thời kỳ, dễ nhầm
    const anchor = pick(cands).era
    const order = level === 'hard' ? byCloseness(cands, (c) => Math.abs(c.era - anchor)) : shuffle(cands)
    const got = greedy(order, n)
    if (got.length > best.length) best = got
  }
  return { kind, pairs: best.map((c) => ({ leader: LEADER_BY_ID.get(c.leaderId)!, item: c.item })) }
}
