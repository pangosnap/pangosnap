import { useState } from 'react'

import { useLogoutMutation } from '@/features/auth/api/authRegApi'
import LogoutIcon from '@/shared/icons/logout.svg'
import { Path } from '@/shared/routes/constants'
import { Button } from '@/shared/ui/Button/Button'
import { UniversalModal } from '@/shared/ui/UniversalModal/UniversalModal'
import { useRouter } from 'next/navigation'

import s from '@/widgets/Sidebar/Sidebar.module.scss'

export const LogOut = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [logout] = useLogoutMutation()
  const router = useRouter()

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
    <>
      <Button
        onClick={() => setIsModalOpen(true)}
        variant={'icon'}
        className={s.rowBtn}
        aria-label={'Logout'}
      >
        <LogoutIcon className={s.iconBtn} />
        <span className={'uik_typography-body2-medium'}>Log Out</span>
      </Button>
      {isModalOpen && (
        <UniversalModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          modalTitle={'Confirm logout'}
          onConfirm={logoutHandler}
        >
          Are you really want to log out of your account?
        </UniversalModal>
      )}
    </>
  )
}
