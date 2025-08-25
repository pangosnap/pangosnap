'use client'

import { useState } from 'react'

import { useLogoutMutation } from '@/features/auth/api/authRegApi'
import CreateIcon from '@/shared/icons/create-icone.svg'
import LogoutIcon from '@/shared/icons/logout.svg'
import { Path } from '@/shared/routes/constants'
import { Button } from '@/shared/ui/Button/Button'
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
      <nav className={s.nav}>
        <ul className={s.list}>
          <li className={s.item}>
            <span className={'uik_typography-body2-medium'}>Feed</span>
          </li>

          <li className={s.item}>
            <Button variant={'icon'} className={s.iconBtn} aria-label={'Create'}>
              <CreateIcon />
            </Button>
            <span className={'uik_typography-body2-medium'}>Create</span>
          </li>

          <li className={s.item}>
            <span className={'uik_typography-body2-medium'}>My Profile</span>
          </li>

          <li className={s.item}>
            <span className={'uik_typography-body2-medium'}>Messenger</span>
          </li>

          <li className={s.item}>
            <span className={'uik_typography-body2-medium'}>Search</span>
          </li>

          <li className={s.item}>
            <span className={'uik_typography-body2-medium'}>Statistics</span>
          </li>

          <li className={s.item}>
            <span className={'uik_typography-body2-medium'}>Favorites</span>
          </li>

          <li onClick={() => setIsModalOpen(true)} className={s.item}>
            <Button variant={'icon'} className={s.iconBtn} aria-label={'Create'}>
              <LogoutIcon />
            </Button>
            <span className={'uik_typography-body2-medium'}>Log Out</span>
          </li>
        </ul>
      </nav>

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
