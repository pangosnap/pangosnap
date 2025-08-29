'use client'

import { ChangeEvent, ComponentPropsWithoutRef, useRef, useState } from 'react'

import { AddPhotoPreviews } from '@/features/sidebar-event/ui/AddPostWithPhoto/AddPhotoModal/AddPhotoPreviews/AddPhotoPreviews'
import {
  ALLOWED_MIME,
  MAX_FILES,
  MAX_SIZE_BYTES,
} from '@/features/sidebar-event/ui/AddPostWithPhoto/AddPhotoModal/uploadPhoto.constants'
import CloseIcon from '@/shared/icons/close-outline.svg'
import { Button } from '@/shared/ui/Button/Button'
import { clsx } from 'clsx'
import { Dialog } from 'radix-ui'

import s from './AddPhotoModal.module.scss'

type Props = {
  open: boolean
  onClose: () => void
  modalTitle: string
  overlayDarkClass?: string
  // onFilesSelected?: (files: File[]) => void
  onConfirm?: () => void
} & ComponentPropsWithoutRef<'div'>

export const AddPhotoModal = (props: Props) => {
  const {
    modalTitle,
    onClose,
    onConfirm,
    // onFilesSelected,
    open,
    className,
    overlayDarkClass,
    ...rest
  } = props

  const contentClassName = clsx(s.Content, className)

  const inputRef = useRef<HTMLInputElement | null>(null)
  const [previews, setPreviews] = useState<string[]>([])
  const [validFiles, setValidFiles] = useState<File[]>([])
  const [error, setError] = useState<string | null>(null)

  const openFileDialog = () => inputRef.current?.click()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    debugger
    const picked = Array.from(e.target.files ?? [])
    const errors: string[] = []

    if (picked.length > MAX_FILES) {
      errors.push(`Max ${MAX_FILES} photo.`)
    }

    const valid: File[] = []

    for (const f of picked.slice(0, MAX_FILES)) {
      if (!ALLOWED_MIME.includes(f.type)) {
        errors.push(`${f.name}: only JPEG/PNG.`)
        continue
      }
      if (f.size > MAX_SIZE_BYTES) {
        errors.push(`${f.name}: no more 20 mb.`)
        continue
      }
      valid.push(f)
    }

    setError(errors.length ? errors.join('\n') : null)

    // чистим старые objectURL
    setPreviews(prev => {
      prev.forEach(url => URL.revokeObjectURL(url))

      return valid.map(file => URL.createObjectURL(file))
    })

    setValidFiles(valid)
    // onFilesSelected?.(valid)
  }

  return (
    <Dialog.Root open={open} onOpenChange={onClose} {...rest}>
      <Dialog.Portal>
        <Dialog.Overlay className={overlayDarkClass || s.Overlay} />
        <Dialog.Content className={contentClassName} {...rest}>
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
            <AddPhotoPreviews previews={previews} />
            <Button onClick={openFileDialog} fullWidth>
              Select from Computer
            </Button>
            {previews.length ? (
              <Button variant={'outlined'}>Next</Button>
            ) : (
              <Button variant={'outlined'}>Open Draft</Button>
            )}
            {error && (
              <p className={s.Error} role={'alert'} aria-live={'polite'}>
                {error}
              </p>
            )}
            <input
              ref={inputRef}
              type={'file'}
              accept={ALLOWED_MIME.join(',')}
              multiple
              onChange={handleChange}
              className={s.HiddenInput}
            />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
