'use client'
import { useEffect, useRef, ReactNode } from 'react'

export default function ReplaceToModal({ id, children }: { id: string; children: ReactNode }) {
  const once = useRef(false)

  useEffect(() => {
    if (!once.current && id) {
      once.current = true
      const url = `/modal/post/${id}`

      if (location.pathname !== url) {
        history.replaceState(null, '', url)
      }
    }
  }, [id])

  return <>{children}</>
}
