import { ReactNode } from 'react'
import { HeaderPublic } from '@/widgets/HeaderPublic/HeaderPublic'

export default function PublicLayout({ children,modal }: { children: ReactNode,modal: ReactNode }) {
  return (
    <>
      <div className="l-wrap">
        <HeaderPublic />
        <main className="l-container l-centered page-public">{children}{modal}</main>
      </div>
    </>
  )
}
