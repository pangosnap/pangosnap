'use client'

import { ReactNode } from 'react'

import CloseIcon from '@/shared/icons/close-outline.svg'
import { Button } from '@/shared/ui/Button/Button'
import * as Dialog from '@radix-ui/react-dialog'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

import s from './postModal.module.scss'

type Props = {
  open: boolean
  closeAction: () => void
  children: ReactNode
  isShowClose?: boolean
}

export const PostModal = ({ open, closeAction, children, isShowClose }: Props) => {
  return (
    <Dialog.Root open={open} onOpenChange={v => !v && closeAction()}>
      <Dialog.Portal>
        <Dialog.Overlay className={s.overlay} />
        <div className={s.content}>
          <Dialog.Content className={s.modal}>
            <VisuallyHidden>
              <Dialog.Title>Post modal</Dialog.Title>
              <Dialog.Description>Post</Dialog.Description>
            </VisuallyHidden>
            <div className={s.body}>
              {isShowClose && (
                <Dialog.Close asChild>
                  <Button className={s.button} variant={'text'} aria-label={'Close post modal'}>
                    <CloseIcon />
                  </Button>
                </Dialog.Close>
              )}
              {children}
            </div>
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
