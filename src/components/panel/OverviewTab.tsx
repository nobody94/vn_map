import type { ProvinceDetail } from '../../types/province'
import { formatDec, formatInt, formatPopulation } from '../../utils/format'
import type { UnitMatch } from '../../utils/search'
import { AdminUnits } from './AdminUnits'
import styles from './Tab.module.css'

export function OverviewTab({ code, detail, focusUnit }: { code: number; detail: ProvinceDetail; focusUnit?: UnitMatch }) {
  const density = detail.population / detail.areaKm2
  const highest = detail.peaks.find((p) => p.highest)
  // Không chắc điểm cao nhất thì hiện đỉnh tiêu biểu đầu tiên
  const peak = highest ?? detail.peaks[0]

  return (
    <>
      <section className={styles.section}>
        <div className={styles.statGrid}>
          <div className={styles.stat}>
            <div className={styles.statLabel}>Diện tích</div>
            <div className={styles.statValue}>
              {formatDec(detail.areaKm2)}
              <span className={styles.statUnit}>km²</span>
            </div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statLabel}>Dân số</div>
            <div className={styles.statValue}>{formatPopulation(detail.population)}</div>
            <div className={styles.statHint}>{formatInt(detail.population)} người</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statLabel}>Mật độ</div>
            <div className={styles.statValue}>
              {formatInt(density)}
              <span className={styles.statUnit}>người/km²</span>
            </div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statLabel}>{highest || !peak ? 'Điểm cao nhất' : 'Đỉnh tiêu biểu'}</div>
            {peak ? (
              <>
                <div className={styles.statValue}>
                  {formatInt(peak.heightM)}
                  <span className={styles.statUnit}>m</span>
                </div>
                <div className={styles.statHint}>{peak.name.split(' – ')[0]}</div>
              </>
            ) : (
              <div className={styles.statValue}>—</div>
            )}
          </div>
        </div>
        <div className={styles.source}>Nguồn số liệu: {detail.statsSource}</div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.heading}>Địa hình & độ cao</h3>
        <p className={styles.text}>{detail.terrain}</p>
        {detail.peaks.length > 0 && (
          <ul className={styles.peaks}>
            {detail.peaks.map((p) => (
              <li key={p.name} className={styles.peak}>
                <span className={styles.peakName}>
                  {p.name}
                  {p.highest && <span className={styles.badge}>cao nhất</span>}
                </span>
                <span className={styles.peakHeight}>{formatInt(p.heightM)} m</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* key: đổi tỉnh hoặc đơn vị tìm kiếm thì dựng lại (xóa bộ lọc, cuộn tới đơn vị mới) */}
      <AdminUnits key={`${code}|${focusUnit?.kind}|${focusUnit?.name}`} code={code} focus={focusUnit} />
    </>
  )
}
