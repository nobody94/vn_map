import type { Mountain } from '../../data/mountains'
import { PROVINCE_BY_CODE } from '../../data/provinceMeta'
import { resolveImage } from '../../data/media'
import { formatInt } from '../../utils/format'
import { MediaImage } from './MediaImage'
import panel from './ProvincePanel.module.css'
import tab from './Tab.module.css'
import styles from './MountainPanel.module.css'

interface Props {
  mountain: Mountain
  onClose: () => void
  onOpenProvince: (code: number) => void
}

/** Khung thông tin một đỉnh núi: ảnh, độ cao, vị trí, giới thiệu */
export function MountainPanel({ mountain: m, onClose, onOpenProvince }: Props) {
  const province = PROVINCE_BY_CODE.get(m.provinceCode)
  const hasImage = resolveImage(m) != null

  return (
    <aside className={panel.panel} aria-label={`Thông tin núi ${m.name}`}>
      <header className={panel.header}>
        <div>
          <div className={panel.kind}>
            Núi{m.range && <span className={panel.region}> · Dãy {m.range}</span>}
          </div>
          <h2 className={panel.name}>{m.name}</h2>
          {m.note && <div className={styles.note}>{m.note}</div>}
        </div>
        <button className={panel.close} onClick={onClose} aria-label="Đóng">
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </header>

      <div className={panel.body}>
        {/* key: ảnh lỗi ở núi này không ảnh hưởng núi khác */}
        <div className={styles.hero}>
          <MediaImage key={m.id} media={m} alt={m.name} variant="cover" />
          {!hasImage && <div className={styles.noImage}>Chưa có ảnh</div>}
        </div>

        <section className={tab.section}>
          <div className={tab.statGrid}>
            <div className={tab.stat}>
              <div className={tab.statLabel}>Độ cao</div>
              <div className={tab.statValue}>
                {formatInt(m.heightM)}
                <span className={tab.statUnit}>m</span>
              </div>
            </div>
            <div className={tab.stat}>
              <div className={tab.statLabel}>Tọa độ (gần đúng)</div>
              <div className={styles.coord}>
                {m.lat.toFixed(2)}°B · {m.lng.toFixed(2)}°Đ
              </div>
            </div>
          </div>
        </section>

        <section className={tab.section}>
          <h3 className={tab.heading}>Vị trí</h3>
          <p className={tab.text}>{m.location}</p>
        </section>

        <section className={tab.section}>
          <h3 className={tab.heading}>Giới thiệu</h3>
          <p className={tab.text}>{m.description}</p>
        </section>

        {province && (
          <button className={styles.provinceBtn} onClick={() => onOpenProvince(province.code)}>
            <span>
              <span className={styles.provinceLabel}>Thuộc {province.kind.toLowerCase()}</span>
              <span className={styles.provinceName}>{province.name}</span>
            </span>
            <span className={styles.arrow} aria-hidden="true">
              →
            </span>
          </button>
        )}
      </div>
    </aside>
  )
}
