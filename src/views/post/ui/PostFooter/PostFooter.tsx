'use client'

import Bookmark from '@/shared/icons/Bookmark.svg'
import HeartFill from '@/shared/icons/HeartFill.svg'
import HeartOutline from '@/shared/icons/HeartOutline.svg'
import Paper from '@/shared/icons/Paper.svg'
import { clsx } from 'clsx'
import Image from 'next/image'

import s from './postFooter.module.scss'

type Props = {
  likesCount: number
  isLiked: boolean
  createdAt: string
  avatarWhoLikes: string[]
  isAuthed: boolean
}

export const PostFooter = ({ likesCount, isLiked, createdAt, avatarWhoLikes, isAuthed }: Props) => {
  const MAX_SHOW = 3
  const likers = [...new Set(avatarWhoLikes ?? [])].slice(0, MAX_SHOW)

  const dateLine = new Date(createdAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <div className={clsx(s.footer__wrap)}>
      {isAuthed && (
        <div className={s.footer__actions}>
          <button type={'button'} className={clsx(s.footer__like)}>
            {!isLiked && (
              <HeartOutline className={clsx(s.heart, isLiked && s['footer__like--active'])} />
            )}
            {isLiked && <HeartFill className={s.heart} />}
          </button>

          <button type={'button'} className={clsx(s.footer__forward)}>
            <Paper />
          </button>
          <button type={'button'} className={clsx(s.footer__bookmark)}>
            <Bookmark />
          </button>
        </div>
      )}

      {likers.length > 0 && (
        <div className={s.footer__likers}>
          {likers.map((url, i) => (
            <div className={s.footer__avatarWrap} key={`${url}-${i}`}>
              <Image
                src={url}
                alt={''}
                sizes={'24px'}
                fill
                priority
                className={clsx(s['footer__avatar'], s[`footer__avatar-${i}`])}
              />
            </div>
          ))}
          <div className={s.footer__meta}>
            <span className={s.footer__likesCount}>{likesCount}</span>
            <span className={s.footer__likeText}>{`"Like"`}</span>
          </div>
        </div>
      )}

      <time className={s.footer__time}>{dateLine}</time>
    </div>
  )
}
