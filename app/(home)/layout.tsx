import { ReactNode } from 'react'

import HomeLayout from '@/app/layouts/home/HomeLayout'

export default function ForgotPassword({ children }: { children: ReactNode }) {
  return <HomeLayout>{children}</HomeLayout>
}
