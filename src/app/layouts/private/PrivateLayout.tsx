import { ReactNode } from 'react'

import { HeaderPrivate } from '@/widgets/HeaderPrivate/HeaderPrivate'

export default function PrivateLayout({ children }: { children: ReactNode }) {
  return (
    <div className={'wrap'}>
      <HeaderPrivate />
      <main className={'container'}>{children}</main>
    </div>
  )
}
