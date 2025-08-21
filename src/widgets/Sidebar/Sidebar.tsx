'use client'

import { useLogoutMutation } from '@/features/auth/api/authRegApi'
import LogoutIcon from '@/shared/icons/logout.svg'
import { Path } from '@/shared/routes/constants'
import { clsx } from 'clsx'
import { useRouter } from 'next/navigation'

import s from './Sidebar.module.scss'

export const Sidebar = () => {
  const router = useRouter()
  const [logout] = useLogoutMutation()

  const logoutHandler = async () => {
    try {
      await logout().unwrap()
      router.replace(`${Path.signIn}?from=logout`)
    } catch (err) {
      console.error('Logout error:', err)
    }
  }

  return (
    <aside className={clsx(s.sidebar, 'uik_typography-body2-medium')}>
      <nav>NAV MENU</nav>
      <div className={s.logout} onClick={logoutHandler}>
        <LogoutIcon /> Log Out
      </div>
    </aside>
  )
}
