'use client'
import { Path } from '@/shared/routes/constants'
import { Button } from '@/shared/ui/Button/Button'
import { PostModal } from '@/widgets/PostModal'
import { useRouter } from 'next/navigation'

import s from './notFound.module.scss'

export const NotFoundPost = () => {
  const router = useRouter()
  const backHandler = () => {
    if (window.history.length > 1) {
      router.back()
    } else {
      router.push(Path.main)
    }
  }

  return (
    <PostModal open onCloseAction={backHandler}>
      <div className={s.notfound}>
        <h1 className={s.title}>404</h1>
        <p className={s.text}>The post has not been found</p>
        <Button type={'button'} onClick={backHandler}>
          Go back
        </Button>
      </div>
    </PostModal>
  )
}
