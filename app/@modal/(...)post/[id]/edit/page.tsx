'use client'
import { EditPost } from '@/views/post/ui/EditPost/EditPost'
import { PostModal } from '@/widgets/PostModal'
import { useRouter } from 'next/navigation'

export default function EditPostModalPage() {
  const router = useRouter()

  return (
    <PostModal open onCloseAction={() => router.back()} showDefaultClose={false}>
      <EditPost />
    </PostModal>
  )
}
