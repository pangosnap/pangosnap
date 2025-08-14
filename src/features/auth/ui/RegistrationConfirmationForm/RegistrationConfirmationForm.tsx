'use client'
import { useEffect } from 'react'

import { useConfirmRegistrationMutation } from '@/features/auth/api/authRegApi'
import { Button } from '@/shared/ui/Button/Button'

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
      <Button variant={'primary'} onClick={onSignInAction}>
        Sign In
      </Button>
    )
  }

  return null
}
