import { useState } from 'react'
import type { Leader } from '../../data/history'
import styles from './Portrait.module.css'

interface Props {
  leader: Leader
  /** thumb: tròn nhỏ trên thẻ · large: khung chân dung trong popup (kèm ghi nguồn) */
  variant: 'thumb' | 'large'
}

/** Chân dung người lãnh đạo; không có ảnh (hoặc lỗi tải) thì hiện chữ cái đầu của tên */
export function Portrait({ leader, variant }: Props) {
  const [failed, setFailed] = useState(false)
  const img = leader.image
  const initial = leader.name.split(' ').at(-1)?.[0]

  if (!img || failed) {
    return (
      <span className={`${styles.frame} ${styles[variant]} ${styles.initial}`} aria-hidden="true">
        {initial}
      </span>
    )
  }

  const src = import.meta.env.BASE_URL + img.url
  if (variant === 'thumb') {
    return (
      <span className={`${styles.frame} ${styles.thumb}`}>
        <img
          src={src}
          alt=""
          loading="lazy"
          decoding="async"
          style={{ objectPosition: img.position }}
          onError={() => setFailed(true)}
        />
      </span>
    )
  }

  return (
    <figure className={styles.figure}>
      <div className={`${styles.frame} ${styles.large}`}>
        <img
          src={src}
          alt={leader.name}
          decoding="async"
          style={{ objectPosition: img.position }}
          onError={() => setFailed(true)}
        />
      </div>
      <figcaption className={styles.credit}>
        <a href={img.page} target="_blank" rel="noreferrer">
          {img.credit}
        </a>
      </figcaption>
    </figure>
  )
}
