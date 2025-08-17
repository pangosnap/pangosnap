import { buildGoogleUrl } from '@/features/auth/api/lib/oauth/buildGoogleUrl'
import GoogleIcon from '@/shared/icons/google.svg'
import { Button } from '@/shared/ui/Button/Button'

export const GoogleAuth = () => {
  const googleLoginHandler = () => {
    const redirectUrl = `${window.location.origin}`

    window.location.href = buildGoogleUrl(redirectUrl)
  }

  return (
    <Button variant={'icon'} onClick={googleLoginHandler}>
      <GoogleIcon />
    </Button>
  )
}
