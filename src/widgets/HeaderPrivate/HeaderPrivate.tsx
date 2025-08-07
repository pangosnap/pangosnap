import { clsx } from 'clsx'

import s from './HeaderPrivate.module.scss'

export const HeaderPrivate = () => {
  return (
    <header className={clsx(s.header)}>
      <section className={'l-container'}>
        <p>Pangosnap</p>
      </section>
    </header>
  )
}
