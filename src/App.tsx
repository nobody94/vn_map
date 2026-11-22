import { useState } from 'react'
import { VietnamMap } from './components/map/VietnamMap'
import { ProvincePanel } from './components/panel/ProvincePanel'
import { MountainPanel } from './components/panel/MountainPanel'
import { RiverPanel } from './components/panel/RiverPanel'
import { SearchBox } from './components/controls/SearchBox'
import { RegionLegend } from './components/controls/RegionLegend'
import { LayerSwitcher, type MapLayers } from './components/controls/LayerSwitcher'
import { PROVINCE_BY_CODE } from './data/provinceMeta'
import { PROVINCE_DETAILS } from './data/provinceDetails'
import type { RegionId } from './data/regions'
import { MOUNTAIN_BY_ID } from './data/mountains'
import { RIVER_BY_ID } from './data/rivers'
import type { UnitMatch } from './utils/search'
import styles from './App.module.css'

/** Đối tượng đang chọn: một tỉnh, một ngọn núi hoặc một con sông (loại trừ nhau) */
type Selection =
  | { kind: 'province'; code: number; unit?: UnitMatch }
  | { kind: 'mountain'; id: string } | { kind: 'river'; id: string } | null

function App() {
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
        <h1 className={styles.title}>Bản đồ Việt Nam</h1>
        <p className={styles.subtitle}>34 tỉnh, thành phố · từ 01/07/2025</p>
        <SearchBox onSelect={(code, unit) => setSelection({ kind: 'province', code, unit })} />
      </header>

      <RegionLegend
        onHighlight={setHighlightRegion}
        hiddenOnMobile={panelOpen}
      />

      {province && (
        <ProvincePanel
          meta={province}
          detail={PROVINCE_DETAILS[province.code]}
          onClose={close}
          focusUnit={selection?.kind === 'province' ? selection.unit : undefined}
        />
      )}
      {mountain && <MountainPanel mountain={mountain} onClose={close} onOpenProvince={selectProvince} />}
      {river && <RiverPanel river={river} onClose={close} onOpenProvince={selectProvince} />}
    </main>
  )
}

export default App
