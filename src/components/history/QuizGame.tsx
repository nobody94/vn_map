import { useState } from 'react'
import { bestKey, readBest, saveBest, type Level } from '../../utils/historyGames'
import { makeQuiz, type QuizQuestion } from '../../utils/historyQuiz'
import styles from './Game.module.css'
import { GameResult } from './GameResult'
import { Portrait } from './Portrait'

const COUNT = 10
const LETTERS = ['A', 'B', 'C', 'D']

interface Props {
  level: Level
  onOpenBattle: (id: string) => void
  onOpenLeader: (id: string) => void
  /** Về màn hình chọn độ khó */
  onChangeLevel: () => void
}

/** Đố vui trắc nghiệm: 10 câu ngẫu nhiên sinh từ dữ liệu Lịch sử */
export function QuizGame({ level, onOpenBattle, onOpenLeader, onChangeLevel }: Props) {
  const key = bestKey('quiz', level)
  const [questions, setQuestions] = useState<QuizQuestion[]>(() => makeQuiz(level, COUNT))
  const [index, setIndex] = useState(0)
  const [chosen, setChosen] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [best, setBest] = useState(() => readBest(key))
  const [done, setDone] = useState(false)

  const q = questions[index]
  const answered = chosen !== null

  const choose = (i: number) => {
    if (answered) return
    setChosen(i)
    if (i === q.answer) setScore((s) => s + 1)
  }

  const next = () => {
    if (index + 1 < questions.length) {
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
    setQuestions(makeQuiz(level, COUNT))
    setIndex(0)
    setChosen(null)
    setScore(0)
    setDone(false)
  }

  const openDetail = () => (q.detail.kind === 'battle' ? onOpenBattle(q.detail.id) : onOpenLeader(q.detail.id))

  if (done) {
    return (
      <GameResult score={score} total={questions.length} best={best} level={level} onRestart={restart} onChangeLevel={onChangeLevel} />
    )
  }

  return (
    <section className={styles.card}>
      <div className={styles.head}>
        <span className={styles.counter}>
          Câu {index + 1}/{questions.length}
        </span>
        <span className={styles.score}>
          Điểm: <strong>{score}</strong>
          {best > 0 && <span> · Cao nhất: {best}</span>}
        </span>
      </div>
      <div className={styles.progress} aria-hidden="true">
        <div style={{ width: `${((index + (answered ? 1 : 0)) / questions.length) * 100}%` }} />
      </div>

      <div className={styles.question}>
        {q.leader && <Portrait leader={q.leader} variant="thumb" />}
        <h2 className={styles.prompt}>{q.prompt}</h2>
      </div>

      <div className={styles.options}>
        {q.options.map((opt, i) => {
          const state = !answered ? '' : i === q.answer ? styles.correct : i === chosen ? styles.wrong : styles.dim
          return (
            <button key={opt} className={`${styles.option} ${state}`} onClick={() => choose(i)} disabled={answered}>
              <span className={styles.letter}>{LETTERS[i]}</span>
              <span>{opt}</span>
            </button>
          )
        })}
      </div>

      {answered && (
        <div className={styles.feedback} aria-live="polite">
          <p className={chosen === q.answer ? styles.okText : styles.badText}>
            {chosen === q.answer ? 'Chính xác!' : `Chưa đúng — đáp án: ${q.options[q.answer]}`}
          </p>
          <p className={styles.explain}>{q.explain}</p>
          <div className={styles.actions}>
            <button className={styles.secondary} onClick={openDetail}>
              Xem chi tiết: {q.detail.label}
            </button>
            <button className={styles.primary} onClick={next} autoFocus>
              {index + 1 < questions.length ? 'Câu tiếp theo' : 'Xem kết quả'}
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
