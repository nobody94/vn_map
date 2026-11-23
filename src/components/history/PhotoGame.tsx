import { useState } from 'react'
import { bestKey, readBest, saveBest, type Level } from '../../utils/historyGames'
import { makePhotoRounds, PHOTO_ROUNDS, type PhotoRound } from '../../utils/historyPhoto'
import styles from './Game.module.css'
import { GameResult } from './GameResult'

interface Props {
  level: Level
  onOpenLeader: (id: string) => void
  /** Về màn hình chọn độ khó */
  onChangeLevel: () => void
}

/** Nhìn ảnh đoán nhân vật: mỗi vòng một ảnh, chọn đúng người được 1 điểm */
export function PhotoGame({ level, onOpenLeader, onChangeLevel }: Props) {
  const key = bestKey('photo', level)
  const [rounds, setRounds] = useState<PhotoRound[]>(() => makePhotoRounds(level, PHOTO_ROUNDS))
  const [index, setIndex] = useState(0)
  const [chosen, setChosen] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [best, setBest] = useState(() => readBest(key))
  const [done, setDone] = useState(false)

  const r = rounds[index]
  const img = r.leader.image!
  const answered = chosen !== null
  const right = chosen === r.leader.id

  const choose = (id: string) => {
    if (answered) return
    setChosen(id)
    if (id === r.leader.id) setScore((s) => s + 1)
  }

  const next = () => {
    if (index + 1 < rounds.length) {
      setIndex(index + 1)
      setChosen(null)
      return
    }
    if (score > best) {
      setBest(score)
      saveBest(key, score)
    }
    setDone(true)
  }

  const restart = () => {
    setRounds(makePhotoRounds(level, PHOTO_ROUNDS))
    setIndex(0)
    setChosen(null)
    setScore(0)
    setDone(false)
  }

  if (done) {
    return (
      <GameResult score={score} total={rounds.length} best={best} level={level} onRestart={restart} onChangeLevel={onChangeLevel} />
    )
  }

  return (
    <section className={styles.card}>
      <div className={styles.head}>
        <span className={styles.counter}>
          Ảnh {index + 1}/{rounds.length}
        </span>
        <span className={styles.score}>
          Điểm: <strong>{score}</strong>
          {best > 0 && <span> · Cao nhất: {best}</span>}
        </span>
      </div>
      <div className={styles.progress} aria-hidden="true">
        <div style={{ width: `${((index + (answered ? 1 : 0)) / rounds.length) * 100}%` }} />
      </div>

      <h2 className={`${styles.prompt} ${styles.promptGap}`}>Người trong ảnh là ai?</h2>

      <figure className={styles.photo}>
        <div className={styles.photoFrame}>
          {/* key: đổi ảnh thì tạo thẻ mới, không hiện ảnh cũ trong lúc tải; alt trống để không lộ tên */}
          <img key={r.leader.id} src={import.meta.env.BASE_URL + img.url} alt={answered ? r.leader.name : ''} decoding="async" />
        </div>
        {answered && <figcaption className={styles.photoCredit}>{img.credit}</figcaption>}
      </figure>

      <div className={styles.guessGrid}>
        {r.options.map((o) => {
          const state = !answered ? '' : o.id === r.leader.id ? styles.correct : o.id === chosen ? styles.wrong : styles.dim
          return (
            <button key={o.id} className={`${styles.option} ${state}`} onClick={() => choose(o.id)} disabled={answered}>
              {o.name}
            </button>
          )
        })}
      </div>

      {answered && (
        <div className={styles.feedback} aria-live="polite">
          <p className={right ? styles.okText : styles.badText}>
            {right ? 'Chính xác!' : `Chưa đúng — đây là ${r.leader.name}`}
          </p>
          <p className={styles.explain}>
            {r.leader.name} ({r.leader.lifespan}): {r.leader.summary}
          </p>
          <div className={styles.actions}>
            <button className={styles.secondary} onClick={() => onOpenLeader(r.leader.id)}>
              Xem chi tiết: {r.leader.name}
            </button>
            <button className={styles.primary} onClick={next} autoFocus>
              {index + 1 < rounds.length ? 'Ảnh tiếp theo' : 'Xem kết quả'}
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
