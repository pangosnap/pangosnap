import Profile from '@/entities/profile/ui/Profile'
export type ProfileData = {
  userName: string
  aboutMe?: string
  avatars: { url: string }[]
  userMetadata: { following: number; followers: number; publications: number }
}

type Props = {
  initialProfile: ProfileData
  userId: number
}
export function ProfileView({ initialProfile, userId }: Props) {
  return <Profile initialProfile={initialProfile} userId={userId} />
}
