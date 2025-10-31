'use client'
import type { ReactNode } from 'react'

import { BaseLayout } from '@/app/layouts/base/BaseLayout'
import { Path } from '@/shared/routes/constants'
import { clsx } from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import s from './ProfileSettingsLayout.module.scss'

export function ProfileSettingsLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  const tabs = [
    { id: 'general', label: 'General information', href: Path.settings.main },
    { id: 'devices', label: 'Devices', href: Path.settings.devices },
    { id: 'subscriptions', label: 'Account Management', href: Path.settings.subscriptions },
    { id: 'payments', label: 'My payments', href: Path.settings.payments },
  ] as const

  const activeTab = (() => {
    if (pathname?.startsWith(Path.settings.devices)) {
      return 'devices'
    }
    if (pathname?.startsWith(Path.settings.subscriptions)) {
      return 'subscriptions'
    }
    if (pathname?.startsWith(Path.settings.payments)) {
      return 'payments'
    }

    return 'general'
  })()

  return (
    <BaseLayout>
      <div className={s.settingsPage}>
        <div className={s.tabList}>
          {tabs.map(tab => (
            <Link
              href={tab.href}
              key={tab.id}
              className={clsx(s.tabButton, activeTab === tab.id && s.tabButtonActive)}
            >
              {tab.label}
            </Link>
          ))}
        </div>
        <div className={s.tabContent}>{children}</div>
      </div>
    </BaseLayout>
  )
}
