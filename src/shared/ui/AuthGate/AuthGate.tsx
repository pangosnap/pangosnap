'use client'

import { ReactNode, useEffect, useMemo, useState } from 'react'

import { useMeQuery } from '@/features/auth/api/authRegApi'
import { useAppDispatch } from '@/shared/hooks'
import { useSelectedLayoutSegments } from 'next/navigation'

type Props = {
  children: ReactNode
}

export const AuthGate = ({ children }: Props) => {
  const [isInitialized, setIsInitialized] = useState(false)
  // const token = typeof window !== 'undefined' ? localStorage.getItem('access-token') : null
  // const skip = useMemo(() => !token, [token])

  const dispatch = useAppDispatch()
  // RTK Query вызовется только если skip === false
  const { data, isLoading, isFetching, isError } = useMeQuery(undefined, {
    // skip,
    refetchOnFocus: false,
    refetchOnReconnect: false,
  })
  const segments = useSelectedLayoutSegments()
  const root = segments[0] ?? ''
  const isPostPublic = root === 'post'

  useEffect(() => {
    if (isLoading) {
      return
    }
    setIsInitialized(true)
  }, [isLoading])

  if (!isInitialized && !isPostPublic) {
    return <div>Loading...</div>
  }

  return children
}
