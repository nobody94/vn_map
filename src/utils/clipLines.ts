import type { MultiLineString, MultiPolygon, Position } from 'geojson'

function inRing([x, y]: Position, ring: Position[]): boolean {
  let inside = false
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i]
    const [xj, yj] = ring[j]
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside
  }
  return inside
}

/** Điểm nằm trong MultiPolygon (tính cả lỗ thủng) */
export function inMultiPolygon(p: Position, mp: MultiPolygon): boolean {
  return mp.coordinates.some((poly) => inRing(p, poly[0]) && !poly.slice(1).some((hole) => inRing(p, hole)))
}

/**
 * Giữ phần đường nằm trong vùng: tách mỗi đường thành các đoạn liên tiếp có đỉnh trong vùng,
 * thêm một đỉnh ở mỗi đầu để đường chạm tới ranh giới. Trả về null nếu không còn gì.
 */
export function clipLinesToArea(lines: MultiLineString, area: MultiPolygon): MultiLineString | null {
  // Lọc nhanh theo khung bao trước khi kiểm tra từng đỉnh
  let [minX, minY, maxX, maxY] = [Infinity, Infinity, -Infinity, -Infinity]
  for (const poly of area.coordinates)
    for (const [x, y] of poly[0]) {
      if (x < minX) minX = x
      if (x > maxX) maxX = x
      if (y < minY) minY = y
      if (y > maxY) maxY = y
    }
  const out: Position[][] = []
  for (const line of lines.coordinates) {
    const inside = line.map((p) => p[0] >= minX && p[0] <= maxX && p[1] >= minY && p[1] <= maxY && inMultiPolygon(p, area))
    let start = -1
    for (let i = 0; i <= line.length; i++) {
      if (i < line.length && inside[i]) {
        if (start < 0) start = i
      } else if (start >= 0) {
        const part = line.slice(Math.max(0, start - 1), Math.min(line.length, i + 1))
        if (part.length >= 2) out.push(part)
        start = -1
      }
    }
  }
  return out.length ? { type: 'MultiLineString', coordinates: out } : null
}
