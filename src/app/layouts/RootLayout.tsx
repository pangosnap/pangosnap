import type { Metadata } from 'next'

import { ReactNode } from 'react'

import '@/app/styles/index.scss'

export const metadata: Metadata = {
  title: 'Pangosnap',
  description: 'pangosnap',
}

export function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={'en'} className={'dark-mode'}>
      <body>{children}</body>
    </html>
  )
}
