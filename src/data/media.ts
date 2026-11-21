import generated from './media.generated.json'
import type { MediaRef } from '../types/province'
import { fallbackKey } from './mediaKey'

interface ImageInfo {
  src: string
  /** Trang gốc của ảnh (Wikimedia, Flickr…) để ghi nguồn */
  page: string
  artist: string
  license: string
}

interface MediaData {
  articles: Record<string, { url: string; image: string | null }>
  searches: Record<string, string | null>
  images: Record<string, ImageInfo>
  fallback?: Record<string, string | null>
}

const data = generated as MediaData

export interface ResolvedImage extends ImageInfo {
  /** "Ảnh: Tác giả · CC BY-SA 4.0" */
  credit: string
}

/** Ảnh cho một MediaRef: imageUrl → imageFile → ảnh trong bài wiki → kết quả tìm Commons → Openverse */
export function resolveImage(ref: MediaRef): ResolvedImage | undefined {
  if (ref.imageUrl) {
    const src = /^https?:\/\//.test(ref.imageUrl) ? ref.imageUrl : import.meta.env.BASE_URL + ref.imageUrl.replace(/^\//, '')
    const credit = ref.imageCredit ?? ''
    return { src, page: '', artist: credit, license: '', credit: credit ? `Ảnh: ${credit}` : '' }
  }
  const file =
    ref.imageFile ??
    (ref.wiki ? data.articles[ref.wiki]?.image : null) ??
    (ref.imageSearch ? data.searches[ref.imageSearch] : null)
  // Tên file Commons có thể viết bằng dấu cách hoặc gạch dưới — thử cả hai
  let info = file
    ? (data.images[file] ?? data.images[file.replace(/ /g, '_')] ?? data.images[file.replace(/_/g, ' ')])
    : undefined
  // Không có ảnh Wikimedia → ảnh dự phòng từ Openverse (theo tên mục)
  if (!info) {
    const key = fallbackKey(ref)
    const ov = key ? data.fallback?.[key] : null
    if (ov) info = data.images[ov]
  }
  if (!info) return undefined
  return { ...info, credit: `Ảnh: ${info.artist}${info.license ? ` · ${info.license}` : ''}` }
}
