import { useState } from 'react'
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
  const [open, setOpen] = useState<boolean>(false);

  return (
    <section className={styles.legend} aria-label="Chú giải vùng" data-hidden-mobile={hiddenOnMobile ? 'true' : undefined}>
      <div className={styles.header} >
        <div>7 vùng kinh tế</div>
        <div className={`${styles.headerIcon} ${open ? styles.active : ''}`}
          onClick={()=>setOpen(!open)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 7C12.2652 7 12.5196 7.10536 12.7071 7.29289L19.7071 14.2929C20.0976 14.6834 20.0976 15.3166 19.7071 15.7071C19.3166 16.0976 18.6834 16.0976 18.2929 15.7071L12 9.41421L5.70711 15.7071C5.31658 16.0976 4.68342 16.0976 4.29289 15.7071C3.90237 15.3166 3.90237 14.6834 4.29289 14.2929L11.2929 7.29289C11.4804 7.10536 11.7348 7 12 7Z" fill="#000000" />
          </svg>
        </div>
      </div>
      {
        open && <ul className={styles.list}>
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
      }
    </section>
  )
}
