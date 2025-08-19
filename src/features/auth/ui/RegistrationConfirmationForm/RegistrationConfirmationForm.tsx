'use client'
import { useEffect } from 'react'

import { useConfirmRegistrationMutation } from '@/features/auth/api/authRegApi'
import { Button } from '@/shared/ui/Button/Button'
import { clsx } from 'clsx'
import Image from 'next/image'

import s from './RegistrationConfirmationForm.module.scss'

type Props = {
  code: string
  onErrorAction?: () => void
  onSignInAction?: () => void
}

export function RegistrationConfirmationForm({ code, onErrorAction, onSignInAction }: Props) {
  const [confirm, { isSuccess, isError, isLoading }] = useConfirmRegistrationMutation()

  useEffect(() => {
    if (code) {
      confirm({ confirmationCode: code })
    }
  }, [code, confirm])

  useEffect(() => {
    if (isError) {
      onErrorAction?.()
    }
  }, [isError, onErrorAction])

  if (isLoading) {
    return <p>We confirm your registration...</p>
  }

  if (isSuccess) {
    return (
      <div className={s.wrapper}>
        <h1 className={clsx('uik_typography-h1')}>Congratulations!</h1>
        <p className={clsx('uik_typography-body1', s.text)}>Your email has been confirmed</p>
        <Button variant={'primary'} onClick={onSignInAction} className={s.signInLink}>
          Sign In
        </Button>
        <Image
          src={'/sign-up/bro.png'}
          alt={'Registration Confirmation'}
          width={432}
          height={300}
        />
      </div>
    )
  }

  return null
}
