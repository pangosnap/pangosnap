'use client'

import type { ReactNode } from 'react'

import PictureIcon from '@/shared/icons/picture-icon.svg'

import s from '../AddPhotoModal.module.scss'

type Props = {
  previews: string[]
}

export const AddPhotoPreviews = ({ previews }: Props): ReactNode => {
  const count = previews.length

  if (count === 0) {
    return (
      <div className={s.Picture}>
        <PictureIcon />
      </div>
    )
  }

  if (count === 1) {
    return (
      <div className={s.PreviewSingle}>
        <img src={previews[0]} alt={'preview'} className={s.PreviewSingleImg} />
      </div>
    )
  }

  return (
    <div className={s.Previews} data-count={count}>
      {previews.map((src, i) => (
        <img key={i} src={src} alt={`preview ${i + 1}`} className={s.Preview} />
      ))}
    </div>
  )
}
