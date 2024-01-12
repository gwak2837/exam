import { type NextRequest, NextResponse } from 'next/server'

import { AuthToken, verifyJWT } from '@/util/jwt'

export const config = {
  matcher: ['/api/:path*'],
}

export type AuthenticatedRequest = NextRequest & {
  user?: {
    id: string
  }
}

export async function middleware(req: NextRequest) {
  const authorization = req.headers.get('Authorization')
  if (!authorization || !authorization.startsWith('Bearer ')) return NextResponse.next()

  const token = authorization.substring(7)

  try {
    const { sub: userId } = await verifyJWT(token, AuthToken.ACCESS_TOKEN)
    if (!userId) {
      console.error('Fatal: Should not happen. No user id in the access token')
      return new Response('401 Unauthorized', { status: 401, statusText: 'Unauthorized' })
    }

    ;(req as AuthenticatedRequest).user = { id: userId }
    return NextResponse.next()
  } catch (error) {
    return new Response('401 Unauthorized', { status: 401, statusText: 'Unauthorized' })
  }
}
