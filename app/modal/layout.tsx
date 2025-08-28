import type { ReactNode } from 'react'

import { BaseLayout } from '@/app/layouts/base/BaseLayout'
import { HomeView } from '@/views/home/ui/HomeView'

export default function ModalLayout({ children }: { children: ReactNode }) {
  return (
    <BaseLayout>
      <HomeView />
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none' }}>
        <div style={{ pointerEvents: 'auto' }}>{children}</div>
      </div>
    </BaseLayout>
  )
}
