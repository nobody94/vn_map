import { Fragment } from 'react'
import { Circle, Marker } from 'react-leaflet'
import L from 'leaflet'
import type { LatLngExpression, PathOptions } from 'leaflet'
import { HOANG_SA_PROVINCE, TRUONG_SA_PROVINCE } from '../../data/provinceMeta'
import styles from './IslandsLayer.module.css'

interface Props {
  onSelect: (code: number) => void
}

interface Archipelago {
  name: string
  owner: string
  provinceCode: number
  center: LatLngExpression
  radiusM: number
}

const ARCHIPELAGOS: Archipelago[] = [
  { name: 'Quần đảo Hoàng Sa', owner: 'Đà Nẵng', provinceCode: HOANG_SA_PROVINCE, center: [16.5, 112.0], radiusM: 110_000 },
  { name: 'Quần đảo Trường Sa', owner: 'Khánh Hòa', provinceCode: TRUONG_SA_PROVINCE, center: [9.6, 113.6], radiusM: 260_000 },
]

const ringStyle: PathOptions = {
  color: '#0f766e',
  weight: 1,
  dashArray: '4 4',
  fillColor: '#0f766e',
  fillOpacity: 0.04,
}

const label = (a: Archipelago) =>
  L.divIcon({
    className: styles.label,
    html: `<span class="${styles.name}">${a.name}</span><span class="${styles.owner}">(${a.owner})</span>`,
    iconSize: [160, 36],
    iconAnchor: [80, 18],
  })

const seaLabel = L.divIcon({ className: styles.sea, html: 'Biển Đông', iconSize: [120, 24], iconAnchor: [60, 12] })

/** Hoàng Sa, Trường Sa và nhãn Biển Đông (dữ liệu ranh giới tỉnh không bao gồm hai quần đảo) */
export function IslandsLayer({ onSelect }: Props) {
  return (
    <>
      <Marker position={[13.2, 112.6]} icon={seaLabel} interactive={false} />
      {ARCHIPELAGOS.map((a) => {
        const handlers = {
          click: (e: L.LeafletMouseEvent) => {
            L.DomEvent.stopPropagation(e)
            onSelect(a.provinceCode)
          },
        }
        return (
          <Fragment key={a.name}>
            <Circle center={a.center} radius={a.radiusM} pathOptions={ringStyle} eventHandlers={handlers} />
            <Marker position={a.center} icon={label(a)} eventHandlers={handlers} />
          </Fragment>
        )
      })}
    </>
  )
}
