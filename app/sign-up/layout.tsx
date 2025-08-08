import { ReactNode } from 'react'

import PublicLayout from '@/app/layouts/public/PublicLayout'

export default function SignUpLayout({ children }: { children: ReactNode }) {
  return <PublicLayout>{children}</PublicLayout>
}
