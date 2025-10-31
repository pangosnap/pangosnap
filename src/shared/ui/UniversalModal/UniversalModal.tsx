import * as React from 'react'
import { type ComponentPropsWithoutRef } from 'react'

import CloseIcon from '@/shared/icons/close-outline.svg'
import { Button } from '@/shared/ui/Button/Button'
import { clsx } from 'clsx'
import { Dialog } from 'radix-ui'

import s from './UniversalModal.module.scss'

type ModalSize = 'lg' | 'md' | 'sm'

type Props = {
  open: boolean
  onClose: () => void
  onConfirm?: () => void
  size?: ModalSize
  modalTitle?: string
  overlayDarkClass?: string
  sideButtonTitle?: string
  sideButtonOnClick?: () => void
  buttonTitle?: string
  buttonDisabled?: boolean
} & ComponentPropsWithoutRef<'div'>

export const UniversalModal = (props: Props) => {
  const {
    modalTitle,
    onClose,
    onConfirm,
    open,
    className,
    size = 'md',
    children,
    overlayDarkClass,
    buttonTitle = 'OK',
    sideButtonTitle,
    sideButtonOnClick,
    buttonDisabled,
    ...rest
  } = props
  const contentClassName = clsx(s.Content, s[size], className)
  const CloseBtn = (
    <Button onClick={sideButtonOnClick} className={s.IconButton} aria-label={'Close'}>
      <CloseIcon />
    </Button>
  )

  return (
    <Dialog.Root open={open} onOpenChange={onClose} {...rest}>
      <Dialog.Portal>
        <Dialog.Overlay className={overlayDarkClass || s.Overlay} />
        <Dialog.Content className={contentClassName} onInteractOutside={e => e.preventDefault()}>
          <>
            <div className={s.Header}>
              <Dialog.Title className={'uik_typography-h1'}>{modalTitle}</Dialog.Title>
              {sideButtonOnClick ? CloseBtn : <Dialog.Close asChild>{CloseBtn}</Dialog.Close>}
            </div>{' '}
            <hr />
          </>
          <Dialog.Description className={s.Description}>{children}</Dialog.Description>
          <div className={s.Footer}>
            {sideButtonTitle && (
              <Button variant={'outlined'} onClick={sideButtonOnClick}>
                {sideButtonTitle}
              </Button>
            )}
            <Dialog.Close asChild>
              <Button variant={'primary'} onClick={onConfirm} disabled={buttonDisabled}>
                {buttonTitle}
              </Button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
