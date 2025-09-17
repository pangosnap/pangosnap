'use client'

import { Post } from '@/entities/post/schemas/postSchema'
import Bookmark from '@/shared/icons/Bookmark.svg'
import HeartFill from '@/shared/icons/HeartFill.svg'
import HeartOutline from '@/shared/icons/HeartOutline.svg'
import Paper from '@/shared/icons/Paper.svg'
import { Avatar } from '@/shared/ui/Avatar'
import { clsx } from 'clsx'

import s from './postFooter.module.scss'

type Props = {
  post: Post
  isAuthed: boolean
}
const MAX_SHOW = 3

export const PostFooter = ({ post, isAuthed }: Props) => {
  const { likesCount, isLiked, createdAt, avatarWhoLikes } = post

  const likers = [...new Set(avatarWhoLikes ?? [])].slice(0, MAX_SHOW)

  const dateLine = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(createdAt))

  return (
    <div className={clsx(s.footer__wrap)}>
      {isAuthed && (
        <div className={s.footer__actions}>
          <button
            type={'button'}
            className={s.footer__like}
            aria-label={isLiked ? 'Unlike' : 'Like'}
          >
            {isLiked ? <HeartFill className={s.heart} /> : <HeartOutline className={s.heart} />}
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
              <Avatar size={'very_small'} alt={''} src={url || ''} />
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
