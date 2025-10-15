import type { Metadata } from 'next'

import { type ReactNode } from 'react'

import { Providers } from '@/app/layouts/Providers'

import '@/app/styles/index.scss'

export const metadata: Metadata = {
  title: {
    template: '%s - Pangosnap',
    default: 'Pangosnap',
  },
  description: 'Share your moments with pangosnap',
}

export function RootLayout({ children, modal }: { children: ReactNode; modal: ReactNode }) {
  return (
    <html lang={'en'}>
      <body>
        <Providers>
          {/*<AuthGate>*/}
          {children}
          {/*</AuthGate>*/}
          {modal}
        </Providers>
      </body>
    </html>
  )
}
