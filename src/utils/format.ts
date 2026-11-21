const intFmt = new Intl.NumberFormat('vi-VN', { maximumFractionDigits: 0 })
const decFmt = new Intl.NumberFormat('vi-VN', { maximumFractionDigits: 2 })

export const formatInt = (n: number) => intFmt.format(n)
export const formatDec = (n: number) => decFmt.format(n)

/** 14002598 → "14,0 triệu" */
export function formatPopulation(n: number): string {
  if (n >= 1_000_000) return `${decFmt.format(Math.round(n / 100_000) / 10)} triệu`
  return intFmt.format(n)
}
