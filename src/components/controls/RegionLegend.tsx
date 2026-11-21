import { useState } from 'react'
import { REGIONS, type RegionId } from '../../data/regions'
import styles from './RegionLegend.module.css'

interface Props {
  colorByRegion: boolean
  onToggle: (on: boolean) => void
  /** Vùng đang được rê chuột trên chú giải (để làm nổi trên bản đồ) */
  onHighlight: (id: RegionId | null) => void
  /** Ẩn trên điện thoại (khi panel thông tin đang mở) */
  hiddenOnMobile?: boolean
}

/** Chú giải 7 vùng + công tắc bật/tắt tô màu theo vùng */
export function RegionLegend({ colorByRegion, onToggle, onHighlight, hiddenOnMobile }: Props) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <section className={styles.legend} aria-label="Chú giải vùng" data-hidden-mobile={hiddenOnMobile ? 'true' : undefined}>
      <header className={styles.header}>
        {/* <label className={styles.switch}>
          <input type="checkbox" checked={colorByRegion} onChange={(e) => onToggle(e.target.checked)} />
          <span className={styles.track} aria-hidden="true" />
          <span className={styles.switchLabel}>Tô màu 7 vùng</span>
        </label> */}
        {/* {colorByRegion && (
          <button
            className={styles.collapse}
            onClick={() => setCollapsed((c) => !c)}
            aria-label={collapsed ? 'Mở chú giải' : 'Thu gọn chú giải'}
            aria-expanded={!collapsed}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" className={collapsed ? styles.flip : ''} aria-hidden="true">
              <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        )} */}
      </header>

      {colorByRegion && !collapsed && (
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
      )}
    </section>
  )
}
