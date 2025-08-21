import type { Metadata } from 'next'

import { ReactNode } from 'react'

import { Providers } from '@/app/layouts/Providers'
import { AuthGate } from '@/shared/ui/AuthGate/AuthGate'

import '@/app/styles/index.scss'

export const metadata: Metadata = {
  title: 'Pangosnap',
  description: 'pangosnap',
}

export function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={'en'}>
      <body>
        <Providers>
          <AuthGate>{children}</AuthGate>
        </Providers>
      </body>
    </html>
  )
}
