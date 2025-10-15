'use client'
import { useMeQuery } from '@/features/auth/api/authRegApi'
import { useProfileQuery } from '@/features/profile/profileApi'

export default function ProfileForm() {
  const { data: me } = useMeQuery()

  const { data: profile } = useProfileQuery({ profileId: me!.userId }, { skip: !me })

  return (
    <>
      <div>Профиль с id: {profile?.id}</div>
      <div>Имя: {profile?.userName}</div>
      <div>Профиль с id: {profile?.id}</div>
    </>
  )
}
