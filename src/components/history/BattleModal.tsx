import { useState } from 'react'
import { LEADER_BY_ID, wikiUrl, type Battle, type War } from '../../data/history'
import { Modal } from './Modal'
import { Portrait } from './Portrait'
import styles from './BattleModal.module.css'

interface Props {
  battle: Battle
  war: War
  onClose: () => void
  /** Bấm một người chỉ huy → mở popup người lãnh đạo */
  onOpenLeader: (leaderId: string) => void
}

/** Ảnh đầu popup: ảnh chụp/tranh cắt 16:9; lược đồ (fit 'contain') hiện nguyên trên nền nhạt */
function BattleImage({ battle }: { battle: Battle }) {
  const [failed, setFailed] = useState(false)
  const img = battle.image
  if (!img || failed) return null
  return (
    <figure className={styles.figure}>
      <div className={`${styles.frame} ${img.fit === 'contain' ? styles.contain : ''}`}>
        <img
          src={import.meta.env.BASE_URL + img.url}
          alt={battle.name}
          decoding="async"
          style={{ objectPosition: img.position }}
          onError={() => setFailed(true)}
        />
      </div>
      <figcaption className={styles.credit}>
        <a href={img.page} target="_blank" rel="noreferrer">
          {img.credit}
        </a>
      </figcaption>
    </figure>
  )
}

/** Popup chi tiết trận chiến: ảnh, thời gian, địa điểm, chỉ huy, lực lượng, bối cảnh, diễn biến, kết quả */
export function BattleModal({ battle, war, onClose, onOpenLeader }: Props) {
  const commanders = (battle.commanders ?? []).map((id) => LEADER_BY_ID.get(id)).filter((l) => l != null)
  const sections = [
    { title: 'Bối cảnh', text: battle.background },
    { title: 'Diễn biến', text: battle.events },
    { title: 'Kết quả và ý nghĩa', text: battle.outcome },
  ].filter((s) => s.text)

  return (
    <Modal label={`Chi tiết ${battle.name}`} onClose={onClose}>
      <BattleImage battle={battle} />

      <div className={`${styles.body} ${battle.image ? '' : styles.noImage}`}>
        <div className={styles.kicker}>
          Trận chiến <span className={styles.war}>· {war.name}</span>
        </div>
        <h2 className={styles.name}>{battle.name}</h2>

        {commanders.length > 0 && (
          <section className={styles.cmdSection}>
            <h3 className={styles.heading}>Chỉ huy</h3>
            <div className={styles.commanders}>
              {commanders.map((l) => (
                <button key={l.id} className={styles.commander} onClick={() => onOpenLeader(l.id)}>
                  <Portrait leader={l} variant="thumb" />
                  <span>
                    <span className={styles.cmdName}>{l.name}</span>
                    <span className={styles.cmdRole}>{l.role}</span>
                  </span>
                </button>
              ))}
            </div>
          </section>
        )}

        <dl className={styles.facts}>
          <div>
            <dt>Thời gian</dt>
            <dd>{battle.date}</dd>
          </div>
          {battle.place && (
            <div>
              <dt>Địa điểm</dt>
              <dd>{battle.place}</dd>
            </div>
          )}
          <div>
            <dt>Đối phương</dt>
            <dd>{war.enemy}</dd>
          </div>
          {battle.result && (
            <div>
              <dt>Kết quả</dt>
              <dd className={styles.result}>{battle.result}</dd>
            </div>
          )}
        </dl>

        <p className={styles.lead}>{battle.summary}</p>

        {battle.forces && battle.forces.length > 0 && (
          <section className={styles.section}>
            <h3 className={styles.heading}>Lực lượng</h3>
            <div className={styles.forces}>
              {battle.forces.map((f) => (
                <div key={f.side} className={styles.force}>
                  <div className={styles.side}>{f.side}</div>
                  <div className={styles.strength}>{f.strength}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {sections.map((s) => (
          <section key={s.title} className={styles.section}>
            <h3 className={styles.heading}>{s.title}</h3>
            <p className={styles.para}>{s.text}</p>
          </section>
        ))}

        <a className={styles.wiki} href={wikiUrl(battle.wiki)} target="_blank" rel="noreferrer">
          Đọc thêm trên Wikipedia ↗
        </a>
      </div>
    </Modal>
  )
}
