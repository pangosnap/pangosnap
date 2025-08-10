'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { useEmailResendingMutation } from '@/features/auth/api/authRegApi'
import { emailFormSchema, EmailInputs } from '@/features/auth/api/lib/schemas/registrationSchema'
import { Button } from '@/shared/ui/Button/Button'
import { TextField } from '@/shared/ui/TextField'
import { UniversalModal } from '@/shared/ui/UniversalModal/UniversalModal'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'next/navigation'

import s from '@/features/auth/ui/RegistrationForm/RegistrationForm.module.scss'

export const RecallEmail = () => {
  const searchParams = useSearchParams()
  const email = searchParams.get('email')
  const [emailResending] = useEmailResendingMutation()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<EmailInputs>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(emailFormSchema),
  })
  const emailValue = watch('email')

  const emailResendingHandler = async () => {
    if (email) {
      try {
        await emailResending({
          email,
          baseUrl: 'http://localhost:3000/sign-up/recall-email',
        }).unwrap()
      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <>
      <div className={'l-wrap'}>
        <main className={'l-container l-centered page-public'}>
          <h1 className={'uik_typography-h1'}>Email verification link expired</h1>
          <p className={'uik_typography-body1'}>
            Looks like the verification link has expired. Not to worry, we can send the link again
          </p>
          <TextField label={'Email'} defaultValue={email || ''} {...register('email')}></TextField>
          <Button onClick={emailResendingHandler}>Resend verification link</Button>
        </main>
      </div>
      {isModalOpen && (
        <UniversalModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          modalTitle={'Email sent'}
          size={'sm'}
          overlayDarkClass={s.OverlayModal}
        >
          We have sent a link to confirm your email to {emailValue}
        </UniversalModal>
      )}
    </>
  )
}
