import { PostSchema, type Post } from '@/entities/post/schemas/postSchema'
import { notFound } from 'next/navigation'

const USE_MOCK = true

type Options = { throwOnNotFound?: boolean }

export async function ssrGetPost(
  id: number,
  opts: Options = { throwOnNotFound: true }
): Promise<Post | null> {
  const { throwOnNotFound } = opts

  if (USE_MOCK) {
    const now = new Date().toISOString()
    const EXISTING = new Set([1, 2, 3])

    if (!EXISTING.has(id)) {
      return throwOnNotFound ? notFound() : null
    }

    return PostSchema.parse({
      id,
      userName: 'Alex',
      description: 'description',
      location: 'location',
      images: [
        {
          url: '/sign-up/bro.png',
          width: 300,
          height: 300,
          fileSize: 300,
          createdAt: now,
          uploadId: 'mock',
        },
      ],
      createdAt: now,
      updatedAt: now,
      ownerId: 1,
      avatarOwner: '/sign-up/bro.png',
      owner: { firstName: 'firstName', lastName: 'lastName' },
      likesCount: 1,
      isLiked: true,
      avatarWhoLikes: ['/sign-up/bro.png'],
    })
  }

  const BASE = process.env.NEXT_PUBLIC_API_BASE_URL!
  const res = await fetch(`${BASE}/posts/id/${id}`, { cache: 'no-store' })

  if (res.status === 404) {
    return throwOnNotFound ? notFound() : null
  }
  if (!res.ok) {
    if (!throwOnNotFound) {
      return null
    }
    throw new Error(`HTTP_${res.status}`)
  }

  return PostSchema.parse(await res.json())
}
