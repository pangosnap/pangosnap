'use client'

import { ChangeEvent, ComponentPropsWithoutRef, useRef, useState } from 'react'

import { CropperStep } from './CropperStep/CropperStep'
import { ImageCarousel } from '@/features/sidebar-event/ui/AddPostWithPhoto/AddPhotoModal/ImageCarousel/ImageCarousel'
import {
  ALLOWED_MIME,
  MAX_FILES,
  MAX_SIZE_BYTES,
} from '@/features/sidebar-event/ui/AddPostWithPhoto/AddPhotoModal/lib/uploadPhoto.constants'
import BackArrow from '@/shared/icons/back-arrow.svg'
import CloseIcon from '@/shared/icons/close-outline.svg'
import PictureIcon from '@/shared/icons/picture-icon.svg'
import { Button } from '@/shared/ui/Button/Button'
import { clsx } from 'clsx'
import { Dialog } from 'radix-ui'

import s from './AddPhotoModal.module.scss'

type Props = {
  open: boolean
  onClose: () => void
  modalTitle: string
  overlayDarkClass?: string
  onConfirm?: () => void
} & ComponentPropsWithoutRef<'div'>

type Step = 'select' | 'crop'

export const AddPhotoModal = (props: Props) => {
  const { modalTitle, onClose, onConfirm, open, className, overlayDarkClass, ...rest } = props

  const contentClassName = clsx(s.Content, className)

  const inputRef = useRef<HTMLInputElement | null>(null)
  const [previews, setPreviews] = useState<string[]>([])
  const [validFiles, setValidFiles] = useState<File[]>([])
  const [error, setError] = useState<string | null>(null)
  const [publishing, setPublishing] = useState(false)

  const [step, setStep] = useState<Step>('select')

  const [currentIndex, setCurrentIndex] = useState<number>(0)

  const openFileDialog = () => inputRef.current?.click()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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

    // Чистим старые blob-URL'ы
    setPreviews(prev => {
      prev.forEach(url => URL.revokeObjectURL(url))

      return valid.map(file => URL.createObjectURL(file))
    })

    setValidFiles(valid)
    setCurrentIndex(0)
    setStep(valid.length ? 'select' : 'select')
  }

  const handleApplyCropAt = (index: number, file: File, previewUrl: string) => {
    setPreviews(prev => {
      const next = [...prev]
      const old = next[index]

      if (old) {
        URL.revokeObjectURL(old)
      }
      next[index] = previewUrl

      return next
    })

    setValidFiles(prev => {
      const next = [...prev]

      next[index] = file

      return next
    })

    setStep('select')
  }

  const canGoCrop = previews.length > 0
  const bodyClassName = clsx(s.Body, step === 'crop' ? s.crop : s.select)

  return (
    <Dialog.Root open={open} onOpenChange={onClose} {...rest}>
      <Dialog.Portal>
        <Dialog.Overlay className={overlayDarkClass || s.Overlay} />
        <Dialog.Content className={contentClassName} {...rest}>
          <div className={s.Header}>
            {canGoCrop && (
              <Button onClick={() => setPreviews([])} variant={'text'}>
                <BackArrow />
              </Button>
            )}
            <Dialog.Title className={'uik_typography-h1'}>{modalTitle}</Dialog.Title>
            {canGoCrop ? (
              <Button onClick={() => setPublishing(true)} variant={'text'}>
                Next
              </Button>
            ) : (
              <Dialog.Close asChild>
                <Button className={s.IconButton} aria-label={'Close'}>
                  <CloseIcon />
                </Button>
              </Dialog.Close>
            )}
          </div>

          <hr />

          <div className={bodyClassName}>
            {step === 'select' ? (
              <>
                {canGoCrop ? (
                  <ImageCarousel
                    slides={previews}
                    selectedIndex={currentIndex}
                    onSelect={setCurrentIndex}
                  />
                ) : (
                  <div className={s.Picture}>
                    <PictureIcon />
                  </div>
                )}

                {canGoCrop ? (
                  <>
                    <Button variant={'outlined'} onClick={() => setStep('crop')}>
                      Crop current ({currentIndex + 1}/{previews.length})
                    </Button>
                  </>
                ) : (
                  <>
                    <Button onClick={openFileDialog}>Select from Computer</Button>

                    <Button variant={'outlined'}>Open Draft</Button>
                  </>
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
              </>
            ) : (
              <CropperStep
                src={previews[currentIndex]}
                onCancel={() => setStep('select')}
                onApply={(file, url) => handleApplyCropAt(currentIndex, file, url)}
              />
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
