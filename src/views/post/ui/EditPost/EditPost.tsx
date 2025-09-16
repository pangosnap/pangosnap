'use client'

import { useState, FormEvent } from 'react'

import { useGetPostQuery, useUpdatePostMutation } from '@/entities/post/api/postApi'
import CloseIcon from '@/shared/icons/close-outline.svg'
import { Avatar } from '@/shared/ui/Avatar'
import { Button } from '@/shared/ui/Button/Button'
import { Loader } from '@/shared/ui/Loader/Loader'
import { ConfirmModal } from '@/views/post/ui/ConfirmModal/ConfirmModal'
import { PostCarousel } from '@/views/post/ui/PostCarousel/PostCarousel'
import { useRouter } from 'next/navigation'

import s from './editPost.module.scss'

type Props = {
  postId: number
  closeAction?: () => void
}

const MAX = 500

export const EditPost = ({ postId, closeAction }: Props) => {
  const router = useRouter()
  const close = closeAction ?? (() => router.back())
  const { data, isFetching } = useGetPostQuery(postId)
  const [updatePost, { isLoading, isError }] = useUpdatePostMutation()

  const [draft, setDraft] = useState<string | null>(null)

  const initial = data?.description ?? ''
  const value = draft ?? initial
  const isDirty = draft !== null && draft !== initial

  const count = value.length
  const disabled = isLoading || !isDirty || !value.trim() || count > MAX

  const [confirmOpen, setConfirmOpen] = useState(false)

  const requestClose = () => (isDirty ? setConfirmOpen(true) : close())
  const confirmClose = () => {
    setConfirmOpen(false)
    close()
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (disabled) {
      return
    }

    try {
      await updatePost({ postId, description: value }).unwrap()
      /*onSuccess?.() */
      close()
    } catch {
      //tost
    }
  }

  return (
    <>
      {isFetching && <Loader />}
      <form onSubmit={onSubmit} className={s.form}>
        <header className={s.header}>
          <h2 className={s.title}>Edit Post</h2>
          <button
            type={'button'}
            className={s.close}
            aria-label={'Close'}
            onClick={requestClose}
            disabled={isLoading || isFetching}
          >
            <CloseIcon />
          </button>
        </header>

        <div className={s.wrap}>
          <div className={s.left}>
            <PostCarousel images={data?.images ?? []} />
          </div>

          <div className={s.right}>
            <div className={s.userWrap}>
              <Avatar
                size={'small'}
                alt={data?.userName ?? 'user'}
                src={data?.avatarOwner ?? undefined}
              />
              <p className={s.userName}>{data?.userName}</p>
            </div>

            <label className={s.label} htmlFor={'post-desc'}>
              Add publication descriptions
            </label>
            <div className={s.editor}>
              <textarea
                id={'post-desc'}
                value={value}
                onChange={e => setDraft(e.target.value)}
                maxLength={MAX}
                disabled={isLoading || isFetching}
                className={s.textArea}
              />
              <div className={s.counter}>
                {count}/{MAX}
              </div>
            </div>

            {isError && <p className={s.error}>Something went wrong</p>}

            <div className={s.actions}>
              <Button type={'submit'} disabled={disabled}>
                {isLoading ? 'Saving…' : 'Save Changes'}
              </Button>
            </div>
          </div>
        </div>
      </form>
      <ConfirmModal
        open={confirmOpen}
        closeAction={() => setConfirmOpen(false)}
        confirmAction={confirmClose}
        title={'Close Post'}
      >
        <>
          Do you really want to close the edition of the publication?
          <br />
          If you close, changes won’t be saved.
        </>
      </ConfirmModal>
    </>
  )
}
