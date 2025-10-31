import React from 'react'

import styles from './LoaderTransparent.module.css'

interface LoaderProps {
  isLoading: boolean
  text?: string
  overlayColor?: string
  spinnerColor?: string
  size?: number
  zIndex?: number
}

export const LoaderTransparent: React.FC<LoaderProps> = ({
  isLoading,
  text = 'Loading...',
  overlayColor,
  spinnerColor,
  size,
  zIndex,
}) => {
  React.useEffect(() => {
    if (isLoading) {
      document.body.classList.add(styles.bodyBlocked)
    } else {
      document.body.classList.remove(styles.bodyBlocked)
    }

    return () => {
      document.body.classList.remove(styles.bodyBlocked)
    }
  }, [isLoading])

  if (!isLoading) {
    return null
  }

  return (
    <div
      className={styles.overlay}
      style={{
        backgroundColor: overlayColor,
        zIndex,
      }}
    >
      <div className={styles.container}>
        <div
          className={styles.spinner}
          style={{
            width: size,
            height: size,
            borderTopColor: spinnerColor,
            borderRightColor: spinnerColor,
          }}
        ></div>
        {text && <p className={styles.text}>{text}</p>}
      </div>
    </div>
  )
}
