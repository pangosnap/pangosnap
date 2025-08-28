'use client'

import { Path } from '@/shared/routes/constants'
import { Button } from '@/shared/ui/Button/Button'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  // console.error(error)

  return (
    <div style={{ padding: 24 }}>
      <h1>Error</h1>

      <div style={{ display: 'flex', gap: 12 }}>
        <Button type={'button'} onClick={() => reset()}>
          Refresh
        </Button>
        <Link href={Path.main}>Home</Link>
      </div>
    </div>
  )
}
