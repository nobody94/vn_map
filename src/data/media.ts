import generated from './media.generated.json'
import type { MediaRef } from '../types/province'

interface ImageInfo {
  src: string
  /** Trang mô tả file trên Wikimedia (ghi nguồn) */
  page: string
  artist: string
  license: string
}

interface MediaData {
  articles: Record<string, { url: string; image: string | null }>
  searches: Record<string, string | null>
  images: Record<string, ImageInfo>
}

const data = generated as MediaData

export interface ResolvedImage extends ImageInfo {
  /** "Ảnh: Tác giả · CC BY-SA 4.0" */
  credit: string
}

/** Ảnh cho một MediaRef: imageFile → ảnh trong bài wiki → kết quả tìm Commons */
export function resolveImage(ref: MediaRef): ResolvedImage | undefined {
  const file =
    ref.imageFile ??
    (ref.wiki ? data.articles[ref.wiki]?.image : null) ??
    (ref.imageSearch ? data.searches[ref.imageSearch] : null)
  // Tên file Commons có thể viết bằng dấu cách hoặc gạch dưới — thử cả hai
  const info = file
    ? (data.images[file] ?? data.images[file.replace(/ /g, '_')] ?? data.images[file.replace(/_/g, ' ')])
    : undefined
  if (!info) return undefined
  return { ...info, credit: `Ảnh: ${info.artist}${info.license ? ` · ${info.license}` : ''}` }
}
