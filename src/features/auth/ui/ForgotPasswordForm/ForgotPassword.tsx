'use client'

import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import {
  useRecoveryPasswordMutation,
  useResendRecoveryPasswordMutation,
} from '@/features/auth/api/authRegApi'
import {
  PasswordRecoveryInputs,
  passwordRecoverySchema,
} from '@/features/auth/api/lib/schemas/passwordRecoverySchema'
import { Button } from '@/shared/ui/Button/Button'
import { Card } from '@/shared/ui/Card'
import { TextField } from '@/shared/ui/TextField'
import { UniversalModal } from '@/shared/ui/UniversalModal/UniversalModal'
import { zodResolver } from '@hookform/resolvers/zod'
import { clsx } from 'clsx'
import Link from 'next/link'

import s from './ForgotPassword.module.scss'

export default function ForgotPasswordForm() {
  const [recoveryPassword] = useRecoveryPasswordMutation()
  const [resendRecoveryPassword] = useResendRecoveryPasswordMutation()
  const [serverError, setServerError] = useState<undefined | string>(undefined)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLetterSent, setLetterSent] = useState(false)
  const [userEmail, setUserEmail] = useState('')

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, touchedFields },
    trigger,
  } = useForm<PasswordRecoveryInputs>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(passwordRecoverySchema),
    mode: 'onBlur',
  })

  const onSubmit: SubmitHandler<PasswordRecoveryInputs> = async data => {
    setServerError(undefined)

    try {
      if (!isLetterSent) {
        await recoveryPassword({
          ...data,
          baseUrl: `${window.location.origin}/password-recovery/create-new-password`,
        }).unwrap()
      } else {
        await resendRecoveryPassword({
          ...data,
          baseUrl: `${window.location.origin}/password-recovery/create-new-password`,
        }).unwrap()
      }

      setUserEmail(data.email)
      setIsModalOpen(true)
      reset()
    } catch (err: any) {
      if (err.data?.messages?.[0]?.message) {
        setServerError(err.data.messages[0].message)
      } else {
        setServerError('An unknown error occurred')
      }
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setLetterSent(true)
  }

  return (
    <div className={s.wrapper}>
      <Card title={'Forgot Password'}>
        <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
          <div className={s.textFields}>
            <TextField
              label={'Email'}
              placeholder={'Epam@epam.com'}
              {...register('email', {
                onChange: () => {
                  if (touchedFields.email) {
                    void trigger('email')
                    setServerError(undefined)
                  }
                },
              })}
              errorMessage={errors.email?.message || serverError}
            />
            <div className={clsx('uik_typography-body2', s.instruction)}>
              Enter your email address and we will send you further instructions
            </div>
          </div>
          {isLetterSent && (
            <div className={clsx('uik_typography-body2', s.text)}>
              The link has been sent by email. If you don’t receive an email send link again
            </div>
          )}
          <div className={s.buttonsBlock}>
            <Button fullWidth type={'submit'}>
              {!isLetterSent ? 'Send Link' : 'Send Link Again'}
            </Button>
            <Button as={Link} href={'/sign-in'} variant={'text'}>
              Back to Sign In
            </Button>
          </div>
        </form>
        {!isLetterSent && <div className={s.captchaBlock}>captcha</div>}
      </Card>

      <UniversalModal
        open={isModalOpen}
        onClose={handleCloseModal}
        modalTitle={'Email sent'}
        size={'sm'}
      >
        We have sent a link to confirm your email to {userEmail}
      </UniversalModal>
    </div>
  )
}
