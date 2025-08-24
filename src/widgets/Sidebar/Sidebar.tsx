'use client'

import { useState } from 'react'

import { useLogoutMutation } from '@/features/auth/api/authRegApi'
import LogoutIcon from '@/shared/icons/logout.svg'
import { Path } from '@/shared/routes/constants'
import { UniversalModal } from '@/shared/ui/UniversalModal/UniversalModal'
import { clsx } from 'clsx'
import { useRouter } from 'next/navigation'

import s from './Sidebar.module.scss'

export const Sidebar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const router = useRouter()
  const [logout] = useLogoutMutation()

  const logoutHandler = async () => {
    try {
      await logout().unwrap()
      router.replace(`${Path.signIn}?from=logout`)
      localStorage.removeItem('access-token')
    } catch (err) {
      console.error('Logout error:', err)
    }
  }

  return (
    <aside className={clsx(s.sidebar, 'uik_typography-body2-medium')}>
      <nav>NAV MENU</nav>
      <div className={s.logout} onClick={() => setIsModalOpen(true)}>
        <LogoutIcon /> Log Out
      </div>
      <UniversalModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        modalTitle={'Confirm logout'}
        onConfirm={logoutHandler}
      >
        Are you really want to log out of your account?
      </UniversalModal>
    </aside>
  )
}
