import { AuthToken, signJWT, verifyJWT } from '@/util/jwt'

export async function POST(request: Request) {
  const token = request.headers.get('Authorization')
  if (!token) return new Response('400 Bad Request', { status: 400, statusText: 'Bad Request' })

  try {
    const { sub: userId } = await verifyJWT(token, AuthToken.REFRESH_TOKEN)
    if (!userId) {
      console.error('Fatal: Should not happen. No user id in the refresh token')
      return new Response('401 Unauthorized', { status: 401, statusText: 'Unauthorized' })
    }

    return Response.json({ accessToken: await signJWT({ sub: userId }, AuthToken.ACCESS_TOKEN) })
  } catch (error) {
    return new Response('401 Unauthorized', { status: 401, statusText: 'Unauthorized' })
  }
}
