export type TCreateSubscriptionResponse = {
  url: string
}

//TODO: для типизации ошибок в будущем
// type TSubscriptionResponseError = {
//   statusCode: 0
//   messages: [
//     {
//       message: 'invalid password or email'
//       field: 'string'
//     },
//   ]
//   error: 'string'
// }

export enum ESubscriptionType {
  DAY = 'DAY',
  MONTHLY = 'MONTHLY',
  WEEKLY = 'WEEKLY',
}

export enum EPaymentType {
  STRIPE = 'STRIPE',
}

export type TCreateSubscriptionParams = {
  typeSubscription: ESubscriptionType
  paymentType: EPaymentType
  amount: number
  baseUrl: string
}

export type TCostOfPaymentSubscriptionsResponse = {
  data: Array<{
    amount: number
    typeDescription: ESubscriptionType
  }>
}

type TSubscriptionPayment = {
  userId: number
  subscriptionId: string
  dateOfPayment: string // или Date если будет преобразование
  endDateOfSubscription: string // или Date
  price: number
  subscriptionType: ESubscriptionType
  paymentType: EPaymentType
}

export type TPaymentSubscription = {
  autoRenewal: boolean
  dateOfPayment: string
  endDateOfSubscription: string
  subscriptionId: string
  userId: number
}

export type TCurrentPaymentSubscriptionsResponse = {
  data: TPaymentSubscription[]
}

export type TSubscriptionPayments = TSubscriptionPayment[]
