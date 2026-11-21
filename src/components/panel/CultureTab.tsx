import type { ProvinceDetail } from '../../types/province'
import { MediaImage } from './MediaImage'
import styles from './Tab.module.css'

export function CultureTab({ detail }: { detail: ProvinceDetail }) {
  const { culture, festivals } = detail

  return (
    <>
      <section className={styles.section}>
        <h3 className={styles.heading}>Văn hóa</h3>
        {culture.cover && (
          <div className={styles.cover}>
            <MediaImage key={culture.cover.caption} media={culture.cover} alt={culture.cover.caption} variant="cover" />
            <div className={styles.caption}>{culture.cover.caption}</div>
          </div>
        )}
        <p className={styles.text}>{culture.summary}</p>
      </section>

      <section className={styles.section}>
        <h3 className={styles.heading}>Dân tộc</h3>
        <div className={styles.chips}>
          {culture.ethnicGroups.map((g) => (
            <span key={g} className={styles.chip}>
              {g}
            </span>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.heading}>Di sản & danh thắng</h3>
        <div className={styles.cards}>
          {culture.heritage.map((h) => (
            <article key={h.name} className={`${styles.card} ${styles.mediaCard}`}>
              <MediaImage media={h} alt={h.name} variant="wide" />
              <div className={styles.cardBody}>
                <div className={styles.cardTitle}>{h.name}</div>
                {h.description && <p className={styles.cardText}>{h.description}</p>}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.heading}>Lễ hội</h3>
        <div className={styles.cards}>
          {festivals.map((f) => (
            <article key={f.name} className={`${styles.card} ${styles.mediaCard}`}>
              <MediaImage media={f} alt={f.name} variant="wide" />
              <div className={styles.cardBody}>
                <div className={styles.cardTitle}>{f.name}</div>
                <span className={styles.cardMeta}>{f.time}</span>
                <p className={styles.cardText}>{f.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
