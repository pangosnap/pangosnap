'use client'
import { useEffect } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'

import { useGetProfileQuery, useUpdateProfileMutation } from '@/entities/profile/api/profileApi'
import { UploadingPhotos } from '@/entities/profile/ui/ProfileSettings/UploadingPhotos/UploadingPhotos'
import {
  type ProfilePayload,
  profileSchema,
} from '@/entities/profile/ui/ProfileSettings/lib/profileSchema'
import { Button } from '@/shared/ui/Button/Button'
import { TextField } from '@/shared/ui/TextField'
import { zodResolver } from '@hookform/resolvers/zod'

import s from './GeneralInfo.module.scss'

export const GeneralInfoContent = () => {
  const [apiUpdateProfile] = useUpdateProfileMutation()
  const { data } = useGetProfileQuery()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty, isSubmitting },
    reset,
    trigger,
    getValues,
    watch,
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
      console.error('Profile error:', err)
    }
  }

  const countryOptions = [
    { label: 'Belarus', value: 'Belarus' },
    { label: 'Russia', value: 'Russia' },
  ]

  const cityOptionsMap: Record<string, { label: string; value: string }[]> = {
    Belarus: [
      { label: 'Minsk', value: 'Minsk' },
      { label: 'Vitebsk', value: 'Vitebsk' },
      { label: 'Brest', value: 'Brest' },
    ],
    Russia: [
      { label: 'Moscow', value: 'Moscow' },
      { label: 'Saint Petersburg', value: 'Saint Petersburg' },
      { label: 'Krasnodar', value: 'Krasnodar' },
    ],
  }

  const countryValue = watch('country')
  const cityOptions = cityOptionsMap[countryValue || ''] ?? []

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
              type={'select'}
              className={s.country}
              label={'Select your country'}
              placeholder={'Belarus'}
              options={countryOptions}
              {...register('country')}
              errorMessage={errors.country?.message}
            />
            <TextField
              type={'select'}
              label={'Select your city'}
              placeholder={'Minsk'}
              options={cityOptions}
              disabled={!countryValue}
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
