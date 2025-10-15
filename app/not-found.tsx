import Link from 'next/link'

import styles from './not-found.module.css'

export default function NotFound404() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.errorNumber}>
          <h1 className={styles.number}>
            4<span className={styles.zero}>0</span>4
          </h1>
          <div className={styles.underline}></div>
        </div>
        <div className={styles.text}>
          <h2 className={styles.title}>Oops! Page not found</h2>
          <p className={styles.description}>
            {`This page doesn't exist. Or maybe it moved somewhere else.`}
          </p>
        </div>
        <Link href={'/'} className={styles.homeLink}>
          <svg className={styles.icon} fill={'none'} stroke={'currentColor'} viewBox={'0 0 24 24'}>
            <path
              strokeLinecap={'round'}
              strokeLinejoin={'round'}
              strokeWidth={2}
              d={'M10 19l-7-7m0 0l7-7m-7 7h18'}
            />
          </svg>
          Back to home
        </Link>
      </div>
    </div>
  )
}
