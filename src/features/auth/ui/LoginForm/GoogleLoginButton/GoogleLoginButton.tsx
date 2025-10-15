import { buildGoogleUrl } from '@/features/auth/api/lib/oauth/buildGoogleUrl'
import GoogleIcon from '@/shared/icons/google.svg'
import { Button } from '@/shared/ui/Button/Button'
import { useRouter } from 'next/navigation'

export const GoogleLoginButton = () => {
  const router = useRouter()
  const googleLoginHandler = () => {
    const redirectUrl = `${window.location.origin}`

    router.push(buildGoogleUrl(redirectUrl))
  }

  return (
    <Button variant={'icon'} onClick={googleLoginHandler}>
      <GoogleIcon />
    </Button>
  )
}
