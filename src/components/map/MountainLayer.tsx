import { useEffect } from 'react'
import { Marker, useMap, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import { MOUNTAINS, TERRAIN_LABELS, type Mountain, type TerrainLabel } from '../../data/mountains'
import { formatInt } from '../../utils/format'
import { panelPadding } from '../../utils/mapPadding'
import styles from './MountainLayer.module.css'

interface Props {
  selectedId: string | null
  onSelect: (id: string) => void
}

/** Từ mức zoom này nhãn tên + độ cao của mọi đỉnh mới hiện (trước đó chỉ hiện đỉnh nổi bật) */
const LABEL_ZOOM = 7

const makePeakIcon = (m: Mountain, selected: boolean) => {
  const major = m.heightM >= 2400
  return L.divIcon({
    className: [styles.peak, major && styles.major, m.featured && styles.featured, selected && styles.selected]
      .filter(Boolean)
      .join(' '),
    html:
      `<svg viewBox="0 0 12 10" aria-hidden="true"><path d="M6 0L12 10H0z"/></svg>` +
      `<span class="${styles.label}"><b>${m.name}</b> ${formatInt(m.heightM)} m</span>`,
    iconSize: [12, 10],
    iconAnchor: [6, 10],
  })
}

/** Tạo sẵn icon thường / đang chọn cho mỗi đỉnh (tránh tạo lại mỗi lần render) */
const PEAK_ICONS = new Map(MOUNTAINS.map((m) => [m.id, { normal: makePeakIcon(m, false), selected: makePeakIcon(m, true) }]))

const terrainIcon = (t: TerrainLabel) =>
  L.divIcon({
    className: `${styles.terrain} ${t.kind === 'range' ? styles.range : styles.plateau}`,
    html: `<span style="transform: translate(-50%, -50%) rotate(${t.rotate}deg)">${t.name}</span>`,
    iconSize: [0, 0],
  })

/** Bật/tắt nhãn theo mức zoom bằng class trên khung bản đồ (không cần render lại marker) */
function syncZoomClass(map: L.Map) {
  const c = map.getContainer()
  c.classList.toggle(styles.showLabels, map.getZoom() >= LABEL_ZOOM)
  c.classList.toggle(styles.showPlateaus, map.getZoom() >= 6.5)
  c.classList.toggle(styles.hideTerrainLabels, map.getZoom() >= 10)
}

function tooltip(m: Mountain): string {
  const extra = [m.note, m.range && `Dãy ${m.range}`].filter(Boolean).join(' · ')
  return `<b>${m.name}</b> — ${formatInt(m.heightM)} m${extra ? `<br><span>${extra}</span>` : ''}`
}

/** Lớp đỉnh núi (tam giác) và nhãn dãy núi / cao nguyên */
export function MountainLayer({ selectedId, onSelect }: Props) {
  const map = useMap()

  // Bay tới đỉnh vừa chọn (chừa chỗ cho panel)
  useEffect(() => {
    const m = MOUNTAINS.find((x) => x.id === selectedId)
    if (m) map.flyToBounds(L.latLng(m.lat, m.lng).toBounds(15000), { ...panelPadding(), maxZoom: 10, duration: 0.6 })
  }, [selectedId, map])

  useMapEvents({ zoomend: () => syncZoomClass(map) })
  useEffect(() => {
    syncZoomClass(map)
    const c = map.getContainer()
    return () => c.classList.remove(styles.showLabels, styles.showPlateaus, styles.hideTerrainLabels)
  }, [map])

  return (
    <>
      {TERRAIN_LABELS.map((t) => (
        <Marker key={t.name} position={[t.lat, t.lng]} icon={terrainIcon(t)} interactive={false} />
      ))}
      {MOUNTAINS.map((m) => (
        <Marker
          key={m.id}
          position={[m.lat, m.lng]}
          icon={m.id === selectedId ? PEAK_ICONS.get(m.id)!.selected : PEAK_ICONS.get(m.id)!.normal}
          zIndexOffset={m.id === selectedId ? 10000 : m.heightM}
          eventHandlers={{
            add: (e) => (e.target as L.Marker).bindTooltip(tooltip(m), { direction: 'top', offset: [0, -10], className: styles.tooltip }),
            click: (e) => {
              L.DomEvent.stopPropagation(e)
              onSelect(m.id)
            },
          }}
        />
      ))}
    </>
  )
}
