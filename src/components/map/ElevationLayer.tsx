import { useEffect } from 'react'
import { useMap } from 'react-leaflet'
import L from 'leaflet'
import type { Position } from 'geojson'
import type { ProvinceCollection } from '../../types/province'
import { buildElevationLut, ELEVATION_MAX } from '../../data/elevation'
import styles from './ElevationLayer.module.css'

/**
 * Ảnh độ cao Terrarium (AWS Terrain Tiles, miễn phí, không cần key, cho phép CORS):
 * độ cao = R·256 + G + B/256 − 32768 (m). Nguồn gốc dữ liệu: SRTM, ETOPO1… (Mapzen).
 */
const TERRARIUM_URL = 'https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png'
const ATTRIBUTION =
  'Độ cao: <a href="https://github.com/tilezen/joerd/blob/master/docs/attribution.md" target="_blank" rel="noreferrer">Mapzen / AWS Terrain Tiles</a>'

interface Props {
  /** Ranh giới các tỉnh: chỉ tô màu bên trong lãnh thổ */
  provinces: ProvinceCollection
}

/** Đa giác (các vòng) kèm khung bao, để bỏ nhanh đa giác không chạm ô ảnh */
interface ClipPoly {
  rings: Position[][]
  minLng: number
  minLat: number
  maxLng: number
  maxLat: number
}

function toClipPolys(provinces: ProvinceCollection): ClipPoly[] {
  const out: ClipPoly[] = []
  for (const f of provinces.features)
    for (const poly of f.geometry.coordinates) {
      let [minLng, minLat, maxLng, maxLat] = [Infinity, Infinity, -Infinity, -Infinity]
      for (const [lng, lat] of poly[0]) {
        minLng = Math.min(minLng, lng)
        maxLng = Math.max(maxLng, lng)
        minLat = Math.min(minLat, lat)
        maxLat = Math.max(maxLat, lat)
      }
      out.push({ rings: poly, minLng, minLat, maxLng, maxLat })
    }
  return out
}

/** Lớp tô màu theo độ cao (hypsometric tint), vẽ bằng canvas từ ảnh Terrarium */
export function ElevationLayer({ provinces }: Props) {
  const map = useMap()

  useEffect(() => {
    const lut = buildElevationLut()
    const polys = toClipPolys(provinces)

    const Layer = L.GridLayer.extend({
      createTile(coords: L.Coords, done: L.DoneCallback) {
        const tile = document.createElement('canvas')
        const size = this.getTileSize() as L.Point
        tile.width = size.x
        tile.height = size.y

        // Đường ranh giới các tỉnh chạm ô này (tọa độ pixel trong ô)
        const origin = coords.scaleBy(size)
        const nw = map.unproject(origin, coords.z)
        const se = map.unproject(origin.add(size), coords.z)
        const path = new Path2D()
        let hit = false
        for (const p of polys) {
          if (p.maxLng < nw.lng || p.minLng > se.lng || p.maxLat < se.lat || p.minLat > nw.lat) continue
          hit = true
          for (const ring of p.rings) {
            ring.forEach(([lng, lat], j) => {
              const pt = map.project([lat, lng], coords.z).subtract(origin)
              if (j === 0) path.moveTo(pt.x, pt.y)
              else path.lineTo(pt.x, pt.y)
            })
            path.closePath()
          }
        }
        // Ô nằm ngoài lãnh thổ: để trống, không tải ảnh
        if (!hit) {
          setTimeout(() => done(undefined, tile))
          return tile
        }

        const img = new Image()
        img.crossOrigin = 'anonymous'
        img.onload = () => {
          const ctx = tile.getContext('2d', { willReadFrequently: true })
          if (!ctx) return done(new Error('no canvas'), tile)
          ctx.drawImage(img, 0, 0, size.x, size.y)
          const px = ctx.getImageData(0, 0, size.x, size.y)
          const d = px.data
          for (let i = 0; i < d.length; i += 4) {
            const h = d[i] * 256 + d[i + 1] + d[i + 2] / 256 - 32768
            const k = Math.max(0, Math.min(ELEVATION_MAX, Math.round(h))) * 3
            d[i] = lut[k]
            d[i + 1] = lut[k + 1]
            d[i + 2] = lut[k + 2]
            d[i + 3] = 255
          }
          ctx.putImageData(px, 0, 0)

          // Chỉ giữ phần trong lãnh thổ: tô ranh giới các tỉnh bằng destination-in
          ctx.globalCompositeOperation = 'destination-in'
          ctx.fill(path, 'evenodd')
          done(undefined, tile)
        }
        img.onerror = () => done(new Error('tile error'), tile)
        img.src = L.Util.template(TERRARIUM_URL, coords)
        return tile
      },
    })

    // Kiểu của L.GridLayer.extend không khai báo tham số constructor
    const LayerClass = Layer as unknown as new (options: L.GridLayerOptions) => L.GridLayer
    const layer = new LayerClass({ attribution: ATTRIBUTION, className: styles.elevation, maxNativeZoom: 12, zIndex: 1, opacity: 0.9 })
    layer.addTo(map)
    return () => {
      layer.remove()
    }
  }, [map, provinces])

  return null
}
