// 'use client'
// import { useLogoutMutation } from '@/features/auth/api/authRegApi'
// import { setIsLoggedIn } from '@/features/auth/slice/authSlice'
// import { useAppDispatch } from '@/shared/hooks'
// import LogoutIcon from '@/shared/icons/logout.svg'
// import { clsx } from 'clsx'
// import { useRouter } from 'next/navigation'
//
// import s from './Sidebar.module.scss'
//
// export const Sidebar = () => {
//   const router = useRouter()
//   const [logout] = useLogoutMutation()
//   const dispatch = useAppDispatch()
//
//   const logoutHandler = async () => {
//     try {
//       await logout().unwrap()
//
//       dispatch(setIsLoggedIn({ isLoggedIn: false }))
//       await router.push('/sign-in')
//       localStorage.removeItem('access-token')
//       document.cookie = 'access-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
//     } catch (err) {
//       console.error('Logout error:', err)
//     }
//   }
//
//   return (
//     <aside className={clsx(s.sidebar, 'uik_typography-body2-medium')}>
//       <nav>NAV MENU</nav>
//       <div className={s.logout} onClick={logoutHandler}>
//         <LogoutIcon /> Log Out
//       </div>
//     </aside>
//   )
// }
'use client'

import { useLogoutMutation } from '@/features/auth/api/authRegApi'
import LogoutIcon from '@/shared/icons/logout.svg'
import { clsx } from 'clsx'
import { useRouter } from 'next/navigation'

import s from './Sidebar.module.scss'

export const Sidebar = () => {
  const router = useRouter()
  const [logout] = useLogoutMutation()

  const logoutHandler = async () => {
    try {
      await logout().unwrap()
      router.replace('/sign-in?from=logout')
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
