import { Type } from '@sinclair/typebox'
import { Value } from '@sinclair/typebox/value'

import prisma from '@/app/api/prisma'
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

  const cursor = searchParams.get('cursor')
  const limit = searchParams.get('limit')
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
      "ReferredPostAuthor".id AS "referredPostAuthor_id",
      "ReferredPostAuthor".name AS "referredPostAuthor_name",
      "ReferredPostAuthor".nickname AS "referredPostAuthor_nickname",
      "ReferredPostAuthor"."profileImageURLs" AS "referredPostAuthor_profileImageURLs"
      
    FROM "Post" AS "Comment"
      LEFT JOIN "User" AS "Author" ON "Author".id = "Comment"."authorId"
      LEFT JOIN "Post" AS "ReferredPost" ON "ReferredPost".id = "Comment"."referredPostId"
      LEFT JOIN "User" AS "ReferredPostAuthor" ON "ReferredPostAuthor".id = "ReferredPostPost"."authorId"
      LEFT JOIN "Post" AS "ReplyPost" ON "ReplyPost".id = "Comment"."parentPostId" AND "ReplyPost".id
    ORDER BY id < ${cursor} DESC
    LIMIT ${limit};`
  if (!comments.length) return new Response('404 Not Found', { status: 404, statusText: 'Not Found' })
}
