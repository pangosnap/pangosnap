'use client'

import { SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@/shared/ui/Button/Button'
import { Checkbox } from '@/shared/ui/Checkbox/Checkbox'
import { TextField } from '@/shared/ui/TextField/TextField'
import { useRouter } from 'next/navigation'

export type FormData = {
  username: string
  email: string
  password: string
  confirmPassword: string
  terms: boolean
}

export const RegistrationForm = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({ mode: 'onBlur' })

  const password = watch('password', '')

  const onSubmit: SubmitHandler<FormData> = data => {
    console.log('Форма:', data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label={'Username'}
        placeholder={'Pangosnap'}
        {...register('username', { required: 'Введи' })}
        errorMessage={errors.username?.message}
      />

      <TextField
        type={'email'}
        label={'Email'}
        placeholder={'pangosnap@gmail.com'}
        {...register('email', {
          required: 'Введи Email',
        })}
        errorMessage={errors.email?.message}
      />
      <TextField
        type={'password'}
        label={'Password'}
        placeholder={'*********'}
        {...register('password', {
          required: 'Введи Pass',
        })}
        errorMessage={errors.password?.message}
      />
      <TextField
        type={'password'}
        label={'Password confirmation'}
        placeholder={'*********'}
        {...register('confirmPassword', {
          required: 'Подтвердите пароль',
          validate: value => value === password || 'Пароли не совпадают',
        })}
        errorMessage={errors.confirmPassword?.message}
      />
      <Checkbox
        onChange={checked => true}
        label={'I agree to the Terms of Service and Privacy Policy'}
      />
      <Button type={'submit'} variant={'primary'}>
        Sign Up
      </Button>
      <Button type={'button'} variant={'secondary'} onClick={() => router.push('#')}>
        Sign In
      </Button>
    </form>
  )
}
