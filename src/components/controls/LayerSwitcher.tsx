import type { ReactNode } from 'react'
import { ELEVATION_MAX, ELEVATION_TICKS, elevationGradient } from '../../data/elevation'
import { formatInt } from '../../utils/format'
import styles from './LayerSwitcher.module.css'

export interface MapLayers {
  terrain: boolean
  peaks: boolean
  rivers: boolean
}

interface Props {
  layers: MapLayers
  onToggle: (key: keyof MapLayers) => void
  /** Panel thông tin đang mở → dịch sang trái để không bị che (desktop) */
  panelOpen: boolean
}

const ITEMS: { key: keyof MapLayers; label: string; icon: ReactNode }[] = [
  {
    key: 'terrain',
    label: 'Địa hình',
    icon: (
      <path
        d="M3 18l5-8 3 4 3-6 7 10z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    ),
  },
  {
    key: 'peaks',
    label: 'Đỉnh núi',
    icon: <path d="M12 5l7 13H5z" fill="currentColor" />,
  },
  {
    key: 'rivers',
    label: 'Sông ngòi',
    icon: (
      <path
        d="M4 7c3 0 3 2 6 2s3-2 6-2 3 2 4 2M4 12c3 0 3 2 6 2s3-2 6-2 3 2 4 2M4 17c3 0 3 2 6 2s3-2 6-2 3 2 4 2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    ),
  },
]

/** Nút bật/tắt các lớp bản đồ (góc trên bên phải) */
export function LayerSwitcher({ layers, onToggle, panelOpen }: Props) {
  return (
    <nav className={`${styles.switcher} ${panelOpen ? styles.shifted : ''}`} aria-label="Lớp bản đồ">
      {ITEMS.map((it) => (
        <button
          key={it.key}
          className={`${styles.btn} ${layers[it.key] ? styles.on : ''}`}
          aria-pressed={layers[it.key]}
          title={it.label}
          onClick={() => onToggle(it.key)}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            {it.icon}
          </svg>
          <span className={styles.label}>{it.label}</span>
        </button>
      ))}

      {layers.terrain && (
        <div className={styles.legend} aria-label="Chú giải độ cao">
          <div className={styles.legendTitle}>Độ cao (m)</div>
          <div className={styles.scale}>
            <div className={styles.bar} style={{ background: elevationGradient() }} />
            <div className={styles.ticks}>
              {ELEVATION_TICKS.map((h) => (
                <span key={h} style={{ bottom: `${(h / ELEVATION_MAX) * 100}%` }}>
                  {formatInt(h)}
                  {h === ELEVATION_MAX ? '+' : ''}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
