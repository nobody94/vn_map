/**
 * Liệt kê các mục chưa có ảnh → missing-images.txt (ở thư mục gốc dự án).
 *
 *   npm run media:missing
 *
 * Dùng cùng thứ tự tra ảnh với src/data/media.ts: imageUrl → imageFile → bài wiki → imageSearch → Openverse.
 * Mỗi dòng kèm đường dẫn gợi ý để đặt ảnh vào public/ và khai báo `imageUrl`.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { PROVINCES } from '../src/data/provinceMeta.ts'
import { PROVINCE_DETAILS } from '../src/data/details/all.ts'
import { MOUNTAINS } from '../src/data/mountains.ts'
import { RIVERS } from '../src/data/rivers.ts'
import { fallbackKey } from '../src/data/mediaKey.ts'
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

const header = [
  `DANH SÁCH MỤC CHƯA CÓ ẢNH — ${missing}/${total} mục`,
  `Tạo bởi: npm run media:missing  (${new Date().toISOString().slice(0, 10)})`,
  '',
  'Cách thêm ảnh (xem mục "Ảnh" trong CLAUDE.md):',
  '  1. Lưu ảnh vào đường dẫn gợi ý bên phải (thư mục public/images/...), nên là JPG ngang ~1200px, < 300 KB.',
  '  2. Trong file dữ liệu (src/data/details/*.ts, mountains.ts, rivers.ts), thêm vào mục tương ứng:',
  "       imageUrl: 'images/<tỉnh>/<tên>.jpg', imageCredit: 'Tác giả · Giấy phép'",
  '     (hoặc imageUrl là URL https://… nếu ảnh được phép nhúng trực tiếp)',
  '  3. Chỉ dùng ảnh tự chụp hoặc ảnh có giấy phép cho phép dùng lại (CC, public domain), ghi rõ nguồn.',
  '  4. Chạy lại npm run media:missing để cập nhật danh sách này.',
  '',
]
writeFileSync(OUT, [...header, ...lines].join('\n'))
console.log(`Đã ghi ${OUT}: ${missing}/${total} mục chưa có ảnh`)
