import { useEffect, useRef } from 'react'
import { GeoJSON, Pane, useMap } from 'react-leaflet'
import L from 'leaflet'
import type { Feature, FeatureCollection, MultiLineString, MultiPolygon } from 'geojson'
import { useGeoData } from '../../hooks/useGeoData'
import { RIVER_BY_ID } from '../../data/rivers'
import { formatInt } from '../../utils/format'
import { panelPadding } from '../../utils/mapPadding'
import { clipLinesToArea } from '../../utils/clipLines'
import styles from './RiverLayer.module.css'

type RiverFeature = Feature<MultiLineString, { id: string }>
type RiverCollection = FeatureCollection<MultiLineString, { id: string }>

interface Props {
  selectedId: string | null
  onSelect: (id: string) => void
  /** Tỉnh đang chọn: chỉ vẽ phần sông nằm trong tỉnh này */
  area: { code: number; geometry: MultiPolygon } | null
}

/** Sông chính vẽ đậm hơn */
const MAJOR = new Set(['hong', 'da', 'ma', 'ca', 'dong-nai', 'tien', 'hau'])
const COLOR = '#2b7bb9'
const COLOR_STRONG = '#0b4f8a'

const ATTRIBUTION = 'Sông: &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a>'

function lineStyle(id: string, selectedId: string | null, hovered: boolean): L.PathOptions {
  // Sông chính lớn đậm nhất, sông nhỏ (minor) mảnh nhất
  const base = MAJOR.has(id) ? 2.6 : RIVER_BY_ID.get(id)?.minor ? 1.2 : 1.8
  const selected = id === selectedId
  return {
    color: selected || hovered ? COLOR_STRONG : COLOR,
    weight: selected ? base + 2.4 : hovered ? base + 1.4 : base,
    opacity: selectedId && !selected ? 0.55 : 0.95,
    lineCap: 'round',
    lineJoin: 'round',
  }
}

function tooltipHtml(id: string): string {
  const r = RIVER_BY_ID.get(id)
  if (!r) return id
  return `<b>${r.name}</b>${r.lengthKm ? ` — ${formatInt(r.lengthKm)} km` : ''}`
}

/** Lớp sông ngòi: đường nhìn thấy + đường trong suốt rộng để dễ bấm */
export function RiverLayer({ selectedId, onSelect, area }: Props) {
  const map = useMap()
  const geo = useGeoData<RiverCollection>('geo/rivers.geojson')
  const visualRef = useRef<L.GeoJSON | null>(null)
  const selectedRef = useRef(selectedId)
  const onSelectRef = useRef(onSelect)

  useEffect(() => {
    onSelectRef.current = onSelect
  }, [onSelect])

  /** Đặt style cho đường nhìn thấy của một sông */
  const restyle = (id: string, hovered: boolean) => {
    visualRef.current?.eachLayer((layer) => {
      const path = layer as L.Polyline & { feature?: RiverFeature }
      if (path.feature?.properties.id === id) path.setStyle(lineStyle(id, selectedRef.current, hovered))
    })
  }

  // Đổi sông chọn: tô lại tất cả và bay tới sông đó
  useEffect(() => {
    selectedRef.current = selectedId
    visualRef.current?.eachLayer((layer) => {
      const path = layer as L.Polyline & { feature?: RiverFeature }
      const id = path.feature?.properties.id
      if (!id) return
      path.setStyle(lineStyle(id, selectedId, false))
      if (id === selectedId) {
        path.bringToFront()
        map.flyToBounds(path.getBounds(), { ...panelPadding(), maxZoom: 9, duration: 0.6 })
      }
    })
  }, [selectedId, map, geo.status])

  if (geo.status !== 'ready') return null

  // Đang chọn tỉnh → cắt sông theo ranh giới tỉnh, bỏ sông không chảy qua
  const data: RiverCollection = area
    ? {
        type: 'FeatureCollection',
        features: geo.data.features.flatMap((f) => {
          const geometry = clipLinesToArea(f.geometry, area.geometry)
          return geometry ? [{ ...f, geometry }] : []
        }),
      }
    : geo.data
  // GeoJSON của react-leaflet không tự cập nhật khi đổi data → dựng lại theo key
  const key = area ? `p${area.code}` : 'all'

  return (
    // Pane riêng nằm trên lớp tỉnh (overlayPane 400), để tỉnh đang chọn không che sông
    <Pane name="rivers" style={{ zIndex: 450 }}>
      <GeoJSON
        key={`v-${key}`}
        ref={visualRef}
        data={data}
        attribution={ATTRIBUTION}
        interactive={false}
        style={(f) => lineStyle((f as RiverFeature).properties.id, selectedRef.current, false)}
      />
      <GeoJSON
        key={`h-${key}`}
        data={data}
        style={{ color: '#000', opacity: 0, weight: 14 }}
        onEachFeature={(feature: RiverFeature, layer) => {
          const id = feature.properties.id
          const path = layer as L.Path
          path.bindTooltip(tooltipHtml(id), { sticky: true, direction: 'top', offset: [0, -6], className: styles.tooltip })
          path.on({
            mouseover: () => restyle(id, true),
            mouseout: () => restyle(id, false),
            click: (e: L.LeafletMouseEvent) => {
              L.DomEvent.stopPropagation(e)
              onSelectRef.current(id)
            },
          })
        }}
      />
    </Pane>
  )
}
