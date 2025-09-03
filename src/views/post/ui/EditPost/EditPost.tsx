'use client'

import { useState, FormEvent } from 'react'

import { useGetPostQuery, useUpdatePostMutation } from '@/entities/post/api/postApi'
import CloseIcon from '@/shared/icons/close-outline.svg'
import { Avatar } from '@/shared/ui/Avatar'
import { Button } from '@/shared/ui/Button/Button'
import * as Dialog from '@radix-ui/react-dialog'
import { useParams, useRouter } from 'next/navigation'

import s from './editPost.module.scss'

export const EditPost = ({ initialDescription = '' }: { initialDescription?: string }) => {
  const router = useRouter()
  const { id } = useParams<{ id: string }>()
  const postId = Number(id)
  const skip = !id || Number.isNaN(postId)

  const { data } = useGetPostQuery(postId, { skip })

  const [description, setDescription] = useState(initialDescription)
  const [updatePost, { isLoading, error }] = useUpdatePostMutation()

  const goToView = () => (history.length > 1 ? router.back() : router.replace(`/post/${postId}`))

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!postId || Number.isNaN(postId)) {
      return
    }

    await updatePost({ postId, description }).unwrap()
    goToView()
  }

  return (
    <form onSubmit={onSubmit} className={s.form}>
      <header className={s.header}>
        <h2 className={s.title}>Edit Post</h2>
        <button
          type={'button'}
          className={s.close}
          aria-label={'Close'}
          onClick={() => router.back()}
        >
          <CloseIcon />
        </button>
      </header>
      <div className={s.wrap}>
        <div className={s.left}>
          {data?.images.map(image => <img key={image.uploadId} src={image.url} alt={''} />)}
        </div>
        <div className={s.right}>
          <div className={s.userWrap}>
            <Avatar size={'small'} alt={''} src={data?.avatarOwner || ''} />
            <p className={s.userName}>{data?.userName}</p>
          </div>
          <label className={s.label}>Add publication descriptions</label>

          <div className={s.editor}>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              disabled={isLoading}
            />
            <div className={s.counter}>200/500</div>
          </div>

          {!!error && <p>Something went wrong</p>}

          <div className={s.actions}>
            <Button type={'submit'} disabled={isLoading || !description.trim()}>
              {isLoading ? 'Saving…' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </div>
    </form>
  )
}
