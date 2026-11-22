import { MapContainer, TileLayer } from 'react-leaflet'
import type { LatLngBoundsExpression } from 'leaflet'
import { useGeoData } from '../../hooks/useGeoData'
import type { ProvinceCollection } from '../../types/province'
import type { RegionId } from '../../data/regions'
import { ProvinceLayer } from './ProvinceLayer'
import { IslandsLayer } from './IslandsLayer'
import { MountainLayer } from './MountainLayer'
import { RiverLayer } from './RiverLayer'
import { ElevationLayer } from './ElevationLayer'
import type { MapLayers } from '../controls/LayerSwitcher'
import styles from './VietnamMap.module.css'

interface Props {
  selectedCode: number | null
  onSelect: (code: number | null) => void
  highlightRegion: RegionId | null
  layers: MapLayers
  selectedMountainId: string | null
  onSelectMountain: (id: string) => void
  selectedRiverId: string | null
  onSelectRiver: (id: string) => void
}

/** Nền đổ bóng địa hình không có nhãn chữ (tránh nhãn tên địa danh nước ngoài) */
const RELIEF_URL = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}'
const RELIEF_ATTRIBUTION = 'Địa hình: &copy; <a href="https://www.esri.com" target="_blank" rel="noreferrer">Esri</a>'

/** Khung nhìn ban đầu: toàn bộ đất liền + Hoàng Sa, Trường Sa */
const INITIAL_BOUNDS: LatLngBoundsExpression = [
  [8.0, 102.1],
  [23.4, 115.0],
]
const MAX_BOUNDS: LatLngBoundsExpression = [
  [-6.0, 88.0],
  [33.0, 128.0],
]

export function VietnamMap({
  selectedCode,
  onSelect,
  highlightRegion,
  layers,
  selectedMountainId,
  onSelectMountain,
  selectedRiverId,
  onSelectRiver,
}: Props) {
  const geo = useGeoData<ProvinceCollection>('geo/provinces.geojson')
  const selectedFeature =
    selectedCode != null && geo.status === 'ready' ? geo.data.features.find((f) => f.properties.code === selectedCode) : undefined
  const riverArea = selectedFeature ? { code: selectedCode!, geometry: selectedFeature.geometry } : null

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
        {/* Địa hình = màu theo độ cao (trong lãnh thổ) + đổ bóng Esri nhân lên trên để thấy khối núi */}
        {layers.terrain && geo.status === 'ready' && <ElevationLayer provinces={geo.data} />}
        {layers.terrain && (
          <TileLayer url={RELIEF_URL} attribution={RELIEF_ATTRIBUTION} maxNativeZoom={13} zIndex={2} className={styles.relief} />
        )}
        {geo.status === 'ready' && (
          <ProvinceLayer
            data={geo.data}
            selectedCode={selectedCode}
            onSelect={onSelect}
            highlightRegion={highlightRegion}
            terrain={layers.terrain}
          />
        )}
        {layers.rivers && <RiverLayer selectedId={selectedRiverId} onSelect={onSelectRiver} area={riverArea} />}
        <IslandsLayer onSelect={onSelect} />
        {layers.peaks && <MountainLayer selectedId={selectedMountainId} onSelect={onSelectMountain} />}
      </MapContainer>

      {geo.status === 'loading' && <div className={styles.status}>Đang tải bản đồ…</div>}
      {geo.status === 'error' && (
        <div className={`${styles.status} ${styles.error}`}>Không tải được dữ liệu bản đồ ({geo.error})</div>
      )}
    </div>
  )
}
