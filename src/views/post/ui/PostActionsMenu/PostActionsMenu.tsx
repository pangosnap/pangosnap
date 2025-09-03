'use client'

import { useCarryQuery } from '@/shared/hooks/useCarryQuery'
import Edit from '@/shared/icons/Edit.svg'
import More from '@/shared/icons/More.svg'
import Trash from '@/shared/icons/Trash.svg'
import { Button } from '@/shared/ui/Button/Button'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import Link from 'next/link'

import s from './postActionsMenu.module.scss'

type Props = {
  isOwner: boolean
  postId: number
}
export const PostActionsMenu = ({ isOwner, postId }: Props) => {
  const href = useCarryQuery()

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
              <Link href={href(`/post/${postId}/edit`)} scroll={false}>
                <Edit /> Edit Post
              </Link>
            </DropdownMenu.Item>

            <DropdownMenu.Item className={s.item}>
              <Trash />
              Delete Post
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  )
}
