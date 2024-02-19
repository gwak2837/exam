import { Prisma } from '@prisma/client'
import { Value } from '@sinclair/typebox/value'
import { type NextRequest } from 'next/server'

import { type POSTPostRequest, schemaPOSTPostRequest, schemaPOSTPostResponse } from '@/app/api/post/type'
import prisma from '@/app/api/prisma'
import { PostStatus } from '@/database/Post'
import { verifyAuthorizationHeader } from '@/util/auth'
import { deleteDeepNullKey, stringToBigInt } from '@/util/utils'

export default async function POST(request: NextRequest) {
  const userId = await verifyAuthorizationHeader(request)
  if (!userId) return new Response('401 Unauthorized', { status: 401, statusText: 'Unauthorized' })

  let body: POSTPostRequest
  try {
    body = await request.json()
  } catch (error) {
    return new Response('400 Bad Request', { status: 400, statusText: 'Bad Request' })
  }

  if (!Value.Check(schemaPOSTPostRequest, body))
    return new Response('400 Bad Request', { status: 400, statusText: 'Bad Request' })

  const { publishAt } = body

  if (publishAt && new Date(publishAt) < new Date())
    return new Response('400 Bad Request', { status: 400, statusText: 'Bad Request' })

  const parentPostId = stringToBigInt(body.parentPostId)
  const referredPostId = stringToBigInt(body.referredPostId)

  const relatedPosts = await prisma.$queryRaw<{ id: bigint }[]>`
    SELECT "Post".id
    FROM "Post"
      LEFT JOIN "User" AS "Author" ON  "Author".id = "Post"."authorId"
      LEFT JOIN "UserFollow" ON "UserFollow"."leaderId" = "Author"."id" AND "UserFollow"."followerId" = ${userId}::uuid
    WHERE "Post".id IN (${Prisma.join([parentPostId, referredPostId])}) AND (
      "Post".status = ${PostStatus.PUBLIC} OR 
      "Post".status = ${PostStatus.ONLY_FOLLOWERS} AND "UserFollow"."leaderId" IS NOT NULL OR
      "Post".status = ${PostStatus.PRIVATE} AND "Author".id = ${userId}::uuid
    );`

  const postIds = relatedPosts.map((post) => post.id)
  if ((parentPostId && !postIds.includes(parentPostId)) || (referredPostId && !postIds.includes(referredPostId)))
    return new Response('403 Forbidden', { status: 403, statusText: 'Forbidden' })

  // 동시성: 아래 SQL을 처리하는 도중, 팔로우를 끊거나 비공개 처리한 글을 참조해도 이 글이 써질 수 있다
  const createdPost = await prisma.post.create({
    data: {
      publishAt: body.publishAt,
      status: body.status,
      content: body.content,
      authorId: userId,
      parentPostId,
      referredPostId,
    },
    select: {
      id: true,
      createdAt: true,
      publishAt: true,
    },
  })

  const postORM = deleteDeepNullKey({
    id: String(createdPost.id),
    createdAt: createdPost.createdAt,
    publishAt: createdPost.publishAt,
  })
  if (!Value.Errors(schemaPOSTPostResponse, deleteDeepNullKey(postORM)))
    return new Response('422 Unprocessable Content', { status: 422, statusText: 'Unprocessable Content' })

  return Response.json(postORM)
}
