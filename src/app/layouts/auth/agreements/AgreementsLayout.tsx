'use client'

import { ReactNode } from 'react'

import BackArrowIcon from '@/shared/icons/back-arrow.svg'
import { Path } from '@/shared/routes/constants'
import { useRouter } from 'next/navigation'

import s from './AgreementsLayout.module.scss'

export const AgreementsLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter()

  return (
    <div className={s.wrapper}>
      <div onClick={() => router.push(Path.signUp)} className={s.backArrow}>
        <BackArrowIcon />
        <span className={'uik_typography-body2'}>Back to Sign Up</span>
      </div>
      <div className={s.content}>{children}</div>
    </div>
  )
}
