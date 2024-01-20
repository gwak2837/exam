import { type NextRequest } from 'next/server'

import { verifyJWT, AuthToken } from '@/util/jwt'

export async function verifyUserId(req: NextRequest) {
  const authorization = req.headers.get('Authorization')
  if (!authorization?.startsWith('Bearer ')) return

  const token = authorization.substring(7)

  try {
    const { sub: userId } = await verifyJWT(token, AuthToken.ACCESS_TOKEN)
    if (!userId) {
      console.error('Fatal: Should not happen. No user id in the access token')
      return
    }

    return userId
  } catch (error) {}
}
