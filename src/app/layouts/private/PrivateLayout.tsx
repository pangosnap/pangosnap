import { ReactNode } from 'react'

import { HeaderPrivate } from '@/widgets/HeaderPrivate/HeaderPrivate'

export default function PrivateLayout({
  children,
  modal,
}: {
  children: ReactNode
  modal: ReactNode
}) {
  return (
    <div className={'wrap'}>
      <HeaderPrivate />
      <main className={'container'}>
        {children}
        {modal}
      </main>
    </div>
  )
}
