import { LEVEL_LABEL, type Level } from '../../utils/historyGames'
import styles from './Game.module.css'

interface Props {
  score: number
  total: number
  best: number
  level: Level
  onRestart: () => void
  onChangeLevel: () => void
}

/** Màn hình kết quả chung cho các trò chơi */
export function GameResult({ score, total, best, level, onRestart, onChangeLevel }: Props) {
  const message =
    score === total
      ? 'Xuất sắc! Đúng tất cả.'
      : score >= total * 0.7
        ? 'Rất tốt!'
        : score >= total * 0.4
          ? 'Khá ổn, thử lại nhé!'
          : 'Cùng xem lại các trận đánh rồi thử lại nhé!'
  return (
    <section className={`${styles.card} ${styles.result}`} aria-live="polite">
      <div className={styles.resultScore}>
        {score}
        <span>/{total}</span>
      </div>
      <p className={styles.resultMsg}>{message}</p>
      <p className={styles.resultBest}>
        Điểm cao nhất ({LEVEL_LABEL[level]}): {best}/{total}
      </p>
      <div className={styles.resultActions}>
        <button className={styles.secondary} onClick={onChangeLevel}>
          Đổi độ khó
        </button>
        <button className={styles.primary} onClick={onRestart}>
          Chơi lại
        </button>
      </div>
    </section>
  )
}
