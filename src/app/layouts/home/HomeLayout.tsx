'use client'
import { ReactNode } from 'react'

import { selectIsLoggedIn } from '@/features/auth/slice/authSlice'
import { useAppSelector } from '@/shared/hooks'
import { Header } from '@/widgets/Header/Header'
import { Sidebar } from '@/widgets/Sidebar/Sidebar'
import { clsx } from 'clsx'

import s from './HomeLayout.module.scss'

export default function HomeLayout({ children }: { children: ReactNode }) {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  return (
    <div className={'wrap'}>
      <Header isLoggedIn={isLoggedIn} />
      <div className={clsx(s.content, 'l-container')}>
        {isLoggedIn && <Sidebar />}
        <main className={'container'}>{children}</main>
      </div>
    </div>
  )
}
