'use client'

import { ReactNode } from 'react'

import CloseIcon from '@/shared/icons/close-outline.svg'
import * as Dialog from '@radix-ui/react-dialog'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

import s from './postModal.module.scss'

type Props = {
  open: boolean
  onCloseAction: () => void
  children: ReactNode
  isShowClose?: boolean
}

export const PostModal = ({ open, onCloseAction, children, isShowClose }: Props) => {
  return (
    <Dialog.Root open={open} onOpenChange={v => !v && onCloseAction()}>
      <Dialog.Portal>
        <Dialog.Overlay className={s.overlay} />
        <div className={s.content}>
          <Dialog.Content className={s.modal}>
            <VisuallyHidden>
              <Dialog.Title>Post modal</Dialog.Title>
              <Dialog.Description>Post</Dialog.Description>
            </VisuallyHidden>
            <div className={s.buttonWrap}>
              {isShowClose && (
                <Dialog.Close asChild>
                  <button className={s.button} type={'button'} aria-label={'Close post modal'}>
                    <CloseIcon />
                  </button>
                </Dialog.Close>
              )}
            </div>
            <div className={s.body}>{children}</div>
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
