import type { PostsResponse, PublicUserProfileResponse } from '@/entities/profile/type/types'

import { ProfileView } from '@/views/profile'

export default async function ProfileSSR({
  searchParams,
}: {
  searchParams: Promise<{ id: string }>
}) {
  const params = await searchParams
  const profileId = Number(params.id)

  // TODO: доделать обработку ошибок
  const profileRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}public-user/profile/${profileId}`,
    {
      cache: 'no-store',
    }
  )

  if (!profileRes.ok) {
    throw new Error(
      `Failed to fetch profile: ${profileRes.status} ${JSON.stringify(profileRes.body)}`
    )
  }

  const profileData: PublicUserProfileResponse = await profileRes.json()

  const postsRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}posts/user/${profileId}?pageSize=8`,
    {
      cache: 'no-store',
    }
  )

  if (!postsRes.ok) {
    throw new Error(`Failed to fetch posts: ${postsRes.status} ${postsRes.statusText}`)
  }

  const postsData: PostsResponse = await postsRes.json()

  return <ProfileView profileData={profileData} profileId={profileId} initialPosts={postsData} />
}
