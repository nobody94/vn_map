import { useState } from 'react'
import { VietnamMap } from './components/map/VietnamMap'
import { ProvincePanel } from './components/panel/ProvincePanel'
import { SearchBox } from './components/controls/SearchBox'
import { RegionLegend } from './components/controls/RegionLegend'
import { PROVINCE_BY_CODE } from './data/provinceMeta'
import { PROVINCE_DETAILS } from './data/provinceDetails'
import type { RegionId } from './data/regions'
import styles from './App.module.css'

function App() {
  const [selectedCode, setSelectedCode] = useState<number | null>(null)
  const [colorByRegion, setColorByRegion] = useState(true)
  const [highlightRegion, setHighlightRegion] = useState<RegionId | null>(null)
  const selected = selectedCode != null ? PROVINCE_BY_CODE.get(selectedCode) : undefined

  return (
    <main className={styles.app}>
      <VietnamMap
        selectedCode={selectedCode}
        onSelect={setSelectedCode}
        colorByRegion={colorByRegion}
        highlightRegion={highlightRegion}
      />

      <header className={styles.header}>
        <h1 className={styles.title}>Bản đồ Việt Nam</h1>
        <p className={styles.subtitle}>34 tỉnh, thành phố · từ 01/07/2025</p>
        <SearchBox onSelect={setSelectedCode} />
      </header>

      <RegionLegend
        colorByRegion={colorByRegion}
        onToggle={(on) => {
          setColorByRegion(on)
          setHighlightRegion(null)
        }}
        onHighlight={setHighlightRegion}
        hiddenOnMobile={selected != null}
      />

      {selected && (
        <ProvincePanel
          meta={selected}
          detail={PROVINCE_DETAILS[selected.code]}
          onClose={() => setSelectedCode(null)}
        />
      )}
    </main>
  )
}

export default App
