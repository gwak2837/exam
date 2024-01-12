import { type Static, Type } from '@sinclair/typebox'
import { Value } from '@sinclair/typebox/value'

import prisma from '@/app/api/prisma'
import { PostStatus } from '@/database/Post'
import { type AuthenticatedRequest } from '@/middleware'
import { deleteDeepNullableKey } from '@/util/utils'

export async function GET(request: AuthenticatedRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  const userId = request.user?.id

  return Response.json({})
}

export async function POST(request: AuthenticatedRequest) {
  const userId = request.user?.id
  if (!userId) return new Response('401 Unauthorized', { status: 401, statusText: 'Unauthorized' })

  const body: RequestPOSTPost = await request.json()
  if (!Value.Check(schemaRequestPOSTPost, body))
    return new Response('400 Bad Request', { status: 400, statusText: 'Bad Request' })

  if (!body.publishAt) return new Response('400 Bad Request', { status: 400, statusText: 'Bad Request' })

  const { parentPostId, referredPostId } = body

  const relatedPosts = await prisma.$queryRaw<{ id: bigint }[]>`
    SELECT "Post".id
    FROM "Post"
      LEFT JOIN "User" AS "Author" ON  "Author".id = "Post"."authorId" AND "Post".id IN (ARRAY${[
        parentPostId,
        referredPostId,
      ]})
      LEFT JOIN "UserFollow" ON "UserFollow"."leaderId" = "Author"."id" AND "UserFollow"."followId" = ${userId}
    WHERE "Post".status = ${PostStatus.PUBLIC} OR 
      "Post".status = ${PostStatus.ONLY_FOLLOWERS} AND "UserFollow"."leaderId" IS NOT NULL OR
      "Post".status = ${PostStatus.PRIVATE} AND "Author".id = ${userId};`

  const postIds = relatedPosts.map((post) => post.id)
  if ((parentPostId && !postIds.includes(parentPostId)) || (referredPostId && !postIds.includes(referredPostId)))
    return new Response('403 Forbidden', { status: 403, statusText: 'Forbidden' })

  // 동시성: 아래 SQL을 처리하는 도중 팔로우를 끊거나 비공개 처리한 글을 참조해도 글이 써질 순 있다
  const createdPost = await prisma.post.create({
    data: {
      publishAt: body.publishAt,
      status: body.status,
      content: body.content,
      authorId: userId,
      parentPostId,
      referredPostId,
    },
  })
  if (!Value.Check(schemaResponsePOSTPost, deleteDeepNullableKey(createdPost)))
    return new Response('422 Unprocessable Content', { status: 422, statusText: 'Unprocessable Content' })

  return Response.json(createdPost)
}

export type RequestPOSTPost = Static<typeof schemaRequestPOSTPost>

const schemaRequestPOSTPost = Type.Object({
  publishAt: Type.Optional(Type.String({ format: 'date-time' })),
  status: Type.Optional(Type.Number()),
  content: Type.String(),
  parentPostId: Type.Optional(Type.BigInt()),
  referredPostId: Type.Optional(Type.BigInt()),
})

export type ResponsePOSTPost = Static<typeof schemaResponsePOSTPost>

const schemaResponsePOSTPost = Type.Object({
  id: Type.BigInt(),
  createdAt: Type.Date(),
  updatedAt: Type.Optional(Type.Date()),
  publishAt: Type.Optional(Type.Date()),
  status: Type.Number(),
  content: Type.String(),
  authorId: Type.String(),
  parentPostId: Type.BigInt(),
  referredPostId: Type.BigInt(),
})
