import React, { memo } from 'react'

import styles from './RegisteredUsers.module.scss'

type RegisteredUsersProps = {
  totalCount?: number
}

export const RegisteredUsers = memo(({ totalCount }: RegisteredUsersProps) => {
  const digits = String(totalCount ?? 0)
    .padStart(6, '0')
    .split('')

  return (
    <section className={styles.registeredSection} aria-labelledby={'registered-title'}>
      <h2 id={'registered-title'} className={styles.sectionTitle}>
        Registered users:
      </h2>
      <div className={styles.counter}>
        <div className={styles.counterDigits} role={'list'}>
          {digits.map((d, i) => (
            <span role={'listitem'} className={styles.digitBox} key={`${d}-${i}`}>
              {d}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
})
