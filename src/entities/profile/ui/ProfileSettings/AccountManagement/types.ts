import type { ChangeEvent } from 'react'

import { ESubscriptionType } from '@/entities/profile/type/settingsType'

export type SubscriptionType = '$10 per 1 Day' | '$50 per 7 Day' | '$100 per month'

export type SubscriptionInfo = {
  displayType: SubscriptionType
  price: number
}

export enum EAccountType {
  Personal = 'personal',
  Business = 'business',
}

export type AccountManagementRadioGroup = {
  value: EAccountType | ESubscriptionType
  label: string
  checked: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}
