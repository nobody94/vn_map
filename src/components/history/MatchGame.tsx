import { useRef, useState } from 'react'
import { bestKey, readBest, saveBest, shuffle, type Level } from '../../utils/historyGames'
import { makeMatchRound, PAIR_COUNT, type MatchRound } from '../../utils/historyMatch'
import styles from './Game.module.css'
import { GameResult } from './GameResult'
import { Portrait } from './Portrait'

const ROUNDS = 5

type Side = 'left' | 'right'

interface Props {
  level: Level
  onOpenBattle: (id: string) => void
  onOpenLeader: (id: string) => void
  /** Về màn hình chọn độ khó */
  onChangeLevel: () => void
}

interface RoundState {
  data: MatchRound
  /** Thứ tự hiển thị: id người lãnh đạo (trái), id mục (phải) */
  left: string[]
  right: string[]
}

const newRound = (level: Level, round: number): RoundState => {
  const data = makeMatchRound(level, round)
  return { data, left: shuffle(data.pairs.map((p) => p.leader.id)), right: shuffle(data.pairs.map((p) => p.item.id)) }
}

/**
 * Ghép cặp: bấm một thẻ bên trái rồi một thẻ bên phải (hoặc ngược lại).
 * Ghép đúng ngay lần đầu được 1 điểm; ghép sai thì thẻ nháy đỏ, người đó không còn được điểm ở vòng này.
 */
