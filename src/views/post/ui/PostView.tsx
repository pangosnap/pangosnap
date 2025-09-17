'use client'
import type { Post } from '@/entities/post/schemas/postSchema'

import { useGetPostQuery } from '@/entities/post/api/postApi'
import { useMeQuery } from '@/features/auth/api/authRegApi'
import { PostHeader, PostFooter } from '@/views/post'
import { PostCarousel } from '@/views/post/ui/PostCarousel/PostCarousel'
import { Comments, CommentsInput } from '@/widgets/Comments'

import s from './postView.module.scss'

type Props = {
  post: Post
}

export const PostView = ({ post }: Props) => {
  const { data } = useMeQuery()

  const { data: postData } = useGetPostQuery(post.id, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
  })

  const p = postData ?? post

  const isAuthed = !!data
  const isOwner = data?.userId === p.ownerId

  return (
    <article className={s.post}>
      <div className={s.post__media}>
        <PostCarousel images={p.images} />
      </div>

      <div className={s.post__content}>
        <PostHeader isOwner={isOwner} isAuthed={isAuthed} post={p} />
        <Comments post={p} />
        <PostFooter post={p} isAuthed={isAuthed} />
        <CommentsInput isAuthed={isAuthed} postId={p.id} />
      </div>
    </article>
  )
}
