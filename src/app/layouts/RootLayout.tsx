import type { Metadata } from 'next'

import { ReactNode } from 'react'

import { Providers } from '@/app/layouts/Providers'
import { HeaderPublic } from '@/widgets/HeaderPublic/HeaderPublic'

import '@/app/styles/index.scss'

export const metadata: Metadata = {
  title: 'Pangosnap',
  description: 'pangosnap',
}

export function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={'en'}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
