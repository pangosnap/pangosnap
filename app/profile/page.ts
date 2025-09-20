import { Profile } from '@/entities/profile/ui'

// export default async function ProfileView({ searchParams }: { searchParams: { id: string } }) {
//     const profileId = Number(searchParams.id)
//
//     const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}public-user/profile/${profileId}`, {
//         cache: 'no-store',
//     })
//
//     const profileData = await res.json()
//
//     const postsRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}posts/user/${profileId}`, {
//         cache: 'no-store',
//     })
//
//     const postsData = await postsRes.json()
//
//     return <Profile profileData={profileData} profileId={profileId} initialPosts={postsData} />
// }
