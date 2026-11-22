// Tạo public/data/admin-units.json: xã/phường/đặc khu hiện nay (sau 01/07/2025) và huyện/quận cũ của từng tỉnh.
//
//   node scripts/build-admin-units.ts
//
// Nguồn: provinces.open-api.vn — API v2 (34 tỉnh, 3.321 đơn vị cấp xã), API v1 (63 tỉnh cũ, 696 đơn vị cấp huyện).
// Mỗi tỉnh cũ được sáp nhập nguyên vẹn vào một tỉnh mới, nên huyện cũ → tỉnh cũ → tỉnh mới (qua mergedFrom) là chính xác.
import { writeFileSync, mkdirSync } from 'node:fs'
import { PROVINCES } from '../src/data/provinceMeta.ts'

const API = 'https://provinces.open-api.vn/api'
const UA = 'vn-map-admin-units/0.1 (educational map project)'

interface Unit { name: string; division_type: string }
interface NewProvince { name: string; wards: Unit[] }
interface OldProvince { name: string; districts: Unit[] }

/** "Tỉnh Bà Rịa - Vũng Tàu" → "ba ria vung tau" */
const key = (s: string) =>
  s
    .replace(/^(Tỉnh|Thành phố|TP\.)\s+/, '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/gi, 'd')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()

// Tên tỉnh cũ không trùng với mergedFrom / tên mới
const OLD_ALIAS: Record<string, string> = { 'thua thien hue': 'hue' }

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${API}${path}`, { headers: { 'User-Agent': UA } })
  if (!res.ok) throw new Error(`HTTP ${res.status} ${path}`)
  return res.json() as Promise<T>
}

const [now, old] = await Promise.all([get<NewProvince[]>('/v2/?depth=2'), get<OldProvince[]>('/v1/?depth=2')])

const byNewName = new Map(PROVINCES.map((p) => [key(p.name), p]))
// tỉnh cũ → [mã tỉnh mới, tên tỉnh cũ theo cách viết trong mergedFrom]
const byOldName = new Map<string, [number, string]>()
for (const p of PROVINCES) {
  byOldName.set(key(p.name), [p.code, p.name])
  for (const o of p.mergedFrom) byOldName.set(key(o), [p.code, o])
}

const provinces: Record<number, { wards: string[]; oldDistricts: [string, string][] }> = {}
for (const p of PROVINCES) provinces[p.code] = { wards: [], oldDistricts: [] }

for (const np of now) {
  const p = byNewName.get(key(np.name))
  if (!p) throw new Error(`Không khớp tỉnh mới: ${np.name}`)
  provinces[p.code].wards = np.wards.map((w) => w.name)
}
for (const op of old) {
  const k = key(op.name)
  const hit = byOldName.get(OLD_ALIAS[k] ?? k)
  if (!hit) throw new Error(`Không khớp tỉnh cũ: ${op.name}`)
  const [code, oldName] = hit
  for (const d of op.districts) provinces[code].oldDistricts.push([d.name, oldName])
}

const total = (f: (v: (typeof provinces)[number]) => number) => Object.values(provinces).reduce((s, v) => s + f(v), 0)
const out = {
  source: 'provinces.open-api.vn (danh mục đơn vị hành chính sau sắp xếp 01/07/2025; huyện/quận cũ theo danh mục trước sắp xếp)',
  provinces,
}
mkdirSync(new URL('../public/data/', import.meta.url), { recursive: true })
writeFileSync(new URL('../public/data/admin-units.json', import.meta.url), JSON.stringify(out))
console.log(`Đã ghi public/data/admin-units.json: ${total((v) => v.wards.length)} xã/phường/đặc khu, ${total((v) => v.oldDistricts.length)} huyện/quận cũ`)
