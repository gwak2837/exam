import { type NextRequest } from 'next/server'

import prisma from '@/app/api/prisma'
import { verifyAuthorizationHeader } from '@/util/auth'

export async function GET(request: NextRequest) {
  const userId = await verifyAuthorizationHeader(request)
  if (!userId) return new Response('401 Unauthorized', { status: 401, statusText: 'Unauthorized' })

  const user = await prisma.user.findUnique({
    select: {
      id: true,
      name: true,
      nickname: true,
      profileImageURLs: true,
    },
    where: { id: userId },
  })
  if (!user) return new Response('422 Unprocessable Entity', { status: 422, statusText: 'Unprocessable Entity' })

  return Response.json(user)
}
