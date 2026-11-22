/** Thang màu độ cao (m → màu), dùng chung cho lớp Địa hình và chú giải */
export const ELEVATION_STOPS: [number, string][] = [
  [0, '#79b37a'],
  [100, '#a9cf8a'],
  [300, '#dfe7a1'],
  [600, '#f1d88c'],
  [1000, '#e5b26b'],
  [1500, '#cf8a4d'],
  [2000, '#b06a3b'],
  [2500, '#8f5a46'],
  [3000, '#e9e4df'],
]

/** Mốc ghi trên chú giải */
export const ELEVATION_TICKS = [0, 300, 1000, 2000, 3000]

export const ELEVATION_MAX = ELEVATION_STOPS[ELEVATION_STOPS.length - 1][0]

const hex = (c: string) => [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16))

/** Bảng tra màu theo từng mét: lut[h*3 .. h*3+2] = r, g, b (h từ 0 tới ELEVATION_MAX) */
export function buildElevationLut(): Uint8ClampedArray {
  const lut = new Uint8ClampedArray((ELEVATION_MAX + 1) * 3)
  for (let i = 0; i < ELEVATION_STOPS.length - 1; i++) {
    const [h0, c0] = ELEVATION_STOPS[i]
    const [h1, c1] = ELEVATION_STOPS[i + 1]
    const a = hex(c0)
    const b = hex(c1)
    for (let h = h0; h <= h1; h++) {
      const t = (h - h0) / (h1 - h0)
      for (let k = 0; k < 3; k++) lut[h * 3 + k] = a[k] + (b[k] - a[k]) * t
    }
  }
  return lut
}

/** CSS gradient cho chú giải (dưới thấp → trên cao) */
export function elevationGradient(direction = 'to top'): string {
  return `linear-gradient(${direction}, ${ELEVATION_STOPS.map(([h, c]) => `${c} ${((h / ELEVATION_MAX) * 100).toFixed(1)}%`).join(', ')})`
}
