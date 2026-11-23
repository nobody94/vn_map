import { LEADER_BY_ID, LEADERS, WARS, type Battle, type Leader, type War } from '../data/history'
import { BATTLES, byCloseness, eraDist, pick, pickByLevel, shuffle, type Level } from './historyGames'

/**
 * Câu hỏi trắc nghiệm sinh tự động từ src/data/history.ts (đáp án luôn đúng theo dữ liệu).
 * Đáp án nhiễu cùng loại, chắc chắn sai, không trùng nhau; độ khó quyết định nhiễu gần hay xa
 * (thời kỳ / năm): dễ → khác xa, khó → cùng thời kỳ, năm sát nhau.
 */
export interface QuizQuestion {
  /** Khóa để tránh lặp cùng một chủ thể trong một lượt */
  subject: string
  prompt: string
  options: string[]
  answer: number
  /** Giải thích sau khi trả lời */
  explain: string
  /** Mở popup chi tiết sau khi trả lời */
  detail: { kind: 'battle' | 'leader'; id: string; label: string }
  leader?: Leader
}

const WAR_INDEX = new Map(WARS.map((w, i) => [w.id, i]))
const warIdx = (w: War) => WAR_INDEX.get(w.id)!

const NAME_COUNT = new Map<string, number>()
for (const { battle } of BATTLES) NAME_COUNT.set(battle.name, (NAME_COUNT.get(battle.name) ?? 0) + 1)
const isDup = (b: Battle) => (NAME_COUNT.get(b.name) ?? 0) > 1
const yearOf = (b: Battle) => BATTLES.find((x) => x.battle === b)?.year

/** Tên trận kèm năm khi trùng tên (vd. hai trận Bạch Đằng) */
const withYear = (b: Battle) => (isDup(b) ? `${b.name} (${yearOf(b) ?? b.date})` : b.name)
/** Tên trận kèm cuộc kháng chiến khi trùng tên — dùng cho câu hỏi về năm */
const withWar = (b: Battle, w: War) => (isDup(b) ? `${b.name} (${w.name})` : b.name)

/** Ghép câu hỏi: đáp án đúng + 3 nhiễu (chọn theo độ khó từ danh sách gần → xa), xáo trộn */
function make(
  q: Omit<QuizQuestion, 'options' | 'answer'>,
  correct: string,
  wrongSorted: string[],
  level: Level,
): QuizQuestion | null {
  const wrong = [...new Set(wrongSorted)].filter((w) => w !== correct)
  if (wrong.length < 3) return null
  const options = shuffle([correct, ...pickByLevel(wrong, 3, level)])
  return { ...q, options, answer: options.indexOf(correct) }
}

const battleDetail = (b: Battle) => ({ kind: 'battle' as const, id: b.id, label: b.name })
const leaderDetail = (l: Leader) => ({ kind: 'leader' as const, id: l.id, label: l.name })

/** Ai chỉ huy trận …? — nhiễu: người lãnh đạo thời kỳ gần / xa */
function commanderQuestion(b: Battle, w: War, level: Level): QuizQuestion | null {
  const cmd = b.commanders ?? []
  if (!cmd.length) return null
  const correct = LEADER_BY_ID.get(pick(cmd))!
  const names = cmd.map((id) => LEADER_BY_ID.get(id)!.name)
  const others = byCloseness(
    LEADERS.filter((l) => !cmd.includes(l.id)),
    (l) => eraDist(l.id, warIdx(w)),
  )
  return make(
    {
      subject: b.id,
      prompt: `Ai là người chỉ huy ${withYear(b)}?`,
      explain: `${b.name} (${b.date}) do ${names.join(', ')} chỉ huy.`,
      detail: battleDetail(b),
    },
    correct.name,
    others.map((l) => l.name),
    level,
  )
}

