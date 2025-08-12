import { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { useRegisterMutation } from '@/features/auth/api/authRegApi'
import {
  RegistrationInputs,
  registrationSchema,
} from '@/features/auth/api/lib/schemas/registrationSchema'
import { Button } from '@/shared/ui/Button/Button'
import { Checkbox } from '@/shared/ui/Checkbox/Checkbox'
import { TextField } from '@/shared/ui/TextField/TextField'
import { UniversalModal } from '@/shared/ui/UniversalModal/UniversalModal'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'

import s from './RegistrationForm.module.scss'

export const RegistrationForm = () => {
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [registerApi, { isLoading, error }] = useRegisterMutation()
  const {
    register,
    handleSubmit,
    control,
    watch,
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
  const emailValue = watch('email')

  const onSubmit: SubmitHandler<RegistrationInputs> = async data => {
    try {
      await registerApi({
        userName: data.userName,
        email: data.email,
        password: data.password,
        baseUrl: 'http://localhost:3000/registration-confirmation',
      }).unwrap()

      setIsModalOpen(true)
    } catch (err) {
      console.error('Registration error:', err)
    }
  }

  return (
    <>
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
        <Button type={'button'} variant={'secondary'} onClick={() => router.push('/sign-in')}>
          Sign In
        </Button>
      </form>
      {isModalOpen && (
        <UniversalModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          modalTitle={'Email sent'}
          size={'sm'}
          overlayDarkClass={s.OverlayModal}
        >
          We have sent a link to confirm your email to {emailValue}
        </UniversalModal>
      )}
    </>
  )
}
