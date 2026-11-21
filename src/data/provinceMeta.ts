import type { ProvinceMeta } from '../types/province'

/**
 * 34 đơn vị hành chính cấp tỉnh theo Nghị quyết 202/2025/QH15 (hiệu lực 01/07/2025).
 * `mergedFrom` liệt kê các tỉnh/thành cũ trước sáp nhập.
 */
export const PROVINCES: ProvinceMeta[] = [
  { code: 1, slug: 'ha-noi', name: 'Hà Nội', kind: 'Thành phố', mergedFrom: [] },
  { code: 2, slug: 'cao-bang', name: 'Cao Bằng', kind: 'Tỉnh', mergedFrom: [] },
  { code: 3, slug: 'tuyen-quang', name: 'Tuyên Quang', kind: 'Tỉnh', mergedFrom: ['Tuyên Quang', 'Hà Giang'] },
  { code: 4, slug: 'lao-cai', name: 'Lào Cai', kind: 'Tỉnh', mergedFrom: ['Lào Cai', 'Yên Bái'] },
  { code: 5, slug: 'dien-bien', name: 'Điện Biên', kind: 'Tỉnh', mergedFrom: [] },
  { code: 6, slug: 'lai-chau', name: 'Lai Châu', kind: 'Tỉnh', mergedFrom: [] },
  { code: 7, slug: 'son-la', name: 'Sơn La', kind: 'Tỉnh', mergedFrom: [] },
  { code: 8, slug: 'thai-nguyen', name: 'Thái Nguyên', kind: 'Tỉnh', mergedFrom: ['Thái Nguyên', 'Bắc Kạn'] },
  { code: 9, slug: 'lang-son', name: 'Lạng Sơn', kind: 'Tỉnh', mergedFrom: [] },
  { code: 10, slug: 'quang-ninh', name: 'Quảng Ninh', kind: 'Tỉnh', mergedFrom: [] },
  { code: 11, slug: 'phu-tho', name: 'Phú Thọ', kind: 'Tỉnh', mergedFrom: ['Phú Thọ', 'Vĩnh Phúc', 'Hòa Bình'] },
  { code: 12, slug: 'bac-ninh', name: 'Bắc Ninh', kind: 'Tỉnh', mergedFrom: ['Bắc Ninh', 'Bắc Giang'] },
  { code: 13, slug: 'hai-phong', name: 'Hải Phòng', kind: 'Thành phố', mergedFrom: ['Hải Phòng', 'Hải Dương'] },
  { code: 14, slug: 'hung-yen', name: 'Hưng Yên', kind: 'Tỉnh', mergedFrom: ['Hưng Yên', 'Thái Bình'] },
  { code: 15, slug: 'ninh-binh', name: 'Ninh Bình', kind: 'Tỉnh', mergedFrom: ['Ninh Bình', 'Hà Nam', 'Nam Định'] },
  { code: 16, slug: 'thanh-hoa', name: 'Thanh Hóa', kind: 'Tỉnh', mergedFrom: [] },
  { code: 17, slug: 'nghe-an', name: 'Nghệ An', kind: 'Tỉnh', mergedFrom: [] },
  { code: 18, slug: 'ha-tinh', name: 'Hà Tĩnh', kind: 'Tỉnh', mergedFrom: [] },
  { code: 19, slug: 'quang-tri', name: 'Quảng Trị', kind: 'Tỉnh', mergedFrom: ['Quảng Trị', 'Quảng Bình'] },
  { code: 20, slug: 'hue', name: 'Huế', kind: 'Thành phố', mergedFrom: [] },
  { code: 21, slug: 'da-nang', name: 'Đà Nẵng', kind: 'Thành phố', mergedFrom: ['Đà Nẵng', 'Quảng Nam'] },
  { code: 22, slug: 'quang-ngai', name: 'Quảng Ngãi', kind: 'Tỉnh', mergedFrom: ['Quảng Ngãi', 'Kon Tum'] },
  { code: 23, slug: 'khanh-hoa', name: 'Khánh Hòa', kind: 'Tỉnh', mergedFrom: ['Khánh Hòa', 'Ninh Thuận'] },
  { code: 24, slug: 'gia-lai', name: 'Gia Lai', kind: 'Tỉnh', mergedFrom: ['Gia Lai', 'Bình Định'] },
  { code: 25, slug: 'dak-lak', name: 'Đắk Lắk', kind: 'Tỉnh', mergedFrom: ['Đắk Lắk', 'Phú Yên'] },
  { code: 26, slug: 'lam-dong', name: 'Lâm Đồng', kind: 'Tỉnh', mergedFrom: ['Lâm Đồng', 'Đắk Nông', 'Bình Thuận'] },
  { code: 27, slug: 'tay-ninh', name: 'Tây Ninh', kind: 'Tỉnh', mergedFrom: ['Tây Ninh', 'Long An'] },
  { code: 28, slug: 'dong-nai', name: 'Đồng Nai', kind: 'Tỉnh', mergedFrom: ['Đồng Nai', 'Bình Phước'] },
  { code: 29, slug: 'ho-chi-minh', name: 'TP. Hồ Chí Minh', kind: 'Thành phố', mergedFrom: ['TP. Hồ Chí Minh', 'Bình Dương', 'Bà Rịa – Vũng Tàu'] },
  { code: 30, slug: 'vinh-long', name: 'Vĩnh Long', kind: 'Tỉnh', mergedFrom: ['Vĩnh Long', 'Bến Tre', 'Trà Vinh'] },
  { code: 31, slug: 'dong-thap', name: 'Đồng Tháp', kind: 'Tỉnh', mergedFrom: ['Đồng Tháp', 'Tiền Giang'] },
  { code: 32, slug: 'an-giang', name: 'An Giang', kind: 'Tỉnh', mergedFrom: ['An Giang', 'Kiên Giang'] },
  { code: 33, slug: 'can-tho', name: 'Cần Thơ', kind: 'Thành phố', mergedFrom: ['Cần Thơ', 'Sóc Trăng', 'Hậu Giang'] },
  { code: 34, slug: 'ca-mau', name: 'Cà Mau', kind: 'Tỉnh', mergedFrom: ['Cà Mau', 'Bạc Liêu'] },
]

export const PROVINCE_BY_CODE = new Map(PROVINCES.map((p) => [p.code, p]))

/** Mã tỉnh quản lý hai quần đảo */
export const HOANG_SA_PROVINCE = 21 // Đà Nẵng
export const TRUONG_SA_PROVINCE = 23 // Khánh Hòa
