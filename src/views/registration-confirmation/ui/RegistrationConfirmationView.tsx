'use client'

import { RegistrationConfirmationForm } from '@/features/auth/ui/RegistrationConfirmationForm/RegistrationConfirmationForm'
import { Path } from '@/shared/route/constants'
import { useRouter } from 'next/navigation'

type Props = {
  code: string
}

export function RegistrationConfirmationView({ code }: Props) {
  const router = useRouter()

  return (
    <RegistrationConfirmationForm
      code={code}
      onErrorAction={() => router.replace(Path.recallEmail)}
      onSignInAction={() => router.replace(Path.signIn)}
    />
  )
}
