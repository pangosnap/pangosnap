'use client'
import { ReactNode } from 'react'

import { useMeQuery } from '@/features/auth/api/authRegApi'
import { Header } from '@/widgets/Header/Header'
import { Sidebar } from '@/widgets/Sidebar/Sidebar'
import { clsx } from 'clsx'

import s from './BaseLayout.module.scss'

export function BaseLayout({ children }: { children: ReactNode }) {
  const { data } = useMeQuery()

  return (
    <div className={'wrap'}>
      <Header isAuth={!!data} />
      <div className={clsx(s.content, 'l-container')}>
        {!!data && <Sidebar />}
        <main className={'l-container l-centered page-public'}>{children}</main>
      </div>
    </div>
  )
}
