import { ReactNode } from 'react'

import PublicLayout from '@/app/layouts/public/PublicLayout'

//export { default } from '@/app/layouts/public/PublicLayout'

export default function SignInLayout({ children }: { children: ReactNode }) {
  return <PublicLayout>{children}</PublicLayout>
}
