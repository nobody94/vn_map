/**
 * Tạo public/geo/rivers.geojson từ OpenStreetMap (Overpass API) cho các sông trong src/data/rivers.ts.
 *
 *   node scripts/build-rivers.ts
 *
 * - Mỗi sông một truy vấn (way + relation waterway có `name` khớp `osmName`), trong khung Việt Nam.
 * - Thử lại với độ trễ tăng dần, xoay vòng giữa các máy chủ Overpass (máy chủ hay quá tải).
 * - Đơn giản hóa Douglas–Peucker, làm tròn 4 chữ số. Dữ liệu © OpenStreetMap contributors (ODbL).
 */
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { RIVERS } from '../src/data/rivers.ts'

const OUT = fileURLToPath(new URL('../public/geo/rivers.geojson', import.meta.url))
const SERVERS = [
  'https://overpass.kumi.systems/api/interpreter',
  'https://overpass-api.de/api/interpreter',
  'https://overpass.private.coffee/api/interpreter',
]
const BBOX = '8.0,102.0,23.5,110.0' // nam, tây, bắc, đông
const TOL = 0.002 // độ (~200 m)
const UA = 'vn-map-rivers/0.1 (educational map project)'

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

async function overpass(query: string): Promise<any> {
  for (let attempt = 0; attempt < 8; attempt++) {
    const server = SERVERS[attempt % SERVERS.length]
    try {
      const res = await fetch(server, {
        method: 'POST',
        headers: { 'User-Agent': UA, 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'data=' + encodeURIComponent(query),
        signal: AbortSignal.timeout(150_000),
      })
      const text = await res.text()
      if (res.ok && text.trimStart().startsWith('{')) {
        const j = JSON.parse(text)
        if (j.remark && /error|timed out/i.test(j.remark)) throw new Error(j.remark)
        return j
      }
      console.warn(`  ! ${res.status} ${new URL(server).host}`)
    } catch (e) {
      console.warn(`  ! ${new URL(server).host}: ${(e as Error).message.slice(0, 80)}`)
    }
    await sleep(5000 * (attempt + 1))
  }
  throw new Error('Overpass không phản hồi')
}

type Pt = [number, number]

function dp(pts: Pt[], tol: number): Pt[] {
  if (pts.length < 3) return pts
  const keep = new Uint8Array(pts.length)
  keep[0] = keep[pts.length - 1] = 1
  const stack: [number, number][] = [[0, pts.length - 1]]
  while (stack.length) {
    const [a, b] = stack.pop()!
    const [x1, y1] = pts[a], [x2, y2] = pts[b]
    const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy)
    let max = 0, idx = -1
    for (let i = a + 1; i < b; i++) {
      const [x, y] = pts[i]
      const d = len === 0 ? Math.hypot(x - x1, y - y1) : Math.abs(dy * x - dx * y + x2 * y1 - y2 * x1) / len
      if (d > max) { max = d; idx = i }
    }
    if (max > tol) { keep[idx] = 1; stack.push([a, idx], [idx, b]) }
  }
  return pts.filter((_, i) => keep[i])
}
const round = (p: Pt): Pt => [Math.round(p[0] * 1e4) / 1e4, Math.round(p[1] * 1e4) / 1e4]

const features = []
for (const r of RIVERS) {
  const names = [r.osmName, ...(r.osmAltNames ?? [])].map((n) => `"${n}"`)
  const q = `[out:json][timeout:120];(${names
    .map((n) => `way["waterway"~"river|canal"]["name"=${n}](${BBOX});relation["waterway"]["name"=${n}](${BBOX});`)
    .join('')});out geom;`
  console.log(`→ ${r.name}`)
  const j = await overpass(q)
  const seen = new Set<number>()
  const lines: Pt[][] = []
  for (const el of j.elements) {
    const ways = el.type === 'way' ? [el] : (el.members ?? []).filter((m: any) => m.type === 'way' && m.geometry)
    for (const w of ways) {
      const id = w.id ?? w.ref
      if (seen.has(id) || !w.geometry) continue
      seen.add(id)
      lines.push(w.geometry.map((g: any) => [g.lon, g.lat] as Pt))
    }
  }
  const simplified = lines.map((l) => dp(l, TOL).map(round)).filter((l) => l.length >= 2)
  const pts = simplified.reduce((n, l) => n + l.length, 0)
  console.log(`  ${lines.length} đoạn → ${pts} điểm`)
  if (!simplified.length) {
    console.warn(`  ✗ Không có dữ liệu cho ${r.name}`)
    continue
  }
  features.push({ type: 'Feature', properties: { id: r.id }, geometry: { type: 'MultiLineString', coordinates: simplified } })
  await sleep(2000)
}

writeFileSync(OUT, JSON.stringify({ type: 'FeatureCollection', features }))
console.log(`\nĐã ghi ${OUT}: ${features.length}/${RIVERS.length} sông`)