export function MatchGame({ level, onOpenBattle, onOpenLeader, onChangeLevel }: Props) {
  const key = bestKey('match', level)
  const total = ROUNDS * PAIR_COUNT[level]
  const [round, setRound] = useState(0)
  const [rs, setRs] = useState<RoundState>(() => newRound(level, 0))
  /** id người lãnh đạo → số thứ tự cặp đã ghép (1, 2, …) */
  const [matched, setMatched] = useState<Map<string, number>>(new Map())
  const [missed, setMissed] = useState<Set<string>>(new Set())
  const [selected, setSelected] = useState<{ side: Side; id: string } | null>(null)
  const [flash, setFlash] = useState<{ left: string; right: string } | null>(null)
  const [score, setScore] = useState(0)
  const [best, setBest] = useState(() => readBest(key))
  const [done, setDone] = useState(false)
  const flashTimer = useRef<number | undefined>(undefined)

  const { data } = rs
  const pairs = data.pairs
  const leaderOf = (itemId: string) => pairs.find((p) => p.item.id === itemId)!.leader.id
  const pairOf = (leaderId: string) => pairs.find((p) => p.leader.id === leaderId)!
  const roundDone = matched.size === pairs.length
  const firstTry = pairs.filter((p) => matched.has(p.leader.id) && !missed.has(p.leader.id)).length
  const showMeta = level !== 'hard'

  const choose = (side: Side, id: string) => {
    if (roundDone) return
    const leaderId = side === 'left' ? id : leaderOf(id)
    if (matched.has(leaderId)) return
    if (!selected || selected.side === side) {
      setSelected(selected?.id === id ? null : { side, id })
      return
    }
    const l = side === 'left' ? id : selected.id
    const r = side === 'right' ? id : selected.id
    setSelected(null)
    if (pairOf(l).item.id === r) {
      const next = new Map(matched).set(l, matched.size + 1)
      setMatched(next)
      if (!missed.has(l)) setScore((s) => s + 1)
    } else {
      setMissed((m) => new Set(m).add(l))
      setFlash({ left: l, right: r })
      window.clearTimeout(flashTimer.current)
      flashTimer.current = window.setTimeout(() => setFlash(null), 600)
    }
  }

  const resetRound = (n: number) => {
    setRound(n)
    setRs(newRound(level, n))
    setMatched(new Map())
    setMissed(new Set())
    setSelected(null)
    setFlash(null)
  }

  const nextRound = () => {
    if (round + 1 < ROUNDS) return resetRound(round + 1)
    if (score > best) {
      setBest(score)
      saveBest(key, score)
    }
    setDone(true)
  }

  const restart = () => {
    resetRound(0)
    setScore(0)
    setDone(false)
  }

  if (done) {
    return <GameResult score={score} total={total} best={best} level={level} onRestart={restart} onChangeLevel={onChangeLevel} />
  }

  const cardClass = (side: Side, id: string, leaderId: string) =>
    [
      styles.matchCard,
      matched.has(leaderId) ? styles.correct : '',
      flash?.[side] === id ? styles.wrong : '',
      selected?.side === side && selected.id === id ? styles.selected : '',
    ].join(' ')

  const badge = (leaderId: string) =>
    matched.has(leaderId) && <span className={styles.pairNo}>{matched.get(leaderId)}</span>

  return (
    <section className={styles.card}>
      <div className={styles.head}>
        <span className={styles.counter}>
          Vòng {round + 1}/{ROUNDS}
        </span>
        <span className={styles.score}>
          Điểm: <strong>{score}</strong>/{total}
          {best > 0 && <span> · Cao nhất: {best}</span>}
        </span>
      </div>
      <div className={styles.progress} aria-hidden="true">
        <div style={{ width: `${((round + (roundDone ? 1 : 0)) / ROUNDS) * 100}%` }} />
      </div>

      <h2 className={`${styles.prompt} ${styles.promptGap}`}>
        {data.kind === 'battle' ? 'Nối người lãnh đạo với trận đánh họ chỉ huy' : 'Nối người lãnh đạo với cuộc kháng chiến họ lãnh đạo'}
      </h2>

      <div className={styles.matchGrid}>
        <div className={styles.matchCol}>
          {rs.left.map((id) => {
            const leader = pairOf(id).leader
            return (
              <button
                key={id}
                className={cardClass('left', id, id)}
                onClick={() => (roundDone ? onOpenLeader(id) : choose('left', id))}
                aria-pressed={selected?.side === 'left' && selected.id === id}
              >
                <span className={styles.mini}>
                  <Portrait leader={leader} variant="thumb" />
                </span>
                <span className={styles.matchLabel}>{leader.name}</span>
                {badge(id)}
              </button>
            )
          })}
        </div>
        <div className={styles.matchCol}>
          {rs.right.map((id) => {
            const { item } = pairs.find((p) => p.item.id === id)!
            const leaderId = leaderOf(id)
            const clickable = !roundDone || item.kind === 'battle'
            return (
              <button
                key={id}
                className={cardClass('right', id, leaderId)}
                onClick={() => (roundDone ? item.kind === 'battle' && onOpenBattle(id) : choose('right', id))}
                aria-pressed={selected?.side === 'right' && selected.id === id}
                disabled={!clickable}
              >
                <span className={styles.matchText}>
                  <span className={styles.matchLabel}>{item.label}</span>
                  {(showMeta || roundDone) && <span className={styles.sortMeta}>{item.meta}</span>}
                </span>
                {badge(leaderId)}
              </button>
            )
          })}
        </div>
      </div>

      {roundDone && (
        <div className={styles.feedback} aria-live="polite">
          <p className={firstTry === pairs.length ? styles.okText : styles.badText}>
            {firstTry === pairs.length ? 'Ghép đúng tất cả ngay lần đầu!' : `Đúng ngay lần đầu ${firstTry}/${pairs.length} cặp`}
          </p>
          <p className={styles.hint}>
            {data.kind === 'battle' ? 'Bấm tên người hoặc trận để xem chi tiết.' : 'Bấm tên người để xem chi tiết.'}
          </p>
          <div className={`${styles.actions} ${styles.actionsEnd}`}>
            <button className={styles.primary} onClick={nextRound} autoFocus>
              {round + 1 < ROUNDS ? 'Vòng tiếp theo' : 'Xem kết quả'}
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
