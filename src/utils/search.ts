import { PROVINCES } from '../data/provinceMeta'
import type { ProvinceMeta } from '../types/province'
import { splitUnitName, type AdminUnits } from '../data/adminUnits'
import { normalize } from './normalize'

export { normalize }

export interface UnitMatch {
  /** Tên đầy đủ, vd. "Phường Ba Đình", "Huyện Đồng Văn" */
  name: string
  kind: 'ward' | 'oldDistrict'
  /** Tỉnh cũ chứa huyện (chỉ với oldDistrict) */
  oldProvince?: string
}

export interface SearchResult {
  province: ProvinceMeta
  /** Tên tỉnh cũ khớp với từ khóa (khi tìm theo tên trước sáp nhập) */
  matchedOld?: string
  /** Xã/phường hoặc huyện cũ khớp với từ khóa */
  unit?: UnitMatch
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

interface UnitEntry {
  province: ProvinceMeta
  unit: UnitMatch
  /** tên bỏ tiền tố loại đơn vị, vd. "ba dinh" */
  base: string
  full: string
}

const unitIndexCache = new WeakMap<AdminUnits, UnitEntry[]>()

function unitIndex(data: AdminUnits): UnitEntry[] {
  let idx = unitIndexCache.get(data)
  if (idx) return idx
  idx = []
  for (const p of PROVINCES) {
    const u = data.provinces[p.code]
    if (!u) continue
    // Chỉ tìm cấp phường (không tìm xã, đặc khu, huyện cũ)
    for (const name of u.wards) {
      const [type, base] = splitUnitName(name)
      if (type === 'Phường') idx.push({ province: p, unit: { name, kind: 'ward' }, base: normalize(base), full: normalize(name) })
    }
  }
  unitIndexCache.set(data, idx)
  return idx
}

/** 0: khớp đầu tên, 1: khớp đầu một từ, 2: khớp giữa từ; -1: không khớp */
function unitScore(e: UnitEntry, q: string): number {
  if (e.base.startsWith(q) || e.full.startsWith(q)) return 0
  if (e.base.includes(' ' + q) || e.full.includes(' ' + q)) return 1
  if (e.base.includes(q)) return 2
  return -1
}

/**
 * Tìm tỉnh trước, sau đó phường (khi đã tải xong `units`).
 * Từ khóa dưới 2 ký tự chỉ tìm tỉnh.
 */
export function searchAll(query: string, units: AdminUnits | null, limit = 10): SearchResult[] {
  const provinces = searchProvinces(query, 5)
  const q = normalize(query)
  if (!units || q.length < 2) return provinces
  const scored: { e: UnitEntry; score: number }[] = []
  for (const e of unitIndex(units)) {
    const s = unitScore(e, q)
    if (s >= 0) scored.push({ e, score: s })
  }
  // Gõ có dấu thì ưu tiên tên khớp đúng dấu ("Ba Đình" trước "Ba Dinh")
  const raw = query.trim().toLowerCase()
  const exact = (e: UnitEntry) => (e.unit.name.toLowerCase().includes(raw) ? 0 : 1)
  scored.sort((a, b) => a.score - b.score || exact(a.e) - exact(b.e) || a.e.base.length - b.e.base.length || a.e.unit.name.localeCompare(b.e.unit.name, 'vi'))
  return [...provinces, ...scored.slice(0, limit - provinces.length).map(({ e }) => ({ province: e.province, unit: e.unit }))]
}
