'use client'
import type { TPaymentSubscription } from '@/entities/profile/type/settingsType'

import {
  useCancelAutoRenewalMutation,
  useRenewAutoRenewalMutation,
} from '@/entities/profile/api/settingsApi'
import { LoaderTransparent } from '@/shared/ui/LoaderTransparent/Loadertransparent'
import { formatDate } from '@/shared/utils/formatDate'

import s from './SubscriptionItem.module.scss'

type Props = {
  subscription: TPaymentSubscription
  onUpdated?: () => void
}

export function SubscriptionItem({ subscription, onUpdated }: Props) {
  const [cancelAutoRenewal, { isLoading: cancelLoading }] = useCancelAutoRenewalMutation()
  const [renewAutoRenewal, { isLoading: renewlLoading }] = useRenewAutoRenewalMutation()

  const handleToggle = async (checked: boolean) => {
    try {
      if (checked) {
        await renewAutoRenewal().unwrap()
        alert('автопродление активировано')
      } else {
        await cancelAutoRenewal().unwrap()
        alert('автопродление отключено')
      }
      onUpdated?.()
    } catch (err) {
      alert('Ошибка обновления авто‑продления')
    }
  }

  return (
    <div className={s.itemContainer}>
      <div className={s.subscriptionRow}>
        <div className={s.subscriptionCol}>
          <div className={s.metaLabel}>Created at</div>
          <div>{formatDate(subscription.dateOfPayment)}</div>
        </div>
        <div className={s.subscriptionCol}>
          <div className={s.metaLabel}>Expire at</div>
          <div>{formatDate(subscription.endDateOfSubscription)}</div>
        </div>
      </div>
      <label className={s.checkboxLabel}>
        <input
          type={'checkbox'}
          className={s.checkboxInput}
          checked={subscription.autoRenewal}
          onChange={e => handleToggle(e.target.checked)}
        />
        <span className={s.checkboxCustom}></span>
        Auto-Renewal
      </label>
      <LoaderTransparent
        isLoading={cancelLoading || renewlLoading}
        overlayColor={'rgba(0, 0, 0, 0.8)'}
        spinnerColor={'#fdfdfd'}
        size={60}
        zIndex={10000}
      />
    </div>
  )
}
