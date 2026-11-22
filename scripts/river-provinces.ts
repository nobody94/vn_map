/**
 * Tính các tỉnh mỗi sông chảy qua từ hình học (public/geo/rivers.geojson × provinces.geojson).
 *
 *   node scripts/river-provinces.ts          # in so sánh với dữ liệu hiện có
 *   node scripts/river-provinces.ts --write  # điền `provinces: []` còn trống trong src/data/riversMore.ts
 *
 * Một tỉnh được tính khi đoạn sông nằm trong tỉnh dài ≥ 2 km (sông ngắn dưới 20 km: ≥ 0,5 km),
 * để bỏ qua chỗ sông chỉ chạm ranh giới. Thứ tự: tỉnh có đoạn dài nhất trước.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { RIVERS } from '../src/data/rivers.ts'

type Pt = [number, number]
const root = (p: string) => fileURLToPath(new URL(`../${p}`, import.meta.url))
const P = JSON.parse(readFileSync(root('public/geo/provinces.geojson'), 'utf8'))
const R = JSON.parse(readFileSync(root('public/geo/rivers.geojson'), 'utf8'))

const inRing = ([x, y]: Pt, ring: Pt[]) => {
  let c = false
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i], [xj, yj] = ring[j]
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) c = !c
  }
  return c
}
const provinces = P.features.map((f: { properties: { code: number }; geometry: { coordinates: Pt[][][] } }) => ({
  code: f.properties.code,
  polys: f.geometry.coordinates,
}))
const provinceOf = (p: Pt): number | undefined =>
  provinces.find((pr: { polys: Pt[][][] }) => pr.polys.some((poly) => inRing(p, poly[0]) && !poly.slice(1).some((h) => inRing(p, h))))?.code
const km = (a: Pt, b: Pt) => {
  const r = Math.PI / 180, dLat = (b[1] - a[1]) * r, dLng = (b[0] - a[0]) * r
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(a[1] * r) * Math.cos(b[1] * r) * Math.sin(dLng / 2) ** 2
  return 12742 * Math.asin(Math.sqrt(h))
}

const result = new Map<string, number[]>()
for (const f of R.features) {
  const byCode = new Map<number, number>()
  let total = 0
  for (const line of f.geometry.coordinates as Pt[][])
    for (let i = 1; i < line.length; i++) {
      const d = km(line[i - 1], line[i])
      total += d
      // gán đoạn cho tỉnh chứa điểm giữa
      const c = provinceOf([(line[i - 1][0] + line[i][0]) / 2, (line[i - 1][1] + line[i][1]) / 2])
      if (c) byCode.set(c, (byCode.get(c) ?? 0) + d)
    }
  const min = total < 20 ? 0.5 : 2
  result.set(f.properties.id, [...byCode].filter(([, d]) => d >= min).sort((a, b) => b[1] - a[1]).map(([c]) => c))
}

for (const r of RIVERS) {
  const geo = result.get(r.id)
  if (!geo) { console.log(`${r.id.padEnd(16)} (chưa có đường sông)`); continue }
  const same = geo.length === r.provinces.length && geo.every((c) => r.provinces.includes(c))
  if (!same) console.log(`${r.id.padEnd(16)} dữ liệu ${JSON.stringify(r.provinces).padEnd(18)} hình học ${JSON.stringify(geo)}`)
}

if (process.argv.includes('--write')) {
  const file = root('src/data/riversMore.ts')
  let src = readFileSync(file, 'utf8')
  let n = 0
  for (const [id, codes] of result) {
    // không được vượt sang mục sông kế tiếp (?!id: ')
    const re = new RegExp(`(id: '${id}',(?:(?!id: ')[\\s\\S])*?provinces: )\\[\\]`)
    if (re.test(src) && codes.length) { src = src.replace(re, `$1[${codes.join(', ')}]`); n++ }
  }
  writeFileSync(file, src)
  console.log(`Đã điền provinces cho ${n} sông trong riversMore.ts`)
}
