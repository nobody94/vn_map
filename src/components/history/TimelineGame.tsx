import { useRef, useState, type PointerEvent } from 'react'
import { bestKey, readBest, saveBest, type BattleEntry, type Level } from '../../utils/historyGames'
import { CARD_COUNT, makeRound, sortByYear } from '../../utils/historyTimeline'
import styles from './Game.module.css'
import { GameResult } from './GameResult'

const ROUNDS = 5

interface Props {
  level: Level
  onOpenBattle: (id: string) => void
  /** Về màn hình chọn độ khó */
  onChangeLevel: () => void
}

/**
 * Sắp xếp dòng thời gian: kéo thả (chuột / cảm ứng qua tay cầm ⠿) hoặc nút ↑ ↓ để xếp các trận
 * từ sớm nhất đến muộn nhất. Mỗi thẻ đúng vị trí được 1 điểm; 5 vòng.
 */
export function TimelineGame({ level, onOpenBattle, onChangeLevel }: Props) {
  const key = bestKey('timeline', level)
  const total = ROUNDS * CARD_COUNT[level]
  const [round, setRound] = useState(0)
  const [items, setItems] = useState<BattleEntry[]>(() => makeRound(level))
  const [checked, setChecked] = useState(false)
  const [score, setScore] = useState(0)
  const [best, setBest] = useState(() => readBest(key))
  const [done, setDone] = useState(false)
  const [draggingId, setDraggingId] = useState<string | null>(null)

  const listRef = useRef<HTMLOListElement>(null)
  /** Thẻ đang kéo: grab = khoảng từ đỉnh thẻ tới điểm bấm, ty = độ dịch hiện tại */
  const drag = useRef<{ id: string; el: HTMLElement; grab: number; ty: number } | null>(null)

  const sorted = sortByYear(items)
  const isRight = (i: number) => items[i] === sorted[i]
  const roundScore = items.filter((_, i) => isRight(i)).length
  // Gợi ý tên cuộc kháng chiến ở mức dễ / trung bình
  const showWar = level !== 'hard'

  const move = (from: number, to: number) => {
    if (to < 0 || to >= items.length) return
    setItems((list) => {
      const next = [...list]
      const [it] = next.splice(from, 1)
      next.splice(to, 0, it)
      return next
    })
  }

  // ── Kéo thả bằng Pointer Events (chuột + cảm ứng) ──
  // Nghe trên window: React di chuyển nút <li> trong DOM khi đổi chỗ → mất pointer capture.
  const onPointerDown = (e: PointerEvent<HTMLLIElement>, id: string) => {
    if (checked || drag.current || (e.target as HTMLElement).closest('button')) return
    if (e.pointerType !== 'mouse' && !(e.target as HTMLElement).closest('[data-handle]')) return
    e.preventDefault()
    const el = e.currentTarget
    const d = { id, el, grab: e.clientY - el.getBoundingClientRect().top, ty: 0 }
    drag.current = d
    setDraggingId(id)

    const mid = (n: Element) => {
      const r = n.getBoundingClientRect()
      return r.top + r.height / 2
    }
    const onMove = (ev: globalThis.PointerEvent) => {
      if (ev.pointerId !== e.pointerId || !listRef.current) return
      const naturalTop = el.getBoundingClientRect().top - d.ty
      d.ty = ev.clientY - d.grab - naturalTop
      el.style.transform = `translateY(${d.ty}px)`
      const nodes = [...listRef.current.children]
      const i = nodes.indexOf(el)
      if (i > 0 && ev.clientY < mid(nodes[i - 1])) move(i, i - 1)
      else if (i < nodes.length - 1 && ev.clientY > mid(nodes[i + 1])) move(i, i + 1)
    }
    const onUp = (ev: globalThis.PointerEvent) => {
      if (ev.pointerId !== e.pointerId) return
      el.style.transform = ''
      drag.current = null
      setDraggingId(null)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onUp)
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    window.addEventListener('pointercancel', onUp)
  }

  const check = () => {
    setChecked(true)
    setScore((s) => s + roundScore)
  }

  const nextRound = () => {
    if (round + 1 < ROUNDS) {
      setRound(round + 1)
      setItems(makeRound(level))
      setChecked(false)
      return
    }
    if (score > best) {
      setBest(score)
      saveBest(key, score)
    }
    setDone(true)
  }

  const restart = () => {
    setRound(0)
    setItems(makeRound(level))
    setChecked(false)
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
          Vòng {round + 1}/{ROUNDS}
        </span>
        <span className={styles.score}>
          Điểm: <strong>{score}</strong>/{total}
          {best > 0 && <span> · Cao nhất: {best}</span>}
        </span>
      </div>
      <div className={styles.progress} aria-hidden="true">
        <div style={{ width: `${((round + (checked ? 1 : 0)) / ROUNDS) * 100}%` }} />
      </div>

      <h2 className={`${styles.prompt} ${styles.promptGap}`}>Xếp các trận từ sớm nhất (trên) đến muộn nhất (dưới)</h2>

      <ol ref={listRef} className={styles.sortList}>
        {items.map((e, i) => {
          const state = !checked ? '' : isRight(i) ? styles.correct : styles.wrong
          return (
            <li
              key={e.battle.id}
              className={`${styles.sortItem} ${state} ${draggingId === e.battle.id ? styles.dragging : ''} ${checked ? styles.locked : ''}`}
              onPointerDown={(ev) => onPointerDown(ev, e.battle.id)}
            >
              {!checked && (
                <span className={styles.handle} data-handle aria-hidden="true">
                  ⠿
                </span>
              )}
              <span className={styles.letter}>{i + 1}</span>
              <span className={styles.sortText}>
                {checked ? (
                  <button className={styles.sortName} onClick={() => onOpenBattle(e.battle.id)}>
                    {e.battle.name}
                  </button>
                ) : (
                  <span className={styles.sortNameText}>{e.battle.name}</span>
                )}
                {showWar && <span className={styles.sortMeta}>{e.war.name}</span>}
                {checked && <span className={styles.sortYear}>{e.battle.date}</span>}
              </span>
              {!checked && (
                <span className={styles.arrows}>
                  <button onClick={() => move(i, i - 1)} disabled={i === 0} aria-label={`Đưa ${e.battle.name} lên`}>
                    ↑
                  </button>
                  <button
                    onClick={() => move(i, i + 1)}
                    disabled={i === items.length - 1}
                    aria-label={`Đưa ${e.battle.name} xuống`}
                  >
                    ↓
                  </button>
                </span>
              )}
            </li>
          )
        })}
      </ol>

      {checked ? (
        <div className={styles.feedback} aria-live="polite">
          <p className={roundScore === items.length ? styles.okText : styles.badText}>
            {roundScore === items.length ? 'Chính xác cả dòng thời gian!' : `Đúng vị trí ${roundScore}/${items.length} trận`}
          </p>
          {roundScore < items.length && (
            <p className={styles.explain}>
              Thứ tự đúng: {sorted.map((e) => `${e.battle.name} (${e.year})`).join(' → ')}
            </p>
          )}
          <p className={styles.hint}>Bấm tên trận để xem chi tiết.</p>
          <div className={`${styles.actions} ${styles.actionsEnd}`}>
            <button className={styles.primary} onClick={nextRound} autoFocus>
              {round + 1 < ROUNDS ? 'Vòng tiếp theo' : 'Xem kết quả'}
            </button>
          </div>
        </div>
      ) : (
        <div className={`${styles.actions} ${styles.actionsEnd}`}>
          <button className={styles.primary} onClick={check}>
            Kiểm tra
          </button>
        </div>
      )}
    </section>
  )
}
