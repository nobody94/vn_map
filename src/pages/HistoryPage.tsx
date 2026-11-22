import { useEffect, useState } from 'react'
import { HomeButton } from '../components/controls/HomeButton'
import { LeaderModal } from '../components/history/LeaderModal'
import { Portrait } from '../components/history/Portrait'
import { LEADER_BY_ID, LEADERS, WARS, warsOf, wikiUrl } from '../data/history'
import styles from './HistoryPage.module.css'

type View = 'battles' | 'leaders'

const VIEWS: { id: View; label: string }[] = [
  { id: 'battles', label: 'Trận chiến' },
  { id: 'leaders', label: 'Người lãnh đạo' },
]

function WikiLink({ title }: { title: string }) {
  return (
    <a className={styles.wiki} href={wikiUrl(title)} target="_blank" rel="noreferrer">
      Wikipedia ↗
    </a>
  )
}

/** Trang Lịch sử: các cuộc kháng chiến (trận đánh) và người lãnh đạo */
export default function HistoryPage() {
  const [view, setView] = useState<View>('battles')
  // Popup người lãnh đạo đang mở
  const [leaderId, setLeaderId] = useState<string | null>(null)
  // Trận được chọn từ popup (chưa có popup trận — mục 8.3): chuyển tab, cuộn tới và làm nổi thẻ
  const [focusBattle, setFocusBattle] = useState<string | null>(null)
  const leader = leaderId ? LEADER_BY_ID.get(leaderId) : undefined

  useEffect(() => {
    if (view !== 'battles' || !focusBattle) return
    document.getElementById(`battle-${focusBattle}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [view, focusBattle])

  const openBattle = (id: string) => {
    setLeaderId(null)
    setFocusBattle(id)
    setView('battles')
  }

  const changeView = (v: View) => {
    setView(v)
    setFocusBattle(null)
    window.scrollTo({ top: 0 })
  }

  return (
    <div className={styles.page}>
      <header className={styles.bar}>
        <HomeButton />
        <span className={styles.barTitle}>Lịch sử Việt Nam</span>
      </header>

      <section className={styles.hero}>
        <h1 className={styles.title}>Các cuộc kháng chiến</h1>
        <p className={styles.lead}>Những trận đánh tiêu biểu và những người lãnh đạo, từ thời Bắc thuộc đến năm 1975.</p>
        <div className={styles.tabs} role="tablist">
          {VIEWS.map((v) => (
            <button
              key={v.id}
              role="tab"
              aria-selected={view === v.id}
              className={`${styles.tab} ${view === v.id ? styles.tabActive : ''}`}
              onClick={() => changeView(v.id)}
            >
              {v.label}
            </button>
          ))}
        </div>
      </section>

      <main className={styles.content}>
        {view === 'battles' ? (
          <ol className={styles.timeline}>
            {WARS.map((w) => (
              <li key={w.id} className={styles.war}>
                <div className={styles.warHead}>
                  <span className={styles.period}>{w.period}</span>
                  <h2 className={styles.warName}>{w.name}</h2>
                  <div className={styles.warMeta}>
                    <span className={styles.enemy}>Đối phương: {w.enemy}</span>
                    <span className={styles.leadBy}>
                      Lãnh đạo:{' '}
                      {w.leaders.map((id, i) => (
                        <span key={id}>
                          {i > 0 && ', '}
                          <button className={styles.leaderLink} onClick={() => setLeaderId(id)}>
                            {LEADER_BY_ID.get(id)?.name}
                          </button>
                        </span>
                      ))}
                    </span>
                  </div>
                </div>

                {w.battles.length > 0 && (
                  <div className={styles.battles}>
                    {w.battles.map((b) => (
                      <article
                        key={b.id}
                        id={`battle-${b.id}`}
                        className={`${styles.card} ${styles.battle} ${focusBattle === b.id ? styles.focus : ''}`}
                      >
                        <div className={styles.cardTop}>
                          <span className={styles.date}>{b.date}</span>
                          <WikiLink title={b.wiki} />
                        </div>
                        <h3 className={styles.cardTitle}>{b.name}</h3>
                        {b.place && <div className={styles.place}>{b.place}</div>}
                        <p className={styles.summary}>{b.summary}</p>
                      </article>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ol>
        ) : (
          <div className={styles.leaders}>
            {LEADERS.map((l) => (
              <article key={l.id} className={`${styles.card} ${styles.leader}`}>
                <div className={styles.leaderHead}>
                  <Portrait leader={l} variant="thumb" />
                  <div>
                    <h3 className={styles.cardTitle}>
                      <button className={styles.titleBtn} onClick={() => setLeaderId(l.id)}>
                        {l.name}
                      </button>
                    </h3>
                    <div className={styles.lifespan}>
                      {l.lifespan}
                      {l.alias && <> · {l.alias}</>}
                    </div>
                  </div>
                </div>
                <div className={styles.role}>{l.role}</div>
                <p className={styles.summary}>{l.summary}</p>
                <div className={styles.chips}>
                  {warsOf(l.id).map((w) => (
                    <span key={w.id} className={styles.chip}>
                      {w.name}
                    </span>
                  ))}
                </div>
                <div className={styles.leaderFoot}>
                  <button className={styles.detailBtn} onClick={() => setLeaderId(l.id)}>
                    Xem chi tiết
                  </button>
                  <WikiLink title={l.wiki} />
                </div>
              </article>
            ))}
          </div>
        )}
        <p className={styles.source}>
          Nội dung tóm tắt theo Wikipedia tiếng Việt (CC BY-SA 4.0). Ảnh từ Wikimedia Commons, ghi nguồn trong từng ảnh.
        </p>
      </main>

      {leader && <LeaderModal leader={leader} onClose={() => setLeaderId(null)} onOpenBattle={openBattle} />}
    </div>
  )
}
