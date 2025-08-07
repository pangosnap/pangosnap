import { ComponentProps, ReactNode } from 'react'

import { clsx } from 'clsx'

import s from './Card.module.scss'

type Props = {
  children: ReactNode
  title?: string
} & ComponentProps<'div'>

export const Card = ({ children, title, ...rest }: Props) => {
  return (
    <div className={s.box} {...rest}>
      {title && <h1 className={clsx('uik_typography-h1', s.title)}>{title}</h1>}
      <div>{children}</div>
    </div>
  )
}
