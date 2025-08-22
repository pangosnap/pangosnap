'use client'

import { useEffect } from 'react'

import { useGoogleLoginMutation } from '@/features/auth/api/authRegApi'
import { setIsLoggedIn } from '@/features/auth/slice/authSlice'
import { useAppDispatch } from '@/shared/hooks'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export function GoogleAuth() {
  const [googleLogin] = useGoogleLoginMutation()
  const dispatch = useAppDispatch()

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
        dispatch(setIsLoggedIn({ isLoggedIn: true }))
      } catch (e) {
        // console.error(e)
      }
    })()
  }, [code, dispatch, googleLogin, pathname, router])

  return null
}
