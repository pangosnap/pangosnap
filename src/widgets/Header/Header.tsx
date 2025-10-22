import { type KeyboardEvent } from 'react'

import { Path } from '@/shared/routes/constants'
import { Button } from '@/shared/ui/Button/Button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import s from './Header.module.scss'

type Props = {
  isAuth: boolean
  isLoading?: boolean
  isProcessingAuth?: boolean
}
export const Header = ({ isAuth, isLoading, isProcessingAuth = false }: Props) => {
  const router = useRouter()
  const handleLogoClick = () => {
    router.push(Path.main)
  }
  const handleLogoKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleLogoClick()
    }
  }

  return (
    <header className={s.header}>
      <div className={'l-container'}>
        <div className={s.content}>
          <h1
            className={`uik_typography-display-large ${s.logo}`}
            onClick={handleLogoClick}
            onKeyDown={handleLogoKeyDown}
            tabIndex={0}
            role={'button'}
            aria-label={'Pangosnap - Go to homepage'}
          >
            Pangosnap
          </h1>
          <div className={s.actions}>
            {/*{isAuth && (
              <div className={s.notification}>
                <NotificationIcon />
                <span className={clsx(s.badge)}>3</span>
              </div>
            )}
            <div className={s.language}>🌐 English ▼</div>*/}
            {!isAuth && !isProcessingAuth && !isLoading && (
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
