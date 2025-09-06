'use client'

import { ReactNode } from 'react'

import CloseIcon from '@/shared/icons/close-outline.svg'
import { Button } from '@/shared/ui/Button/Button'
import * as Dialog from '@radix-ui/react-dialog'

import s from './confirmModal.module.scss'

type Props = {
  open: boolean
  closeAction: () => void
  confirmAction: () => void
  title?: string
  message?: ReactNode
}

export const ConfirmModal = (props: Props) => {
  const { open, closeAction, confirmAction, title = 'Confirm', message = 'Are you sure?' } = props

  const handleOk = () => {
    confirmAction()
    closeAction()
  }

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      closeAction()
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className={s.overlay} />

        <Dialog.Content className={s.content}>
          <div className={s.header}>
            <Dialog.Title className={s.title}>{title}</Dialog.Title>
            <Dialog.Close asChild>
              <button type={'button'} className={s.close} aria-label={'Close dialog'}>
                <CloseIcon />
              </button>
            </Dialog.Close>
          </div>

          <Dialog.Description className={s.message}>{message}</Dialog.Description>

          <div className={s.buttonWrap}>
            <Button variant={'outlined'} type={'button'} onClick={handleOk}>
              Yes
            </Button>
            <Dialog.Close asChild>
              <Button type={'button'} variant={'primary'}>
                No
              </Button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
