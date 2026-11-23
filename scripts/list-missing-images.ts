/**
 * Liệt kê các mục chưa có ảnh → missing-images.txt (ở thư mục gốc dự án).
 *
 *   npm run media:missing
 *
 * Dùng cùng thứ tự tra ảnh với src/data/media.ts: imageUrl → imageFile → bài wiki → imageSearch → Openverse.
 * Mỗi dòng kèm đường dẫn gợi ý để đặt ảnh vào public/ và khai báo `imageUrl`.
 * Phần Lịch sử (src/data/history.ts): mục chưa chọn ảnh + mục đã khai báo `image` nhưng file chưa có trong public/.
 */
import { createHash } from 'node:crypto'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { PROVINCES } from '../src/data/provinceMeta.ts'
import { PROVINCE_DETAILS } from '../src/data/details/all.ts'
import { MOUNTAINS } from '../src/data/mountains.ts'
import { RIVERS } from '../src/data/rivers.ts'
import { fallbackKey } from '../src/data/mediaKey.ts'
import { LEADERS, WARS, type HistoryImage } from '../src/data/history.ts'
import type { MediaRef } from '../src/types/province.ts'

type MediaFile = {
  articles: Record<string, { image: string | null }>
  searches: Record<string, string | null>
  images: Record<string, unknown>
  fallback?: Record<string, string | null>
}
const media: MediaFile = JSON.parse(readFileSync(new URL('../src/data/media.generated.json', import.meta.url), 'utf8'))
const OUT = fileURLToPath(new URL('../missing-images.txt', import.meta.url))

function hasImage(ref: MediaRef): boolean {
  if (ref.imageUrl) return true
  const file =
    ref.imageFile ?? (ref.wiki ? media.articles[ref.wiki]?.image : null) ?? (ref.imageSearch ? media.searches[ref.imageSearch] : null)
  if (file && (media.images[file] ?? media.images[file.replace(/ /g, '_')] ?? media.images[file.replace(/_/g, ' ')])) return true
  const key = fallbackKey(ref)
  const ov = key ? media.fallback?.[key] : null
  return !!(ov && media.images[ov])
}

const slugify = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

const lines: string[] = []
let total = 0
let missing = 0

const section = (title: string, folder: string, groups: [string, MediaRef[]][]) => {
  const rows: string[] = []
  for (const [label, refs] of groups) {
    for (const r of refs) {
      total++
      if (hasImage(r)) continue
      missing++
      const name = fallbackKey(r) ?? '(không tên)'
      rows.push(`  [ ] ${label.padEnd(10)} ${name.padEnd(42)} → public/images/${folder}/${slugify(name)}.jpg`)
    }
  }
  if (rows.length) lines.push(`■ ${title}`, ...rows, '')
}

for (const p of PROVINCES) {
  const d = PROVINCE_DETAILS[p.code]
  if (!d) continue
  section(`${p.code}. ${p.name}`, p.slug, [
    ['Ảnh bìa', d.culture.cover ? [d.culture.cover] : []],
    ['Di sản', d.culture.heritage],
    ['Lễ hội', d.festivals],
    ['Món ăn', d.foods],
    ['Đặc sản', d.specialties],
  ])
}
section('Núi', 'nui', [['Núi', MOUNTAINS]])
section('Sông', 'song', [['Sông', RIVERS]])

// ── Lịch sử ──────────────────────────────────────────────────────────────
/** Lý do để trống (đã tra mà không có ảnh phù hợp) — cập nhật khi thay đổi */
const HISTORY_NOTES: Record<string, string> = {
  'tran-thai-tong': 'không có chân dung; Commons chỉ có ảnh lăng (gò đất, File:Lăng Trần Thái Tông.jpg)',
  'tran-thanh-tong': 'không có chân dung; Commons chỉ có ảnh lăng (gò đất, File:Lăng Trần Thánh Tông.jpg)',
  'tran-quang-khai': 'Commons không có ảnh nào (kể cả đền thờ)',
}
const PUBLIC = (p: string) => new URL(`../public/${p}`, import.meta.url)

/** URL thumbnail 960px trên upload.wikimedia.org tính từ trang Commons */
function thumbUrl(page: string): string | null {
  const m = page.match(/File:(.+)$/)
  if (!m) return null
  const name = decodeURIComponent(m[1]).replace(/ /g, '_')
  const md5 = createHash('md5').update(name).digest('hex')
  const enc = encodeURIComponent(name)
  return `https://upload.wikimedia.org/wikipedia/commons/thumb/${md5[0]}/${md5.slice(0, 2)}/${enc}/960px-${enc}`
}

