'use client'

import { ReactNode, useEffect, useMemo, useState } from 'react'

import { useMeQuery } from '@/features/auth/api/authRegApi'
import { useAppDispatch } from '@/shared/hooks'

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

  useEffect(() => {
    if (isLoading) {
      return
    }
    setIsInitialized(true)
  }, [isLoading])

  if (!isInitialized) {
    return <div>Loading...</div>
  }

  return children
}
