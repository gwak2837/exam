import { Prisma } from '@prisma/client'
import { Type } from '@sinclair/typebox'
import { Value } from '@sinclair/typebox/value'
import { type NextRequest } from 'next/server'

import prisma, { POSTGRES_MAX_BIGINT } from '@/app/api/prisma'
import { PostStatus } from '@/database/Post'
import { verifyAuthorizationHeader } from '@/util/auth'

export enum PostsOnly {
  MINE = 'mine',
  FOLLOWING = 'following',
  ALL = 'all',
}

const schemaGETPostsRequest = Type.Object({
  cursor: Type.BigInt(),
  limit: Type.Number(),
  userId: Type.Optional(Type.String()),
  only: Type.Optional(Type.Enum(PostsOnly)),
})

export default async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const cursor = BigInt(searchParams.get('cursor') ?? POSTGRES_MAX_BIGINT)
  const limit = +(searchParams.get('limit') ?? 30)
  const only = searchParams.get('only') ?? PostsOnly.ALL
  const userId = await verifyAuthorizationHeader(request)
  if (!Value.Check(schemaGETPostsRequest, { cursor, limit, userId, only }))
    return new Response('400 Bad Request', { status: 400, statusText: 'Bad Request' })

  const posts = await prisma.$queryRaw`
    SELECT "Post".id,
      "Post"."createdAt",
      "Post"."updatedAt",
      "Post"."deletedAt",
      "Post"."publishAt",
      "Post".status,
      "Post".content,
      "Post"."imageURLs",
      "Author".id AS "author_id",
      "Author".name AS "author_name",
      "Author".nickname AS "author_nickname",
      "Author"."profileImageURLs" AS "author_profileImageURLs",
      "ReferredPost".id AS "referredPost_id",
      "ReferredPost"."createdAt" AS "referredPost_createdAt",
      "ReferredPost"."updatedAt" AS "referredPost_updatedAt",
      "ReferredPost"."deletedAt" AS "referredPost_deletedAt",
      "ReferredPost"."publishAt" AS "referredPost_publishAt",
      "ReferredPost".status AS "referredPost_status",
      "ReferredPost".content AS "referredPost_content",
      "ReferredPost"."imageURLs" AS "referredPost_imageURLs",
      "ReferredAuthor".id AS "referredAuthor_id",
      "ReferredAuthor".name AS "referredAuthor_name",
      "ReferredAuthor".nickname AS "referredAuthor_nickname",
      "ReferredAuthor"."profileImageURLs" AS "referredAuthor_profileImageURLs",
    FROM "Post"
      LEFT JOIN "User" AS "Author" ON  "Author".id = "Post"."authorId"
      LEFT JOIN "UserFollow" ON "UserFollow"."leaderId" = "Author"."id" AND "UserFollow"."followerId" = ${userId}::uuid
    WHERE "Post".id < ${cursor} AND 
    "Post"."publishAt" <= CURRENT_TIMESTAMP AND 
    "Post"."authorId" != ${userId}::uuid AND (
      "Post".status = ${PostStatus.PUBLIC} OR 
      "Post".status = ${PostStatus.ONLY_FOLLOWERS} AND "UserFollow"."leaderId" IS NOT NULL OR
    )
    ORDER BY "Post".id DESC
    LIMIT ${limit};`

  return Response.json(posts)
}
