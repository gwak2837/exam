import { Value } from '@sinclair/typebox/value'
import { type NextRequest } from 'next/server'

import {
  type CommentsQuery,
  schemaGETPostIdCommentRequest,
  schemaGETPostIdCommentResponse,
  type GETPostIdCommentRequest,
} from '@/app/api/post/[id]/comment/type'
import prisma, { POSTGRES_MAX_BIGINT } from '@/app/api/prisma'
import { PostStatus } from '@/database/Post'
import { verifyUserId } from '@/util/auth'
import { bigIntToString, deleteDeepNullKey } from '@/util/utils'

type Context = {
  params: {
    id: string
  }
}

export async function GET(request: NextRequest, { params }: Context) {
  const { searchParams } = new URL(request.url)
  const input = {
    postId: params.id,
    cursor: searchParams.get('cursor') ?? undefined,
    limit: searchParams.get('limit') ?? undefined,
  } satisfies GETPostIdCommentRequest
  if (!Value.Check(schemaGETPostIdCommentRequest, input))
    return new Response('400 Bad Request', { status: 400, statusText: 'Bad Request' })

  const postId = BigInt(input.postId)
  const cursor = BigInt(input.cursor ?? POSTGRES_MAX_BIGINT)
  const limit = +(input.limit ?? 20)
  const userId = await verifyUserId(request)

  const comments = await prisma.$queryRaw<CommentsQuery[]>`
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
      "ReferredAuthor".id AS "referredAuthor_id",
      "ReferredAuthor".name AS "referredAuthor_name",
      "ReferredAuthor".nickname AS "referredAuthor_nickname",
      "ReferredAuthor"."profileImageURLs" AS "referredAuthor_profileImageURLs",
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
    WHERE "Comment".id < ${cursor} AND "Comment"."parentPostId" = ${postId} AND (
      "Comment"."publishAt" < CURRENT_TIMESTAMP AND (
        "Comment".status = ${PostStatus.PUBLIC} OR
        "Comment".status = ${PostStatus.ONLY_FOLLOWERS} AND "AuthorFollow"."leaderId" IS NOT NULL
      ) OR
      "Comment".status = ${PostStatus.PRIVATE} AND "Author".id = ${userId}::uuid
    ) AND (
      "ReferredPost".id IS NULL OR 
      "ReferredPost"."publishAt" < CURRENT_TIMESTAMP AND (
        "ReferredPost".status = ${PostStatus.PUBLIC} OR 
        "ReferredPost".status = ${PostStatus.ONLY_FOLLOWERS} AND "ReferredAuthorFollow"."leaderId" IS NOT NULL
      ) OR
      "ReferredPost".status = ${PostStatus.PRIVATE} AND "ReferredAuthor".id = ${userId}::uuid
    ) AND (
      "ReplyPost".id IS NULL OR
      "ReferredPost"."publishAt" < CURRENT_TIMESTAMP AND (
        "ReplyPost".status = ${PostStatus.PUBLIC} OR 
        "ReplyPost".status = ${PostStatus.ONLY_FOLLOWERS} AND "ReplyAuthorFollow"."leaderId" IS NOT NULL
      ) OR
      "ReplyPost".status = ${PostStatus.PRIVATE} AND "ReplyAuthor".id = ${userId}::uuid
    )
    LIMIT ${limit};`
  if (comments.length === 0) return new Response('404 Not Found', { status: 404, statusText: 'Not Found' })

  const commentsORM = comments.map((comment) =>
    deleteDeepNullKey({
      id: String(comment.id),
      createdAt: userId === comment.author_id ? comment.createdAt : null,
      updatedAt: comment.updatedAt,
      deletedAt: comment.deletedAt,
      publishAt: comment.publishAt,
      status: userId === comment.author_id ? comment.status : null,
      content: comment.content,
      imageURLs: comment.imageURLs,
      author: {
        id: comment.author_id,
        name: comment.author_name,
        nickname: comment.author_nickname,
        profileImageURLs: comment.author_profileImageURLs,
      },
      referredPost: {
        id: bigIntToString(comment.referredPost_id),
        createdAt: userId === comment.referredAuthor_id ? comment.referredPost_createdAt : null,
        updatedAt: comment.referredPost_updatedAt,
        deletedAt: comment.referredPost_deletedAt,
        publishAt: comment.referredPost_publishAt,
        status: userId === comment.referredAuthor_id ? comment.referredPost_status : null,
        content: comment.referredPost_content,
        imageURLs: comment.referredPost_imageURLs,
        author: {
          id: comment.referredAuthor_id,
          name: comment.referredAuthor_name,
          nickname: comment.referredAuthor_nickname,
          profileImageURLs: comment.referredAuthor_profileImageURLs,
        },
      },
      replyPost: {
        id: bigIntToString(comment.replyPost_id),
        createdAt: userId === comment.replyAuthor_id ? comment.replyPost_createdAt : null,
        updatedAt: comment.replyPost_updatedAt,
        deletedAt: comment.replyPost_deletedAt,
        publishAt: comment.replyPost_publishAt,
        status: userId === comment.replyAuthor_id ? comment.replyPost_status : null,
        content: comment.replyPost_content,
        imageURLs: comment.replyPost_imageURLs,
        author: {
          id: comment.replyAuthor_id,
          name: comment.replyAuthor_name,
          nickname: comment.replyAuthor_nickname,
          profileImageURLs: comment.replyAuthor_profileImageURLs,
        },
      },
    }),
  )
  if (!Value.Check(schemaGETPostIdCommentResponse, commentsORM))
    return new Response('422 Unprocessable Content', { status: 422, statusText: 'Unprocessable Content' })

  return Response.json(commentsORM)
}
