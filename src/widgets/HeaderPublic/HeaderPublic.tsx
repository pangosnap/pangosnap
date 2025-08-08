import { clsx } from 'clsx'

import s from './HeaderPublic.module.scss'

export const HeaderPublic = () => {
  return (
    <header className={clsx(s.header)}>
      <section className={'l-container'}>
        <div className={s.content}>
          <p className={'uik_typography-display-large'}>Pangosnap</p>
          <div className={s.actions}>
            <div className={s.notification}>
              🔔<span className={s.badge}>3</span>
            </div>
            <div className={s.language}>🌐 English ▼</div>
          </div>
        </div>
      </section>
    </header>
  )
}
