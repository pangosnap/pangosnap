'use client'
import { useEffect, useRef } from 'react'

import { EditPost } from '@/views/post/ui/EditPost/EditPost'
import { PostModal } from '@/widgets/PostModal'
import { useRouter, useParams } from 'next/navigation'

export default function EditPostModalIntercept() {
  const router = useRouter()
  const { id } = useParams<{ id: string }>()
  const once = useRef(false)

  useEffect(() => {
    if (once.current || !id) {
      return
    }
    once.current = true
    const url = `/modal/post/${id}/edit`

    if (location.pathname !== url) {
      history.replaceState(null, '', url)
    }
  }, [id])

  return (
    <PostModal open onCloseAction={() => router.back()} showDefaultClose={false}>
      <EditPost />
    </PostModal>
  )
}
