import { FC } from 'react'

import AvatarUser from '@/shared/icons/user.svg'

import s from './Avatar.module.scss'

type AvatarProps = {
  src?: string
  alt: string
  size?: 'very_small' | 'small' | 'medium' | 'large'
  withStatus?: boolean
}

const Avatar: FC<AvatarProps> = ({ src, alt, size = 'medium', withStatus = false }) => {
  return (
    <div className={`${s.avatar} ${s[`avatar--${size}`]}`}>
      <div className={s.avatar__container}>
        {src ? (
          <img src={src || AvatarUser} alt={alt} className={s.avatar__image} loading={'lazy'} />
        ) : (
          <AvatarUser />
        )}
      </div>
      {withStatus && <div className={s.avatar__status} />}
    </div>
  )
}

export default Avatar
