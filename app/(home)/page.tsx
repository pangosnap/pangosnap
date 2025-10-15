import type { PostsResponse } from '@/entities/profile/type/types'

import { GoogleAuth } from '@/features/auth/ui/GoogleAuth/GoogleAuth'
import { MainView } from '@/views/home'

export default async function MainPageISR({
  searchParams,
}: {
  searchParams: Promise<{ code?: string | string[] }>
}) {
  const params = await searchParams
  const raw = params.code
  const code = Array.isArray(raw) ? raw[0] : raw

  if (code) {
    return <GoogleAuth />
  }

  //TODO: пока оставить для тестирования. Можно удалить на 6 спринте
  // const postsRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}posts/user/3081?pageSize=4`, {
  //   next: { revalidate: 30 },
  // })

  const postsRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}posts/all?pageSize=4`, {
    next: { revalidate: 60 },
  })

  const postsData: PostsResponse = await postsRes.json()

  return <MainView registeredUsers={postsData.totalUsers} posts={postsData.items} />
}
