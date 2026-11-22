import { useState } from 'react'
import { HomeButton } from '../components/controls/HomeButton'
import { BattleModal } from '../components/history/BattleModal'
import { LeaderModal } from '../components/history/LeaderModal'
import { Portrait } from '../components/history/Portrait'
import { BATTLE_BY_ID, LEADER_BY_ID, warsOf } from '../data/history'
import { filterLeaders, filterWars } from '../utils/historySearch'
import styles from './HistoryPage.module.css'

type View = 'battles' | 'leaders'

const VIEWS: { id: View; label: string }[] = [
  { id: 'battles', label: 'Trận chiến' },
  { id: 'leaders', label: 'Người lãnh đạo' },
]

/** Trang Lịch sử: các cuộc kháng chiến (trận đánh) và người lãnh đạo */
export default function HistoryPage() {
  const [view, setView] = useState<View>('battles')
  const [query, setQuery] = useState('')
  const wars = filterWars(query)
  const leaders = filterLeaders(query)
  const battleCount = wars.reduce((n, w) => n + w.battles.length, 0)
  const searching = query.trim() !== ''
  // Popup đang mở (một lúc chỉ một): người lãnh đạo hoặc trận; hai popup mở lẫn nhau
  const [popup, setPopup] = useState<{ kind: 'leader' | 'battle'; id: string } | null>(null)
  const leader = popup?.kind === 'leader' ? LEADER_BY_ID.get(popup.id) : undefined
  const battleEntry = popup?.kind === 'battle' ? BATTLE_BY_ID.get(popup.id) : undefined

  const openLeader = (id: string) => setPopup({ kind: 'leader', id })
  const openBattle = (id: string) => setPopup({ kind: 'battle', id })
  const closePopup = () => setPopup(null)

  const changeView = (v: View) => {
    setView(v)
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
        <div className={styles.search} role="search">
          <svg className={styles.searchIcon} viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            type="search"
            className={styles.searchInput}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={view === 'battles' ? 'Tìm trận, địa điểm, năm, người chỉ huy…' : 'Tìm tên, vai trò, thời kỳ…'}
            aria-label={view === 'battles' ? 'Tìm trận chiến' : 'Tìm người lãnh đạo'}
          />
          {searching && (
            <button className={styles.searchClear} onClick={() => setQuery('')} aria-label="Xóa từ khóa">
              ×
            </button>
          )}
        </div>
        {searching && (
          <p className={styles.searchInfo} aria-live="polite">
            {view === 'battles'
              ? wars.length > 0
                ? `${battleCount} trận trong ${wars.length} cuộc kháng chiến`
                : 'Không tìm thấy trận nào'
              : leaders.length > 0
                ? `${leaders.length} người lãnh đạo`
                : 'Không tìm thấy người lãnh đạo nào'}
          </p>
        )}
      </section>

      <main className={styles.content}>
        {view === 'battles' ? (
          <ol className={styles.timeline}>
            {wars.map(({ war: w, battles }) => (
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
                          <button className={styles.leaderLink} onClick={() => openLeader(id)}>
                            {LEADER_BY_ID.get(id)?.name}
                          </button>
                        </span>
                      ))}
                    </span>
                  </div>
                </div>

                {battles.length > 0 && (
                  <div className={styles.battles}>
                    {battles.map((b) => (
                      <article key={b.id} className={`${styles.card} ${styles.battle}`}>
                        <div className={styles.cardTop}>
                          <span className={styles.date}>{b.date}</span>
                        </div>
                        <h3 className={styles.cardTitle}>
                          <button className={styles.titleBtn} onClick={() => openBattle(b.id)}>
                            {b.name}
                          </button>
                        </h3>
                        {b.place && <div className={styles.place}>{b.place}</div>}
                        <p className={styles.summary}>{b.summary}</p>
                        <div className={styles.leaderFoot}>
                          <button className={styles.detailBtn} onClick={() => openBattle(b.id)}>
                            Xem chi tiết
                          </button>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ol>
        ) : (
          <div className={styles.leaders}>
            {leaders.map((l) => (
              <article key={l.id} className={`${styles.card} ${styles.leader}`}>
                <div className={styles.leaderHead}>
                  <Portrait leader={l} variant="thumb" />
                  <div>
                    <h3 className={styles.cardTitle}>
                      <button className={styles.titleBtn} onClick={() => openLeader(l.id)}>
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
                  <button className={styles.detailBtn} onClick={() => openLeader(l.id)}>
                    Xem chi tiết
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
        <p className={styles.source}>
          Nội dung tóm tắt theo Wikipedia tiếng Việt (CC BY-SA 4.0). Ảnh từ Wikimedia Commons, ghi nguồn trong từng ảnh.
        </p>
      </main>

      {/* key: đổi người/trận thì gắn popup mới (cuộn về đầu) */}
      {leader && <LeaderModal key={leader.id} leader={leader} onClose={closePopup} onOpenBattle={openBattle} />}
      {battleEntry && (
        <BattleModal
          key={battleEntry.battle.id}
          battle={battleEntry.battle}
          war={battleEntry.war}
          onClose={closePopup}
          onOpenLeader={openLeader}
        />
      )}
    </div>
  )
}
