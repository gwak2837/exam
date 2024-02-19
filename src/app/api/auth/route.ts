import { type Static, Type } from '@sinclair/typebox'
import { Value } from '@sinclair/typebox/value'
import { type NextRequest } from 'next/server'

import prisma from '@/app/api/prisma'
import { UserSex } from '@/database/User'
import { verifyAuthorizationHeader } from '@/util/auth'
import { deleteDeepNullKey } from '@/util/utils'

export async function GET(request: NextRequest) {
  const userId = await verifyAuthorizationHeader(request)
  if (!userId) return new Response('401 Unauthorized', { status: 401, statusText: 'Unauthorized' })

  const user = await prisma.user.findUnique({ where: { id: userId } })
  if (!user) return new Response('404 Not Found', { status: 404, statusText: 'Not Found' })

  if (!Value.Check(schemaGETAuthResponse, deleteDeepNullKey(user)))
    return new Response('422 Unprocessable Content', { status: 422, statusText: 'Unprocessable Content' })

  return Response.json(user)
}

export type GETAuthResponse = Static<typeof schemaGETAuthResponse>

const schemaGETAuthResponse = Type.Object({
  id: Type.String(),
  createdAt: Type.Date(),
  updatedAt: Type.Optional(Type.Date()),
  suspendedAt: Type.Optional(Type.Date()),
  unsuspendAt: Type.Optional(Type.Date()),
  suspendedType: Type.Optional(Type.Integer()),
  suspendedReason: Type.Optional(Type.String()),
  ageRange: Type.Integer(),
  bio: Type.Optional(Type.String()),
  grade: Type.Integer(),
  name: Type.Optional(Type.String()),
  nickname: Type.Optional(Type.String()),
  profileImageURLs: Type.Optional(Type.Array(Type.String())),
  sex: Type.Enum(UserSex),
  config: Type.Optional(Type.String()),
})
