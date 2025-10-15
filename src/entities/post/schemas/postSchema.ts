import { z } from 'zod'

export const PostImageSchema = z.object({
  url: z.string(),
  width: z.number().int(),
  height: z.number().int(),
  fileSize: z.number().int(),
  createdAt: z.string(),
  uploadId: z.string(),
})

export const PostOwnerSchema = z.object({
  firstName: z.string().nullable().optional(),
  lastName: z.string().nullable().optional(),
})

export const PostSchema = z.object({
  id: z.number(),
  userName: z.string(),
  description: z.string(),
  location: z.string().nullable().optional(),
  images: z.array(PostImageSchema),

  createdAt: z.string(),
  updatedAt: z.string(),

  ownerId: z.number(),
  avatarOwner: z.string().nullable().optional(),
  owner: PostOwnerSchema,

  likesCount: z.number().int().default(0),
  isLiked: z.boolean().default(false),

  avatarWhoLikes: z.array(z.string()),
})

export type TPost = z.infer<typeof PostSchema>
export type PostImage = z.infer<typeof PostImageSchema>
