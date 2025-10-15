'use client'

import s from './loader.module.scss'

type Props = {
  fullscreen?: boolean
  size?: number
}

export const Loader = ({ fullscreen = false, size = 40 }: Props) => {
  return (
    <div className={fullscreen ? s.fullscreen : s.center}>
      <div
        className={s.spinner}
        style={{ width: size, height: size, borderWidth: Math.max(2, size / 12) }}
        aria-label={'Loading'}
      />
    </div>
  )
}
