'use client'
import { type ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react'

import { SubscriptionItem } from './components/SubscriptionItem/SubscriptionItem'
import StripeIcon from './icons/stripeIcon.svg'
import { type AccountManagementRadioGroup, EAccountType, type SubscriptionInfo } from './types'
import {
  useCreateSubscriptionMutation,
  useGetCurrentPaymentSubscriptionsQuery,
  useRenewAutoRenewalMutation,
} from '@/entities/profile/api/settingsApi'
import { EPaymentType, ESubscriptionType } from '@/entities/profile/type/settingsType'
import { ChoiceRadioGroup } from '@/entities/profile/ui/ProfileSettings/AccountManagement/components/ChoiceRadioGroup/ChoiceRadioGroup'
import { Button } from '@/shared/ui/Button/Button'
import { LoaderTransparent } from '@/shared/ui/LoaderTransparent/Loadertransparent'
import { UniversalModal } from '@/shared/ui/UniversalModal/UniversalModal'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import s from './AccountManagement.module.scss'

const subscriptionData: Record<ESubscriptionType, SubscriptionInfo> = {
  [ESubscriptionType.DAY]: {
    displayType: '$10 per 1 Day',
    price: 10,
  },
  [ESubscriptionType.WEEKLY]: {
    displayType: '$50 per 7 Day',
    price: 50,
  },
  [ESubscriptionType.MONTHLY]: {
    displayType: '$100 per month',
    price: 100,
  },
}

export const AccountManagement = () => {
  const [accountType, setAccountType] = useState<EAccountType>(EAccountType.Personal)
  const [subscriptionType, setSubscriptionType] = useState<ESubscriptionType>(ESubscriptionType.DAY)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [agreeAutoRenewal, setAgreeAutoRenewal] = useState(false)

  const [renewAutoRenewal, { isLoading: renewlLoading }] = useRenewAutoRenewalMutation()

  const {
    data: currentPaymentSubscriptions,
    refetch,
    isFetching,
  } = useGetCurrentPaymentSubscriptionsQuery()
  const [createSubscription, { isLoading }] = useCreateSubscriptionMutation()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const success = searchParams.get('success')

  const onRadioAccountClick = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setAccountType(e.target.value as EAccountType),
    []
  )

  const onRadioSubscriptionClick = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSubscriptionType(e.target.value as ESubscriptionType)
  }, [])

  const accountMappingValues: AccountManagementRadioGroup[] = useMemo(
    () => [
      {
        value: EAccountType.Personal,
        checked: accountType === EAccountType.Personal,
        onChange: onRadioAccountClick,
        label: 'Personal',
      },
      {
        value: EAccountType.Business,
        checked: accountType === EAccountType.Business,
        onChange: onRadioAccountClick,
        label: 'Business',
      },
    ],
    [accountType, onRadioAccountClick]
  )

  const subscriptionMappingValues: AccountManagementRadioGroup[] = useMemo(
    () => [
      {
        value: ESubscriptionType.DAY,
        checked: subscriptionType === ESubscriptionType.DAY,
        onChange: onRadioSubscriptionClick,
        label: '$10 per 1 Day',
      },
      {
        value: ESubscriptionType.WEEKLY,
        checked: subscriptionType === ESubscriptionType.WEEKLY,
        onChange: onRadioSubscriptionClick,
        label: '$50 per 7 Day',
      },
      {
        value: ESubscriptionType.MONTHLY,
        checked: subscriptionType === ESubscriptionType.MONTHLY,
        onChange: onRadioSubscriptionClick,
        label: '$100 per month',
      },
    ],
    [subscriptionType, onRadioSubscriptionClick]
  )

  useEffect(() => {
    if (success) {
      setIsSuccessModalOpen(true)
      router.replace(pathname)
    }
  }, [success, router, pathname])
  const handleStripeButtonClick = () => {
    setIsCreateModalOpen(true)
  }

  const handleConfirmCreatePayment = () => {
    if (!agreeAutoRenewal) {
      return
    }

    createSubscription({
      typeSubscription: subscriptionType,
      paymentType: EPaymentType.STRIPE,
      amount: subscriptionData[subscriptionType].price,
      baseUrl: 'http://localhost:3000/settings/subscriptions',
    })
      .unwrap()
      .then(async res => {
        await renewAutoRenewal().unwrap()
        router.push(res.url)
      })
      .catch(() => {
        setIsErrorModalOpen(true)
      })
  }

  return (
    <div className={s.container}>
      {isCreateModalOpen && (
        <UniversalModal
          open={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onConfirm={handleConfirmCreatePayment}
          modalTitle={'Create payment'}
          size={'sm'}
          buttonDisabled={!agreeAutoRenewal}
        >
          <div className={s.modalText}>
            Auto-renewal will be enabled with this payment. You can disable it anytime in your
            profile settings
          </div>
          <label className={s.agreeLabel}>
            <input
              type={'checkbox'}
              className={s.agreeInput}
              checked={agreeAutoRenewal}
              onChange={e => setAgreeAutoRenewal(e.target.checked)}
            />
            <span className={s.agreeCustom}></span>I agree
          </label>
        </UniversalModal>
      )}

      {isErrorModalOpen && (
        <UniversalModal
          open={isErrorModalOpen}
          onClose={() => setIsErrorModalOpen(false)}
          modalTitle={'Error'}
          buttonTitle={'Back to payment'}
          onConfirm={() => {
            setIsErrorModalOpen(false)
            setIsCreateModalOpen(true)
          }}
          size={'sm'}
        >
          Transaction failed. Please, write to support
        </UniversalModal>
      )}

      {isSuccessModalOpen && (
        <UniversalModal
          open={isSuccessModalOpen}
          onClose={() => setIsSuccessModalOpen(false)}
          modalTitle={'Success'}
          size={'sm'}
        >
          Payment was successful
        </UniversalModal>
      )}
      {currentPaymentSubscriptions?.data.length && (
        <div className={s.panel}>
          <h3 className={s.panelTitle}>Current Subscription:</h3>
          <div className={s.subscriptionSummary}>
            {currentPaymentSubscriptions?.data.map(subscription => (
              <SubscriptionItem
                key={subscription.subscriptionId}
                subscription={subscription}
                onUpdated={refetch}
              />
            ))}
          </div>
        </div>
      )}

      <ChoiceRadioGroup
        mappingValues={accountMappingValues}
        type={'accountType'}
        title={'Account type:'}
      />

      {accountType === EAccountType.Business && (
        <>
          <ChoiceRadioGroup
            mappingValues={subscriptionMappingValues}
            type={'subscriptionType'}
            title={'Your subscription costs:'}
          />

          <div className={s.buttonsContainer}>
            <Button
              type={'button'}
              variant={'icon'}
              style={{ width: 75 }}
              onClick={handleStripeButtonClick}
            >
              <StripeIcon />
            </Button>
          </div>
        </>
      )}
      <>
        <LoaderTransparent
          isLoading={isFetching || isLoading || renewlLoading}
          overlayColor={'rgba(0, 0, 0, 0.8)'}
          spinnerColor={'#fdfdfd'}
          size={60}
          zIndex={100}
        />
      </>
    </div>
  )
}
