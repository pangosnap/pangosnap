'use client'

import { useMeQuery } from '@/features/auth/api/authRegApi'
import { AddPostWithPhoto } from '@/features/sidebar-event/ui/AddPostWithPhoto/AddPostWithPhoto'
import { LogOut } from '@/features/sidebar-event/ui/LogOut/LogOut'
import { Path } from '@/shared/routes/constants'
import { clsx } from 'clsx'
import { useRouter } from 'next/navigation'

import s from './Sidebar.module.scss'

export const Sidebar = () => {
  const router = useRouter()
  const { data: userId } = useMeQuery(undefined, {
    selectFromResult: ({ data }) => ({ data: data?.userId }),
  })
  const handleProfileClick = () => {
    userId && router.push(Path.profile(userId))
  }

  return (
    <aside className={clsx(s.sidebar, 'uik_typography-body2-medium')}>
      <nav className={s.nav}>
        <ul className={s.list}>
          <li className={s.item}>
            <span className={'uik_typography-body2-medium'}>Feed</span>
          </li>

          <li className={s.item}>
            <AddPostWithPhoto />
          </li>

          <li className={s.item} onClick={handleProfileClick}>
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

          <li className={s.item}>
            <LogOut />
          </li>
        </ul>
      </nav>
    </aside>
  )
}
