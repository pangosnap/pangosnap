import { PostModalShell } from '../../PostModalShell'
import { EditPost } from '@/views/post/ui/EditPost/EditPost'

export const revalidate = 0

export default async function EditPostModalPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  return (
    <PostModalShell>
      <EditPost postId={Number(id)} />
    </PostModalShell>
  )
}
