import { ReactNode } from 'react'

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      {/*<Header />*/}
      {/*<Sidebar />*/}
      <main>{children}</main>
    </div>
  )
}
