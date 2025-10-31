export interface PaymentData {
  id: string
  dateOfPayment: string
  endDateOfSubscription: string
  price: number
  subscriptionType: string
  paymentType: 'Stripe' | 'PayPal'
}
