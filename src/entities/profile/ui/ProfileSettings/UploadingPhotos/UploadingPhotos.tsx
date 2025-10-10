'use client'

import { ChangeEventHandler, useRef, useState } from 'react'

import {
  useAddProfilePhotoMutation,
  useDeleteAvatarMutation,
  useGetProfileQuery,
} from '@/entities/profile/api/profileApi'
import DeleteAvatar from '@/shared/icons/deleteAvatar.svg'
import { MAX_SIZE_AVATAR } from '@/shared/lib/constants/user.constants'
import Avatar from '@/shared/ui/Avatar/Avatar'
import { Button } from '@/shared/ui/Button/Button'

import s from './UploadingPhotos.module.scss'

export const UploadingPhotos = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | undefined>(undefined)

  const [addProfilePhoto] = useAddProfilePhotoMutation()
  const [deleteAvatar] = useDeleteAvatarMutation()
  const { avatarUrl } = useGetProfileQuery(undefined, {
    selectFromResult: ({ data }) => ({
      avatarUrl: data?.avatars?.[0]?.url,
    }),
  })
  const openDialog = () => inputRef.current?.click()

  const handleChange: ChangeEventHandler<HTMLInputElement> = async e => {
    const file = e.target.files?.[0]

    if (!file) {
      return
    }
    if (file.size > MAX_SIZE_AVATAR) {
      e.currentTarget.value = ''

      return
    }
    const url = URL.createObjectURL(file)

    setPreview(prev => {
      if (prev) {
        URL.revokeObjectURL(prev)
      }

      return url
    })
    const form = new FormData()

    form.append('file', file)
    try {
      await addProfilePhoto(form).unwrap()
    } catch (e) {
      console.log(e)
    }
  }
  const handleDelete = async () => {
    try {
      await deleteAvatar().unwrap()
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className={s.UploadingPhotos}>
      <div className={s.avatarBox}>
        <Avatar src={preview || avatarUrl} size={'large'} alt={'Avatar'} />
        <Button variant={'icon'} className={s.deleteBtn} onClick={handleDelete}>
          <DeleteAvatar />
        </Button>
      </div>

      <Button variant={'outlined'} onClick={openDialog}>
        Add a Profile Photo
      </Button>
      <input ref={inputRef} type={'file'} accept={'image/*'} onChange={handleChange} hidden />
    </div>
  )
}
