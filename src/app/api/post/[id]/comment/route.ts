import { Value } from '@sinclair/typebox/value'

import { schemaRequestGETPostIdComment } from '@/app/api/post/[id]/comment/type'
import prisma, { POSTGRES_MAX_BIGINT } from '@/app/api/prisma'
import { PostStatus } from '@/database/Post'
import { type AuthenticatedRequest } from '@/middleware'

type Context = {
  params: {
    id: string
  }
}

export async function GET(request: AuthenticatedRequest, { params }: Context) {
  const { searchParams } = new URL(request.url)
  const postId = BigInt(params.id)
  const cursor = BigInt(searchParams.get('cursor') ?? POSTGRES_MAX_BIGINT)
  const limit = +(searchParams.get('limit') ?? 20)
  if (!Value.Check(schemaRequestGETPostIdComment, { postId, cursor, limit }))
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
      "ReplyPost".id AS "replyPost_id",
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
      LEFT JOIN "UserFollow" AS "AuthorFollow" ON "AuthorFollow"."leaderId" = "Author".id AND "AuthorFollow"."followerId" = ${userId}::uuid
      LEFT JOIN "Post" AS "ReferredPost" ON "ReferredPost".id = "Comment"."referredPostId"
      LEFT JOIN "User" AS "ReferredAuthor" ON "ReferredAuthor".id = "ReferredPost"."authorId"
      LEFT JOIN "UserFollow" AS "ReferredAuthorFollow" ON "ReferredAuthorFollow"."leaderId" = "ReferredAuthor".id AND "ReferredAuthorFollow"."followerId" = ${userId}::uuid
      LEFT JOIN "Post" AS "ReplyPost" ON "ReplyPost"."parentPostId" = "Comment"."id"
      LEFT JOIN "Post" AS "ReplyPost2" ON "ReplyPost".id < "ReplyPost2".id
      LEFT JOIN "User" AS "ReplyAuthor" ON "ReplyAuthor".id = "ReplyPost"."authorId"
      LEFT JOIN "UserFollow" AS "ReplyAuthorFollow" ON "ReplyAuthorFollow"."leaderId" = "ReplyAuthor".id AND "ReplyAuthorFollow"."followerId" = ${userId}::uuid
    WHERE "Comment".id < ${cursor} AND
        "Comment"."parentPostId" = ${postId} AND (
        "Comment".status = ${PostStatus.PUBLIC} OR
        "Comment".status = ${PostStatus.ONLY_FOLLOWERS} AND "AuthorFollow"."leaderId" IS NOT NULL OR
        "Comment".status = ${PostStatus.PRIVATE} AND "Author".id = ${userId}::uuid
      ) AND (
        "ReferredPost".id IS NULL OR 
        "ReferredPost".status = ${PostStatus.PUBLIC} OR 
        "ReferredPost".status = ${PostStatus.ONLY_FOLLOWERS} AND "ReferredAuthorFollow"."leaderId" IS NOT NULL OR
        "ReferredPost".status = ${PostStatus.PRIVATE} AND "ReferredAuthor".id = ${userId}::uuid
      ) AND (
        "ReplyPost".id IS NULL OR 
        "ReplyPost".status = ${PostStatus.PUBLIC} OR 
        "ReplyPost".status = ${PostStatus.ONLY_FOLLOWERS} AND "ReplyAuthorFollow"."leaderId" IS NOT NULL OR
        "ReplyPost".status = ${PostStatus.PRIVATE} AND "ReplyAuthor".id = ${userId}::uuid
      )
    LIMIT ${limit};`
  if (!comments.length) return new Response('404 Not Found', { status: 404, statusText: 'Not Found' })

  return Response.json(comments)
}
