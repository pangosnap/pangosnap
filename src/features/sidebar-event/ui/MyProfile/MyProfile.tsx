import { useMeQuery } from '@/features/auth/api/authRegApi'
import ProfileIcon from '@/shared/icons/profile-icon.svg'
import { Path } from '@/shared/routes/constants'
import { Button } from '@/shared/ui/Button/Button'
import { useRouter } from 'next/navigation'

import s from '@/widgets/Sidebar/Sidebar.module.scss'

export const MyProfile = () => {
  const router = useRouter()
  const { data: userId } = useMeQuery(undefined, {
    selectFromResult: ({ data }) => ({ data: data?.userId }),
  })
  const handleProfileClick = () => {
    userId && router.push(Path.profile(userId))
  }

  return (
    <>
      <Button
        onClick={handleProfileClick}
        variant={'icon'}
        className={s.rowBtn}
        aria-label={'MyProfile'}
      >
        <ProfileIcon className={s.iconBtn} />
        <span className={'uik_typography-body2-medium'}>My Profile</span>
      </Button>
    </>
  )
}
