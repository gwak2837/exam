import { type Static, Type } from '@sinclair/typebox'
import { Value } from '@sinclair/typebox/value'

import prisma from '@/app/api/prisma'
import { type AuthenticatedRequest } from '@/middleware'

export async function GET(request: AuthenticatedRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  const userId = request.user?.id

  return Response.json({})
}

export async function POST(request: AuthenticatedRequest) {
  const userId = request.user?.id
  if (!userId) return new Response('401 Unauthorized', { status: 401, statusText: 'Unauthorized' })

  const body: PostCreationRequestBody = await request.json()
  if (!Value.Check(postCreationSchema, body))
    return new Response('400 Bad Request', { status: 400, statusText: 'Bad Request' })

  const post = await prisma.post.create({
    data: {
      authorId: userId,
    },
    select: { id: true },
  })
}

export type PostCreationRequestBody = Static<typeof postCreationSchema>

const postCreationSchema = Type.Object({
  id: Type.BigInt(),
  publishAt: Type.Optional(Type.Date()),
  status: Type.Optional(Type.Number()),
  content: Type.Optional(Type.String()),
  parentPostId: Type.Optional(Type.BigInt()),
  referredPostId: Type.Optional(Type.BigInt()),
})

export type PostCreationResponse = Static<typeof postCreationResponseSchema>

const postCreationResponseSchema = Type.Object({
  id: Type.BigInt(),
  createdAt: Type.Optional(Type.Date()),
  updatedAt: Type.Optional(Type.Date()),
  deletedAt: Type.Optional(Type.Date()),
  publishAt: Type.Optional(Type.Date()),
  status: Type.Optional(Type.Number()),
  content: Type.Optional(Type.String()),
  author: Type.Optional(
    Type.Object({
      id: Type.String(),
      name: Type.Optional(Type.String()),
      nickname: Type.Optional(Type.String()),
      profileImageURLs: Type.Optional(Type.Array(Type.String())),
    }),
  ),
  referredPost: Type.Optional(
    Type.Object({
      id: Type.BigInt(),
      createdAt: Type.Optional(Type.Date()),
      updatedAt: Type.Optional(Type.Date()),
      deletedAt: Type.Optional(Type.Date()),
      publishAt: Type.Optional(Type.Date()),
      status: Type.Optional(Type.Number()),
      content: Type.Optional(Type.String()),
    }),
  ),
})
