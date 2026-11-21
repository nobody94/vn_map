/**
 * 7 vùng địa lý (cách chia quen thuộc trong sách giáo khoa Địa lý).
 *
 * Một số tỉnh sau sáp nhập trải trên hai vùng (vd. Gia Lai gồm Bình Định, Lâm Đồng gồm
 * Bình Thuận, Tây Ninh gồm Long An); khi đó xếp theo vùng chiếm phần lớn diện tích.
 */
export type RegionId = 'tdmnbb' | 'dbsh' | 'btb' | 'dhntb' | 'tn' | 'dnb' | 'dbscl'

export interface Region {
  id: RegionId
  name: string
  /** Màu nền tỉnh */
  fill: string
  /** Màu đậm hơn khi rê chuột / chọn */
  strong: string
}

export const REGIONS: Region[] = [
  { id: 'tdmnbb', name: 'Trung du và miền núi Bắc Bộ', fill: '#cfe8d8', strong: '#9fd0b1' },
  { id: 'dbsh', name: 'Đồng bằng sông Hồng', fill: '#f6e2b3', strong: '#ecc76f' },
  { id: 'btb', name: 'Bắc Trung Bộ', fill: '#f8d3c5', strong: '#f0a68b' },
  { id: 'dhntb', name: 'Duyên hải Nam Trung Bộ', fill: '#c8e0f2', strong: '#8dbfe3' },
  { id: 'tn', name: 'Tây Nguyên', fill: '#e2d3ee', strong: '#c2a5dc' },
  { id: 'dnb', name: 'Đông Nam Bộ', fill: '#f5d0df', strong: '#e99fbd' },
  { id: 'dbscl', name: 'Đồng bằng sông Cửu Long', fill: '#d8ebc4', strong: '#b0d68b' },
]

export const REGION_BY_ID = new Map(REGIONS.map((r) => [r.id, r]))

/** Vùng của từng tỉnh theo mã */
export const PROVINCE_REGION: Record<number, RegionId> = {
  // Trung du và miền núi Bắc Bộ
  2: 'tdmnbb', 3: 'tdmnbb', 4: 'tdmnbb', 5: 'tdmnbb', 6: 'tdmnbb', 7: 'tdmnbb',
  8: 'tdmnbb', 9: 'tdmnbb', 10: 'tdmnbb', 11: 'tdmnbb',
  // Đồng bằng sông Hồng
  1: 'dbsh', 12: 'dbsh', 13: 'dbsh', 14: 'dbsh', 15: 'dbsh',
  // Bắc Trung Bộ
  16: 'btb', 17: 'btb', 18: 'btb', 19: 'btb', 20: 'btb',
  // Duyên hải Nam Trung Bộ
  21: 'dhntb', 22: 'dhntb', 23: 'dhntb',
  // Tây Nguyên
  24: 'tn', 25: 'tn', 26: 'tn',
  // Đông Nam Bộ
  27: 'dnb', 28: 'dnb', 29: 'dnb',
  // Đồng bằng sông Cửu Long
  30: 'dbscl', 31: 'dbscl', 32: 'dbscl', 33: 'dbscl', 34: 'dbscl',
}

export const regionOf = (code: number): Region | undefined => REGION_BY_ID.get(PROVINCE_REGION[code])
