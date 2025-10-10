'use client'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useGetProfileQuery, useUpdateProfileMutation } from '@/entities/profile/api/profileApi'
import { UploadingPhotos } from '@/entities/profile/ui/ProfileSettings/UploadingPhotos/UploadingPhotos'
import {
  ProfilePayload,
  profileSchema,
} from '@/entities/profile/ui/ProfileSettings/lib/profileSchema'
import { Button } from '@/shared/ui/Button/Button'
import { TextField } from '@/shared/ui/TextField'
import { zodResolver } from '@hookform/resolvers/zod'

import s from './ProfileSettings.module.scss'

export default function ProfileSettings() {
  const [apiUpdateProfile] = useUpdateProfileMutation()
  const { data } = useGetProfileQuery()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty, isSubmitting },
    reset,
    trigger,
    getValues,
  } = useForm<ProfilePayload>({
    mode: 'onChange',
    resolver: zodResolver(profileSchema),
  })

  useEffect(() => {
    if (!data) {
      return
    }
    reset({
      userName: data.userName ?? '',
      firstName: data.firstName ?? '',
      lastName: data.lastName ?? '',
      dateOfBirth: data.dateOfBirth?.slice(0, 10) ?? '',
      country: data.country ?? '',
      city: data.city ?? '',
      region: data.region ?? '',
      aboutMe: data.aboutMe ?? '',
    })
    void trigger()
  }, [data, reset, trigger])
  const onSubmit: SubmitHandler<ProfilePayload> = async data => {
    try {
      await apiUpdateProfile({
        userName: data.userName,
        firstName: data.firstName,
        lastName: data.lastName,
        city: data.city,
        country: data.country,
        region: data.region,
        dateOfBirth: data.dateOfBirth,
        aboutMe: data.aboutMe,
      }).unwrap()
      reset(getValues())
      alert('✅ Всё отлично! Профиль успешно обновлён.')
    } catch (err) {
      // const field = err?.data?.messages[0].field as 'email' | 'userName' | undefined
      // const message = err?.data?.messages[0].message ?? 'Something went wrong'
      //
      // if (field === 'email') {
      //   setError('email', { type: 'server', message })
      // }
      // if (field === 'userName') {
      //   setError('userName', { type: 'server', message })
      // }
      console.error('Profile error:', err)
    }
  }

  return (
    <div className={s.wrapper}>
      <UploadingPhotos />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={s.textFields}>
          <TextField
            label={'Username'}
            required
            {...register('userName')}
            errorMessage={errors.userName?.message}
          />
          <TextField
            label={'First Name'}
            required
            placeholder={'Ivan'}
            {...register('firstName')}
            errorMessage={errors.firstName?.message}
          />
          <TextField
            label={'Last Name'}
            required
            placeholder={'Ivanov'}
            {...register('lastName')}
            errorMessage={errors.lastName?.message}
          />
          <TextField
            className={s.inputDate}
            label={'Date of birth'}
            type={'date'}
            placeholder={'YYYY-MM-DD'}
            {...register('dateOfBirth')}
            errorMessage={errors.dateOfBirth?.message}
          />

          <div className={s.location}>
            <TextField
              className={s.country}
              label={'Select your country'}
              placeholder={'Belarus'}
              {...register('country')}
              errorMessage={errors.country?.message}
            />
            <TextField
              label={'Select your city'}
              placeholder={'Minsk'}
              {...register('city')}
              errorMessage={errors.city?.message}
            />
          </div>
          <TextField
            className={s.aboutMe}
            label={'About Me'}
            placeholder={'Write something'}
            {...register('aboutMe')}
            errorMessage={errors.aboutMe?.message}
          />
        </div>
        <hr className={s.divider} />
        <div className={s.buttonSave}>
          <Button
            type={'submit'}
            variant={'primary'}
            disabled={!isValid || !isDirty || isSubmitting}
          >
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  )
}
