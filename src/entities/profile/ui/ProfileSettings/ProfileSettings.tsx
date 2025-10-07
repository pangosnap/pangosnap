'use client'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useGetProfileQuery, useUpdateProfileMutation } from '@/entities/profile/api/profileApi'
import { UpdateProfileInput } from '@/entities/profile/type/types'
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
    control,
    watch,
    formState: { errors, isValid },
    setError,
    reset,
  } = useForm<UpdateProfileInput>({
    mode: 'onChange',
    // resolver: zodResolver(registrationSchema),
  })

  const onSubmit: SubmitHandler<UpdateProfileInput> = async data => {
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
      alert('✅ Всё отлично! Профиль успешно обновлён.')
    } catch (err: any) {
      // const field = err?.data?.messages[0].field as 'email' | 'userName' | undefined
      // const message = err?.data?.messages[0].message ?? 'Something went wrong'
      //
      // if (field === 'email') {
      //   setError('email', { type: 'server', message })
      // }
      // if (field === 'userName') {
      //   setError('userName', { type: 'server', message })
      // }
    }
  }

  return (
    <div className={s.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={s.textFields}>
          <TextField
            label={'Username'}
            required
            defaultValue={data?.userName}
            {...register('userName')}
            errorMessage={errors.userName?.message}
          />
          <TextField
            label={'First Name'}
            required
            placeholder={'Ivan'}
            defaultValue={data?.firstName}
            {...register('firstName')}
            errorMessage={errors.firstName?.message}
          />
          <TextField
            label={'Last Name'}
            required
            placeholder={'Ivanov'}
            defaultValue={data?.lastName}
            {...register('lastName')}
            errorMessage={errors.lastName?.message}
          />
          <TextField
            label={'Date of birth'}
            placeholder={'2001-01-21'}
            defaultValue={data?.dateOfBirth}
            {...register('dateOfBirth')}
            errorMessage={errors.dateOfBirth?.message}
          />
          <div className={s.location}>
            <TextField
              className={s.country}
              label={'Select your country'}
              placeholder={'Belarus'}
              defaultValue={data?.country}
              {...register('country')}
              errorMessage={errors.country?.message}
            />
            <TextField
              label={'Select your city'}
              placeholder={'Minsk'}
              defaultValue={data?.city}
              {...register('city')}
              errorMessage={errors.city?.message}
            />
          </div>
          <TextField
            className={s.aboutMe}
            label={'About Me'}
            placeholder={'Write something'}
            defaultValue={data?.aboutMe}
            {...register('aboutMe')}
            errorMessage={errors.aboutMe?.message}
          />
        </div>
        <hr className={s.divider} />
        <div className={s.buttonSave}>
          <Button type={'submit'} variant={'primary'} disabled={!isValid}>
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  )
}
