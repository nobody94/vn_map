import { MapContainer } from 'react-leaflet'
import type { LatLngBoundsExpression } from 'leaflet'
import { useGeoData } from '../../hooks/useGeoData'
import type { ProvinceCollection } from '../../types/province'
import type { RegionId } from '../../data/regions'
import { ProvinceLayer } from './ProvinceLayer'
import { IslandsLayer } from './IslandsLayer'
import styles from './VietnamMap.module.css'

interface Props {
  selectedCode: number | null
  onSelect: (code: number | null) => void
  colorByRegion: boolean
  highlightRegion: RegionId | null
}

/** Khung nhìn ban đầu: toàn bộ đất liền + Hoàng Sa, Trường Sa */
const INITIAL_BOUNDS: LatLngBoundsExpression = [
  [8.0, 102.1],
  [23.4, 115.0],
]
const MAX_BOUNDS: LatLngBoundsExpression = [
  [-6.0, 88.0],
  [33.0, 128.0],
]

export function VietnamMap({ selectedCode, onSelect, colorByRegion, highlightRegion }: Props) {
  const geo = useGeoData<ProvinceCollection>('geo/provinces.geojson')

  return (
    <div className={styles.wrap}>
      <MapContainer
        className={styles.map}
        bounds={INITIAL_BOUNDS}
        maxBounds={MAX_BOUNDS}
        minZoom={5}
        maxZoom={12}
        zoomSnap={0.25}
        zoomControl={false}
        attributionControl
      >
        {geo.status === 'ready' && (
          <ProvinceLayer
            data={geo.data}
            selectedCode={selectedCode}
            onSelect={onSelect}
            colorByRegion={colorByRegion}
            highlightRegion={highlightRegion}
          />
        )}
        <IslandsLayer onSelect={onSelect} />
      </MapContainer>

      {geo.status === 'loading' && <div className={styles.status}>Đang tải bản đồ…</div>}
      {geo.status === 'error' && (
        <div className={`${styles.status} ${styles.error}`}>Không tải được dữ liệu bản đồ ({geo.error})</div>
      )}
    </div>
  )
}
