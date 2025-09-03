import { getPostFromParams } from '@/entities/post/api/getPostFromParams'
import { PostView } from '@/views/post/ui/PostView'

export const revalidate = 0

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const post = await getPostFromParams(params)

  return <PostView post={post} />
}
