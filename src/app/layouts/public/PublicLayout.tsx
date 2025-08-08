import { ReactNode } from 'react'
import { HeaderPublic } from '@/widgets/HeaderPublic/HeaderPublic'

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="l-wrap">
        <HeaderPublic />
        <main className="l-container l-centered page-public">{children}</main>
      </div>
    </>
  )
}
