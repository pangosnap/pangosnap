import { ComponentProps, ReactNode } from 'react'

import s from './Card.module.scss'

type Props = {
  children: ReactNode
  title?: string
} & ComponentProps<'div'>

export const Card = ({ children, title, ...rest }: Props) => {
  return (
    <div className={s.box} {...rest}>
      {title && <h1 className={'uik_typography-h1'}>{title}</h1>}
      <div className={s.content}>{children}</div>
    </div>
  )
}
