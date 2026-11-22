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
 * Mặc định chạy TĂNG DẦN: dùng lại bài / kết quả tìm / thông tin ảnh đã có trong file kết quả,
 * chỉ tra những mục mới. Tra lại toàn bộ:  npm run media -- --full
 *
 * Chạy bằng Node ≥ 22.18 (tự bỏ kiểu TypeScript).
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { PROVINCE_DETAILS } from '../src/data/details/all.ts'
import { MOUNTAINS } from '../src/data/mountains.ts'
import { RIVERS } from '../src/data/rivers.ts'
import type { MediaRef } from '../src/types/province.ts'
import { fallbackKey } from '../src/data/mediaKey.ts'

const OUT = fileURLToPath(new URL('../src/data/media.generated.json', import.meta.url))
const UA = 'vn-map-media-script/0.1 (educational map project)'
const DELAY_MS = 1000
const THUMB_WIDTH = 640

const BAD_FILE = /(map|bản[_ ]đồ|location|flag|cờ|logo|icon|symbol|coat[_ ]of[_ ]arms|huy[_ ]hiệu|signature|chữ[_ ]ký|seal|emblem|diagram|sơ[_ ]đồ|cyclosm|openstreetmap|wiki)/i
const GOOD_EXT = /\.(jpe?g|png|webp)$/i

type Article = { url: string; image: string | null; imageChecked?: boolean }
type ImageInfo = { src: string; page: string; artist: string; license: string }
type MediaFile = {
  articles: Record<string, Article>
  searches: Record<string, string | null>
  images: Record<string, ImageInfo>
  /** Ảnh dự phòng từ Openverse, theo tên mục → khóa ảnh "ov:<id>" */
  fallback: Record<string, string | null>
}

const FULL = process.argv.includes('--full')
const prev: MediaFile =
  !FULL && existsSync(OUT) ? JSON.parse(readFileSync(OUT, 'utf8')) : { articles: {}, searches: {}, images: {}, fallback: {} }

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

