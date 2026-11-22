import { battlesOf, warsOf, wikiUrl, type Leader } from '../../data/history'
import { Modal } from './Modal'
import { Portrait } from './Portrait'
import styles from './LeaderModal.module.css'

interface Props {
  leader: Leader
  onClose: () => void
  /** Bấm một trận đã chỉ huy */
  onOpenBattle: (battleId: string) => void
}

/** Popup chi tiết người lãnh đạo: chân dung, tiểu sử, các cuộc kháng chiến và trận đã chỉ huy */
export function LeaderModal({ leader, onClose, onOpenBattle }: Props) {
  const wars = warsOf(leader.id)
  const battles = battlesOf(leader.id)

  return (
    <Modal label={`Chi tiết ${leader.name}`} onClose={onClose}>
      <div className={styles.layout}>
        <div className={styles.side}>
          <Portrait leader={leader} variant="large" />
        </div>

        <div className={styles.main}>
          <div className={styles.kicker}>Người lãnh đạo</div>
          <h2 className={styles.name}>{leader.name}</h2>
          <div className={styles.meta}>
            {leader.lifespan}
            {leader.alias && <> · {leader.alias}</>}
          </div>
          <div className={styles.role}>{leader.role}</div>

          <section className={styles.section}>
            <h3 className={styles.heading}>Tiểu sử</h3>
            {leader.bio.map((p, i) => (
              <p key={i} className={styles.para}>
                {p}
              </p>
            ))}
          </section>

          {wars.length > 0 && (
            <section className={styles.section}>
              <h3 className={styles.heading}>Lãnh đạo kháng chiến</h3>
              <ul className={styles.wars}>
                {wars.map((w) => (
                  <li key={w.id} className={styles.war}>
                    <span className={styles.warName}>{w.name}</span>
                    <span className={styles.warPeriod}>{w.period}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {battles.length > 0 && (
            <section className={styles.section}>
              <h3 className={styles.heading}>Trận đã chỉ huy</h3>
              <ul className={styles.battles}>
                {battles.map(({ battle }) => (
                  <li key={battle.id}>
                    <button className={styles.battle} onClick={() => onOpenBattle(battle.id)}>
                      <span>
                        <span className={styles.battleName}>{battle.name}</span>
                        <span className={styles.battleDate}>{battle.date}</span>
                      </span>
                      <span className={styles.arrow} aria-hidden="true">
                        →
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <a className={styles.wiki} href={wikiUrl(leader.wiki)} target="_blank" rel="noreferrer">
            Đọc thêm trên Wikipedia ↗
          </a>
        </div>
      </div>
    </Modal>
  )
}
