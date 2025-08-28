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
  firstName: z.string(),
  lastName: z.string(),
})

export const PostSchema = z.object({
  id: z.number().int(),
  userName: z.string(),
  description: z.string(),
  location: z.string(),
  images: z.array(PostImageSchema),

  createdAt: z.string(),
  updatedAt: z.string(),

  ownerId: z.number().int(),
  avatarOwner: z.string(),
  owner: PostOwnerSchema,

  likesCount: z.number().int().default(0),
  isLiked: z.boolean().default(false),

  avatarWhoLikes: z.preprocess(v => (v === false ? [] : v), z.array(z.string())),
  /*avatarWhoLikes: z.array(z.string()),*/
})

export type Post = z.infer<typeof PostSchema>
