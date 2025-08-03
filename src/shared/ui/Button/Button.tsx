import { ComponentPropsWithoutRef } from 'react'

import { clsx } from 'clsx'

import s from './Button.module.scss'

type Props = {
  variant?: 'primary' | 'secondary' | 'outlined' | 'text'
} & ComponentPropsWithoutRef<'button'>

export const Button = ({ variant = 'primary', children, className, ...rest }: Props) => {
  return (
    <button className={clsx(s.button, s[variant], className)} type={'button'} {...rest}>
      <h3 className={'uik_typography-button-h3'}>{children}</h3>
    </button>
  )
}
