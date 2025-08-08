'use client'
import type { Metadata } from 'next'

import { ReactNode } from 'react'
import { Provider } from 'react-redux'

import { store } from '../store'

import '@/app/styles/index.scss'

export const metadata: Metadata = {
  title: 'Pangosnap',
  description: 'pangosnap',
}

export function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={'en'} className={'dark-mode'}>
      <Provider store={store}>
        <body>{children}</body>
      </Provider>
    </html>
  )
}
