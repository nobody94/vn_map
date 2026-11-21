import type { NamedItem, ProvinceDetail } from '../../types/province'
import { resolveImage } from '../../data/media'
import { MediaImage } from './MediaImage'
import styles from './Tab.module.css'

/** Thẻ món ăn / đặc sản: ảnh vuông bên trái, chữ bên phải */
function ItemCards({ items }: { items: NamedItem[] }) {
  return (
    <div className={styles.cards}>
      {items.map((it) => {
        const credit = resolveImage(it)?.credit
        return (
          <article key={it.name} className={`${styles.card} ${styles.rowCard}`}>
            <MediaImage media={it} alt={it.name} variant="square" />
            <div className={styles.rowBody}>
              <div className={styles.cardTitle}>{it.name}</div>
              <p className={styles.cardText}>{it.description}</p>
              {credit && <div className={styles.credit}>{credit}</div>}
            </div>
          </article>
        )
      })}
    </div>
  )
}

export function FoodTab({ detail }: { detail: ProvinceDetail }) {
  return (
    <>
      <section className={styles.section}>
        <h3 className={styles.heading}>Món ăn đặc trưng</h3>
        <ItemCards items={detail.foods} />
      </section>
      <section className={styles.section}>
        <h3 className={styles.heading}>Đặc sản</h3>
        <ItemCards items={detail.specialties} />
      </section>
    </>
  )
}
