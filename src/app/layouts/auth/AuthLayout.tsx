'use client'
import { ReactNode } from 'react'

import { useMeQuery } from '@/features/auth/api/authRegApi'
import { Header } from '@/widgets/Header/Header'

export function AuthLayout({ children }: { children: ReactNode }) {
  const { data } = useMeQuery()

  return (
    <div className={'wrap'}>
      <Header isAuth={false} isProcessingAuth />
      <div className={'l-container'}>
        <main className={'l-centered page-public'}>{children}</main>
      </div>
    </div>
  )
}
