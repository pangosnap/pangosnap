'use client'

import { RegistrationConfirmationForm } from '@/features/auth/ui/RegistrationConfirmationForm/RegistrationConfirmationForm'
import { useRouter } from 'next/navigation'

type Props = {
  code: string
}

export function RegistrationConfirmationView({ code }: Props) {
  const router = useRouter()

  return (
    <RegistrationConfirmationForm
      code={code}
      onErrorAction={() => router.replace('/recall-email')}
      onSignInAction={() => router.replace('/sign-in')}
    />
  )
}
