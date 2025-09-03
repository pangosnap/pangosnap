'use client'

import { useGetProfileQuery } from '@/entities/profile/api/profileApi'

export function HomeView() {
  const { data } = useGetProfileQuery()

  return (
    <>
      <h1>Главная страница</h1>
    </>
  )
}
