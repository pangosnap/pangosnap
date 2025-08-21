import NotificationIcon from '@/shared/icons/notification.svg'
import { Path } from '@/shared/routes/constants'
import { Button } from '@/shared/ui/Button/Button'
import { clsx } from 'clsx'
import Link from 'next/link'

import s from './Header.module.scss'

type Props = {
  isLoggedIn: boolean
}
export const Header = ({ isLoggedIn }: Props) => {
  return (
    <header className={s.header}>
      <div className={'l-container'}>
        <div className={s.content}>
          <h1 className={'uik_typography-display-large'}>Pangosnap</h1>
          <div className={s.actions}>
            {isLoggedIn && (
              <div className={s.notification}>
                <NotificationIcon />
                <span className={clsx(s.badge)}>3</span>
              </div>
            )}
            <div className={s.language}>🌐 English ▼</div>
            {!isLoggedIn && (
              <div className={s.authLinks}>
                <Button as={Link} href={Path.signIn} variant={'text'}>
                  Log in
                </Button>
                <Button as={Link} href={Path.signUp}>
                  Sign up
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
