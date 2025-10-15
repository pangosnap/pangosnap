'use client'
import { type ReactNode } from 'react'

import { Header } from '@/widgets/Header/Header'

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className={'wrap'}>
      <Header isAuth={false} isProcessingAuth />
      <div className={'l-container'}>
        <main className={'l-centered page-public'}>{children}</main>
      </div>
    </div>
  )
}
