import { PostSchema, type Post } from '@/entities/post/schemas/postSchema'
import { notFound } from 'next/navigation'

type Options = { throwOnNotFound?: boolean }

export async function ssrGetPost(
  id: number,
  opts: Options = { throwOnNotFound: true }
): Promise<Post | null> {
  const { throwOnNotFound } = opts

  const BASE = process.env.NEXT_PUBLIC_BASE_URL!
  const res = await fetch(`${BASE}posts/id/${id}`, { cache: 'no-store' })

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
