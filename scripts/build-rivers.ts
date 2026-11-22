/**
 * Tạo public/geo/rivers.geojson từ OpenStreetMap (Overpass API) cho các sông trong src/data/rivers.ts.
 *
 *   node scripts/build-rivers.ts
 *
 * - Mỗi sông một truy vấn (way + relation waterway có `name` khớp `osmName`), trong khung Việt Nam.
 * - Thử lại với độ trễ tăng dần, xoay vòng giữa các máy chủ Overpass (máy chủ hay quá tải).
 * - Bỏ đoạn của sông trùng tên ở nơi khác bằng khung CLIP riêng từng sông.
 * - Bỏ nhánh phụ / lạch quanh bãi giữa trùng tên sông (dropSideChannels).
 * - Chỉ áp lại CLIP + bỏ nhánh phụ lên file đã có (không gọi Overpass):  node scripts/build-rivers.ts --clip
 * - Đơn giản hóa Douglas–Peucker, làm tròn 4 chữ số. Dữ liệu © OpenStreetMap contributors (ODbL).
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { RIVERS } from '../src/data/rivers.ts'

const OUT = fileURLToPath(new URL('../public/geo/rivers.geojson', import.meta.url))
const SERVERS = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
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

/**
 * Khung giữ lại [nam, tây, bắc, đông] cho sông có tên trùng sông khác trong OSM.
 * Đoạn có điểm giữa nằm ngoài khung bị bỏ.
 */
const CLIP: Record<string, [number, number, number, number]> = {
  lo: [21, 103, 24, 106], // "Sông Lô" ở miền Nam
  cau: [20.5, 105, 22.5, 107], // sông Cầu ở Khánh Hòa / Phú Yên
  huong: [15.9, 107, 16.8, 108], // sông Hương khác ở miền Bắc
  // Sông nhỏ vùng Hà Nội: giữ quanh lưu vực, tránh sông trùng tên nơi khác
  day: [19.9, 105.2, 21.3, 106.3],
  nhue: [20.4, 105.6, 21.2, 106.0],
  tich: [20.6, 105.2, 21.2, 105.8],
  'to-lich': [20.85, 105.75, 21.1, 105.9],
  'kim-nguu': [20.85, 105.75, 21.1, 105.9],
  'ca-lo': [21.0, 105.5, 21.5, 106.1],
}

function clip(id: string, lines: Pt[][]): Pt[][] {
  const box = CLIP[id] ?? RIVERS.find((r) => r.id === id)?.clip
  if (!box) return lines
  const [s, w, n, e] = box
  return lines.filter((l) => {
    const [x, y] = l[Math.floor(l.length / 2)]
    return y >= s && y <= n && x >= w && x <= e
  })
}

/** Khoảng cách (km) từ điểm p tới đoạn ab, xấp xỉ phẳng tại vĩ độ của p */
function distKm(p: Pt, a: Pt, b: Pt): number {
  const kx = 111.32 * Math.cos((p[1] * Math.PI) / 180)
  const ky = 110.57
  const [px, py, ax, ay, bx, by] = [p[0] * kx, p[1] * ky, a[0] * kx, a[1] * ky, b[0] * kx, b[1] * ky]
  const dx = bx - ax, dy = by - ay, L = dx * dx + dy * dy
  const t = L ? Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / L)) : 0
  return Math.hypot(px - ax - t * dx, py - ay - t * dy)
}
const lineKm = (l: Pt[]) => l.slice(1).reduce((s, p, i) => s + distKm(p, l[i], l[i]), 0)

const SIDE_TOL = 1.5 // km: nằm trong khoảng này coi là chạy sát dòng chính
const SIDE_EDGE = 1 // km: bỏ qua phần gần hai đầu mút của dòng chính (chỗ nối tiếp các đoạn)
const MIN_PIECE_KM = 0.5 // phần còn lại ngắn hơn thì bỏ

/**
 * Bỏ nhánh phụ / lạch quanh bãi giữa và đường trùng lặp mà OSM cũng đặt cùng tên sông
 * (vd. sông Hồng qua Hà Nội có 5 lạch). Xét từ đường dài tới ngắn: phần nào của một đường nằm sát
 * (≤ 1,5 km) phần giữa của đường đã giữ thì cắt bỏ, phần riêng còn lại vẫn giữ (để dòng chính không bị đứt).
 * Chỉ so với phần giữa (cách đầu mút > 1 km), để không cắt đoạn ngắn nối tiếp dòng chính.
 */
