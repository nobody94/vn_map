import { LEADER_BY_ID, LEADERS, WARS, type Battle, type Leader, type War } from '../data/history'
import { normalize } from './normalize'

/** Văn bản tìm kiếm (đã bỏ dấu) của từng trận: tên, thời gian, địa điểm, kháng chiến, đối phương, chỉ huy, tóm tắt */
const BATTLE_TEXT = new Map<string, string>(
  WARS.flatMap((w) =>
    w.battles.map((b) => [
      b.id,
      normalize(
        [b.name, b.date, b.place, w.name, w.enemy, b.summary, ...(b.commanders ?? []).map((id) => LEADER_BY_ID.get(id)?.name)].join(' '),
      ),
    ]),
  ),
)

/** Chỉ tên, thời kỳ, đối phương — tìm theo người thì đi qua chỉ huy của từng trận, để không hiện cả cuộc kháng chiến */
const WAR_TEXT = new Map<string, string>(WARS.map((w) => [w.id, normalize([w.name, w.period, w.enemy].join(' '))]))

const LEADER_TEXT = new Map<string, string>(
  LEADERS.map((l) => [l.id, normalize([l.name, l.alias, l.lifespan, l.role, l.summary].join(' '))]),
)

/** Mọi từ trong truy vấn đều có trong văn bản (không phân biệt dấu) */
function matches(text: string | undefined, words: string[]): boolean {
  return !!text && words.every((w) => text.includes(w))
}

function words(query: string): string[] {
  return normalize(query).split(' ').filter(Boolean)
}

/** Lọc dòng thời gian: cuộc kháng chiến khớp → giữ cả; không thì chỉ giữ các trận khớp */
export function filterWars(query: string): { war: War; battles: Battle[] }[] {
  const ws = words(query)
  if (ws.length === 0) return WARS.map((war) => ({ war, battles: war.battles }))
  return WARS.flatMap((war) => {
    if (matches(WAR_TEXT.get(war.id), ws)) return [{ war, battles: war.battles }]
    const battles = war.battles.filter((b) => matches(BATTLE_TEXT.get(b.id), ws))
    return battles.length > 0 ? [{ war, battles }] : []
  })
}

export function filterLeaders(query: string): Leader[] {
  const ws = words(query)
  if (ws.length === 0) return LEADERS
  return LEADERS.filter((l) => matches(LEADER_TEXT.get(l.id), ws))
}
