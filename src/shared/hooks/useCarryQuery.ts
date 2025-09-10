'use client'
import { useSearchParams } from 'next/navigation'

/*useModalHref*/
export const useCarryQuery = () => {
  const sp = useSearchParams()

  return (pathname: string) => {
    const qs = new URLSearchParams(sp)

    /*qs.set('modal', '1')*/

    return `${pathname}?${qs.toString()}`
  }
}
