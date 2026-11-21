import { PROVINCES } from '../data/provinceMeta'
import type { ProvinceMeta } from '../types/province'

/** Bỏ dấu, chữ thường: "Đắk Lắk" → "dak lak" */
export function normalize(s: string): string {
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export interface SearchResult {
  province: ProvinceMeta
  /** Tên tỉnh cũ khớp với từ khóa (khi tìm theo tên trước sáp nhập) */
  matchedOld?: string
}

const INDEX = PROVINCES.map((p) => ({
  province: p,
  name: normalize(p.name),
  old: p.mergedFrom.filter((o) => o !== p.name).map((o) => ({ raw: o, norm: normalize(o) })),
}))

/** Tìm theo tên tỉnh mới và tên tỉnh cũ, không phân biệt dấu. Ưu tiên khớp đầu chuỗi. */
export function searchProvinces(query: string, limit = 8): SearchResult[] {
  const q = normalize(query)
  if (!q) return []
  const scored: { r: SearchResult; score: number }[] = []
  for (const it of INDEX) {
    const nameIdx = it.name.indexOf(q)
    if (nameIdx >= 0) {
      scored.push({ r: { province: it.province }, score: nameIdx === 0 ? 0 : 1 })
      continue
    }
    const old = it.old.find((o) => o.norm.includes(q))
    if (old) scored.push({ r: { province: it.province, matchedOld: old.raw }, score: old.norm.startsWith(q) ? 2 : 3 })
  }
  return scored
    .sort((a, b) => a.score - b.score || a.r.province.name.localeCompare(b.r.province.name, 'vi'))
    .slice(0, limit)
    .map((s) => s.r)
}
