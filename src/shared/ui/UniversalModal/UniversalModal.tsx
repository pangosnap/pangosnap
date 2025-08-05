import * as React from 'react'
import { ComponentPropsWithoutRef } from 'react'

import CloseIcon from '@/shared/icons/close-outline.svg'
import { Button } from '@/shared/ui/Button/Button'
import { clsx } from 'clsx'
import { Dialog } from 'radix-ui'

import s from './UniversalModal.module.scss'

type ModalSize = 'lg' | 'md' | 'sm'

type Props = {
  open: boolean
  onClose: () => void
  size?: ModalSize
  modalTitle: string
} & ComponentPropsWithoutRef<'div'>

export const UniversalModal = (props: Props) => {
  const { modalTitle, onClose, open, className, size = 'md', children, ...rest } = props
  const contentClassName = clsx(s.Content, s[size], className)

  return (
    <Dialog.Root open={open} onOpenChange={onClose} {...rest}>
      <Dialog.Portal>
        <Dialog.Overlay className={s.Overlay} />
        <Dialog.Content className={contentClassName}>
          <div className={s.Header}>
            <Dialog.Title className={'uik_typography-h1-modal'}>{modalTitle}</Dialog.Title>
            <Dialog.Close asChild>
              <Button className={s.IconButton} aria-label={'Close'}>
                <CloseIcon />
              </Button>
            </Dialog.Close>
          </div>
          <hr />
          <Dialog.Description className={s.Description}>{children}</Dialog.Description>
          <div className={s.Footer}>
            <Dialog.Close asChild>
              <Button variant={'primary'}>OK</Button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
