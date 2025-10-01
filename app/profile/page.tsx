import { ProfileView } from '@/views/profile'

export default async function ProfileSSR({
  searchParams,
}: {
  searchParams: Promise<{ id: string }>
}) {
  const params = await searchParams
  const profileId = Number(params.id)

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}public-user/profile/${profileId}`, {
    cache: 'no-store',
  })

  const profileData = await res.json()

  const postsRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}posts/user/${profileId}`, {
    cache: 'no-store',
  })

  const postsData = await postsRes.json()

  return <ProfileView profileData={profileData} profileId={profileId} initialPosts={postsData} />
}
