'use client'

import { Post } from '@/entities/post/schemas/postSchema'
import { Avatar } from '@/shared/ui/Avatar'
import { PostActionsMenu } from '@/views/post'
import { clsx } from 'clsx'

import s from './postHeader.module.scss'

type Props = {
  isAuthed: boolean
  isOwner: boolean
  post: Post
}

export const PostHeader = ({ post, isAuthed, isOwner }: Props) => {
  const { avatarOwner, userName, id, description } = post

  return (
    <div className={clsx(s['header'])}>
      <div className={s.top}>
        <div className={s.avatarWrap}>
          <Avatar size={'small'} alt={''} src={avatarOwner ?? undefined} />
        </div>
        <span className={s.user}>{userName}</span>
        {isAuthed && <PostActionsMenu isOwner={isOwner} postId={id} />}
      </div>
      {description && <div className={s.description}>{description}</div>}
    </div>
  )
}
