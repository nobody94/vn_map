import { useState } from 'react'
import { resolveImage } from '../../data/media'
import type { MediaRef } from '../../types/province'
import styles from './MediaImage.module.css'

interface Props {
  media: MediaRef
  alt: string
  /** wide: ảnh ngang 2:1 · cover: ảnh bìa 16:9 · square: ảnh vuông nhỏ */
  variant: 'wide' | 'cover' | 'square'
  /** Hiện dòng ghi nguồn đè lên ảnh (mặc định có, trừ ảnh vuông) */
  showCredit?: boolean
}

/** Ảnh từ Wikimedia Commons kèm ghi nguồn; nếu không có ảnh thì hiện khung giữ chỗ */
export function MediaImage({ media, alt, variant, showCredit = variant !== 'square' }: Props) {
  const image = resolveImage(media)
  const [failed, setFailed] = useState(false)
  const className = `${styles.frame} ${styles[variant]}`

  if (!image || failed) {
    return (
      <div className={`${className} ${styles.placeholder}`} aria-hidden="true">
        <svg viewBox="0 0 24 24" width="22" height="22">
          <path
            d="M4 5h16v14H4zM4 15l4.5-4.5 3.5 3.5 2.5-2.5L20 17M15.5 9.5a1 1 0 1 0 0-.01"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    )
  }

  return (
    <figure className={className} title={image.credit}>
      <img src={image.src} alt={alt} loading="lazy" decoding="async" onError={() => setFailed(true)} />
      {showCredit && (
        <a className={styles.credit} href={image.page} target="_blank" rel="noreferrer">
          {image.credit}
        </a>
      )}
    </figure>
  )
}
