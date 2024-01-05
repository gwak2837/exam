import { BBATON_CLIENT_SECRET, NEXT_PUBLIC_BBATON_CLIENT_ID, NEXT_PUBLIC_BBATON_REDIRECT_URI } from '@/common/constants'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  if (!code) return new Response('400 Bad Request', { status: 400, statusText: 'Bad Request' })

  const base64Token = btoa(`${NEXT_PUBLIC_BBATON_CLIENT_ID}:${BBATON_CLIENT_SECRET}`)

  const tokenResponse = await fetch('https://bauth.bbaton.com/oauth/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${base64Token}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      redirect_uri: NEXT_PUBLIC_BBATON_REDIRECT_URI,
      code,
    }),
  })

  const token = await tokenResponse.json()
  if (!token.access_token) return new Response('502 Bad Gateway', { status: 502, statusText: 'Bad Gateway' })

  const bbatonUsername = JSON.parse(atob(token.access_token.split('.')[1])).user_name
  if (!bbatonUsername) return new Response('502 Bad Gateway', { status: 502, statusText: 'Bad Gateway' })

  const bbatonUserResponse = await fetch('https://bauth.bbaton.com/v2/user/me', {
    headers: { Authorization: `Bearer ${token.access_token}` },
  })

  const bbatonUser = await bbatonUserResponse.json()
  if (!bbatonUser.user_id) return new Response('502 Bad Gateway', { status: 502, statusText: 'Bad Gateway' })

  return Response.json({ bbatonUser })
}
