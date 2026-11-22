import { useEffect, useRef, type ReactNode } from 'react'
import styles from './Modal.module.css'

interface Props {
  /** Tên cho trình đọc màn hình */
  label: string
  onClose: () => void
  children: ReactNode
}

/**
 * Popup dùng thẻ <dialog> gốc: Esc, giữ focus bên trong, lớp nền do trình duyệt lo.
 * Đóng bằng nút ✕, Esc hoặc bấm ra nền. Khóa cuộn trang phía sau khi đang mở.
 * Desktop: hộp giữa màn hình · mobile: khung trượt từ dưới lên.
 */
export function Modal({ label, onClose, children }: Props) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    dialog.showModal()
    const root = document.documentElement
    const prev = root.style.overflow
    root.style.overflow = 'hidden'
    return () => {
      root.style.overflow = prev
      dialog.close()
    }
  }, [])

  return (
    <dialog
      ref={ref}
      className={styles.dialog}
      aria-label={label}
      // Esc: chặn đóng mặc định để React điều khiển việc gỡ popup
      onCancel={(e) => {
        e.preventDefault()
        onClose()
      }}
      // Bấm vào chính <dialog> (vùng nền ngoài hộp nội dung) → đóng
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className={styles.box}>
        <button className={styles.close} onClick={onClose} aria-label="Đóng">
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        {children}
      </div>
    </dialog>
  )
}
