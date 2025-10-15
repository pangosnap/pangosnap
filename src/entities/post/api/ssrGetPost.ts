import { PostSchema, type Post } from '@/entities/post/schemas/postSchema'
import { notFound } from 'next/navigation'

export async function ssrGetPost(id: number): Promise<Post> {
  const BASE = process.env.NEXT_PUBLIC_BASE_URL!
  const res = await fetch(`${BASE}posts/id/${id}`, { cache: 'no-store' })

  if (res.status === 404) {
    notFound()
  }
  if (!res.ok) {
    throw new Error(`HTTP_${res.status}`)
  }

  const data = await res.json()

  return PostSchema.parse(data)
}
