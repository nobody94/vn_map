import type { MediaRef } from '../types/province'

/**
 * Khóa tra ảnh dự phòng (Openverse) cho một MediaRef: tên mục (món ăn, lễ hội, núi, sông…)
 * hoặc chú thích ảnh bìa. Dùng chung cho scripts/fetch-media.ts và media.ts.
 */
export function fallbackKey(ref: MediaRef): string | undefined {
  const r = ref as MediaRef & { name?: string; caption?: string }
  return r.name ?? r.caption
}
