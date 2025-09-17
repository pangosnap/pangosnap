import { ProfileView } from '@/views/profile/ui/ProfileView'
import { redirect } from 'next/navigation'

export const revalidate = 0

export default async function ProfilePage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>
}) {
  const searchParam = await searchParams
  const id = Number(searchParam.id)

  if (!Number.isFinite(id)) {
    redirect('/')
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}public-user/profile/${id}`, {
    cache: 'no-store',
  })

  const profile = await res.json()

  return <ProfileView initialProfile={profile} userId={id} />
}
