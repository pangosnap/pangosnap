'use client'

import { ChangeEventHandler, useRef, useState } from 'react'

import Avatar from '../../../../../shared/ui/Avatar/Avatar'
import { profileApi, useAddProfilePhotoMutation } from '@/entities/profile/api/profileApi'
import { useMeQuery } from '@/features/auth/api/authRegApi'
import { useAppSelector } from '@/shared/hooks'
import { Button } from '@/shared/ui/Button/Button'

import s from './UploadingPhotos.module.scss'

export const UploadingPhotos = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | undefined>(undefined)

  const [addProfilePhoto] = useAddProfilePhotoMutation()

  // const { userId } = useMeQuery(undefined, {
  //   selectFromResult: ({ data }) => ({ userId: data?.userId }),
  // })

  const openDialog = () => inputRef.current?.click()

  const handleChange: ChangeEventHandler<HTMLInputElement> = async e => {
    const files = Array.from(e.target.files ?? [])

    const url = URL.createObjectURL(files[0])

    setPreview(prev => {
      if (prev) {
        URL.revokeObjectURL(prev)
      }

      return url
    })
    const file = files[0]
    const form = new FormData()

    form.append('file', file)
    try {
      await addProfilePhoto(form).unwrap()
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className={s.UploadingPhotos}>
      <Avatar src={preview} size={'large'} alt={'Avatar'} />
      <Button variant={'outlined'} onClick={openDialog}>
        Add a Profile Photo
      </Button>
      <input ref={inputRef} type={'file'} accept={'image/*'} onChange={handleChange} hidden />
    </div>
  )
}
