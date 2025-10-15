import type { TPost } from '@/entities/post/schemas/postSchema'

export type Avatar = {
  url: string
  width: number
  height: number
  fileSize: number
  createdAt: string
}

export type UserMetadata = {
  following: number
  followers: number
  publications: number
}

interface BaseProfile {
  id: number
  userName: string
  aboutMe: string
  avatars: Avatar[]
}

export interface ProfileResponse extends BaseProfile {
  firstName: string
  lastName: string
  city: string
  country: string
  region: string
  dateOfBirth: string
  createdAt: string
}

export interface PublicUserProfileResponse extends BaseProfile {
  userMetadata: UserMetadata
  hasPaymentSubscription: boolean

  // приходят только для авторизованного
  isFollowing?: boolean
  isFollowedBy?: boolean
}

export type PostImage = {
  url: string
  width: number
  height: number
  fileSize: number
  createdAt: string // ISO string
  uploadId: string
}
export type ProfileAvatar = Omit<PostImage, 'uploadId'>
export type AvatarResponse = {
  avatars: ProfileAvatar[]
}

export type PostsResponse = {
  items: TPost[]
  totalCount: number
  pageSize: number
  totalUsers: number
}

export type PostsParams = {
  userId: number
  endCursorPostId?: number
  pageSize?: number
  sortBy?: string
  sortDirection?: 'asc' | 'desc'
}

export type PostsProps = {
  profileData: PublicUserProfileResponse
  profileId: number
  initialPosts: PostsResponse
}

// export type UpdateProfileInput = Pick<
//   ProfileResponse,
//   'userName' | 'firstName' | 'lastName' | 'city' | 'country' | 'region' | 'dateOfBirth' | 'aboutMe'
// >
