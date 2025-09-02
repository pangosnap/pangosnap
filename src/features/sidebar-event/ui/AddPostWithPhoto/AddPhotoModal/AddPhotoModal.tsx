'use client'

import { ChangeEvent, ComponentPropsWithoutRef, useRef, useState } from 'react'

import { CropperStep } from './CropperStep/CropperStep'
import { ImageCarousel } from '@/features/sidebar-event/ui/AddPostWithPhoto/AddPhotoModal/ImageCarousel/ImageCarousel'
import { PublicationPanel } from '@/features/sidebar-event/ui/AddPostWithPhoto/AddPhotoModal/PublicationPanel/PublicationPanel'
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

type Step = 'select' | 'crop' | 'publish'

export const AddPhotoModal = (props: Props) => {
  const { modalTitle, onClose, onConfirm, open, className, overlayDarkClass, ...rest } = props

  const inputRef = useRef<HTMLInputElement | null>(null)
  const [previews, setPreviews] = useState<string[]>([])
  const [validFiles, setValidFiles] = useState<File[]>([])
  const [error, setError] = useState<string | null>(null)

  const [step, setStep] = useState<Step>('select')
  const [currentIndex, setCurrentIndex] = useState<number>(0)

  const contentClassName = clsx(s.Content, className, step === 'publish' && s.wide)

  const openFileDialog = () => {
    if (inputRef.current) {
      inputRef.current.value = ''
      inputRef.current.click()
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const filesList = e.target.files

    // Пользователь нажал "Отмена" — не трогаем текущее состояние
    if (!filesList || filesList.length === 0) {
      return
    }

    const picked = Array.from(filesList)
    const errors: string[] = []
    const valid: File[] = []

    if (picked.length > MAX_FILES) {
      errors.push(`Max ${MAX_FILES} photo.`)
    }

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

    if (valid.length === 0) {
      setError(errors.length ? errors.join('\n') : 'No valid files selected')
      e.target.value = ''

      return
    }

    setError(errors.length ? errors.join('\n') : null)

    setPreviews(prev => {
      prev.forEach(url => {
        if (url.startsWith('blob:')) {
          URL.revokeObjectURL(url)
        }
      })

      return valid.map(file => URL.createObjectURL(file))
    })

    setValidFiles(valid)
    setCurrentIndex(0)
    setStep('select')

    e.target.value = ''
  }

  const renderHeaderAction = () => {
    if (!canGoNext) {
      return (
        <Dialog.Close asChild>
          <Button type={'button'} className={s.IconButton} aria-label={'Close'}>
            <CloseIcon />
          </Button>
        </Dialog.Close>
      )
    }

    if (step === 'publish') {
      return (
        <Button type={'button'} variant={'text'} onClick={() => onConfirm?.()}>
          Publish
        </Button>
      )
    }

    return (
      <Button type={'button'} variant={'text'} onClick={() => setStep('publish')}>
        Next
      </Button>
    )
  }

  const handleApplyCropAt = (index: number, file: File, previewUrl: string) => {
    setPreviews(prev => {
      const next = [...prev]
      const old = next[index]

      if (old?.startsWith('blob:')) {
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

  const canGoNext = previews.length > 0

  return (
    <Dialog.Root open={open} onOpenChange={onClose} {...rest}>
      <Dialog.Portal>
        <Dialog.Overlay className={overlayDarkClass || s.Overlay} />

        <Dialog.Content className={contentClassName}>
          {/* Header */}
          <div className={s.Header}>
            {step !== 'select' ? (
              <Button type={'button'} variant={'text'} onClick={() => setStep('select')}>
                <BackArrow />
              </Button>
            ) : (
              <span />
            )}

            <Dialog.Title className={'uik_typography-h1'}>{modalTitle}</Dialog.Title>

            {renderHeaderAction()}
          </div>

          <hr />

          <div className={clsx(s.Body, s[step])}>
            {step === 'select' && (
              <>
                {previews.length > 0 ? (
                  <ImageCarousel
                    slides={previews}
                    selectedIndex={currentIndex}
                    onSelect={setCurrentIndex}
                    className={s.Carousel}
                  />
                ) : (
                  <div className={s.Picture}>
                    <PictureIcon />
                  </div>
                )}

                {previews.length > 0 ? (
                  <Button variant={'outlined'} onClick={() => setStep('crop')}>
                    Crop current ({currentIndex + 1}/{previews.length})
                  </Button>
                ) : (
                  <>
                    <Button onClick={openFileDialog} fullWidth>
                      Select from Computer
                    </Button>
                    <Button variant={'outlined'} disabled>
                      Open Draft
                    </Button>
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
            )}

            {step === 'crop' && (
              <CropperStep
                src={previews[currentIndex]}
                onCancel={() => setStep('select')}
                onApply={(file, url) => handleApplyCropAt(currentIndex, file, url)}
              />
            )}

            {step === 'publish' && (
              <div className={s.PublishLayout}>
                <div className={s.Left}>
                  <ImageCarousel
                    slides={previews}
                    selectedIndex={currentIndex}
                    onSelect={setCurrentIndex}
                  />
                </div>

                <aside className={s.Right}>
                  <PublicationPanel />
                </aside>
              </div>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
