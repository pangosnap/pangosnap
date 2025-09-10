'use client'

import { ChangeEvent, useEffect, useRef, useState, type ReactNode } from 'react'

import { CropperStep } from './CropperStep/CropperStep'
import { ImageCarousel } from './ImageCarousel/ImageCarousel'
import { PublicationPanel } from './PublicationPanel/PublicationPanel'
import { ALLOWED_MIME, MAX_FILES, MAX_SIZE_BYTES } from './lib/uploadPhoto.constants'
import { useObjectUrls } from './lib/useObjectUrls'
import { validateFiles } from './lib/validateFiles'
import { HeaderAction } from '@/features/sidebar-event/ui/AddPostWithPhoto/AddPhotoModal/HeaderAction/HeaderAction'
import BackArrow from '@/shared/icons/back-arrow.svg'
import PictureIcon from '@/shared/icons/picture-icon.svg'
import { Button } from '@/shared/ui/Button/Button'
import { clsx } from 'clsx'
import { Dialog } from 'radix-ui'

import s from './AddPhotoModal.module.scss'

type Props = {
  open: boolean
  onCloseAction: () => void
  modalTitle: string
  overlayDarkClass?: string
  onConfirmAction?: (validFiles: File[], description: string) => void
}

export type Step = 'select' | 'crop' | 'publish'

export const AddPhotoModal = (props: Props) => {
  const { modalTitle, onCloseAction, onConfirmAction, open, overlayDarkClass } = props

  const inputRef = useRef<HTMLInputElement | null>(null)

  const [files, setFiles] = useState<File[]>([])
  const [error, setError] = useState<string | null>(null)
  const [description, setDescription] = useState('')
  const [step, setStep] = useState<Step>('select')
  const [stepTitle, setStepTitle] = useState<string>(modalTitle)
  const [currentIndex, setCurrentIndex] = useState(0)

  const previews = useObjectUrls(files)
  const hasFiles = files.length > 0
  const isCropOrPublish = step === 'crop' || step === 'publish'
  const isSelectWithFiles = step === 'select' && hasFiles
  const contentClassName = clsx(s.Content, step === 'publish' && s.wide)

  const openFileDialog = () => {
    if (!inputRef.current) {
      return
    }
    inputRef.current.value = ''
    inputRef.current.click()
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const list = e.target.files

    if (!list || list.length === 0) {
      return
    }

    const picked = Array.from(list)
    const { valid, errors } = validateFiles(picked, {
      maxFiles: MAX_FILES,
      allowedMime: ALLOWED_MIME,
      maxBytes: MAX_SIZE_BYTES,
    })

    if (valid.length === 0) {
      setError(errors.length ? errors.join('\n') : 'No valid files selected')
      e.target.value = ''

      return
    }

    setFiles(valid)
    setError(errors.length ? errors.join('\n') : null)
    setCurrentIndex(0)
    setStep('select')
    setStepTitle('Add Photo')
    e.target.value = ''
  }

  const publicationPost = () => {
    onConfirmAction?.(files, description)
  }

  const handleApplyCropAt = (index: number, file: File) => {
    setFiles(prev => {
      const next = [...prev]

      next[index] = file

      return next
    })
    setStep('select')
    setStepTitle('Add Photo')
  }

  // не даём currentIndex выйти за пределы при изменении набора файлов
  useEffect(() => {
    setCurrentIndex(prev => (files.length === 0 ? 0 : Math.min(prev, files.length - 1)))
  }, [files.length])

  let backButton: ReactNode = <span className={s.IconPlaceholder} />

  if (isCropOrPublish) {
    backButton = (
      <Button
        type={'button'}
        variant={'text'}
        onClick={() => {
          setStep('select')
          setStepTitle('Add Photo')
        }}
        aria-label={'Back'}
        autoBlurOnClick
      >
        <BackArrow />
      </Button>
    )
  } else if (isSelectWithFiles) {
    backButton = (
      <Button
        type={'button'}
        variant={'text'}
        onClick={() => setFiles([])}
        aria-label={'Back'}
        autoBlurOnClick
      >
        <BackArrow />
      </Button>
    )
  }

  return (
    <Dialog.Root open={open} onOpenChange={isOpen => !isOpen && onCloseAction()}>
      <Dialog.Portal>
        <Dialog.Overlay className={overlayDarkClass || s.Overlay} />

        <Dialog.Content className={contentClassName}>
          <div className={s.Header}>
            {backButton}

            <Dialog.Title className={'uik_typography-h1'}>{stepTitle}</Dialog.Title>

            <HeaderAction
              step={step}
              canGoNext={hasFiles}
              onPublish={publicationPost}
              onNext={() => {
                setStep('publish')
                setStepTitle('Publish')
              }}
              classes={{ iconButton: s.IconButton }}
            />
          </div>

          <hr />

          <div className={clsx(s.Body, s[step])}>
            {step === 'select' && (
              <>
                {previews.length > 0 ? (
                  <ImageCarousel
                    slides={previews}
                    selectedIndex={currentIndex}
                    onSelectAction={setCurrentIndex}
                    className={s.Carousel}
                  />
                ) : (
                  <div className={s.Picture}>
                    <PictureIcon />
                  </div>
                )}

                {previews.length > 0 ? (
                  <Button
                    type={'button'}
                    variant={'outlined'}
                    onClick={() => {
                      setStep('crop')
                      setStepTitle('Crop')
                    }}
                  >
                    {`Crop current (${currentIndex + 1}/${previews.length})`}
                  </Button>
                ) : (
                  <>
                    <Button type={'button'} onClick={openFileDialog}>
                      Select from Computer
                    </Button>
                    <Button type={'button'} variant={'outlined'} disabled>
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

            {step === 'crop' && files.length > 0 && (
              <CropperStep
                src={previews[currentIndex]}
                onApplyAction={file => handleApplyCropAt(currentIndex, file)}
              />
            )}

            {step === 'publish' && (
              <div className={s.PublishLayout}>
                <div className={s.Left}>
                  <ImageCarousel
                    slides={previews}
                    selectedIndex={currentIndex}
                    onSelectAction={setCurrentIndex}
                  />
                </div>

                <aside className={s.Right}>
                  <PublicationPanel descriptionValue={setDescription} />
                </aside>
              </div>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
