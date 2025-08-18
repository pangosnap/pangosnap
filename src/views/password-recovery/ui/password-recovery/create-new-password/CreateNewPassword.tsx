'use client'

import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useCreateNewPasswordMutation } from '@/features/auth/api/authRegApi'
import {
  CreateNewPasswordInputs,
  createNewPasswordSchema,
} from '@/features/auth/api/lib/schemas/passwordRecoverySchema'
import { Button } from '@/shared/ui/Button/Button'
import { Card } from '@/shared/ui/Card'
import { TextField } from '@/shared/ui/TextField'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'

import s from '../ForgotPassword.module.scss'

export default function CreateNewPassword() {
  const [createNewPassword] = useCreateNewPasswordMutation()
  const searchParams = useSearchParams()
  const recoveryCode = searchParams.get('code')
  const router = useRouter()

  const [serverError, setServerError] = useState<undefined | string>(undefined)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateNewPasswordInputs>({
    resolver: zodResolver(createNewPasswordSchema),
    mode: 'onBlur',
  })

  const onSubmit: SubmitHandler<CreateNewPasswordInputs> = async data => {
    setServerError(undefined)
    try {
      recoveryCode &&
        (await createNewPassword({
          ...data,
          recoveryCode,
        }).unwrap())

      router.push('/sign-in')
    } catch (err: any) {
      if (err.data?.messages?.[0]?.message) {
        setServerError(err.data.messages[0].message)
      } else {
        setServerError('An unknown error occurred')
      }
    }
  }

  return (
    <div className={s.wrapper}>
      <Card title={'Create New Password'}>
        <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
          <div className={s.textFields}>
            <TextField
              type={'password'}
              label={'New password'}
              placeholder={'********************'}
              {...register('newPassword')}
              errorMessage={errors.newPassword?.message || serverError}
            />
            <TextField
              type={'password'}
              label={'Password confirmation'}
              placeholder={'********************'}
              {...register('passwordConfirmation')}
              errorMessage={errors.passwordConfirmation?.message}
            />
            <p className={s.instruction}>Your password must be between 6 and 20 characters</p>
          </div>
          <Button fullWidth type={'submit'}>
            Create new password
          </Button>
        </form>
      </Card>
    </div>
  )
}
