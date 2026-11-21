import { useEffect, useRef } from 'react'
import { GeoJSON, useMap, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import type { Feature, MultiPolygon } from 'geojson'
import type { PathOptions } from 'leaflet'
import { PROVINCE_BY_CODE } from '../../data/provinceMeta'
import { PROVINCE_REGION, regionOf, type RegionId } from '../../data/regions'
import type { ProvinceCollection, ProvinceFeatureProps } from '../../types/province'
import styles from './ProvinceLayer.module.css'

type ProvinceFeature = Feature<MultiPolygon, ProvinceFeatureProps>

interface Props {
  data: ProvinceCollection
  selectedCode: number | null
  onSelect: (code: number | null) => void
  colorByRegion: boolean
  /** Vùng được làm nổi (rê chuột trên chú giải); các vùng khác mờ đi */
  highlightRegion: RegionId | null
}

interface ViewState {
  selected: number | null
  colorByRegion: boolean
  highlight: RegionId | null
}

const ACCENT = '#0f766e'

const ATTRIBUTION =
  'Ranh giới: <a href="https://github.com/ThangLeQuoc/vietnamese-provinces-database" target="_blank" rel="noreferrer">vietnamese-provinces-database</a> (MIT)'

const BORDER = '#b6c2cf'

/** Style của một tỉnh theo trạng thái hiện tại (chọn / rê chuột / tô màu vùng / làm nổi vùng) */
function styleFor(code: number, v: ViewState, hovered = false): PathOptions {
  const region = v.colorByRegion ? regionOf(code) : undefined
  const dimmed = v.highlight != null && PROVINCE_REGION[code] !== v.highlight
  const selected = code === v.selected
  const fill = region ? (selected || hovered ? region.strong : region.fill) : selected ? '#a7dcd4' : hovered ? '#d5efeb' : '#ffffff'
  return {
    color: selected || hovered ? ACCENT : region ? '#ffffff' : BORDER,
    weight: selected ? 2 : hovered ? 1.5 : region ? 1 : 0.8,
    fillColor: fill,
    fillOpacity: dimmed ? 0.3 : 1,
  }
}

/** Chừa chỗ cho ProvincePanel: bên phải trên desktop, phía dưới trên điện thoại */
function panelPadding(): L.FitBoundsOptions {
  const w = window.innerWidth
  // 150px phía trên: chừa chỗ cho khung tiêu đề + ô tìm kiếm
  if (w <= 768) return { paddingTopLeft: [24, 150], paddingBottomRight: [24, window.innerHeight * 0.62 + 16] }
  return { paddingTopLeft: [48, 150], paddingBottomRight: [Math.min(400, w - 32) + 48, 48] }
}

/**
 * Khung để zoom tới: bỏ qua các đảo nhỏ ở xa (vd. Côn Đảo của TP.HCM) để tỉnh hiện to, rõ.
 * Chỉ giữ các mảnh có khung bao ≥ 5% mảnh lớn nhất.
 */
function focusBounds(polygon: L.Polygon): L.LatLngBounds {
  const parts = (polygon.getLatLngs() as L.LatLng[][][]).map((rings) => L.latLngBounds(rings[0]))
  const size = (b: L.LatLngBounds) => (b.getNorth() - b.getSouth()) * (b.getEast() - b.getWest())
  const maxSize = Math.max(...parts.map(size))
  return parts
    .filter((b) => size(b) >= maxSize * 0.05)
    .reduce((acc, b) => acc.extend(b), L.latLngBounds([]))
}

function tooltipHtml(code: number): string {
  const meta = PROVINCE_BY_CODE.get(code)
  if (!meta) return `#${code}`
  const merged = meta.mergedFrom.length
    ? `<div class="${styles.tooltipSub}">Gồm: ${meta.mergedFrom.join(', ')}</div>`
    : `<div class="${styles.tooltipSub}">Giữ nguyên, không sáp nhập</div>`
  const region = regionOf(code)
  return `<div class="${styles.tooltipKind}">${meta.kind}${region ? ` · ${region.name}` : ''}</div><div class="${styles.tooltipName}">${meta.name}</div>${merged}`
}

export function ProvinceLayer({ data, selectedCode, onSelect, colorByRegion, highlightRegion }: Props) {
  const map = useMap()
  const geoRef = useRef<L.GeoJSON | null>(null)
  const viewRef = useRef<ViewState>({ selected: selectedCode, colorByRegion, highlight: highlightRegion })
  const onSelectRef = useRef(onSelect)

  useEffect(() => {
    onSelectRef.current = onSelect
  }, [onSelect])

  // Tô lại toàn bộ khi đổi tỉnh chọn / bật tắt màu vùng / làm nổi vùng
  useEffect(() => {
    const v: ViewState = { selected: selectedCode, colorByRegion, highlight: highlightRegion }
    viewRef.current = v
    geoRef.current?.eachLayer((layer) => {
      const path = layer as L.Path & { feature?: ProvinceFeature }
      const code = path.feature?.properties.code
      if (code != null) path.setStyle(styleFor(code, v))
    })
  }, [selectedCode, colorByRegion, highlightRegion])

  // Zoom tới tỉnh vừa chọn
  useEffect(() => {
    geoRef.current?.eachLayer((layer) => {
      const path = layer as L.Polygon & { feature?: ProvinceFeature }
      if (path.feature?.properties.code !== selectedCode) return
      path.bringToFront()
      map.flyToBounds(focusBounds(path), { ...panelPadding(), maxZoom: 9, duration: 0.6 })
    })
  }, [selectedCode, map])

  // Bấm ra vùng biển / ngoài tỉnh để bỏ chọn
  useMapEvents({ click: () => onSelectRef.current(null) })

  return (
    <GeoJSON
      ref={geoRef}
      data={data}
      attribution={ATTRIBUTION}
      style={(f) => styleFor((f as ProvinceFeature).properties.code, viewRef.current)}
      onEachFeature={(feature: ProvinceFeature, layer) => {
        const code = feature.properties.code
        const path = layer as L.Path
        path.bindTooltip(tooltipHtml(code), { sticky: true, direction: 'top', offset: [0, -8], className: styles.tooltip })
        path.on({
          mouseover: () => {
            if (code !== viewRef.current.selected) path.setStyle(styleFor(code, viewRef.current, true))
          },
          mouseout: () => path.setStyle(styleFor(code, viewRef.current)),
          click: (e: L.LeafletMouseEvent) => {
            L.DomEvent.stopPropagation(e)
            onSelectRef.current(code)
          },
        })
      }}
    />
  )
}
