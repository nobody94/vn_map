import type { ProvinceDetail } from '../../types/province'
import { BAC } from './bac.ts'
import { TRUNG } from './trung.ts'
import { NAM } from './nam.ts'

/**
 * Gộp tĩnh cả ba miền — CHỈ dùng cho script Node (fetch-media, list-missing-images).
 * Ứng dụng tải theo miền qua loadProvinceDetail() trong ../provinceDetails.ts;
 * import file này từ src/ sẽ gộp lại mọi miền vào bundle chính.
 */
export const PROVINCE_DETAILS: Partial<Record<number, ProvinceDetail>> = { ...BAC, ...TRUNG, ...NAM }
