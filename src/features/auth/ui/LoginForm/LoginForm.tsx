'use client'

import { SubmitHandler, useForm } from 'react-hook-form'

import { useLoginMutation } from '@/features/auth/api/authRegApi'
import { LoginInputs, loginSchema } from '@/features/auth/api/lib/schemas/loginSchema'
import { GoogleAuth } from '@/features/auth/ui/LoginForm/GoogleAuth/GoogleAuth'
import GitHubIcon from '@/shared/icons/github.svg'
import { Button } from '@/shared/ui/Button/Button'
import { Card } from '@/shared/ui/Card'
import { TextField } from '@/shared/ui/TextField'
import { zodResolver } from '@hookform/resolvers/zod'
import { clsx } from 'clsx'
import Link from 'next/link'

import s from './LoginForm.module.scss'

export const LoginForm = () => {
  const [login] = useLoginMutation()

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, touchedFields },
    trigger,
  } = useForm<LoginInputs>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
  })

  const onSubmit: SubmitHandler<LoginInputs> = async data => {
    try {
      const response = await login(data).unwrap()

      localStorage.setItem('access-token', response.accessToken)
      reset()
    } catch (err) {
      console.error('Login error:', err)
    }
  }

  return (
    <div className={s.wrapper}>
      <Card title={'Sign In'}>
        <div className={s.oAuthIcons}>
          <GoogleAuth />
          <GitHubIcon />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
          <div className={s.textFields}>
            <TextField
              label={'email'}
              placeholder={'Epam@epam.com'}
              {...register('email', {
                onChange: () => {
                  if (touchedFields.email) {
                    void trigger('email')
                  }
                },
              })}
              errorMessage={errors.email?.message}
            />
            <TextField
              type={'password'}
              label={'Password'}
              placeholder={'**********'}
              {...register('password', {
                onChange: () => {
                  if (touchedFields.password) {
                    void trigger('password')
                  }
                },
              })}
              errorMessage={errors.password?.message}
            />
          </div>
          <Link
            href={'/forgot-password'}
            className={clsx('uik_typography-body2', s.forgotPasswordLink)}
          >
            Forgot Password
          </Link>
          <Button fullWidth type={'submit'}>
            Sign In
          </Button>
          <p className={clsx('uik_typography-body1', s.text)}>Don’t have an account?</p>
          <Button as={Link} href={'/sign-up'} variant={'text'}>
            Sign Up
          </Button>
        </form>
      </Card>
    </div>
  )
}
