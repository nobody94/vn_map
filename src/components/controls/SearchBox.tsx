import { useId, useState, type KeyboardEvent } from 'react'
import { searchAll, type UnitMatch } from '../../utils/search'
import { useAdminUnits } from '../../data/adminUnits'
import { regionOf } from '../../data/regions'
import styles from './SearchBox.module.css'

interface Props {
  /** unit: phường được chọn (khi tìm theo phường) */
  onSelect: (code: number, unit?: UnitMatch) => void
}

/** Ô tìm tỉnh (tên mới, tên cũ) và phường, không cần gõ dấu */
export function SearchBox({ onSelect }: Props) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const listId = useId()

  const units = useAdminUnits()
  const results = searchAll(query, units)
  const showList = open && query.trim().length > 0

  const choose = (r: (typeof results)[number]) => {
    onSelect(r.province.code, r.unit)
    setQuery('')
    setOpen(false)
    setActive(0)
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((i) => Math.min(i + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter' && results[active]) {
      choose(results[active])
    } else if (e.key === 'Escape') {
      setOpen(false)
      e.currentTarget.blur()
    }
  }

  return (
    <div className={styles.wrap}>
      <svg className={styles.icon} viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
        <circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M16 16l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <input
        className={styles.input}
        type="search"
        placeholder="Tìm tỉnh, thành, phường…"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value)
          setOpen(true)
          setActive(0)
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onKeyDown={onKeyDown}
        role="combobox"
        aria-expanded={showList}
        aria-controls={listId}
        aria-autocomplete="list"
      />

      {showList && (
        <ul className={styles.list} id={listId} role="listbox">
          {results.length === 0 && <li className={styles.empty}>Không tìm thấy</li>}
          {results.map((r, i) => {
            const region = regionOf(r.province.code)
            return (
              <li
                key={`${r.province.code}|${r.unit?.kind ?? ''}|${r.unit?.name ?? ''}`}
                role="option"
                aria-selected={i === active}
                className={`${styles.item} ${i === active ? styles.active : ''}`}
                // onMouseDown thay vì onClick để chạy trước onBlur của input
                onMouseDown={(e) => {
                  e.preventDefault()
                  choose(r)
                }}
                onMouseEnter={() => setActive(i)}
              >
                <span className={styles.dot} style={{ background: region?.strong }} />
                <span className={styles.text}>
                  <span className={styles.name}>{r.unit ? r.unit.name : r.province.name}</span>
                  <span className={styles.sub}>{subtitle(r)}</span>
                </span>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

function subtitle(r: ReturnType<typeof searchAll>[number]): string {
  if (r.unit?.kind === 'ward') return `${r.province.kind} ${r.province.name}`
  if (r.matchedOld) return `Gồm tỉnh cũ: ${r.matchedOld}`
  return regionOf(r.province.code)?.name ?? ''
}
