'use client'

import { PostActionsMenu } from '@/views/post'
import { clsx } from 'clsx'
import Image from 'next/image'

import s from './postHeader.module.scss'

type Props = {
  avatarOwner: string
  userName: string
  isAuthed: boolean
  isOwner: boolean
  postId: number
}

export const PostHeader = ({ avatarOwner, userName, isAuthed, isOwner, postId }: Props) => {
  return (
    <div className={clsx(s['header'])}>
      <div className={s.avatarWrap}>
        <Image src={avatarOwner} alt={''} sizes={'36px'} fill priority className={s.avatar} />
      </div>
      <span className={s.user}>{userName}</span>
      {isAuthed && <PostActionsMenu isOwner={isOwner} postId={postId} />}
    </div>
  )
}
