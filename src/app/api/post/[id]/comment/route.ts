import { Type } from '@sinclair/typebox'
import { Value } from '@sinclair/typebox/value'

import prisma from '@/app/api/prisma'
import { PostStatus } from '@/database/Post'
import { type AuthenticatedRequest } from '@/middleware'

type Context = {
  params: {
    id: string
  }
}

export async function GET(request: AuthenticatedRequest, { params }: Context) {
  const postId = +params.id
  if (!Value.Check(Type.Integer(), postId))
    return new Response('400 Bad Request', { status: 400, statusText: 'Bad Request' })

  const { searchParams } = new URL(request.url)
  const cursor = BigInt(searchParams.get('cursor') ?? Number.MAX_SAFE_INTEGER)
  const limit = +(searchParams.get('limit') ?? 20)
  if (!Value.Check(Type.BigInt(), cursor) || !Value.Check(Type.Integer(), limit))
    return new Response('400 Bad Request', { status: 400, statusText: 'Bad Request' })

  const userId = request.user?.id

  const comments = await prisma.$queryRaw<any[]>`
    SELECT "Comment".id,
      "Comment"."createdAt",
      "Comment"."updatedAt",
      "Comment"."deletedAt",
      "Comment"."publishAt",
      "Comment".status,
      "Comment".content,
      "Comment"."imageURLs",
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
      "ReferredAuthor".id AS "ReferredAuthor_id",
      "ReferredAuthor".name AS "ReferredAuthor_name",
      "ReferredAuthor".nickname AS "ReferredAuthor_nickname",
      "ReferredAuthor"."profileImageURLs" AS "ReferredAuthor_profileImageURLs",
      max("ReplyPost".id) AS "replyPost_id",
      "ReplyPost"."createdAt" AS "replyPost_createdAt",
      "ReplyPost"."updatedAt" AS "replyPost_updatedAt",
      "ReplyPost"."deletedAt" AS "replyPost_deletedAt",
      "ReplyPost"."publishAt" AS "replyPost_publishAt",
      "ReplyPost".status AS "replyPost_status",
      "ReplyPost".content AS "replyPost_content",
      "ReplyPost"."imageURLs" AS "replyPost_imageURLs",
      "ReplyAuthor".id AS "replyAuthor_id",
      "ReplyAuthor".name AS "replyAuthor_name",
      "ReplyAuthor".nickname AS "replyAuthor_nickname",
      "ReplyAuthor"."profileImageURLs" AS "replyAuthor_profileImageURLs"
    FROM "Post" AS "Comment"
      LEFT JOIN "User" AS "Author" ON "Author".id = "Comment"."authorId"
      LEFT JOIN "UserFollow" AS "AuthorFollow" ON "AuthorFollow"."leaderId" = "Author".id AND "AuthorFollow"."followerId" = ${userId}
      LEFT JOIN "Post" AS "ReferredPost" ON "ReferredPost".id = "Comment"."referredPostId"
      LEFT JOIN "User" AS "ReferredAuthor" ON "ReferredAuthor".id = "ReferredPost"."authorId"
      LEFT JOIN "UserFollow" AS "ReferredAuthorFollow" ON "ReferredAuthorFollow"."leaderId" = "ReferredAuthor".id AND "ReferredAuthorFollow"."followerId" = ${userId}
      LEFT JOIN "Post" AS "ReplyPost" ON "ReplyPost".id = "Comment"."parentPostId"
      LEFT JOIN "User" AS "ReplyAuthor" ON "ReplyAuthor".id = "ReplyPost"."authorId"
      LEFT JOIN "UserFollow" AS "ReplyAuthorFollow" ON "ReplyAuthorFollow"."leaderId" = "ReplyAuthor".id AND "ReplyAuthorFollow"."followerId" = ${userId}
    WHERE "Comment"."parentPostId" = ${postId} AND (
        "Comment".status = ${PostStatus.PUBLIC}
        OR "Comment".status = ${PostStatus.ONLY_FOLLOWERS} AND "AuthorFollow"."leaderId" IS NOT NULL
      ) AND (
        "ReferredPost".status = ${PostStatus.PUBLIC}
        OR "ReferredPost".status = ${PostStatus.ONLY_FOLLOWERS} AND "ReferredAuthorFollow"."leaderId" IS NOT NULL
      ) AND (
        "ReplyPost".status = ${PostStatus.PUBLIC}
        OR "ReplyPost".status = ${PostStatus.ONLY_FOLLOWERS} AND "ReplyAuthorFollow"."leaderId" IS NOT NULL
      )
    GROUP BY "Comment".id, "Author".id, "ReferredPost".id, "ReferredAuthor".id, "ReplyPost".id, "ReplyAuthor".id
    ORDER BY "Comment".id < ${cursor} DESC
    LIMIT ${limit};`
  console.log('👀 ~ comments:', comments)
  if (!comments.length) return new Response('404 Not Found', { status: 404, statusText: 'Not Found' })
}
