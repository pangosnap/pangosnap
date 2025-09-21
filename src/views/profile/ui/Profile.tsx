import { PostsProps } from '@/entities/profile/type/types'
import { Profile } from '@/entities/profile/ui'

export default function ProfileView({ profileData, profileId, initialPosts }: PostsProps) {
  return <Profile profileData={profileData} profileId={profileId} initialPosts={initialPosts} />
}
