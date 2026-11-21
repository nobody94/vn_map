import { RIVER_SYSTEMS, type River } from '../../data/rivers'
import { PROVINCE_BY_CODE } from '../../data/provinceMeta'
import { resolveImage } from '../../data/media'
import { formatInt } from '../../utils/format'
import { MediaImage } from './MediaImage'
import panel from './ProvincePanel.module.css'
import tab from './Tab.module.css'
import feature from './MountainPanel.module.css'
import styles from './RiverPanel.module.css'

interface Props {
  river: River
  onClose: () => void
  onOpenProvince: (code: number) => void
}

/** Khung thông tin một con sông: ảnh, chiều dài, nguồn – cửa sông, tỉnh chảy qua */
export function RiverPanel({ river: r, onClose, onOpenProvince }: Props) {
  const hasImage = resolveImage(r) != null

  return (
    <aside className={panel.panel} aria-label={`Thông tin ${r.name}`}>
      <div className={feature.hero}>
        <MediaImage key={r.id} media={r} alt={r.name} variant="cover" />
        <button className={`${panel.close} ${feature.closeOnImage}`} onClick={onClose} aria-label="Đóng">
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        {!hasImage && <div className={feature.noImage}>Chưa có ảnh</div>}
      </div>

      <header className={feature.header}>
        <div className={`${panel.kind} ${styles.kind}`}>
          Sông<span className={panel.region}> · {RIVER_SYSTEMS[r.system].name}</span>
        </div>
        <h2 className={panel.name}>{r.name}</h2>
        {r.aka && <div className={feature.note}>Tên khác: {r.aka}</div>}
      </header>

      <div className={panel.body}>
        <section className={tab.section}>
          <div className={tab.statGrid}>
            <div className={tab.stat}>
              <div className={tab.statLabel}>Chiều dài</div>
              <div className={tab.statValue}>
                {r.lengthKm ? (
                  <>
                    {formatInt(r.lengthKm)}
                    <span className={tab.statUnit}>km</span>
                  </>
                ) : (
                  '—'
                )}
              </div>
            </div>
            <div className={tab.stat}>
              <div className={tab.statLabel}>Đoạn chảy ở Việt Nam</div>
              <div className={tab.statValue}>
                {r.lengthVnKm ? (
                  <>
                    {formatInt(r.lengthVnKm)}
                    <span className={tab.statUnit}>km</span>
                  </>
                ) : (
                  '—'
                )}
              </div>
            </div>
          </div>
          <div className={tab.source}>Chiều dài theo số liệu phổ biến, mang tính tham khảo.</div>
        </section>

        <section className={tab.section}>
          <dl className={styles.flow}>
            <div>
              <dt>Bắt nguồn</dt>
              <dd>{r.source}</dd>
            </div>
            <div>
              <dt>Đổ ra</dt>
              <dd>{r.mouth}</dd>
            </div>
          </dl>
        </section>

        <section className={tab.section}>
          <h3 className={tab.heading}>Giới thiệu</h3>
          <p className={tab.text}>{r.description}</p>
        </section>

        <section className={tab.section}>
          <h3 className={tab.heading}>Chảy qua</h3>
          <div className={styles.provinces}>
            {r.provinces.map((code) => {
              const p = PROVINCE_BY_CODE.get(code)
              if (!p) return null
              return (
                <button key={code} className={styles.province} onClick={() => onOpenProvince(code)}>
                  {p.name}
                </button>
              )
            })}
          </div>
        </section>
      </div>
    </aside>
  )
}
