export function buildGoogleUrl(redirectUrl: string) {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUrl,
    response_type: 'code',
    scope: 'openid email profile',
    prompt: 'consent',
  })

  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`
}
