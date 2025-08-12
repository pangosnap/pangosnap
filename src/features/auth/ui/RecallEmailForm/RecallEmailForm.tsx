'use client'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useEmailResendingMutation } from '@/features/auth/api/authRegApi'
import { emailFormSchema, EmailInputs } from '@/features/auth/api/lib/schemas/registrationSchema'
import { Button } from '@/shared/ui/Button/Button'
import { TextField } from '@/shared/ui/TextField'
import { UniversalModal } from '@/shared/ui/UniversalModal/UniversalModal'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'next/navigation'

import s from '@/features/auth/ui/RegistrationForm/RegistrationForm.module.scss'

export const RecallEmailForm = () => {
  const searchParams = useSearchParams()
  const email = searchParams.get('email')
  const [emailResending] = useEmailResendingMutation()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<EmailInputs>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(emailFormSchema),
  })
  const emailValue = watch('email')

  const onSubmit: SubmitHandler<EmailInputs> = async data => {
    try {
      await emailResending({
        email: data.email,
        baseUrl: 'http://localhost:3000/registration-confirmation',
      }).unwrap()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={'l-wrap'}>
          <main className={'l-container l-centered page-public'}>
            <h1 className={'uik_typography-h1'}>Email verification link expired</h1>
            <p className={'uik_typography-body1'}>
              Looks like the verification link has expired. Not to worry, we can send the link again
            </p>
            <TextField type={'text'} label={'Email'} {...register('email')} />
            <Button type={'submit'}>Resend verification link</Button>
          </main>
        </div>
      </form>
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
