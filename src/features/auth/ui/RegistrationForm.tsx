'use client'

import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { useRegisterMutation } from '@/features/auth/api/baseAuthApi'
import {
  RegistrationInputs,
  registrationSchema,
} from '@/features/auth/api/lib/schemas/registrationSchema'
import { Button } from '@/shared/ui/Button/Button'
import { Checkbox } from '@/shared/ui/Checkbox/Checkbox'
import { TextField } from '@/shared/ui/TextField/TextField'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'

export const RegistrationForm = () => {
  const router = useRouter()
  const [registerApi, { isLoading, error }] = useRegisterMutation()
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<RegistrationInputs>({
    defaultValues: {
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: false,
    },
    resolver: zodResolver(registrationSchema),
  })

  const onSubmit: SubmitHandler<RegistrationInputs> = async data => {
    try {
      const result = await registerApi({
        userName: data.userName,
        email: data.email,
        password: data.password,
        baseUrl: window.location.origin,
      }).unwrap()

      console.log('Server response:', result)
      // например, после успешной регистрации редирект:
      // router.push('/sign-in')
    } catch (err) {
      console.error('Registration error:', err)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label={'Username'}
        placeholder={'Pangosnap'}
        {...register('userName')}
        errorMessage={errors.userName?.message}
      />

      <TextField
        type={'text'}
        label={'Email'}
        placeholder={'pangosnap@gmail.com'}
        {...register('email')}
        errorMessage={errors.email?.message}
      />
      <TextField
        type={'password'}
        label={'Password'}
        placeholder={'*********'}
        {...register('password')}
        errorMessage={errors.password?.message}
      />
      <TextField
        type={'password'}
        label={'Password confirmation'}
        placeholder={'*********'}
        {...register('confirmPassword')}
        errorMessage={errors.confirmPassword?.message}
      />
      <Controller
        name={'terms'}
        control={control}
        render={({ field }) => (
          <Checkbox
            label={'I agree to the Terms of Service and Privacy Policy'}
            checked={field.value}
            onChange={field.onChange}
          />
        )}
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
