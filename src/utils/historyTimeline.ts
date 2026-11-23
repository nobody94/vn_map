import { BATTLES, shuffle, type BattleEntry, type Level } from './historyGames'

/**
 * Trò "Sắp xếp dòng thời gian": mỗi vòng một nhóm trận có năm khác nhau (để thứ tự đúng là duy nhất,
 * không phải so ngày tháng trong cùng năm).
 *  - dễ: 4 trận, mỗi trận một cuộc kháng chiến khác nhau
 *  - trung bình: 5 trận bất kỳ
 *  - khó: 6 trận lấy trong 7 năm liền nhau của danh sách năm (năm sát nhau)
 */
export const CARD_COUNT: Record<Level, number> = { easy: 4, medium: 5, hard: 6 }

/** Trận có năm; bỏ trận có năm trong tên (vd. "… năm 981" — lộ đáp án) */
const DATED = BATTLES.filter(
  (e): e is BattleEntry & { year: number } => e.year !== null && !e.battle.name.includes(String(e.year)),
)
/** Các năm (không trùng), tăng dần */
const YEARS = [...new Set(DATED.map((e) => e.year))].sort((a, b) => a - b)

/** Một trận ngẫu nhiên cho mỗi năm */
const oneForEachYear = (years: number[]) =>
  years.map((y) => shuffle(DATED.filter((e) => e.year === y))[0])

/** Không để hai thẻ trùng tên trong một vòng (hai trận Bạch Đằng — mức khó không có gợi ý để phân biệt) */
export function makeRound(level: Level): BattleEntry[] {
  for (;;) {
    const round = pickRound(level)
    if (new Set(round.map((e) => e.battle.name)).size === round.length) return round
  }
}

function pickRound(level: Level): BattleEntry[] {
  const n = CARD_COUNT[level]
  let picked: BattleEntry[]
  if (level === 'easy') {
    // mỗi cuộc kháng chiến tối đa một trận, năm khác nhau
    const byWar = new Map<number, BattleEntry>()
    for (const e of shuffle(DATED)) if (!byWar.has(e.warIndex)) byWar.set(e.warIndex, e)
    const seen = new Set<number>()
    picked = [...byWar.values()].filter((e) => !seen.has(e.year!) && seen.add(e.year!)).slice(0, n)
  } else if (level === 'medium') {
    picked = oneForEachYear(shuffle(YEARS).slice(0, n))
  } else {
    const span = Math.min(YEARS.length, n + 1)
    const start = Math.floor(Math.random() * (YEARS.length - span + 1))
    picked = oneForEachYear(shuffle(YEARS.slice(start, start + span)).slice(0, n))
  }
  // Xáo trộn, tránh trường hợp đã đúng sẵn thứ tự
  const sorted = sortByYear(picked)
  let out = shuffle(picked)
  while (out.every((e, i) => e === sorted[i])) out = shuffle(picked)
  return out
}

export const sortByYear = (list: BattleEntry[]) => [...list].sort((a, b) => a.year! - b.year!)
