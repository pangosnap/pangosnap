import { ssrGetPost } from './ssrGetPost'
import { notFound } from 'next/navigation'

export async function getPostFromParams(params: Promise<{ id: string }>) {
  const { id } = await params
  const num = Number(id)

  if (!Number.isFinite(num)) {
    notFound()
  }

  const post = await ssrGetPost(num, { throwOnNotFound: false })

  if (!post) {
    notFound()
  }

  return post
}
