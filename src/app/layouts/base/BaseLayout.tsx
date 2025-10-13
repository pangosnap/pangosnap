'use client'
import type { ReactNode } from 'react'

import { useMeQuery } from '@/features/auth/api/authRegApi'
import { Header } from '@/widgets/Header/Header'
import { Sidebar } from '@/widgets/Sidebar/Sidebar'
import { clsx } from 'clsx'

import s from './BaseLayout.module.scss'

export function BaseLayout({ children }: { children: ReactNode }) {
  const { data, isLoading } = useMeQuery()

  return (
    <div className={clsx(s.base__wrap)}>
      <Header isAuth={!!data} isLoading={isLoading} />
      <div className={s.base__container}>
        <div
          className={clsx(
            s.base__sidebar,
            data ? s['base__sidebar--visible'] : s['base__sidebar--hidden']
          )}
        >
          <Sidebar />
        </div>
        <main className={s.base__content}>{children}</main>
        <div></div>
      </div>
    </div>
  )
}
