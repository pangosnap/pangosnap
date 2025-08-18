import React from 'react'

import TimeManagement from '@/shared/icons/timeManagement.svg'
import { Button } from '@/shared/ui/Button/Button'
import { Card } from '@/shared/ui/Card'
import Link from 'next/link'

import s from '../ForgotPassword.module.scss'

const EmailVerificationExpired: React.FC = () => {
  return (
    <div className={s.wrapper}>
      <Card title={'Email verification link expired'}>
        <p className={s.text}>
          Looks like the verification link has expired. Not to worry, we can send the link again
        </p>
        <Button fullWidth as={Link} href={'/password-recovery'}>
          Resend link
        </Button>
        <TimeManagement />
      </Card>
    </div>
  )
}

export default EmailVerificationExpired