/** … diễn ra năm nào? — nhiễu: năm của các trận khác, gần / xa */
function yearQuestion(b: Battle, w: War, level: Level): QuizQuestion | null {
  const year = yearOf(b)
  if (!year || b.name.includes(String(year))) return null
  const years = [...new Set(BATTLES.map((x) => x.year).filter((y): y is number => !!y && y !== year))]
  return make(
    {
      subject: b.id,
      prompt: `${withWar(b, w)} diễn ra vào năm nào?`,
      explain: `${b.name}: ${b.date}.`,
      detail: battleDetail(b),
    },
    String(year),
    byCloseness(years, (y) => Math.abs(y - year)).map(String),
    level,
  )
}

/** … thuộc cuộc kháng chiến nào? */
function warQuestion(b: Battle, w: War, level: Level): QuizQuestion | null {
  return make(
    {
      subject: b.id,
      prompt: `${withYear(b)} thuộc cuộc kháng chiến nào?`,
      explain: `${b.name} (${b.date}) thuộc ${w.name} (${w.period}).`,
      detail: battleDetail(b),
    },
    w.name,
    byCloseness(
      WARS.filter((x) => x.id !== w.id),
      (x) => Math.abs(warIdx(x) - warIdx(w)),
    ).map((x) => x.name),
    level,
  )
}

/** … là người lãnh đạo cuộc kháng chiến nào? */
function leaderWarQuestion(l: Leader, level: Level): QuizQuestion | null {
  const led = WARS.filter((w) => w.leaders.includes(l.id))
  // Bỏ cuộc kháng chiến mang tên người đó (vd. "Khởi nghĩa Hai Bà Trưng" — lộ đáp án)
  const wars = led.filter((w) => !w.name.includes(l.name))
  if (!wars.length) return null
  return make(
    {
      subject: l.id,
      prompt: `${l.name} là người lãnh đạo cuộc kháng chiến nào?`,
      explain: `${l.name} (${l.lifespan}) lãnh đạo: ${led.map((w) => w.name).join(', ')}.`,
      detail: leaderDetail(l),
      leader: l,
    },
    pick(wars).name,
    byCloseness(
      WARS.filter((w) => !w.leaders.includes(l.id)),
      (w) => eraDist(l.id, warIdx(w)),
    ).map((w) => w.name),
    level,
  )
}

/** Cuộc khởi nghĩa … chống lại ai? */
function enemyQuestion(w: War, level: Level): QuizQuestion | null {
  return make(
    {
      subject: w.id,
      prompt: `${w.name} (${w.period}) chống lại đối phương nào?`,
      explain: `${w.name}: đối phương là ${w.enemy}.`,
      detail: { kind: 'leader', id: w.leaders[0], label: LEADER_BY_ID.get(w.leaders[0])!.name },
    },
    w.enemy,
    byCloseness(WARS, (x) => Math.abs(warIdx(x) - warIdx(w))).map((x) => x.enemy),
    level,
  )
}

/** Lấy `count` câu ngẫu nhiên, mỗi chủ thể (trận / người / cuộc kháng chiến) tối đa một câu */
export function makeQuiz(level: Level, count = 10): QuizQuestion[] {
  const pool = [
    ...BATTLES.flatMap(({ battle, war }) => [
      commanderQuestion(battle, war, level),
      yearQuestion(battle, war, level),
      warQuestion(battle, war, level),
    ]),
    ...LEADERS.map((l) => leaderWarQuestion(l, level)),
    // Tên cuộc kháng chiến đã chứa đối phương ("chống Pháp") thì câu hỏi quá dễ → chỉ hỏi khởi nghĩa
    ...WARS.filter((w) => !w.name.includes('chống')).map((w) => enemyQuestion(w, level)),
  ].filter((q): q is QuizQuestion => q !== null)

  const used = new Set<string>()
  const out: QuizQuestion[] = []
  for (const q of shuffle(pool)) {
    if (used.has(q.subject)) continue
    used.add(q.subject)
    out.push(q)
    if (out.length === count) break
  }
  return out
}
