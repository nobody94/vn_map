import { hrefFor } from '../../utils/route'
import styles from './HomeButton.module.css'

interface Props {
  className?: string
}

/** Nút về trang chủ (dùng chung cho trang Địa lý và Lịch sử) */
export function HomeButton({ className }: Props) {
  return (
    <a href={hrefFor('home')} className={`${styles.home} ${className ?? ''}`} aria-label="Về trang chủ" title="Trang chủ">
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path
          d="M4 11l8-7 8 7M6 9.5V20h4.5v-6h3v6H18V9.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  )
}
