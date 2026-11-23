import { LEADERS, WARS, type Battle, type Leader, type War } from '../data/history'
import { normalize } from './normalize'

/** Năm trong chuỗi ngày (số 3–4 chữ số): "13/3 – 7/5/1954" → "1954" */
const yearsOf = (date: string) => (date.match(/\d+/g) ?? []).filter((n) => n.length >= 3).join(' ')

/** Trận chỉ tìm theo tên trận và năm */
const BATTLE_TEXT = new Map<string, string>(
  WARS.flatMap((w) => w.battles.map((b) => [b.id, normalize(`${b.name} ${yearsOf(b.date)}`)])),
)

/** Cuộc kháng chiến tìm theo tên ("my" → Kháng chiến chống Mỹ); khớp thì hiện cả các trận của nó */
const WAR_TEXT = new Map<string, string>(WARS.map((w) => [w.id, normalize(w.name)]))

/** Người lãnh đạo chỉ tìm theo tên */
const LEADER_TEXT = new Map<string, string>(LEADERS.map((l) => [l.id, normalize(l.name)]))

/**
 * Bộ so khớp cho một truy vấn (không phân biệt dấu): ưu tiên khớp nguyên cụm từ
 * ("dai tuong" không khớp "đại … tượng"); nếu không mục nào khớp cụm thì cho phép các từ đứng rời
 * ("bach dang 1288").
 */
function matcher(query: string, texts: Iterable<string>): ((text: string | undefined) => boolean) | null {
  const phrase = normalize(query)
  if (!phrase) return null
  const hasPhrase = [...texts].some((t) => (` ${t} `).includes(` ${phrase}`))
  if (hasPhrase) return (t) => !!t && ` ${t} `.includes(` ${phrase}`)
  const words = phrase.split(' ')
  return (t) => !!t && words.every((w) => t.includes(w))
}

/**
 * Lọc dòng thời gian: tên cuộc kháng chiến khớp → giữ cả cuộc (mọi trận);
 * ngược lại chỉ giữ các trận khớp (và cuộc kháng chiến chứa chúng).
 */
export function filterWars(query: string): { war: War; battles: Battle[] }[] {
  const match = matcher(query, [...BATTLE_TEXT.values(), ...WAR_TEXT.values()])
  if (!match) return WARS.map((war) => ({ war, battles: war.battles }))
  return WARS.flatMap((war) => {
    if (match(WAR_TEXT.get(war.id))) return [{ war, battles: war.battles }]
    const battles = war.battles.filter((b) => match(BATTLE_TEXT.get(b.id)))
    return battles.length > 0 ? [{ war, battles }] : []
  })
}

export function filterLeaders(query: string): Leader[] {
  const match = matcher(query, LEADER_TEXT.values())
  if (!match) return LEADERS
  return LEADERS.filter((l) => match(LEADER_TEXT.get(l.id)))
}
