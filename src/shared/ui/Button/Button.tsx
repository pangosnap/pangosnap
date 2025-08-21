import { ComponentPropsWithoutRef, ElementType } from 'react'

import { clsx } from 'clsx'

import s from './Button.module.scss'

type Props<T extends ElementType = 'button'> = {
  as?: T
  variant?: 'primary' | 'secondary' | 'outlined' | 'text' | 'icon'
  fullWidth?: boolean
  spacingNameBtn?: 'small' | 'medium'
} & ComponentPropsWithoutRef<T>

export const Button = <T extends ElementType = 'button'>(props: Props<T>) => {
  const {
    variant = 'primary',
    spacingNameBtn = 'small',
    fullWidth,
    className,
    as: Component = 'button',
    ...rest
  } = props

  return (
    <Component
      className={clsx(
        s.button,
        s[variant],
        s[spacingNameBtn],
        fullWidth && s.fullWidth,
        className,
        'uik_typography-button'
      )}
      {...rest}
    />
  )
}
