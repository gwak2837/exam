import { type Static, Type } from '@sinclair/typebox'
import { Value } from '@sinclair/typebox/value'

import prisma from '@/app/api/prisma'
import { type AuthenticatedRequest } from '@/middleware'
import { deleteDeepNullableKey } from '@/util/utils'

export async function GET(request: AuthenticatedRequest) {
  const userId = request.user?.id
  if (!userId) return new Response('401 Unauthorized', { status: 401, statusText: 'Unauthorized' })

  const user = await prisma.user.findUnique({ where: { id: userId } })
  if (!user) return new Response('404 Not Found', { status: 404, statusText: 'Not Found' })

  if (!Value.Check(schemaGETAuthResponse, deleteDeepNullableKey(user)))
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
  name: Type.Optional(Type.String()),
  nickname: Type.Optional(Type.String()),
  profileImageURLs: Type.Optional(Type.Array(Type.String())),
  sex: Type.Integer(),
  config: Type.Optional(Type.String()),
})
