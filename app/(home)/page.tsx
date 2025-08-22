import { GoogleAuth } from '@/features/auth/ui/GoogleAuth/GoogleAuth'
import { HomeView } from '@/views/home'

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ code?: string | string[] }>
}) {
  const params = await searchParams
  const raw = params.code
  const code = Array.isArray(raw) ? raw[0] : raw

  return <>{code ? <GoogleAuth /> : <HomeView />}</>
}
