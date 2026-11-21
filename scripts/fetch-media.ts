/**
 * Tra ảnh + link cho mọi MediaRef trong src/data/provinceDetails.ts, ghi ra src/data/media.generated.json.
 *
 *   npm run media
 *
 * - `wiki`: lấy URL bài Wikipedia tiếng Việt + ảnh đầu tiên (jpg/png, bỏ bản đồ/cờ/logo) trong bài
 * - `imageSearch`: tìm ảnh trên Wikimedia Commons
 * - `imageFile`: dùng đúng file chỉ định
 * Thông tin tác giả / giấy phép lấy từ Commons để hiển thị ghi nguồn.
 *
 * Chạy bằng Node ≥ 22.18 (tự bỏ kiểu TypeScript).
 */
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { PROVINCE_DETAILS } from '../src/data/provinceDetails.ts'
import type { MediaRef } from '../src/types/province.ts'

const OUT = fileURLToPath(new URL('../src/data/media.generated.json', import.meta.url))
const UA = 'vn-map-media-script/0.1 (educational map project)'
const DELAY_MS = 400
const THUMB_WIDTH = 640

const BAD_FILE = /(map|bản[_ ]đồ|location|flag|cờ|logo|icon|symbol|coat[_ ]of[_ ]arms|huy[_ ]hiệu|signature|chữ[_ ]ký|seal|emblem|diagram|wiki)/i
const GOOD_EXT = /\.(jpe?g|png|webp)$/i

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

async function api(host: string, params: Record<string, string>): Promise<any> {
  const url = new URL(`https://${host}/w/api.php`)
  for (const [k, v] of Object.entries({ format: 'json', formatversion: '2', ...params })) url.searchParams.set(k, v)
  for (let attempt = 0; attempt < 5; attempt++) {
    await sleep(DELAY_MS)
    const res = await fetch(url, { headers: { 'User-Agent': UA } })
    const text = await res.text()
    if (res.ok && text.startsWith('{')) return JSON.parse(text)
    const wait = 10_000 * (attempt + 1)
    console.warn(`  ! ${res.status} ${host} — thử lại sau ${wait / 1000}s`)
    await sleep(wait)
  }
  throw new Error(`API lỗi: ${url}`)
}

const pickFile = (names: string[]) =>
  names.map((n) => n.replace(/^(File|Tập tin|Hình):/i, '')).find((n) => GOOD_EXT.test(n) && !BAD_FILE.test(n))

function stripHtml(html = ''): string {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 80)
}

// ─── 1. Gom mọi MediaRef ───────────────────────────────────────────
const refs: MediaRef[] = []
for (const d of Object.values(PROVINCE_DETAILS)) {
  if (!d) continue
  if (d.culture.cover) refs.push(d.culture.cover)
  refs.push(...d.culture.heritage, ...d.festivals, ...d.foods, ...d.specialties)
}
const wikiTitles = [...new Set(refs.map((r) => r.wiki).filter((t): t is string => !!t))]
const searches = [...new Set(refs.map((r) => r.imageSearch).filter((t): t is string => !!t))]

// ─── 2. Bài Wikipedia: URL + ảnh ───────────────────────────────────
type Article = { url: string; image: string | null }
const articles: Record<string, Article> = {}
console.log(`Bài Wikipedia: ${wikiTitles.length}`)
for (let i = 0; i < wikiTitles.length; i += 50) {
  const batch = wikiTitles.slice(i, i + 50)
  const j = await api('vi.wikipedia.org', { action: 'query', titles: batch.join('|'), prop: 'info', inprop: 'url', redirects: '1' })
  const alias = new Map<string, string>()
  for (const r of [...(j.query.normalized ?? []), ...(j.query.redirects ?? [])]) alias.set(r.from, r.to)
  const resolve = (t: string) => {
    let cur = t
    while (alias.has(cur)) cur = alias.get(cur)!
    return cur
  }
  const pages = new Map<string, any>(j.query.pages.map((p: any) => [p.title, p]))
  for (const t of batch) {
    const p = pages.get(resolve(t))
    if (!p || p.missing) console.warn(`  ✗ Không có bài: ${t}`)
    else articles[t] = { url: p.fullurl, image: null }
  }
}
// Chỉ cần tìm ảnh trong bài khi có mục dùng bài đó mà không chỉ định imageFile
const needImage = new Set(refs.filter((r) => r.wiki && !r.imageFile).map((r) => r.wiki))
for (const [title, a] of Object.entries(articles)) {
  if (!needImage.has(title)) continue
  const j = await api('vi.wikipedia.org', { action: 'parse', page: title, prop: 'images', redirects: '1' })
  a.image = pickFile(j.parse?.images ?? []) ?? null
  console.log(`  ${a.image ? '✓' : '·'} ${title}${a.image ? ` → ${a.image}` : ' (không có ảnh phù hợp)'}`)
}

