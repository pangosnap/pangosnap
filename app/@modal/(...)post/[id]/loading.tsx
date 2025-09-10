'use client'

import { Loader } from '@/shared/ui/Loader/Loader'
import { PostModal } from '@/widgets/PostModal'

export default function LoadingEditModal() {
  return (
    <PostModal open onCloseAction={() => {}}>
      <Loader size={32} />
    </PostModal>
  )
}
