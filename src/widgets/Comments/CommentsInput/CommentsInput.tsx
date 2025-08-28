'use client'

import s from './commentsInput.module.scss'

type Props = {
  isAuthed: boolean
  postId: number
}

export const CommentsInput = ({ isAuthed, postId }: Props) => {
  if (!isAuthed) {
    return null
  }

  return <div className={s.post__commentInput}>comment input here</div>
}
