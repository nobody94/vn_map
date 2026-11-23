import { useState } from 'react'
import { bestKey, LEVEL_LABEL, LEVELS, readBest, type Level } from '../../utils/historyGames'
import { MAX_POINTS, OPTION_COUNT } from '../../utils/historyGuess'
import { PAIR_COUNT } from '../../utils/historyMatch'
import { CARD_COUNT } from '../../utils/historyTimeline'
import { GuessGame } from './GuessGame'
import styles from './HistoryGames.module.css'
import { MatchGame } from './MatchGame'
import { QuizGame } from './QuizGame'
import { TimelineGame } from './TimelineGame'

type GameId = 'quiz' | 'timeline' | 'match' | 'guess'

interface GameInfo {
  id: GameId
  icon: string
  name: string
  desc: string
  ready: boolean
  /** Mô tả từng độ khó */
  levels?: Record<Level, string>
  /** Điểm tối đa (để hiện điểm cao nhất dạng a/b) */
  max?: Record<Level, number>
}

const GAMES: GameInfo[] = [
  {
    id: 'quiz',
    icon: '❓',
    name: 'Đố vui trắc nghiệm',
    desc: '10 câu hỏi về trận đánh, năm, người chỉ huy và các cuộc kháng chiến.',
    ready: true,
    levels: {
      easy: 'Đáp án nhiễu thuộc thời kỳ khác xa, dễ loại trừ.',
      medium: 'Đáp án nhiễu chọn ngẫu nhiên.',
      hard: 'Đáp án nhiễu cùng thời kỳ, năm sát nhau.',
    },
    max: { easy: 10, medium: 10, hard: 10 },
  },
  {
    id: 'timeline',
    icon: '📅',
    name: 'Sắp xếp dòng thời gian',
    desc: 'Kéo thả các trận đánh theo đúng thứ tự thời gian, 5 vòng.',
    ready: true,
    levels: {
      easy: `${CARD_COUNT.easy} trận ở các cuộc kháng chiến khác nhau, có gợi ý tên kháng chiến.`,
      medium: `${CARD_COUNT.medium} trận bất kỳ, có gợi ý tên kháng chiến.`,
      hard: `${CARD_COUNT.hard} trận có năm sát nhau, không gợi ý.`,
    },
    max: { easy: 5 * CARD_COUNT.easy, medium: 5 * CARD_COUNT.medium, hard: 5 * CARD_COUNT.hard },
  },
  {
    id: 'match',
    icon: '🔗',
    name: 'Ghép cặp',
    desc: 'Nối người lãnh đạo với trận đánh hoặc cuộc kháng chiến, 5 vòng.',
    ready: true,
    levels: {
      easy: `${PAIR_COUNT.easy} cặp người lãnh đạo ↔ cuộc kháng chiến, có gợi ý thời gian.`,
      medium: `${PAIR_COUNT.medium} cặp, xen kẽ trận đánh và cuộc kháng chiến, có gợi ý thời gian.`,
      hard: `${PAIR_COUNT.hard} cặp người lãnh đạo ↔ trận đánh cùng thời kỳ, không gợi ý.`,
    },
    max: { easy: 5 * PAIR_COUNT.easy, medium: 5 * PAIR_COUNT.medium, hard: 5 * PAIR_COUNT.hard },
  },
  {
    id: 'guess',
    icon: '🕵️',
    name: 'Đoán nhân vật',
    desc: 'Mở dần gợi ý và đoán người lãnh đạo, đoán càng sớm càng nhiều điểm. 5 vòng.',
    ready: true,
    levels: {
      easy: `${OPTION_COUNT.easy} lựa chọn ở các thời kỳ khác xa.`,
      medium: `${OPTION_COUNT.medium} lựa chọn ngẫu nhiên.`,
      hard: `${OPTION_COUNT.hard} lựa chọn cùng thời kỳ, dễ nhầm.`,
    },
    max: { easy: 5 * MAX_POINTS, medium: 5 * MAX_POINTS, hard: 5 * MAX_POINTS },
  },
]

