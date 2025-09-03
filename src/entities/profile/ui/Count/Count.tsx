import { FC } from 'react'

import s from './Count.module.scss'

type Props = {
  countValue: number
  name: string
}

const Count: FC<Props> = ({ countValue, name }) => {
  // Функция для форматирования чисел (добавляет пробелы между тысячами)
  const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  }

  return (
    <div className={s.count}>
      <span className={s.countValue}>{formatNumber(countValue)}</span>
      <span>{name}</span>
    </div>
  )
}

export default Count
