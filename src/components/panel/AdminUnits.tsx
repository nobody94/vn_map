import { useEffect, useRef, useState } from 'react'
import { splitUnitName, useAdminUnits } from '../../data/adminUnits'
import type { UnitMatch } from '../../utils/search'
import { formatInt } from '../../utils/format'
import tab from './Tab.module.css'
import styles from './AdminUnits.module.css'

interface Props {
  code: number
  /** Đơn vị vừa chọn từ ô tìm kiếm: mở rộng danh sách, tô đậm và cuộn tới */
  focus?: UnitMatch
}

/** Loại đơn vị hiện thành danh sách (xã quá nhiều nên chỉ đếm, vẫn tìm được ở ô tìm kiếm) */
const LISTED_TYPES = ['Phường', 'Đặc khu'] as const
const ALL_TYPES = ['Phường', 'Xã', 'Đặc khu'] as const

/** Mục "Đơn vị hành chính" trong tab Tổng quan: phường, đặc khu hiện nay + huyện/quận cũ */
export function AdminUnits({ code, focus }: Props) {
  const data = useAdminUnits()
  const [expanded, setExpanded] = useState(focus?.kind === 'ward')
  const chipRef = useRef<HTMLLIElement>(null)

  useEffect(() => {
    chipRef.current?.scrollIntoView({ block: 'center', behavior: 'smooth' })
  }, [data])

  const units = data?.provinces[code]
  if (!units) {
    return (
      <section className={tab.section}>
        <h3 className={tab.heading}>Đơn vị hành chính</h3>
        <p className={styles.muted}>{data ? 'Chưa có dữ liệu.' : 'Đang tải danh sách đơn vị hành chính…'}</p>
      </section>
    )
  }

  const ofType = (type: string) => units.wards.filter((w) => splitUnitName(w)[0] === type)
  const counts = ALL_TYPES.map((type) => ({ type, total: ofType(type).length })).filter((c) => c.total > 0)
  const groups = LISTED_TYPES.map((type) => ({ type, names: ofType(type) })).filter((g) => g.names.length > 0)
  const listedTotal = groups.reduce((s, g) => s + g.names.length, 0)

  // Huyện cũ, nhóm theo tỉnh cũ
  const oldGroups = new Map<string, string[]>()
  for (const [name, oldProvince] of units.oldDistricts) oldGroups.set(oldProvince, [...(oldGroups.get(oldProvince) ?? []), name])
  const multiOld = oldGroups.size > 1

  const chip = (name: string, kind: UnitMatch['kind']) => {
    const f = focus?.kind === kind && focus.name === name
    return (
      <li key={name} ref={f ? chipRef : undefined} className={`${styles.chip} ${f ? styles.focus : ''}`} title={name}>
        {splitUnitName(name)[1]}
      </li>
    )
  }

  return (
    <section className={tab.section}>
      <h3 className={tab.heading}>Đơn vị hành chính</h3>
      <p className={styles.summary}>
        <strong>{formatInt(units.wards.length)}</strong> đơn vị cấp xã:{' '}
        {counts.map((c) => `${formatInt(c.total)} ${c.type.toLowerCase()}`).join(' · ')}
      </p>

      {groups.length > 0 && (
        <>
          <div className={`${styles.list} ${expanded ? '' : styles.collapsed}`}>
            {groups.map((g) => (
              <div key={g.type} className={styles.group}>
                <div className={styles.groupTitle}>
                  {g.type} <span className={styles.count}>{g.names.length}</span>
                </div>
                <ul className={styles.chips}>{g.names.map((n) => chip(n, 'ward'))}</ul>
              </div>
            ))}
          </div>
          {listedTotal > 20 && (
            <button className={styles.more} onClick={() => setExpanded((v) => !v)}>
              {expanded ? 'Thu gọn' : `Xem tất cả ${formatInt(listedTotal)} phường${groups.length > 1 ? ', đặc khu' : ''}`}
            </button>
          )}
        </>
      )}

      {units.oldDistricts.length > 0 && (
        <details className={styles.old} open={focus?.kind === 'oldDistrict'}>
          <summary>
            Huyện, quận cũ trước 01/07/2025 <span className={styles.count}>{units.oldDistricts.length}</span>
          </summary>
          <p className={styles.muted}>Cấp huyện đã bãi bỏ từ 01/07/2025, chỉ để tra cứu.</p>
          {[...oldGroups].map(([oldProvince, names]) => (
            <div key={oldProvince} className={styles.group}>
              {multiOld && <div className={styles.groupTitle}>{oldProvince} (cũ)</div>}
              <ul className={styles.chips}>{names.map((n) => chip(n, 'oldDistrict'))}</ul>
            </div>
          ))}
        </details>
      )}

      <div className={tab.source}>Nguồn: {data.source}</div>
    </section>
  )
}
