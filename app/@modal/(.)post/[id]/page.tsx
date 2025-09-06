import type { Metadata } from 'next'

import { PostModalShell } from '../PostModalShell'
import { getPostFromParams } from '@/entities/post/api/getPostFromParams'
import { PostView } from '@/views/post/ui/PostView'
export const revalidate = 0

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const post = await getPostFromParams(params)

  return (
    <PostModalShell isShowClose>
      <PostView post={post} />
    </PostModalShell>
  )
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params

  return { alternates: { canonical: `/post/${id}` } }
}
