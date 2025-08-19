import { RegistrationConfirmationView } from '@/views/registration-confirmation'
import { redirect } from 'next/navigation'

export default async function RegistrationConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ code?: string | string[] }>
}) {
  const params = await searchParams
  const raw = params.code
  const code = Array.isArray(raw) ? raw[0] : raw

  if (!code) {
    redirect('/recall-email')
  }

  return <RegistrationConfirmationView code={code} />
}
