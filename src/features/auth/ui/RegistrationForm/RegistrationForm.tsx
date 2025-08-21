import { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { useRegisterMutation } from '@/features/auth/api/authRegApi'
import {
  RegistrationInputs,
  registrationSchema,
} from '@/features/auth/api/lib/schemas/registrationSchema'
import { GoogleAuth } from '@/features/auth/ui/LoginForm/GoogleAuth/GoogleAuth'
import GitHubIcon from '@/shared/icons/github.svg'
import { Button } from '@/shared/ui/Button/Button'
import { Card } from '@/shared/ui/Card'
import { Checkbox } from '@/shared/ui/Checkbox/Checkbox'
import { TextField } from '@/shared/ui/TextField/TextField'
import { UniversalModal } from '@/shared/ui/UniversalModal/UniversalModal'
import { zodResolver } from '@hookform/resolvers/zod'
import { clsx } from 'clsx'
import Link from 'next/link'

import s from './RegistrationForm.module.scss'

export const RegistrationForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [registerApi] = useRegisterMutation()
  const defaultValues: RegistrationInputs = {
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false,
  }
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isValid },
    setError,
    reset,
  } = useForm<RegistrationInputs>({
    defaultValues,
    mode: 'onChange',
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
      reset(defaultValues)
    } catch (err: any) {
      const field = err?.data?.messages[0].field as 'email' | 'userName' | undefined
      const message = err?.data?.messages[0].message ?? 'Something went wrong'

      if (field === 'email') {
        setError('email', { type: 'server', message })
      }
      if (field === 'userName') {
        setError('userName', { type: 'server', message })
      }
    }
  }

  return (
    <div className={s.wrapper}>
      <Card title={'Sign Up'}>
        <div className={s.oAuthIcons}>
          <GoogleAuth />
          <GitHubIcon />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={s.textFields}>
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
          </div>
          <Controller
            name={'terms'}
            control={control}
            render={({ field }) => (
              <Checkbox
                label={
                  <>
                    I agree to the
                    <Link href={'/terms-of-service'} className={'uik_typography-link-small'}>
                      Terms of Service
                    </Link>
                    and{' '}
                    <Link href={'/privacy-policy'} className={'uik_typography-link-small'}>
                      Privacy Policy
                    </Link>
                  </>
                }
                checked={field.value}
                onChange={field.onChange}
                labelSize={'small'}
                className={s.checkbox}
              />
            )}
          />
          <Button type={'submit'} variant={'primary'} disabled={!isValid} fullWidth>
            Sign Up
          </Button>
          <p className={clsx('uik_typography-body1', s.text)}>Do you have an account?</p>
          <Button as={Link} href={'/sign-in'} variant={'text'} className={s.signInLink}>
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
      </Card>
    </div>
  )
}
