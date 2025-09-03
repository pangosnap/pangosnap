'use client'
import { useSearchParams } from 'next/navigation'

export const useCarryQuery = () => {
  const sp = useSearchParams()
  const q = Object.fromEntries(sp.entries())

  return (pathname: string) => ({ pathname, query: q })
}
