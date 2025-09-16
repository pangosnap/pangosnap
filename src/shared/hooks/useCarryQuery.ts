'use client'
import { useSearchParams } from 'next/navigation'

export const useCarryQuery = () => {
  const sp = useSearchParams()

  return (pathname: string) => {
    if (!sp) {
      return pathname
    }

    const qs = new URLSearchParams(sp)
    const str = qs.toString()

    return str ? `${pathname}?${str}` : pathname
  }
}
