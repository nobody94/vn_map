/**
 * Promise có gắn `status`/`value` theo quy ước React: `use()` đọc ngay giá trị khi đã
 * tải xong mà không hiện lại fallback của Suspense.
 */
type Tracked<T> = Promise<T> & { status?: 'pending' | 'fulfilled' | 'rejected'; value?: T }

export function track<T>(p: Promise<T>): Promise<T> {
  const t = p as Tracked<T>
  t.status = 'pending'
  p.then(
    (v) => {
      t.status = 'fulfilled'
      t.value = v
    },
    () => {
      t.status = 'rejected'
    },
  )
  return t
}

/** Chạy lúc trình duyệt rảnh (dùng để tải trước dữ liệu) */
export function whenIdle(run: () => void) {
  if ('requestIdleCallback' in window) window.requestIdleCallback(run, { timeout: 3000 })
  else setTimeout(run, 1500)
}