function dropSideChannels(lines: Pt[][]): Pt[][] {
  const kept: { l: Pt[]; inner: [Pt, Pt][] }[] = []
  for (const l of [...lines].sort((a, b) => lineKm(b) - lineKm(a))) {
    const near = l.map((p) => kept.some(({ inner }) => inner.some(([a, b]) => distKm(p, a, b) <= SIDE_TOL)))
    // Tách thành các phần liên tiếp không nằm sát, nới thêm một điểm mỗi đầu cho liền mạch
    for (let i = 0; i < l.length; ) {
      if (near[i]) { i++; continue }
      let j = i
      while (j < l.length && !near[j]) j++
      const piece = l.slice(Math.max(0, i - 1), Math.min(l.length, j + 1))
      if (piece.length >= 2 && lineKm(piece) >= MIN_PIECE_KM) {
        const [s, e] = [piece[0], piece[piece.length - 1]]
        const farFromEnds = (p: Pt) => distKm(p, s, s) > SIDE_EDGE && distKm(p, e, e) > SIDE_EDGE
        const inner = piece.slice(1).map((p, k) => [piece[k], p] as [Pt, Pt]).filter(([a, b]) => farFromEnds(a) && farFromEnds(b))
        kept.push({ l: piece, inner })
      }
      i = j
    }
  }
  return kept.map((k) => k.l)
}

/** Hậu xử lý chung: bỏ sông trùng tên ngoài khung CLIP, bỏ nhánh phụ */
const clean = (id: string, lines: Pt[][]) => dropSideChannels(clip(id, lines))

const CLIP_ONLY = process.argv.includes('--clip')
if (CLIP_ONLY) {
  const g = JSON.parse(readFileSync(OUT, 'utf8'))
  for (const f of g.features) {
    const before = f.geometry.coordinates.length
    f.geometry.coordinates = clean(f.properties.id, f.geometry.coordinates)
    if (before !== f.geometry.coordinates.length) console.log(`${f.properties.id}: ${before} → ${f.geometry.coordinates.length} đoạn`)
  }
  writeFileSync(OUT, JSON.stringify(g))
} else {
  const features = []
  // --only id1,id2: chỉ tải các sông này rồi gộp vào file đã có
  const onlyArg = process.argv.indexOf('--only')
  const ONLY = onlyArg > 0 ? new Set(process.argv[onlyArg + 1].split(',')) : null
  for (const r of RIVERS) {
    if (ONLY && !ONLY.has(r.id)) continue
    const names = [r.osmName, ...(r.osmAltNames ?? [])].map((n) => `"${n}"`)
    // Có khung CLIP thì chỉ tìm trong khung đó (truy vấn nhẹ hơn nhiều so với cả nước)
    const box = CLIP[r.id] ?? r.clip
    const bbox = box ? box.join(',') : BBOX
    const q = `[out:json][timeout:120];(${names
      .map((n) => `way["waterway"~"${r.minor ? 'river|canal|stream' : 'river|canal'}"]["name"=${n}](${bbox});relation["waterway"]["name"=${n}](${bbox});`)
      .join('')});out geom;`
    console.log(`→ ${r.name}`)
    let j
    try {
      j = await overpass(q)
    } catch (e) {
      console.warn(`  ✗ ${r.name}: ${(e as Error).message}`)
      continue
    }
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
    // Sông nhỏ (vài chục km) giữ chi tiết hơn
    const tol = r.minor ? TOL / 4 : TOL
    const simplified = clean(r.id, lines.map((l) => dp(l, tol).map(round)).filter((l) => l.length >= 2))
    const pts = simplified.reduce((n, l) => n + l.length, 0)
    console.log(`  ${lines.length} đoạn → ${pts} điểm`)
    if (!simplified.length) {
      console.warn(`  ✗ Không có dữ liệu cho ${r.name}`)
      continue
    }
    const feature = { type: 'Feature', properties: { id: r.id }, geometry: { type: 'MultiLineString', coordinates: simplified } }
    features.push(feature)
    // --only: gộp vào file ngay sau mỗi sông, dừng giữa chừng vẫn giữ được phần đã tải
    if (ONLY) {
      const g = JSON.parse(readFileSync(OUT, 'utf8'))
      g.features = [...g.features.filter((f: { properties: { id: string } }) => f.properties.id !== r.id), feature]
      writeFileSync(OUT, JSON.stringify(g))
    }
    await sleep(2000)
  }

  if (ONLY) {
    console.log(`\nĐã gộp ${features.length}/${ONLY.size} sông vào ${OUT}`)
  } else {
    writeFileSync(OUT, JSON.stringify({ type: 'FeatureCollection', features }))
    console.log(`\nĐã ghi ${OUT}: ${features.length}/${RIVERS.length} sông`)
  }
}
