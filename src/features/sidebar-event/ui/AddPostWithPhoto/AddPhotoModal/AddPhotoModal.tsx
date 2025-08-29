import * as React from 'react'
import { ComponentPropsWithoutRef } from 'react'

import CloseIcon from '@/shared/icons/close-outline.svg'
import PictureIcon from '@/shared/icons/picture-icon.svg'
import { Button } from '@/shared/ui/Button/Button'
import { clsx } from 'clsx'
import { Dialog } from 'radix-ui'

import s from './AddPhotoModal.module.scss'

type Props = {
  open: boolean
  onClose: () => void
  onConfirm?: () => void
  modalTitle: string
  overlayDarkClass?: string
} & ComponentPropsWithoutRef<'div'>

export const AddPhotoModal = (props: Props) => {
  const { modalTitle, onClose, onConfirm, open, className, children, overlayDarkClass, ...rest } =
    props
  const contentClassName = clsx(s.Content, className)

  return (
    <Dialog.Root open={open} onOpenChange={onClose} {...rest}>
      <Dialog.Portal>
        <Dialog.Overlay className={overlayDarkClass || s.Overlay} />
        <Dialog.Content className={contentClassName}>
          <div className={s.Header}>
            <Dialog.Title className={'uik_typography-h1'}>{modalTitle}</Dialog.Title>
            <Dialog.Close asChild>
              <Button className={s.IconButton} aria-label={'Close'}>
                <CloseIcon />
              </Button>
            </Dialog.Close>
          </div>
          <hr />
          <div className={s.Body}>
            <div className={s.Picture}>
              <PictureIcon />
            </div>
            <Button fullWidth>Select from Computer</Button>
            <Button variant={'outlined'}>Open Draft</Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
