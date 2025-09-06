// PostModalShell.tsx
'use client'
import { ReactNode } from 'react'

import { PostModal } from '@/widgets'
import { useRouter, useSearchParams } from 'next/navigation'

export function PostModalShell({
  children,
  isShowClose = false,
}: {
  children: ReactNode
  isShowClose?: boolean
}) {
  const router = useRouter()
  const sp = useSearchParams()
  const from = sp.get('from')

  const closeAction = () => {
    if (from) {
      router.replace(from)
    } else if ((window.history.state?.idx ?? 0) > 0) {
      router.back()
    } else {
      router.back()
      /*router.replace('/')*/
    }
  }

  return (
    <PostModal open onCloseAction={closeAction} isShowClose={isShowClose}>
      {children}
    </PostModal>
  )
}
