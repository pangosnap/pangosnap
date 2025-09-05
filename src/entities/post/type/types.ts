import { Avatar } from '@/entities/profile/type/types'

export type ImageItem = Avatar & { uploadId: string }
export type ImagesResponse = {
  images: ImageItem[]
}
export type Owner = { firstName: string; lastName: string }
export type CreatePostResponse = {
  id: number
  userName: string
  description: string
  location: string
  images: [ImageItem]
  createdAt: string
  updatedAt: string
  ownerId: number
  avatarOwner: string
  owner: Owner
  likesCount: number
  isLiked: boolean
  avatarWhoLikes: boolean
}
