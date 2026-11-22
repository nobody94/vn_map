import 'leaflet/dist/leaflet.css'
import { Suspense, use, useEffect, useState } from 'react'
import { VietnamMap } from '../components/map/VietnamMap'
import { ProvincePanel } from '../components/panel/ProvincePanel'
import { MountainPanel } from '../components/panel/MountainPanel'
import { RiverPanel } from '../components/panel/RiverPanel'
import { SearchBox } from '../components/controls/SearchBox'
import { RegionLegend } from '../components/controls/RegionLegend'
import { HomeButton } from '../components/controls/HomeButton'
import { LayerSwitcher, type MapLayers } from '../components/controls/LayerSwitcher'
import { PROVINCE_BY_CODE } from '../data/provinceMeta'
import { loadProvinceDetail, prefetchProvinceDetails } from '../data/provinceDetails'
import { loadMedia, prefetchMedia } from '../data/media'
import type { RegionId } from '../data/regions'
import { MOUNTAIN_BY_ID, type Mountain } from '../data/mountains'
import { RIVER_BY_ID, type River } from '../data/rivers'
import type { UnitMatch } from '../utils/search'
import type { ProvinceMeta } from '../types/province'
import styles from './GeoPage.module.css'

type ProvincePanelProps = { meta: ProvinceMeta; onClose: () => void; focusUnit?: UnitMatch }

/** Đọc chi tiết tỉnh (tải theo miền) + dữ liệu ảnh; Suspense bên ngoài hiện panel "Đang tải…" trong lúc chờ */
function ProvincePanelWithDetail(props: ProvincePanelProps) {
  // Gọi cả hai trước khi use() để tải song song
  const detailP = loadProvinceDetail(props.meta.code)
  const mediaP = loadMedia()
  const detail = use(detailP)
  use(mediaP)
  return <ProvincePanel {...props} detail={detail} />
}

type MountainPanelProps = { mountain: Mountain; onClose: () => void; onOpenProvince: (code: number) => void }
type RiverPanelProps = { river: River; onClose: () => void; onOpenProvince: (code: number) => void }

/** Panel núi/sông chờ dữ liệu ảnh; fallback là chính panel đó (chưa có ảnh Wikimedia) */
function MountainPanelWithMedia(props: MountainPanelProps) {
  use(loadMedia())
  return <MountainPanel {...props} />
}
function RiverPanelWithMedia(props: RiverPanelProps) {
  use(loadMedia())
  return <RiverPanel {...props} />
}

/** Đối tượng đang chọn: một tỉnh, một ngọn núi hoặc một con sông (loại trừ nhau) */
type Selection =
  | { kind: 'province'; code: number; unit?: UnitMatch }
  | { kind: 'mountain'; id: string } | { kind: 'river'; id: string } | null

/** Trang Địa lý: bản đồ 34 tỉnh, địa hình, núi, sông */
export default function GeoPage() {
  const [selection, setSelection] = useState<Selection>(null)
  const [highlightRegion, setHighlightRegion] = useState<RegionId | null>(null)
  const [layers, setLayers] = useState<MapLayers>({ terrain: false, peaks: false, rivers: false })

  const selectedCode = selection?.kind === 'province' ? selection.code : null
  const selectedMountainId = selection?.kind === 'mountain' ? selection.id : null
  const selectedRiverId = selection?.kind === 'river' ? selection.id : null
  const province = selectedCode != null ? PROVINCE_BY_CODE.get(selectedCode) : undefined
  const mountain = selectedMountainId != null ? MOUNTAIN_BY_ID.get(selectedMountainId) : undefined
  const river = selectedRiverId != null ? RIVER_BY_ID.get(selectedRiverId) : undefined
  const panelOpen = selection != null

  useEffect(() => {
    prefetchProvinceDetails()
    prefetchMedia()
  }, [])

  /** null (bấm ra biển, nút đóng) bỏ mọi lựa chọn */
  const selectProvince = (code: number | null) => setSelection(code == null ? null : { kind: 'province', code })
  const selectMountain = (id: string) => setSelection({ kind: 'mountain', id })
  const selectRiver = (id: string) => setSelection({ kind: 'river', id })
  const close = () => setSelection(null)

  return (
    <main className={styles.app}>
      <VietnamMap
        selectedCode={selectedCode}
        onSelect={selectProvince}
        highlightRegion={highlightRegion}
        layers={layers}
        selectedMountainId={selectedMountainId}
        onSelectMountain={selectMountain}
        selectedRiverId={selectedRiverId}
        onSelectRiver={selectRiver}
      />

      <LayerSwitcher
        layers={layers}
        onToggle={(key) => setLayers((l) => ({ ...l, [key]: !l[key] }))}
        panelOpen={panelOpen}
      />

      <header className={styles.header}>
        <div className={styles.titleRow}>
          <HomeButton />
          <h1 className={styles.title}>Bản đồ Việt Nam</h1>
        </div>
        <p className={styles.subtitle}>34 tỉnh, thành phố · từ 01/07/2025</p>
        <SearchBox onSelect={(code, unit) => setSelection({ kind: 'province', code, unit })} />
      </header>

      <RegionLegend
        onHighlight={setHighlightRegion}
        hiddenOnMobile={panelOpen}
      />

      {province && (
        <Suspense fallback={<ProvincePanel meta={province} detail={undefined} loading onClose={close} />}>
          <ProvincePanelWithDetail
            meta={province}
            onClose={close}
            focusUnit={selection?.kind === 'province' ? selection.unit : undefined}
          />
        </Suspense>
      )}
      {mountain && (
        <Suspense fallback={<MountainPanel mountain={mountain} onClose={close} onOpenProvince={selectProvince} />}>
          <MountainPanelWithMedia mountain={mountain} onClose={close} onOpenProvince={selectProvince} />
        </Suspense>
      )}
      {river && (
        <Suspense fallback={<RiverPanel river={river} onClose={close} onOpenProvince={selectProvince} />}>
          <RiverPanelWithMedia river={river} onClose={close} onOpenProvince={selectProvince} />
        </Suspense>
      )}
    </main>
  )
}

