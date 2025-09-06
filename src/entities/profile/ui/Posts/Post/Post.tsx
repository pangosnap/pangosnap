import { FC } from 'react'

import { useCarryQuery } from '@/shared/hooks/useCarryQuery'
import Link from 'next/link'

import s from './Post.module.scss'

type PostType = {
  id: number
  imageUrl: string
  likesCount: number
}

const Post: FC<PostType> = ({ id, imageUrl, likesCount }) => {
  const href = useCarryQuery()

  return (
    <article className={s.post}>
      <div className={s.imageContainer}>
        <Link href={href(`/post/${id}`)} scroll={false} prefetch={false}>
          <img src={imageUrl} className={s.image} loading={'lazy'} />
          <div className={s.postOverlay}>
            <div className={s.stats}>
              <span className={s.stat}>❤️ {likesCount || 0}</span>
            </div>
          </div>
        </Link>
      </div>
    </article>
  )
}

export default Post
