import { hrefFor, type Route } from '../utils/route'
import styles from './HomePage.module.css'

const ENTRIES: { route: Route; title: string; desc: string; icon: React.ReactNode }[] = [
  {
    route: 'geo',
    title: 'Địa lý',
    desc: 'Bản đồ 34 tỉnh, thành phố sau sáp nhập: địa hình, núi, sông, văn hóa, ẩm thực.',
    icon: (
      <path
        d="M9 4L3 6.5v13.5l6-2.5 6 2.5 6-2.5V4l-6 2.5L9 4zM9 4v13.5M15 6.5V20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    ),
  },
  {
    route: 'history',
    title: 'Lịch sử',
    desc: 'Các cuộc kháng chiến, trận đánh tiêu biểu và những người lãnh đạo.',
    icon: (
      <path
        d="M6 3h9l3 3v15H6zM15 3v3h3M9 10h6M9 14h6M9 18h4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
]

/** Trang chủ: chọn Địa lý hoặc Lịch sử */
export function HomePage() {
  return (
    <main className={styles.home}>
      <div className={styles.inner}>
        <img className={styles.logo} src="/vietnam-map-icon.svg" alt="" width="56" height="56" />
        <h1 className={styles.title}>Việt Nam</h1>
        <p className={styles.subtitle}>Khám phá địa lý và lịch sử đất nước</p>

        <nav className={styles.entries}>
          {ENTRIES.map((e) => (
            <a key={e.route} href={hrefFor(e.route)} className={styles.entry}>
              <span className={styles.icon}>
                <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
                  {e.icon}
                </svg>
              </span>
              <span className={styles.entryTitle}>{e.title}</span>
              <span className={styles.entryDesc}>{e.desc}</span>
              <span className={styles.arrow} aria-hidden="true">
                →
              </span>
            </a>
          ))}
        </nav>
      </div>
    </main>
  )
}
