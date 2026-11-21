import { useEffect, useState } from 'react'

type GeoState<T> =
  | { status: 'loading' }
  | { status: 'ready'; data: T }
  | { status: 'error'; error: string }

/** Tải một file GeoJSON trong thư mục public/ */
export function useGeoData<T>(path: string): GeoState<T> {
  const [state, setState] = useState<GeoState<T>>({ status: 'loading' })

  useEffect(() => {
    const controller = new AbortController()
    fetch(`${import.meta.env.BASE_URL}${path}`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json() as Promise<T>
      })
      .then((data) => setState({ status: 'ready', data }))
      .catch((err: unknown) => {
        if (controller.signal.aborted) return
        setState({ status: 'error', error: err instanceof Error ? err.message : String(err) })
      })
    return () => controller.abort()
  }, [path])

  return state
}
