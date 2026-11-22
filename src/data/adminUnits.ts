import { useEffect, useState } from 'react'

/** public/data/admin-units.json — sinh bởi `node scripts/build-admin-units.ts` */
export interface AdminUnits {
  source: string
  provinces: Record<string, ProvinceUnits>
}

export interface ProvinceUnits {
  /** Xã / phường / đặc khu hiện nay, vd. "Phường Ba Đình" */
  wards: string[]
  /** Huyện / quận / thị xã / TP thuộc tỉnh cũ trước 01/07/2025: [tên, tỉnh cũ] */
  oldDistricts: [string, string][]
}

let cache: AdminUnits | null = null
let pending: Promise<AdminUnits> | null = null

/** Tải một lần, dùng chung cho ô tìm kiếm và tab Tổng quan */
export function loadAdminUnits(): Promise<AdminUnits> {
  pending ??= fetch(`${import.meta.env.BASE_URL}data/admin-units.json`)
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      return res.json() as Promise<AdminUnits>
    })
    .then((data) => (cache = data))
    .catch((err: unknown) => {
      pending = null // cho phép thử lại lần sau
      throw err
    })
  return pending
}

/** null khi đang tải hoặc lỗi */
export function useAdminUnits(): AdminUnits | null {
  const [data, setData] = useState(cache)
  useEffect(() => {
    if (data) return
    let alive = true
    loadAdminUnits()
      .then((d) => alive && setData(d))
      .catch(() => {})
    return () => {
      alive = false
    }
  }, [data])
  return data
}

/** "Phường Ba Đình" → ["Phường", "Ba Đình"] */
const PREFIX = /^(Phường|Xã|Đặc khu|Quận|Huyện|Thị xã|Thành phố)\s+/
export function splitUnitName(name: string): [string, string] {
  const m = name.match(PREFIX)
  return m ? [m[1], name.slice(m[0].length)] : ['', name]
}