const noImage: string[] = []
const notDownloaded: string[] = []
let historyTotal = 0
const checkHistory = (kind: string, id: string, name: string, image: HistoryImage | undefined, folder: string) => {
  historyTotal++
  if (!image) {
    noImage.push(`  [ ] ${kind.padEnd(10)} ${name.padEnd(36)} → public/images/${folder}${id}.jpg${HISTORY_NOTES[id] ? `  (${HISTORY_NOTES[id]})` : ''}`)
  } else if (!existsSync(PUBLIC(image.url))) {
    const url = thumbUrl(image.page)
    notDownloaded.push(
      `  [ ] ${kind.padEnd(10)} ${name}`,
      `        Trang ảnh: ${image.page}`,
      `        Nguồn đã ghi: ${image.credit}`,
      ...(url ? [`        Tải: curl -A "vn-map/1.0" -o public/${image.url} "${url}"`] : []),
    )
  }
}
for (const l of LEADERS) checkHistory('Lãnh đạo', l.id, l.name, l.image, 'history/')
for (const w of WARS) for (const b of w.battles) checkHistory('Trận', b.id, b.name, b.image, 'history/battles/')

const historyMissing = noImage.length + notDownloaded.filter((r) => r.startsWith('  [ ]')).length
if (historyMissing) {
  lines.push(`■ Lịch sử (src/data/history.ts) — ${historyMissing}/${historyTotal} mục thiếu ảnh`, '')
  if (notDownloaded.length) lines.push('  Đã chọn ảnh + ghi nguồn, CHƯA TẢI file (popup tạm ẩn ảnh):', ...notDownloaded, '')
  if (noImage.length) lines.push('  Chưa có ảnh (hiện chữ cái đầu / popup không ảnh):', ...noImage, '')
}

const header = [
  `DANH SÁCH MỤC CHƯA CÓ ẢNH — bản đồ ${missing}/${total} mục, lịch sử ${historyMissing}/${historyTotal} mục`,
  `Tạo bởi: npm run media:missing  (${new Date().toISOString().slice(0, 10)})`,
  '',
  'Cách thêm ảnh (xem mục "Ảnh" trong CLAUDE.md và "Ảnh bản đồ" trong geo.md):',
  '  1. Lưu ảnh vào đường dẫn gợi ý bên phải (thư mục public/images/...), nên là JPG ngang ~1200px, < 300 KB.',
  '  2. Trong file dữ liệu (src/data/details/*.ts, mountains.ts, rivers.ts), thêm vào mục tương ứng:',
  "       imageUrl: 'images/<tỉnh>/<tên>.jpg', imageCredit: 'Tác giả · Giấy phép'",
  '     (hoặc imageUrl là URL https://… nếu ảnh được phép nhúng trực tiếp)',
  '  3. Chỉ dùng ảnh tự chụp hoặc ảnh có giấy phép cho phép dùng lại (CC, public domain), ghi rõ nguồn.',
  '  4. Chạy lại npm run media:missing để cập nhật danh sách này.',
  '',
  'Ảnh trang Lịch sử (src/data/history.ts):',
  '  1. Tìm ảnh trên Wikimedia Commons (ảnh đại diện bài vi.wikipedia, hoặc ảnh liên quan: tượng, đền, tranh, lược đồ).',
  '     Chỉ CC / public domain; xem ảnh + mô tả gốc trước khi dùng.',
  '  2. Lấy URL chính xác qua API (tránh 429 do đường dẫn sai):',
  '       https://commons.wikimedia.org/w/api.php?action=query&titles=File:<tên>&prop=imageinfo&iiprop=url|size&format=json',
  '  3. Tải: upload.wikimedia.org hay bị chặn 429 theo IP → dùng https://commons.wikimedia.org/w/thumb.php?f=<tên_gạch_dưới>&w=960 (thường vẫn tải được). Hoặc curl:',
  '       - ảnh gốc < 1200px: tải thẳng file gốc (URL "url" trong kết quả API);',
  '       - ảnh lớn: thumbnail kích thước chuẩn /thumb/<a>/<ab>/<tên>/<N>px-<tên>, N ∈ 500, 960, 1280 (dấu phẩy là %2C).',
  '     Bị 429 ("too many requests") → chặn theo IP vài chục phút: chờ rồi thử lại (script nền thử mỗi ~90 s).',
  '  4. Lưu public/images/history/<id>.jpg (lãnh đạo) hoặc public/images/history/battles/<id>.jpg (trận);',
  '     > 300 KB thì chạy npm run images:resize; xem lại ảnh sau khi nén.',
  "  5. Khai báo trong history.ts: image: { url: 'images/history/…jpg', credit: 'Mô tả · Tác giả · Giấy phép', page: '<trang Commons>',",
  "     position: '50% 30%' (chân dung, để ảnh tròn thấy mặt) hoặc fit: 'contain' (lược đồ / ảnh dọc) }.",
  '',
]
writeFileSync(OUT, [...header, ...lines].join('\n'))
console.log(`Đã ghi ${OUT}: bản đồ ${missing}/${total}, lịch sử ${historyMissing}/${historyTotal} mục chưa có ảnh`)
