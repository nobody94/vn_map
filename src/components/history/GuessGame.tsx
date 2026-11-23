import { useState } from 'react'
import { bestKey, readBest, saveBest, type Level } from '../../utils/historyGames'
import { makeGuessRounds, MAX_POINTS, type GuessRound } from '../../utils/historyGuess'
import styles from './Game.module.css'
import { GameResult } from './GameResult'
import { Portrait } from './Portrait'

const ROUNDS = 5

interface Props {
  level: Level
  onOpenLeader: (id: string) => void
  /** Về màn hình chọn độ khó */
  onChangeLevel: () => void
}

/**
 * Đoán nhân vật: mỗi vòng tối đa 4 điểm; mở thêm gợi ý hoặc đoán sai trừ 1 điểm.
 * Hết điểm thì lộ đáp án.
 */
export function GuessGame({ level, onOpenLeader, onChangeLevel }: Props) {
  const key = bestKey('guess', level)
  const total = ROUNDS * MAX_POINTS
  const [rounds, setRounds] = useState<GuessRound[]>(() => makeGuessRounds(level, ROUNDS))
  const [index, setIndex] = useState(0)
  const [shown, setShown] = useState(1)
  const [wrong, setWrong] = useState<string[]>([])
  const [result, setResult] = useState<'right' | 'lost' | null>(null)
  /** Điểm được ở vòng này (giữ lại vì sau khi trả lời sẽ mở hết gợi ý) */
  const [earned, setEarned] = useState(0)
  const [score, setScore] = useState(0)
  const [best, setBest] = useState(() => readBest(key))
  const [done, setDone] = useState(false)

  const r = rounds[index]
  const points = Math.max(0, MAX_POINTS - (shown - 1) - wrong.length)
  const finished = result !== null
  const canHint = !finished && shown < r.hints.length && points > 1

  const guess = (id: string) => {
    if (finished || wrong.includes(id)) return
    if (id === r.leader.id) {
      setResult('right')
      setEarned(points)
      setScore((s) => s + points)
      setShown(r.hints.length)
      return
    }
    const nextWrong = [...wrong, id]
    setWrong(nextWrong)
    if (MAX_POINTS - (shown - 1) - nextWrong.length <= 0) {
      setResult('lost')
      setShown(r.hints.length)
    }
  }

  const next = () => {
    if (index + 1 < rounds.length) {
      setIndex(index + 1)
      setShown(1)
      setWrong([])
      setResult(null)
      return
    }
    if (score > best) {
      setBest(score)
      saveBest(key, score)
    }
    setDone(true)
  }

  const restart = () => {
    setRounds(makeGuessRounds(level, ROUNDS))
    setIndex(0)
    setShown(1)
    setWrong([])
    setResult(null)
    setScore(0)
    setDone(false)
  }

  if (done) {
    return <GameResult score={score} total={total} best={best} level={level} onRestart={restart} onChangeLevel={onChangeLevel} />
  }

  return (
    <section className={styles.card}>
      <div className={styles.head}>
        <span className={styles.counter}>
          Vòng {index + 1}/{rounds.length}
        </span>
        <span className={styles.score}>
          Điểm: <strong>{score}</strong>/{total}
          {best > 0 && <span> · Cao nhất: {best}</span>}
        </span>
      </div>
      <div className={styles.progress} aria-hidden="true">
        <div style={{ width: `${((index + (finished ? 1 : 0)) / rounds.length) * 100}%` }} />
      </div>

      <div className={styles.guessTop}>
        <h2 className={styles.prompt}>Người lãnh đạo này là ai?</h2>
        {!finished && (
          <span className={styles.pointsChip}>
            Còn {points} điểm
          </span>
        )}
      </div>

      <ol className={styles.hints}>
        {r.hints.slice(0, shown).map((h, i) => (
          <li key={h.label + i} className={styles.hint1}>
            <span className={styles.hintLabel}>
              Gợi ý {i + 1} · {h.label}
            </span>
            {'portrait' in h ? (
              <span className={styles.hintPortrait}>
                <Portrait leader={r.leader} variant="thumb" />
              </span>
            ) : (
              <span className={styles.hintText}>{h.text}</span>
            )}
          </li>
        ))}
      </ol>

      {canHint && (
        <button className={`${styles.secondary} ${styles.hintBtn}`} onClick={() => setShown(shown + 1)}>
          Mở gợi ý {shown + 1}/{r.hints.length} · −1 điểm
        </button>
      )}

      <div className={styles.guessGrid}>
        {r.options.map((o) => {
          const state = finished
            ? o.id === r.leader.id
              ? styles.correct
              : wrong.includes(o.id)
                ? styles.wrong
                : styles.dim
            : wrong.includes(o.id)
              ? `${styles.wrong} ${styles.dim}`
              : ''
          return (
            <button
              key={o.id}
              className={`${styles.option} ${state}`}
              onClick={() => guess(o.id)}
              disabled={finished || wrong.includes(o.id)}
            >
              {o.name}
            </button>
          )
        })}
      </div>

      {finished && (
        <div className={styles.feedback} aria-live="polite">
          <p className={result === 'right' ? styles.okText : styles.badText}>
            {result === 'right' ? `Chính xác! +${earned} điểm` : `Hết điểm — đáp án: ${r.leader.name}`}
          </p>
          <p className={styles.explain}>
            {r.leader.name} ({r.leader.lifespan}): {r.leader.summary}
          </p>
          <div className={styles.actions}>
            <button className={styles.secondary} onClick={() => onOpenLeader(r.leader.id)}>
              Xem chi tiết: {r.leader.name}
            </button>
            <button className={styles.primary} onClick={next} autoFocus>
              {index + 1 < rounds.length ? 'Vòng tiếp theo' : 'Xem kết quả'}
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
