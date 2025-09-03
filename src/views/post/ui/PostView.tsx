'use client'
import type { Post } from '@/entities/post/schemas/postSchema'

import { useMeQuery } from '@/features/auth/api/authRegApi'
import { PostHeader, PostFooter } from '@/views/post'
import { Comments, CommentsInput } from '@/widgets/Comments'
import { PostModal } from '@/widgets/PostModal'
import { useRouter } from 'next/navigation'

import s from './postView.module.scss'

export const PostView = ({ post }: { post: Post }) => {
  const { data } = useMeQuery()
  const router = useRouter()

  const isAuthed = !!data
  const isOwner = data?.userId === post.ownerId

  return (
    <PostModal open onCloseAction={() => router.back()}>
      <article className={s.post}>
        <div className={s.post__media}>
          {post.images?.map(img => (
            /*<Image
              key={img.uploadId || img.url}
              src={img.url}
              priority
              alt={''}
              width={img.width}
              height={img.height}
              className={s.post__img}
            />*/
            <img key={img.uploadId} src={img.url} alt={''} className={s.post__img} />
          ))}
        </div>

        <div className={s.post__content}>
          <PostHeader
            isOwner={isOwner}
            avatarOwner={post.avatarOwner || ''}
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
    </PostModal>
  )
}
