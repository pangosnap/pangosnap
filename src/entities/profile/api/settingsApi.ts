import type {
  TCostOfPaymentSubscriptionsResponse,
  TCreateSubscriptionParams,
  TCreateSubscriptionResponse,
  TCurrentPaymentSubscriptionsResponse,
  TSubscriptionPayments,
} from '@/entities/profile/type/settingsType'

import { baseApi } from '@/app/baseApi'

export const settingsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    createSubscription: builder.mutation<TCreateSubscriptionResponse, TCreateSubscriptionParams>({
      query: body => ({
        method: 'POST',
        url: '/subscriptions',
        body,
      }),
    }),
    cancelAutoRenewal: builder.mutation<void, void>({
      query: () => ({
        method: 'POST',
        url: '/subscriptions/canceled-auto-renewal',
      }),
      invalidatesTags: ['CurrentProfileSubscriptions'],
    }),
    renewAutoRenewal: builder.mutation<void, void>({
      query: () => ({
        method: 'POST',
        url: '/subscriptions/renew-auto-renewal',
      }),
      invalidatesTags: ['CurrentProfileSubscriptions'],
    }),
    getCostOfPaymentSubscriptions: builder.query<TCostOfPaymentSubscriptionsResponse, void>({
      query: () => `subscriptions/cost-of-payment-subscriptions`,
    }),
    getCurrentPaymentSubscriptions: builder.query<TCurrentPaymentSubscriptionsResponse, void>({
      query: () => `subscriptions/current-payment-subscriptions`,
      providesTags: ['CurrentProfileSubscriptions'],
    }),
    getPayments: builder.query<TSubscriptionPayments, void>({
      query: () => `subscriptions/my-payments`,
    }),
  }),
})

export const {
  useCreateSubscriptionMutation,
  useCancelAutoRenewalMutation,
  useRenewAutoRenewalMutation,
  useGetCostOfPaymentSubscriptionsQuery,
  useGetCurrentPaymentSubscriptionsQuery,
  useGetPaymentsQuery,
} = settingsApi
