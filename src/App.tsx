import { lazy, Suspense, useEffect } from 'react'
import { HomePage } from './pages/HomePage'
import { useRoute } from './utils/route'

// Mỗi trang một chunk riêng: trang chủ không phải tải Leaflet và dữ liệu bản đồ
const loadGeo = () => import('./pages/GeoPage')
const loadHistory = () => import('./pages/HistoryPage')
const GeoPage = lazy(loadGeo)
const HistoryPage = lazy(loadHistory)

/** Tải trước hai trang lúc trình duyệt rảnh để bấm vào là mở ngay */
function prefetchPages() {
  const run = () => {
    loadGeo()
    loadHistory()
  }
  if ('requestIdleCallback' in window) requestIdleCallback(run, { timeout: 3000 })
  else setTimeout(run, 1500)
}

function App() {
  const route = useRoute()

  useEffect(() => {
    prefetchPages()
  }, [])

  // Đổi trang thì cuộn về đầu (trang lịch sử cuộn dài)
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [route])

  return (
    <Suspense fallback={null}>
      {route === 'home' && <HomePage />}
      {route === 'geo' && <GeoPage />}
      {route === 'history' && <HistoryPage />}
    </Suspense>
  )
}

export default App
