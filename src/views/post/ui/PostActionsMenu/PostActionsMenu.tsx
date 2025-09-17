'use client'

import { useState } from 'react'

import { useDeletePostMutation } from '@/entities/post/api/postApi'
import { useCarryQuery } from '@/shared/hooks/useCarryQuery'
import Edit from '@/shared/icons/Edit.svg'
import More from '@/shared/icons/More.svg'
import Trash from '@/shared/icons/Trash.svg'
import { Button } from '@/shared/ui/Button/Button'
import { ConfirmModal } from '@/views/post/ui/ConfirmModal/ConfirmModal'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import s from './postActionsMenu.module.scss'

type Props = {
  isOwner: boolean
  postId: number
}
export const PostActionsMenu = ({ isOwner, postId }: Props) => {
  const href = useCarryQuery()

  const router = useRouter()
  const [isConfirmOpen, setConfirmOpen] = useState(false)
  const [deletePost, { isLoading }] = useDeletePostMutation()

  const handleConfirmDelete = async () => {
    try {
      await deletePost(postId).unwrap()
      router.back()
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className={s.headerActions}>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <Button variant={'text'} type={'button'} className={s.button} aria-label={'Post actions'}>
            <More aria-hidden />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content className={s.content} side={'bottom'} align={'end'} sideOffset={6}>
            <DropdownMenu.Item asChild className={s.item}>
              {isOwner ? (
                <Link href={href(`/post/${postId}/edit`)} scroll={false}>
                  <Edit /> Edit Post
                </Link>
              ) : (
                <Link href={href(`#`)} scroll={false}>
                  <Edit /> Follow
                </Link>
              )}
            </DropdownMenu.Item>

            <DropdownMenu.Item asChild className={s.item} disabled={isLoading}>
              {isOwner ? (
                <button type={'button'} onClick={() => setConfirmOpen(true)}>
                  <Trash />
                  Delete Post
                </button>
              ) : (
                <span>
                  <Trash />
                  UnFollow
                </span>
              )}
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>

      <ConfirmModal
        open={isConfirmOpen}
        closeAction={() => setConfirmOpen(false)}
        confirmAction={handleConfirmDelete}
        title={'Delete Post'}
      >
        Are you sure you want to delete this post??
      </ConfirmModal>
    </div>
  )
}
