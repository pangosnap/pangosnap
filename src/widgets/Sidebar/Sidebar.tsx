'use client'

import { AddPostWithPhoto } from '@/features/sidebar-event/ui/AddPostWithPhoto/AddPostWithPhoto'
import { LogOut } from '@/features/sidebar-event/ui/LogOut/LogOut'
import { MyProfile } from '@/features/sidebar-event/ui/MyProfile/MyProfile'
import { clsx } from 'clsx'

import s from './Sidebar.module.scss'

export const Sidebar = () => {
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

          <li className={s.item}>
            <MyProfile />
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
