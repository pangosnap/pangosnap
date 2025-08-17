'use client'

import { useEffect } from 'react'

import { useGoogleLoginMutation } from '@/features/auth/api/authRegApi'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export function GoogleAuth() {
  const [googleLogin] = useGoogleLoginMutation()

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const code = searchParams.get('code')

  useEffect(() => {
    if (!code) {
      return
    }
    ;(async () => {
      try {
        const { accessToken } = await googleLogin({ code }).unwrap()

        localStorage.setItem('access-token', accessToken)

        router.replace(pathname)
      } catch (e) {
        // console.error(e)
      }
    })()
  }, [code, googleLogin, pathname, router])

  return null
}
