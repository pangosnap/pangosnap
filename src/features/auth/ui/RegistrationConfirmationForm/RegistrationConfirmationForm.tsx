'use client'

import { useEffect } from 'react'

import { useConfirmRegistrationMutation } from '@/features/auth/api/authRegApi'
import { Button } from '@/shared/ui/Button/Button'
import { useRouter, useSearchParams } from 'next/navigation'

export const RegistrationConfirmationForm = () => {
  const [confirm, { error }] = useConfirmRegistrationMutation()
  const searchParams = useSearchParams()
  const router = useRouter()

  const confirmationCode = searchParams.get('code')

  useEffect(() => {
    if (!confirmationCode) {
      router.push('/recall-email')

      return
    }
    ;(async () => {
      try {
        await confirm({ confirmationCode }).unwrap()
      } catch (error: any) {
        if (error) {
          router.push('/recall-email')
        }
      }
    })()
  }, [confirm, confirmationCode, error, router])

  return <Button variant={'primary'}>Sign In</Button>
}
