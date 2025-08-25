'use client'

import { useEffect } from 'react'

import { useGoogleLoginMutation, useLazyMeQuery, useMeQuery } from '@/features/auth/api/authRegApi'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export function GoogleAuth() {
  const [googleLogin] = useGoogleLoginMutation()
  const [fetchMe] = useLazyMeQuery()

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
        await fetchMe().unwrap()
        router.replace(pathname)
      } catch (e) {
        // console.error(e)
      }
    })()
  }, [code])

  return null
}
