'use client'
import type { Post } from '@/entities/post/schemas/postSchema'

import { useMeQuery } from '@/features/auth/api/authRegApi'
import { PostHeader, PostFooter } from '@/views/post'
import { Comments, CommentsInput } from '@/widgets/Comments'

import s from './postView.module.scss'

type Props = {
  post: Post
}

export const PostView = ({ post }: Props) => {
  const { data } = useMeQuery()

  const isAuthed = !!data
  const isOwner = data?.userId === post.ownerId

  return (
    <article className={s.post}>
      <div className={s.post__media}>
        {post.images?.map(img => (
          <img key={img.uploadId} src={img.url} alt={''} className={s.post__img} />
        ))}
      </div>

      <div className={s.post__content}>
        <PostHeader
          isOwner={isOwner}
          avatarOwner={post.avatarOwner ?? null}
          userName={post.userName}
          isAuthed={isAuthed}
          postId={post.id}
        />
        <Comments post={post} />
        <PostFooter
          likesCount={post.likesCount}
          isLiked={post.isLiked}
          createdAt={post.createdAt}
          avatarWhoLikes={post.avatarWhoLikes ?? []}
          isAuthed={isAuthed}
        />
        <CommentsInput isAuthed={isAuthed} postId={post.id} />
      </div>
    </article>
  )
}