// ─── 3. Tìm ảnh trên Commons ───────────────────────────────────────
const searchResults: Record<string, string | null> = {}
console.log(`Tìm ảnh Commons: ${searches.length}`)
for (const q of searches) {
  const j = await api('commons.wikimedia.org', { action: 'query', list: 'search', srsearch: q, srnamespace: '6', srlimit: '10' })
  searchResults[q] = pickFile(j.query.search.map((s: any) => s.title)) ?? null
  console.log(`  ${searchResults[q] ? '✓' : '✗'} "${q}"${searchResults[q] ? ` → ${searchResults[q]}` : ''}`)
}

// ─── 4. Thông tin ảnh: thumbnail, tác giả, giấy phép ───────────────
type ImageInfo = { src: string; page: string; artist: string; license: string }
const files = new Set<string>()
for (const r of refs) {
  const f = r.imageFile ?? (r.wiki ? articles[r.wiki]?.image : null) ?? (r.imageSearch ? searchResults[r.imageSearch] : null)
  if (f) files.add(f)
}
const images: Record<string, ImageInfo> = {}
const fileList = [...files]
for (let i = 0; i < fileList.length; i += 50) {
  const batch = fileList.slice(i, i + 50)
  // Hỏi qua vi.wikipedia để nhận cả file Commons lẫn file cục bộ
  const j = await api('vi.wikipedia.org', {
    action: 'query',
    titles: batch.map((f) => `File:${f}`).join('|'),
    prop: 'imageinfo',
    iiprop: 'url|extmetadata',
    iiurlwidth: String(THUMB_WIDTH),
    iiextmetadatafilter: 'Artist|LicenseShortName',
  })
  const norm = new Map<string, string>((j.query.normalized ?? []).map((n: any) => [n.to, n.from]))
  for (const p of j.query.pages) {
    const ii = p.imageinfo?.[0]
    if (!ii) continue
    const key = (norm.get(p.title) ?? p.title).replace(/^File:/, '')
    images[key] = {
      src: ii.thumburl ?? ii.url,
      page: ii.descriptionurl,
      artist: stripHtml(ii.extmetadata?.Artist?.value) || 'Không rõ',
      license: stripHtml(ii.extmetadata?.LicenseShortName?.value) || '',
    }
  }
}
// Khóa ảnh có thể khác cách viết (dấu cách / gạch dưới) — chuẩn hóa thêm một bản
for (const f of fileList) {
  if (images[f]) continue
  const alt = Object.keys(images).find((k) => k.replace(/ /g, '_') === f.replace(/ /g, '_'))
  if (alt) images[f] = images[alt]
  else console.warn(`  ✗ Không lấy được thông tin ảnh: ${f}`)
}

writeFileSync(OUT, JSON.stringify({ articles, searches: searchResults, images }, null, 2) + '\n')
const noImage = refs.filter((r) => {
  const f = r.imageFile ?? (r.wiki ? articles[r.wiki]?.image : null) ?? (r.imageSearch ? searchResults[r.imageSearch] : null)
  return !f || !images[f]
}).length
console.log(`\nĐã ghi ${OUT}\n${Object.keys(images).length} ảnh · ${noImage}/${refs.length} mục chưa có ảnh`)
