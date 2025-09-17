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
    <div className={clsx(s.base__wrap)}>
      <Header isAuth={!!data} />
      <div className={clsx(s.base__container, !!data && s['base__container--withSidebar'])}>
        {!!data && <Sidebar />}
        <main className={s.base__content}>{children}</main>
      </div>
    </div>
  )
}
