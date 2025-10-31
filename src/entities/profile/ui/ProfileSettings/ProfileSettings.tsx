'use client'
import { type ReactNode, useState } from 'react'

import { AccountManagement } from '@/entities/profile/ui/ProfileSettings/AccountManagement'
import { AccountDevices } from '@/entities/profile/ui/ProfileSettings/Devices/DevicesContent'
import { GeneralInfoContent } from '@/entities/profile/ui/ProfileSettings/GeneralInfo'
import { AccountPayments } from '@/entities/profile/ui/ProfileSettings/MyPayments'
import { Path } from '@/shared/routes/constants'
import clsx from 'clsx'
import Link from 'next/link'
import { useParams } from 'next/navigation'

import s from '../../../../app/layouts/settings/ProfileSettingsLayout.module.scss'

type TabItem = {
  id: string
  label: string
  content: ReactNode
}

export default function ProfileSettings() {
  const params = useParams()
  const slug = params.slug
  const [activeTab, setActiveTab] = useState(slug?.[1] || 'general')

  const tabs: TabItem[] = [
    {
      id: 'general',
      label: 'General information',
      content: <GeneralInfoContent />,
    },
    {
      id: 'devices',
      label: 'Devices',
      content: <AccountDevices />,
    },
    {
      id: 'subscriptions',
      label: 'Account Management',
      content: <AccountManagement />,
    },
    {
      id: 'payments',
      label: 'My payments',
      content: <AccountPayments />,
    },
  ]

  return (
    <div className={s.settingsPage}>
      <div className={s.tabList}>
        {tabs.map(tab => {
          const settingsKey = tab.id as keyof typeof Path.settings

          return (
            <Link
              href={Path.settings[settingsKey] || ''}
              key={tab.id}
              className={clsx(s.tabButton, activeTab === tab.id && s.tabButtonActive)}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </Link>
          )
        })}
      </div>
      <div className={s.tabContent}>{tabs.find(tab => tab.id === activeTab)?.content}</div>
    </div>
  )
}