async function api(host: string, params: Record<string, string>): Promise<any> {
  const url = new URL(`https://${host}/w/api.php`)
  for (const [k, v] of Object.entries({ format: 'json', formatversion: '2', ...params })) url.searchParams.set(k, v)
  for (let attempt = 0; attempt < 8; attempt++) {
    await sleep(DELAY_MS)
    let status = 'lỗi mạng'
    let retryAfter = 0
    try {
      const res = await fetch(url, { headers: { 'User-Agent': UA } })
      const text = await res.text()
      if (res.ok && text.startsWith('{')) return JSON.parse(text)
      status = String(res.status)
      retryAfter = Number(res.headers.get('retry-after')) || 0
    } catch {
      // lỗi mạng tạm thời → thử lại
    }
    // 429 (quá nhiều truy vấn): theo Retry-After nếu có, không thì chờ tăng dần
    const wait = Math.max(retryAfter * 1000, 15_000 * (attempt + 1))
    console.warn(`  ! ${status} ${host} — thử lại sau ${wait / 1000}s`)
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
refs.push(...MOUNTAINS, ...RIVERS)
const wikiTitles = [...new Set(refs.map((r) => r.wiki).filter((t): t is string => !!t))]
const searches = [...new Set(refs.map((r) => r.imageSearch).filter((t): t is string => !!t))]

// ─── 2. Bài Wikipedia: URL + ảnh ───────────────────────────────────
const articles: Record<string, Article> = {}
const newTitles = wikiTitles.filter((t) => {
  if (prev.articles[t]) articles[t] = { ...prev.articles[t] }
  return !prev.articles[t]
})
console.log(`Bài Wikipedia: ${wikiTitles.length} (mới: ${newTitles.length})`)
for (let i = 0; i < newTitles.length; i += 50) {
  const batch = newTitles.slice(i, i + 50)
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
  if (!needImage.has(title) || a.image || a.imageChecked) continue
  const j = await api('vi.wikipedia.org', { action: 'parse', page: title, prop: 'images', redirects: '1' })
  a.image = pickFile(j.parse?.images ?? []) ?? null
  a.imageChecked = true
  console.log(`  ${a.image ? '✓' : '·'} ${title}${a.image ? ` → ${a.image}` : ' (không có ảnh phù hợp)'}`)
}
/** Ảnh trong bài wiki đã xem và thấy sai chủ đề (sông khác, núi, bản đồ…) — bỏ, để tìm ảnh khác */
const BAD_ARTICLE_IMAGE = new Set([
  'Bang_River_at_Ta_Lung_-_Suikou_border_gates_in_Vietnam_-_China_border.JPG', // sông Bằng, không phải Bắc Vọng
  'Bắc_Giang_Viet_Yen3.jpg', // sông Cầu, không phải sông Thương
  'KienGiangTown.jpg', // thị trấn Kiến Giang
  '92._La_Nui_Bara.jpg', // núi Bà Rá
  'Sơn_Bình,_Châu_Đức_District,_Ba_Ria_-_Vung_Tau,_Vietnam_-_panoramio_(14).jpg', // không rõ là sông Ray
  'Dong_Nai_River.png', // bản đồ
  'Bờ_kè_đường_Hoàng_Sa,_Phường_6,_Thành_phố_Mỹ_Tho.jpg', // bờ kè sông Bảo Định
])
for (const a of Object.values(articles)) if (a.image && BAD_ARTICLE_IMAGE.has(a.image.replace(/ /g, '_'))) a.image = null

// ─── 3. Tìm ảnh trên Commons ───────────────────────────────────────
const searchResults: Record<string, string | null> = {}
const newSearches = searches.filter((q) => {
  if (q in prev.searches) searchResults[q] = prev.searches[q]
  return !(q in prev.searches)
})
console.log(`Tìm ảnh Commons: ${searches.length} (mới: ${newSearches.length})`)
for (const q of newSearches) {
  const j = await api('commons.wikimedia.org', { action: 'query', list: 'search', srsearch: q, srnamespace: '6', srlimit: '10' })
  searchResults[q] = pickFile(j.query.search.map((s: any) => s.title)) ?? null
  console.log(`  ${searchResults[q] ? '✓' : '✗'} "${q}"${searchResults[q] ? ` → ${searchResults[q]}` : ''}`)
}

// ─── 4. Thông tin ảnh: thumbnail, tác giả, giấy phép ───────────────
const files = new Set<string>()
for (const r of refs) {
  const f = r.imageFile ?? (r.wiki ? articles[r.wiki]?.image : null) ?? (r.imageSearch ? searchResults[r.imageSearch] : null)
  if (f) files.add(f)
}
const images: Record<string, ImageInfo> = {}
const fileList = [...files].filter((f) => {
  if (prev.images[f]) images[f] = prev.images[f]
  return !prev.images[f]
})
console.log(`Thông tin ảnh: ${files.size} (mới: ${fileList.length})`)
await fetchImageInfo(fileList)

/** Thumbnail THUMB_WIDTH px + tác giả + giấy phép cho các file Commons / Wikipedia, ghi vào `images` */
async function fetchImageInfo(fileList: string[]) {
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
}

// ─── 5. Dự phòng: mục vẫn chưa có ảnh → tìm trên Openverse (ảnh CC từ Flickr, Commons…) ───
const hasWikiImage = (r: MediaRef) => {
  if (r.imageUrl) return true // ảnh tự tìm, không cần tra
  const f = r.imageFile ?? (r.wiki ? articles[r.wiki]?.image : null) ?? (r.imageSearch ? searchResults[r.imageSearch] : null)
  return !!f && !!(images[f] ?? images[f.replace(/ /g, '_')] ?? images[f.replace(/_/g, ' ')])
}
/** Mục đã xem và thấy Openverse chọn sai ảnh — không dùng ảnh dự phòng */
const NO_FALLBACK = new Set([
  'Chè Tam Đường', // ảnh tin giao thông
  'Don Quảng Ngãi', // ảnh đường phố 1971
  'Lẩu mắm', // ảnh quảng cáo bếp
  'Kon Ka Kinh', // ảnh côn trùng
  'Rượu Kim Sơn', // rượu sim Thung Nham
  'Cù lao An Bình', // cù lao khác
  'Rừng U Minh Hạ', // ảnh cây chuối
  'Mỳ Chũ', // ảnh căn phòng
  'Động Tiên Sơn', // ảnh bàn thờ, không phải hang
  'Nậm Mu', // bản đồ CyclOSM
  'Sông Ninh Cơ', // sơ đồ đường bờ
  'Sông Dinh (Bà Rịa)', // ảnh núi Dinh
  'Sông Mỹ Thanh', // xã Mỹ Thạnh trên sông Hậu
  'Sông Lại Giang', // sông An Lão (nhánh)
  'Sông Ba Lai', // cầu trên sông Ba
  'Sông Thương', 'Sông Bắc Vọng', 'Sông Kiến Giang', 'Sông Bé', 'Sông Ray', 'Sông Vàm Cỏ', 'Sông Mỹ Tho',
])

const fallback: Record<string, string | null> = {}
const fallbackRefs = refs.filter((r) => !hasWikiImage(r) && fallbackKey(r) && !NO_FALLBACK.has(fallbackKey(r)!))
const fallbackKeys = [...new Set(fallbackRefs.map((r) => fallbackKey(r)!))]
const fallbackQueries = new Map<string, string[]>()
for (const r of fallbackRefs) {
  const k = fallbackKey(r)!
  const qs = fallbackQueries.get(k) ?? [k, unaccent(k)]
  if (r.imageSearch && !qs.includes(r.imageSearch)) qs.unshift(r.imageSearch)
  fallbackQueries.set(k, qs)
}

function unaccent(s: string): string {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D')
}
const words = (s: string) => unaccent(s).toLowerCase().split(/[^a-z0-9]+/).filter((w) => w.length >= 2)

/** Ảnh có tiêu đề chứa phần lớn từ khóa (bỏ dấu) mới được nhận — tránh ảnh lạc đề */
function relevant(title: string, query: string): boolean {
  const t = new Set(words(title))
  const q = words(query)
  if (!q.length) return false
  return q.filter((w) => t.has(w)).length >= Math.ceil(q.length * 0.75)
}

/** Ảnh Flickr lấy cỡ "_z" (~640px); thumbnail của Openverse hay lỗi nên không dùng */
function directSrc(x: any): string {
  const url: string = x.url ?? ''
  if (/staticflickr\.com/.test(url)) return url.replace(/(_[a-z])?\.(jpe?g|png)$/i, '_z.$2')
  return url
}

/** Tên file nếu ảnh nằm trên Commons — khi đó lấy thumbnail + giấy phép qua API Commons như các ảnh khác */
function commonsFile(x: any): string | null {
  const m = (x.url ?? '').match(/^https:\/\/upload\.wikimedia\.org\/wikipedia\/commons\/\w\/\w\w\/([^/]+)$/)
  return m ? decodeURIComponent(m[1]) : null
}

const LICENSE_NAME = (l: string, v: string) => (l === 'cc0' ? 'CC0' : l === 'pdm' ? 'Public domain' : `CC ${l.toUpperCase()} ${v}`.trim())

async function openverse(q: string): Promise<any[] | null> {
  const url = new URL('https://api.openverse.org/v1/images/')
  url.searchParams.set('q', q)
  url.searchParams.set('page_size', '20')
  url.searchParams.set('mature', 'false')
  for (let attempt = 0; attempt < 3; attempt++) {
    await sleep(3500)
    const res = await fetch(url, { headers: { 'User-Agent': UA } })
    if (res.ok) return (await res.json()).results ?? []
    console.warn(`  ! Openverse ${res.status} — thử lại sau ${(attempt + 1) * 30}s`)
    await sleep(30_000 * (attempt + 1))
  }
  return null
}

const newFallback = fallbackKeys.filter((k) => {
  const old = prev.fallback?.[k]
  if (old !== undefined && (old === null || (prev.images[old] && !(old.startsWith('ov:') && /openverse.org|wikimedia.org/.test(prev.images[old].src))))) {
    fallback[k] = old
    if (old) images[old] = prev.images[old]
    return false
  }
  return true
})
const commonsFallback: string[] = []
console.log(`Tìm ảnh dự phòng Openverse: ${fallbackKeys.length} (mới: ${newFallback.length})`)
for (const k of newFallback) {
  let found: any = null
  let failed = false
  for (const q of fallbackQueries.get(k)!) {
    const results = await openverse(q)
    if (results == null) {
      failed = true
      break
    }
    found = results.find((x) => /^(jpe?g|png|webp)?$/i.test(x.filetype ?? '') && relevant(x.title ?? '', q) && !BAD_FILE.test(x.title ?? ''))
    if (found) break
  }
  if (failed) {
    // Hết lượt gọi (giới hạn ẩn danh) — lưu phần đã có, lần chạy sau tiếp tục
    console.warn('  ! Openverse từ chối liên tục, dừng; chạy lại sau để tra tiếp')
    break
  }
  const file = found && commonsFile(found)
  if (file) {
    fallback[k] = file
    if (!images[file]) commonsFallback.push(file)
    console.log(`  ✓ ${k} → Commons "${file}"`)
  } else if (found) {
    const key = `ov:${found.id}`
    fallback[k] = key
    images[key] = {
      src: directSrc(found),
      page: found.foreign_landing_url ?? found.url,
      artist: stripHtml(found.creator) || 'Không rõ',
      license: LICENSE_NAME(found.license ?? '', found.license_version ?? ''),
    }
    console.log(`  ✓ ${k} → "${found.title}" (${found.source})`)
  } else {
    fallback[k] = null
    console.log(`  ✗ ${k}`)
  }
}

await fetchImageInfo(commonsFallback)
// File Commons đã bị xóa / không truy cập được → coi như không có ảnh
for (const [k, v] of Object.entries(fallback)) if (v && !images[v]) fallback[k] = null

writeFileSync(OUT, JSON.stringify({ articles, searches: searchResults, images, fallback }, null, 2) + '\n')
const noImage = refs.filter((r) => {
  if (hasWikiImage(r)) return false
  const k = fallbackKey(r)
  return !(k && fallback[k])
}).length
console.log(`\nĐã ghi ${OUT}\n${Object.keys(images).length} ảnh · ${noImage}/${refs.length} mục chưa có ảnh`)
