'use client'

import { Button } from '@/shared/ui/Button/Button'
import { TextField } from '@/shared/ui/TextField'

import s from './commentsInput.module.scss'

type Props = {
  isAuthed: boolean
  postId: number
}

export const CommentsInput = ({ isAuthed, postId }: Props) => {
  if (!isAuthed) {
    return null
  }

  return (
    <div className={s.post__commentInput}>
      <TextField></TextField>
      <Button type={'button'}>Publish</Button>
    </div>
  )
}
