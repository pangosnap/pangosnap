'use client'
import { useMemo, useState } from 'react'

import { type PaymentData } from './types'
import { useGetPaymentsQuery } from '@/entities/profile/api/settingsApi'
import { ESubscriptionType } from '@/entities/profile/type/settingsType'
import { LoaderTransparent } from '@/shared/ui/LoaderTransparent/Loadertransparent'
import { Pagination } from '@/shared/ui/Pagination'
import { formatDate } from '@/shared/utils/formatDate'

import s from './MyPayments.module.scss'

// Моковые данные для тестирования пагинации
const mockPayments: PaymentData[] = [
  {
    id: '1',
    dateOfPayment: '12.12.2022',
    endDateOfSubscription: '12.12.2022',
    price: 10,
    subscriptionType: '1 day',
    paymentType: 'Stripe',
  },
  {
    id: '2',
    dateOfPayment: '12.12.2022',
    endDateOfSubscription: '12.12.2022',
    price: 50,
    subscriptionType: '7 days',
    paymentType: 'Stripe',
  },
  {
    id: '3',
    dateOfPayment: '12.12.2022',
    endDateOfSubscription: '12.12.2022',
    price: 100,
    subscriptionType: '1 month',
    paymentType: 'Stripe',
  },
  {
    id: '4',
    dateOfPayment: '12.12.2022',
    endDateOfSubscription: '12.12.2022',
    price: 100,
    subscriptionType: '1 month',
    paymentType: 'PayPal',
  },
  {
    id: '5',
    dateOfPayment: '12.12.2022',
    endDateOfSubscription: '12.12.2022',
    price: 50,
    subscriptionType: '7 days',
    paymentType: 'PayPal',
  },
  {
    id: '6',
    dateOfPayment: '12.12.2022',
    endDateOfSubscription: '12.12.2022',
    price: 50,
    subscriptionType: '7 days',
    paymentType: 'PayPal',
  },
  {
    id: '7',
    dateOfPayment: '12.12.2022',
    endDateOfSubscription: '12.12.2022',
    price: 50,
    subscriptionType: '7 days',
    paymentType: 'PayPal',
  },
  {
    id: '8',
    dateOfPayment: '12.12.2022',
    endDateOfSubscription: '12.12.2022',
    price: 100,
    subscriptionType: '1 month',
    paymentType: 'PayPal',
  },
  // Добавляем больше данных для демонстрации пагинации
  ...Array.from({ length: 50 }, (_, i) => ({
    id: `${i + 9}`,
    dateOfPayment: '12.12.2022',
    endDateOfSubscription: '12.12.2022',
    price: [10, 50, 100][i % 3],
    subscriptionType: ['1 day', '7 days', '1 month'][i % 3],
    paymentType: ['Stripe', 'PayPal'][i % 2] as 'Stripe' | 'PayPal',
  })),
]

function formatSubscriptionType(type: string): string {
  const subscriptionType = type as ESubscriptionType
  const mappings = {
    [ESubscriptionType.DAY]: '1 day',
    [ESubscriptionType.WEEKLY]: '7 days',
    [ESubscriptionType.MONTHLY]: '1 month',
  }

  return mappings[subscriptionType]
}

export const AccountPayments = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  const { data: payments, isLoading } = useGetPaymentsQuery()

  const totalPages = Math.ceil(payments?.length ?? 0 / itemsPerPage)

  const paginatedPayments = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage

    return payments?.slice(startIndex, endIndex) ?? []
  }, [currentPage, itemsPerPage, payments])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage)
    setCurrentPage(1) // Сбрасываем на первую страницу при изменении количества элементов
  }

  return (
    <div className={s.container}>
      <div className={s.tableContainer}>
        <table className={s.table}>
          <thead>
            <tr className={s.headerRow}>
              <th className={s.headerCell}>Date of Payment</th>
              <th className={s.headerCell}>End date of subscription</th>
              <th className={s.headerCell}>Price</th>
              <th className={s.headerCell}>Subscription Type</th>
              <th className={s.headerCell}>Payment Type</th>
            </tr>
          </thead>
          <tbody>
            {paginatedPayments.map(payment => (
              <tr key={payment.userId} className={s.dataRow}>
                <td className={s.dataCell}>{formatDate(payment.dateOfPayment)}</td>
                <td className={s.dataCell}>{formatDate(payment.endDateOfSubscription)}</td>
                <td className={s.dataCell}>${payment.price}</td>
                <td className={s.dataCell}>{formatSubscriptionType(payment.subscriptionType)}</td>
                <td className={s.dataCell}>{payment.paymentType}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        totalItems={payments?.length ?? 0}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
        itemsPerPageOptions={[10, 20, 50, 100]}
      />
      <LoaderTransparent
        isLoading={isLoading}
        overlayColor={'rgba(0, 0, 0, 0.8)'}
        spinnerColor={'#fdfdfd'}
        size={60}
        zIndex={10000}
      />
    </div>
  )
}
