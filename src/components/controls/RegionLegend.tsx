import { REGIONS, type RegionId } from '../../data/regions'
import styles from './RegionLegend.module.css'

interface Props { 
  /** Vùng đang được rê chuột trên chú giải (để làm nổi trên bản đồ) */
  onHighlight: (id: RegionId | null) => void
  /** Ẩn trên điện thoại (khi panel thông tin đang mở) */
  hiddenOnMobile?: boolean
}

/** Chú giải 7 vùng + công tắc bật/tắt tô màu theo vùng */
export function RegionLegend({ onHighlight, hiddenOnMobile }: Props) {
 
  return (
    <section className={styles.legend} aria-label="Chú giải vùng" data-hidden-mobile={hiddenOnMobile ? 'true' : undefined}>
      <ul className={styles.list}>
          {REGIONS.map((r) => (
            <li
              key={r.id}
              className={styles.item}
              onMouseEnter={() => onHighlight(r.id)}
              onMouseLeave={() => onHighlight(null)}
            >
              <span className={styles.swatch} style={{ background: r.fill, borderColor: r.strong }} />
              {r.name}
            </li>
          ))}
        </ul>
    </section>
  )
}
