'use client'

import { useConfirmRegistrationMutation } from '@/features/auth/api/authRegApi'
import { Button } from '@/shared/ui/Button/Button'
import { useRouter, useSearchParams } from 'next/navigation'

export const RegistrationConfirmationForm = () => {
  const [confirm, { isLoading, error }] = useConfirmRegistrationMutation()
  const searchParams = useSearchParams()
  const router = useRouter()

  const confirmationCode = searchParams.get('code')

  const signInHandler = async () => {
    if (confirmationCode) {
      try {
        const res = await confirm({ confirmationCode }).unwrap()

        router.push('/sign-in')
      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <Button variant={'primary'} onClick={signInHandler}>
      Sign In
    </Button>
  )
}
// 'use client'
// import { useEffect } from 'react'
//
// import { useConfirmRegistrationMutation } from '@/features/auth/api/baseAuthApi'
// import { Button } from '@/shared/ui/Button/Button'
// import { useRouter, useSearchParams } from 'next/navigation'
//
// export const RegistrationConfirmationForm = () => {
//   const [confirm, { isLoading, error }] = useConfirmRegistrationMutation()
//   const searchParams = useSearchParams()
//   const router = useRouter()
//   const confirmationCode = searchParams.get('code')
//
//   useEffect(() => {
//     if (!confirmationCode) {
//       return
//     }
//     ;(async () => {
//       try {
//         await confirm({ confirmationCode }).unwrap()
//       } catch (e) {
//         // здесь можно показать ошибки
//         // console.error('Confirmation failed', e)
//       }
//     })()
//   }, [confirmationCode, confirm])
//
//   return (
//       <Button type={'button'} variant={'secondary'} onClick={() => router.push('/sign-in')}>
//         Sign In
//       </Button>
//   )
// }
