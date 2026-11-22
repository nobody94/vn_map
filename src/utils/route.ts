import { useSyncExternalStore } from 'react'

/** Các trang: trang chủ, bản đồ địa lý, lịch sử */
export type Route = 'home' | 'geo' | 'history'

/** Điều hướng bằng hash (#/dia-ly, #/lich-su): không cần cấu hình chuyển hướng trên Cloudflare Pages */
const HASH: Record<Route, string> = { home: '', geo: '#/dia-ly', history: '#/lich-su' }

function parse(hash: string): Route {
  if (hash === HASH.geo) return 'geo'
  if (hash === HASH.history) return 'history'
  return 'home'
}

function subscribe(cb: () => void) {
  window.addEventListener('hashchange', cb)
  return () => window.removeEventListener('hashchange', cb)
}

export function useRoute(): Route {
  return useSyncExternalStore(subscribe, () => parse(window.location.hash))
}

/** Đường dẫn cho thẻ <a> (về trang chủ dùng '#' để không tải lại trang) */
export function hrefFor(route: Route): string {
  return HASH[route] || '#'
}
