'use client'

import { ReactNode, useMemo } from 'react'

import { useMeQuery } from '@/features/auth/api/authRegApi'

type Props = {
  children: ReactNode
}

export const AuthGate = ({ children }: Props) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('access-token') : null
  const skip = useMemo(() => !token, [token])

  // RTK Query вызовется только если skip === false
  const { data, isFetching, isError } = useMeQuery(undefined, {
    skip,
    refetchOnFocus: false,
    refetchOnReconnect: false,
  })

  return children
}
