import { type ReactNode, useState } from 'react'

import clsx from 'clsx'

import styles from './TabPanel.module.scss'

export type TabItem = {
  id: string
  label: string
  content: ReactNode
}

type TabPanelProps = {
  tabs: TabItem[]
  className?: string
}

export const Index = ({ tabs, className }: TabPanelProps) => {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || '')

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId)
  }

  return (
    <div className={clsx(styles.tabPanel, className)}>
      <div className={styles.tabList}>
        {tabs.map(tab => (
          <button
            type={'button'}
            key={tab.id}
            className={clsx(styles.tabButton, activeTab === tab.id && styles.tabButtonActive)}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className={styles.tabContent}>{tabs.find(tab => tab.id === activeTab)?.content}</div>
    </div>
  )
}
