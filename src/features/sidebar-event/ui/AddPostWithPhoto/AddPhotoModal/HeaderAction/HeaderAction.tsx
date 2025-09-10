import { Step } from '@/features/sidebar-event/ui/AddPostWithPhoto/AddPhotoModal/AddPhotoModal'
import CloseIcon from '@/shared/icons/close-outline.svg'
import { Button } from '@/shared/ui/Button/Button'
import { Dialog } from 'radix-ui'

import s from '@/features/sidebar-event/ui/AddPostWithPhoto/AddPhotoModal/AddPhotoModal.module.scss'

type Props = {
  step: Step
  canGoNext: boolean
  onPublish: () => void
  onNext: () => void
  classes: {
    iconButton: string
  }
}

export const HeaderAction = ({ step, canGoNext, onPublish, onNext, classes }: Props) => {
  if (!canGoNext) {
    return (
      <Dialog.Close asChild>
        <Button type={'button'} className={classes.iconButton} aria-label={'Close'}>
          <CloseIcon />
        </Button>
      </Dialog.Close>
    )
  }

  if (step === 'publish') {
    return (
      <Button type={'button'} variant={'text'} onClick={onPublish}>
        Publish
      </Button>
    )
  }
  if (step === 'select') {
    return (
      <Button type={'button'} variant={'text'} onClick={onNext} autoBlurOnClick>
        Next
      </Button>
    )
  }

  return <span className={s.IconPlaceholder}></span>
}
