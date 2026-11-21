import type { FitBoundsOptions } from 'leaflet'

/**
 * Khoảng chừa khi zoom tới đối tượng: chừa chỗ cho panel thông tin (bên phải trên desktop,
 * phía dưới trên điện thoại ≤768px) và khung tiêu đề + ô tìm kiếm phía trên (150px).
 * Khớp với --panel-width và --sheet-height trong src/index.css.
 */
export function panelPadding(): FitBoundsOptions {
  const w = window.innerWidth
  if (w <= 768) return { paddingTopLeft: [24, 150], paddingBottomRight: [24, window.innerHeight * 0.62 + 16] }
  return { paddingTopLeft: [48, 150], paddingBottomRight: [Math.min(400, w - 32) + 48, 48] }
}