interface Props {
  onOpenBattle: (id: string) => void
  onOpenLeader: (id: string) => void
}

/** Tab Trò chơi: chọn trò → chọn độ khó → bắt đầu */
export function HistoryGames({ onOpenBattle, onOpenLeader }: Props) {
  const [gameId, setGameId] = useState<GameId | null>(null)
  const [level, setLevel] = useState<Level | null>(null)
  const game = GAMES.find((g) => g.id === gameId)

  const toMenu = () => {
    setGameId(null)
    setLevel(null)
  }
  const toLevels = () => setLevel(null)

  // Đang chơi
  if (game && level) {
    return (
      <div className={styles.wrap}>
        <div className={styles.topRow}>
          <button className={styles.back} onClick={toMenu}>
            ← Chọn trò chơi khác
          </button>
          <span className={styles.levelChip}>
            {game.name} · {LEVEL_LABEL[level]}
          </span>
        </div>
        {game.id === 'quiz' && (
          <QuizGame
            key={level}
            level={level}
            onOpenBattle={onOpenBattle}
            onOpenLeader={onOpenLeader}
            onChangeLevel={toLevels}
          />
        )}
        {game.id === 'timeline' && (
          <TimelineGame key={level} level={level} onOpenBattle={onOpenBattle} onChangeLevel={toLevels} />
        )}
        {game.id === 'match' && (
          <MatchGame
            key={level}
            level={level}
            onOpenBattle={onOpenBattle}
            onOpenLeader={onOpenLeader}
            onChangeLevel={toLevels}
          />
        )}
        {game.id === 'guess' && (
          <GuessGame key={level} level={level} onOpenLeader={onOpenLeader} onChangeLevel={toLevels} />
        )}
      </div>
    )
  }

  // Chọn độ khó
  if (game?.levels) {
    return (
      <section className={styles.wrap}>
        <button className={styles.back} onClick={toMenu}>
          ← Chọn trò chơi khác
        </button>
        <div className={styles.gameTitle}>
          <span className={styles.icon} aria-hidden="true">
            {game.icon}
          </span>
          <div>
            <h2 className={styles.heading}>{game.name}</h2>
            <p className={styles.desc}>{game.desc}</p>
          </div>
        </div>
        <h3 className={styles.sub}>Chọn độ khó</h3>
        <div className={styles.list}>
          {LEVELS.map((lv) => {
            const best = readBest(bestKey(game.id, lv.id))
            return (
              <button key={lv.id} className={`${styles.item} ${styles[lv.id]}`} onClick={() => setLevel(lv.id)}>
                <span className={styles.levelDot} aria-hidden="true" />
                <span className={styles.text}>
                  <span className={styles.name}>{lv.label}</span>
                  <span className={styles.desc}>{game.levels![lv.id]}</span>
                  {best > 0 && (
                    <span className={styles.bestLine}>
                      Điểm cao nhất: {best}/{game.max![lv.id]}
                    </span>
                  )}
                </span>
                <span className={styles.play} aria-hidden="true">
                  Bắt đầu
                </span>
              </button>
            )
          })}
        </div>
      </section>
    )
  }

  // Chọn trò
  return (
    <section className={styles.wrap}>
      <h2 className={styles.heading}>Chọn trò chơi</h2>
      <div className={styles.list}>
        {GAMES.map((g) => (
          <button key={g.id} className={styles.item} onClick={() => setGameId(g.id)} disabled={!g.ready}>
            <span className={styles.icon} aria-hidden="true">
              {g.icon}
            </span>
            <span className={styles.text}>
              <span className={styles.name}>
                {g.name}
                {!g.ready && <span className={styles.soon}>Sắp có</span>}
              </span>
              <span className={styles.desc}>{g.desc}</span>
            </span>
            {g.ready && (
              <span className={styles.play} aria-hidden="true">
                Chơi
              </span>
            )}
          </button>
        ))}
      </div>
    </section>
  )
}
