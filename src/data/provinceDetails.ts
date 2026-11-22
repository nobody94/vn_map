import type { ProvinceDetail } from '../types/province'
import { track, whenIdle } from '../utils/trackedPromise'

/**
 * Thông tin chi tiết của 34 tỉnh theo mã (khớp PROVINCES trong provinceMeta.ts),
 * chia file theo miền trong ./details/ và chỉ tải khi cần (mỗi miền một chunk JS riêng).
 *
 * Ảnh: xem MediaRef trong types/province.ts. Sau khi sửa `wiki` / `imageFile` /
 * `imageSearch`, chạy `npm run media` để cập nhật src/data/media.generated.json.
 */
type RegionDetails = Partial<Record<number, ProvinceDetail>>
type RegionKey = 'bac' | 'trung' | 'nam'

const LOADERS: Record<RegionKey, () => Promise<RegionDetails>> = {
  bac: () => import('./details/bac.ts').then((m) => m.BAC),
  trung: () => import('./details/trung.ts').then((m) => m.TRUNG),
  nam: () => import('./details/nam.ts').then((m) => m.NAM),
}

/** Mã 1–15: miền Bắc, 16–26: miền Trung & Tây Nguyên, 27–34: miền Nam (xem đầu mỗi file details) */
function regionOf(code: number): RegionKey {
  return code <= 15 ? 'bac' : code <= 26 ? 'trung' : 'nam'
}

const regionCache = new Map<RegionKey, Promise<RegionDetails>>()
const detailCache = new Map<number, Promise<ProvinceDetail | undefined>>()

function loadRegion(key: RegionKey): Promise<RegionDetails> {
  let p = regionCache.get(key)
  if (!p) {
    p = track(LOADERS[key]())
    // Lỗi mạng: bỏ cache để lần bấm sau tải lại
    p.catch(() => regionCache.delete(key))
    regionCache.set(key, p)
  }
  return p
}

/** Chi tiết một tỉnh; trả về cùng một promise cho cùng một mã (dùng được với `use()`) */
export function loadProvinceDetail(code: number): Promise<ProvinceDetail | undefined> {
  let p = detailCache.get(code)
  if (!p) {
    p = track(loadRegion(regionOf(code)).then((r) => r[code]))
    p.catch(() => detailCache.delete(code))
    detailCache.set(code, p)
  }
  return p
}

/** Tải trước cả ba miền lúc trình duyệt rảnh, để bấm tỉnh là có dữ liệu ngay */
export function prefetchProvinceDetails() {
  whenIdle(() => (Object.keys(LOADERS) as RegionKey[]).forEach((k) => loadRegion(k).catch(() => {})))
}
