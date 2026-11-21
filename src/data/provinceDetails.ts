import type { ProvinceDetail } from '../types/province'
import { BAC } from './details/bac.ts'
import { TRUNG } from './details/trung.ts'
import { NAM } from './details/nam.ts'

/**
 * Thông tin chi tiết của 34 tỉnh theo mã (khớp PROVINCES trong provinceMeta.ts),
 * chia file theo miền trong ./details/.
 *
 * Ảnh: xem MediaRef trong types/province.ts. Sau khi sửa `wiki` / `imageFile` /
 * `imageSearch`, chạy `npm run media` để cập nhật src/data/media.generated.json.
 */
export const PROVINCE_DETAILS: Partial<Record<number, ProvinceDetail>> = { ...BAC, ...TRUNG, ...NAM }
