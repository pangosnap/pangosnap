'use client'

import type { Post } from '@/entities/post/schemas/postSchema'

import { Button } from '@/shared/ui/Button/Button'
import { clsx } from 'clsx'
import Image from 'next/image'

import s from './comments.module.scss'

type Props = {
  post: Post
}

export const Comments = ({ post }: Props) => {
  return (
    <section className={s.comments__list}>
      <div className={s.comments__item}>
        <div className={s.comments__avatarWrap}>
          <Image
            src={post.avatarOwner}
            alt={post.userName}
            priority
            fill
            sizes={'36px'}
            className={s.comments__avatar}
          />
        </div>
        <div className={s.comments__body}>
          <p className={s.comments__text}>
            <span className={s.comments__user}>Satana Ivanovich</span>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis, quae!
          </p>
          <time className={s.comments__time} dateTime={post.createdAt}>
            {new Date(post.createdAt).toLocaleString('en-US')}
          </time>
        </div>
      </div>
    </section>
  )
}
