import { type NextRequest } from 'next/server'

import prisma from '@/app/api/prisma'
import { USER_NAME_MAX_LENGTH } from '@/database/User'

type Context = {
  params: {
    name: string
  }
}

export async function GET(request: NextRequest, { params }: Context) {
  const username = params.name
  if (!username || username.length > USER_NAME_MAX_LENGTH)
    return new Response('400 Bad Request', { status: 400, statusText: 'Bad Request' })

  const user = await prisma.user.findUnique({
    select: {
      id: true,
      name: true,
      nickname: true,
      profileImageURLs: true,
    },
    where: { name: username },
  })
  if (!user) return new Response('404 Not Found', { status: 404, statusText: 'Not Found' })

  return Response.json(user)
}
