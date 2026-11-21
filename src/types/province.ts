import type { FeatureCollection, MultiPolygon } from 'geojson'

export type ProvinceKind = 'Thành phố' | 'Tỉnh'

/** Thông tin cơ bản của một đơn vị hành chính cấp tỉnh (sau 01/07/2025). */
export interface ProvinceMeta {
  /** Mã khớp với `properties.code` trong public/geo/provinces.geojson */
  code: number
  slug: string
  name: string
  kind: ProvinceKind
  /** Các tỉnh/thành cũ (trước sáp nhập) hợp thành đơn vị này. Rỗng nếu giữ nguyên. */
  mergedFrom: string[]
}

export interface Peak {
  name: string
  heightM: number
  /** true nếu là điểm cao nhất của tỉnh */
  highest?: boolean
}

/**
 * Tham chiếu ảnh. Ảnh được tra sẵn bằng `npm run media` (scripts/fetch-media.ts)
 * và lưu ở src/data/media.generated.json.
 *
 * Thứ tự ưu tiên: imageUrl (ảnh tự tìm) → imageFile → ảnh trong bài `wiki` → kết quả tìm `imageSearch` trên Commons
 * → ảnh dự phòng Openverse theo tên mục
 */
export interface MediaRef {
  /**
   * Ảnh tự tìm, ưu tiên cao nhất: đường dẫn trong thư mục public (vd. 'images/lang-son/vit-quay.jpg')
   * hoặc URL đầy đủ https://…
   */
  imageUrl?: string
  /** Ghi nguồn cho imageUrl, vd. 'Nguyễn Văn A · CC BY 4.0' hoặc 'Ảnh tự chụp' */
  imageCredit?: string
  /** Tiêu đề bài Wikipedia tiếng Việt, dùng để lấy ảnh tự động */
  wiki?: string
  /** Tên file trên Wikimedia Commons (không kèm "File:"), dùng khi ảnh tự chọn chưa đẹp */
  imageFile?: string
  /** Từ khóa tìm ảnh trên Wikimedia Commons khi không có bài Wikipedia phù hợp */
  imageSearch?: string
}

export interface Festival extends MediaRef {
  name: string
  /** Thời gian tổ chức, ghi rõ âm lịch / dương lịch */
  time: string
  description: string
}

export interface NamedItem extends MediaRef {
  name: string
  description: string
}

export interface HeritageItem extends MediaRef {
  name: string
  description?: string
}

export interface CultureCover extends MediaRef {
  caption: string
}

/** Thông tin chi tiết hiển thị trong bảng thông tin tỉnh */
export interface ProvinceDetail {
  region: string
  areaKm2: number
  population: number
  /** Nguồn / năm của số liệu diện tích, dân số */
  statsSource: string
  terrain: string
  peaks: Peak[]
  culture: {
    /** Ảnh lớn đầu mục Văn hóa */
    cover?: CultureCover
    summary: string
    ethnicGroups: string[]
    heritage: HeritageItem[]
  }
  festivals: Festival[]
  foods: NamedItem[]
  specialties: NamedItem[]
}

export interface ProvinceFeatureProps {
  code: number
}

export type ProvinceCollection = FeatureCollection<MultiPolygon, ProvinceFeatureProps>
