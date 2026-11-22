import { useState } from 'react'
import type { ProvinceDetail, ProvinceMeta } from '../../types/province'
import type { UnitMatch } from '../../utils/search'
import { OverviewTab } from './OverviewTab'
import { CultureTab } from './CultureTab'
import { FoodTab } from './FoodTab'
import styles from './ProvincePanel.module.css'

interface Props {
  meta: ProvinceMeta
  detail: ProvinceDetail | undefined
  onClose: () => void
  /** Xã/phường hoặc huyện cũ chọn từ ô tìm kiếm: chuyển sang tab Tổng quan và đánh dấu */
  focusUnit?: UnitMatch
}

const TABS = [
  { id: 'overview', label: 'Tổng quan' },
  { id: 'culture', label: 'Văn hóa & Lễ hội' },
  { id: 'food', label: 'Ẩm thực & Đặc sản' },
] as const

type TabId = (typeof TABS)[number]['id']

export function ProvincePanel({ meta, detail, onClose, focusUnit }: Props) {
  // Giữ nguyên tab khi chuyển sang tỉnh khác để tiện so sánh
  const [tab, setTab] = useState<TabId>('overview')
  // Tìm theo xã/phường → về tab Tổng quan (điều chỉnh state ngay khi render, không dùng effect)
  const [prevFocus, setPrevFocus] = useState(focusUnit)
  if (focusUnit !== prevFocus) {
    setPrevFocus(focusUnit)
    if (focusUnit) setTab('overview')
  }

  return (
    <aside className={styles.panel} aria-label={`Thông tin ${meta.name}`}>
      <header className={styles.header}>
        <div>
          <div className={styles.kind}>
            {meta.kind}
            {detail && <span className={styles.region}> · {detail.region}</span>}
          </div>
          <h2 className={styles.name}>{meta.name}</h2>
        </div>
        <button className={styles.close} onClick={onClose} aria-label="Đóng">
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </header>

      <div className={styles.merged}>
        {meta.mergedFrom.length > 0 ? (
          <>
            <span className={styles.mergedLabel}>Hợp nhất từ</span>
            {meta.mergedFrom.map((n) => (
              <span key={n} className={styles.chip}>
                {n}
              </span>
            ))}
          </>
        ) : (
          <span className={styles.mergedLabel}>Giữ nguyên địa giới, không sáp nhập</span>
        )}
      </div>

      {detail ? (
        <>
          <nav className={styles.tabs} role="tablist">
            {TABS.map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={tab === t.id}
                className={`${styles.tab} ${tab === t.id ? styles.tabActive : ''}`}
                onClick={() => setTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </nav>
          <div className={styles.body} role="tabpanel">
            {tab === 'overview' && <OverviewTab code={meta.code} detail={detail} focusUnit={focusUnit} />}
            {tab === 'culture' && <CultureTab detail={detail} />}
            {tab === 'food' && <FoodTab detail={detail} />}
          </div>
        </>
      ) : (
        <div className={styles.empty}>
          <p>Thông tin chi tiết về {meta.name} đang được cập nhật.</p>
        </div>
      )}
    </aside>
  )
}
