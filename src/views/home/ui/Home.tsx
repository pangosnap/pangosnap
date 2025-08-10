'use client'

import { useEffect } from 'react'

import { HeaderPublic } from '@/widgets/HeaderPublic/HeaderPublic'
import { useRouter, useSearchParams } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const confirmationCode = searchParams.get('code')
  const email = searchParams.get('email')

  useEffect(() => {
    if (confirmationCode && email) {
      const q = new URLSearchParams({
        code: confirmationCode,
        email,
      }).toString()

      router.replace(`/sign-up/recall-email?${q}`)
    }
  }, [confirmationCode, email, router])

  return (
    <div className={'l-wrap'}>
      <HeaderPublic />
      <main className={'l-container l-centered page-public'} />
    </div>
  )
}
