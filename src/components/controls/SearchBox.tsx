import { useId, useState, type KeyboardEvent } from 'react'
import { searchProvinces } from '../../utils/search'
import { regionOf } from '../../data/regions'
import styles from './SearchBox.module.css'

interface Props {
  onSelect: (code: number) => void
}

/** Ô tìm tỉnh theo tên mới hoặc tên cũ (trước sáp nhập), không cần gõ dấu */
export function SearchBox({ onSelect }: Props) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const listId = useId()

  const results = searchProvinces(query)
  const showList = open && query.trim().length > 0

  const choose = (code: number) => {
    onSelect(code)
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
      choose(results[active].province.code)
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
        placeholder="Tìm tỉnh, thành (cả tên cũ)…"
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
                key={r.province.code}
                role="option"
                aria-selected={i === active}
                className={`${styles.item} ${i === active ? styles.active : ''}`}
                // onMouseDown thay vì onClick để chạy trước onBlur của input
                onMouseDown={(e) => {
                  e.preventDefault()
                  choose(r.province.code)
                }}
                onMouseEnter={() => setActive(i)}
              >
                <span className={styles.dot} style={{ background: region?.strong }} />
                <span className={styles.text}>
                  <span className={styles.name}>{r.province.name}</span>
                  <span className={styles.sub}>
                    {r.matchedOld ? `Gồm tỉnh cũ: ${r.matchedOld}` : region?.name}
                  </span>
                </span>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
