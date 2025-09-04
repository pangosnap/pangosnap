import { FC } from 'react'

import s from './Post.module.scss'

type PostType = {
  id: number
  imageUrl: string
  likesCount: number
}

const Post: FC<PostType> = ({ id, imageUrl, likesCount }) => {
  return (
    <article className={s.post}>
      <div className={s.imageContainer}>
        <img src={imageUrl} className={s.image} loading={'lazy'} />

        <div className={s.postOverlay}>
          <div className={s.stats}>
            <span className={s.stat}>❤️ {likesCount || 0}</span>
          </div>
        </div>
      </div>
    </article>
  )
}

export default Post
