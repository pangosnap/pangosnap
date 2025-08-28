import ReplaceToModal from './ReplaceToModal'
import { getPostFromParams } from '@/entities/post/api/getPostFromParams'
import { PostView } from '@/views/post/ui/PostView'

export const revalidate = 0

export default async function ModalIntercept({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const post = await getPostFromParams(Promise.resolve({ id }))

  return (
    <ReplaceToModal id={id}>
      <PostView post={post} />
    </ReplaceToModal>
  )
}
