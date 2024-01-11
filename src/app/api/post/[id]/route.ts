import { Type, type Static } from '@sinclair/typebox'
import { Value } from '@sinclair/typebox/value'

import prisma from '@/app/api/prisma'
import { PostStatus } from '@/database/Post'
import { type AuthenticatedRequest } from '@/middleware'
import { deleteDeepNullableKey } from '@/util/utils'

type Context = {
  params: {
    id: string
  }
}

export async function GET(request: AuthenticatedRequest, { params }: Context) {
  const postId = +params.id
  if (!Value.Check(Type.Number(), postId))
    return new Response('400 Bad Request', { status: 400, statusText: 'Bad Request' })

  const userId = request.user?.id

  const [post] = await prisma.$queryRaw<[PostQuery?]>`
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
      "ReferredPostAuthor".id AS "referredPostAuthor_id",
      "ReferredPostAuthor".name AS "referredPostAuthor_name",
      "ReferredPostAuthor".nickname AS "referredPostAuthor_nickname",
      "ReferredPostAuthor"."profileImageURLs" AS "referredPostAuthor_profileImageURLs"
    FROM "Post"
      LEFT JOIN "User" AS "Author" ON "Author".id = "Post"."authorId"
      LEFT JOIN "Post" AS "ReferredPost" ON "ReferredPost".id = "Post"."referredPostId"
      LEFT JOIN "User" AS "ReferredPostAuthor" ON "ReferredPostAuthor".id = "ReferredPost"."authorId"
      LEFT JOIN "UserFollow" ON "UserFollow"."leaderId" = "Author".id AND "UserFollow"."followerId" = ${userId}
    WHERE "Post".id = ${postId} 
      AND (
        "Post"."authorId" = ${userId} OR "Post"."publishAt" < CURRENT_TIMESTAMP 
        AND (
          "Post".status = ${PostStatus.PUBLIC} 
          OR "Post".status = ${PostStatus.ONLY_FOLLOWERS} AND "UserFollow"."leaderId" IS NOT NULL
        )
      );`
  if (!post) return new Response('404 Not Found', { status: 404, statusText: 'Not Found' })

  const isAuthor = post.author_id !== userId

  const postORM = deleteDeepNullableKey({
    id: post.id,
    createdAt: isAuthor ? post.createdAt : null,
    updatedAt: post.updatedAt,
    deletedAt: post.deletedAt,
    publishAt: post.publishAt,
    status: isAuthor ? post.status : null,
    content: post.content,
    imageURLs: post.imageURLs,
    author: {
      id: post.author_id,
      name: post.author_name,
      nickname: post.author_nickname,
      profileImageURLs: post.author_profileImageURLs,
    },
    referredPost: {
      id: post.referredPost_id,
      createdAt: post.referredPost_createdAt,
      updatedAt: post.referredPost_updatedAt,
      deletedAt: post.referredPost_deletedAt,
      publishAt: post.referredPost_publishAt,
      status: post.referredPost_status,
      content: post.referredPost_content,
      imageURLs: post.referredPost_imageURLs,
      author: {
        id: post.referredPostAuthor_id,
        name: post.referredPostAuthor_name,
        nickname: post.referredPostAuthor_nickname,
        profileImageURLs: post.referredPostAuthor_profileImageURLs,
      },
    },
  })
  if (!Value.Check(postResponseSchema, postORM))
    return new Response('422 Unprocessable Content', { status: 422, statusText: 'Unprocessable Content' })

  return Response.json(postORM)
}

type PostQuery = {
  id: bigint
  createdAt: Date
  updatedAt: Date | null
  deletedAt: Date | null
  publishAt: Date | null
  status: number | null
  content: string | null
  imageURLs: string[] | null
  author_id: string | null
  author_name: string | null
  author_nickname: string | null
  author_profileImageURLs: string[] | null
  referredPost_id: bigint | null
  referredPost_createdAt: Date | null
  referredPost_updatedAt: Date | null
  referredPost_deletedAt: Date | null
  referredPost_publishAt: Date | null
  referredPost_status: number | null
  referredPost_content: string | null
  referredPost_imageURLs: string[] | null
  referredPostAuthor_id: string | null
  referredPostAuthor_name: string | null
  referredPostAuthor_nickname: string | null
  referredPostAuthor_profileImageURLs: string[] | null
}

export type PostResponse = Static<typeof postResponseSchema>

const postSchema = {
  id: Type.BigInt(),
  createdAt: Type.Optional(Type.Date()),
  updatedAt: Type.Optional(Type.Date()),
  deletedAt: Type.Optional(Type.Date()),
  publishAt: Type.Optional(Type.Date()),
  status: Type.Optional(Type.Integer()),
  content: Type.Optional(Type.String()),
  imageURLs: Type.Optional(Type.Array(Type.String())),
  author: Type.Optional(
    Type.Object({
      id: Type.String(),
      name: Type.Optional(Type.String()),
      nickname: Type.Optional(Type.String()),
      profileImageURLs: Type.Optional(Type.Array(Type.String())),
    }),
  ),
}

const postResponseSchema = Type.Object({
  ...postSchema,
  referredPost: Type.Optional(Type.Object(postSchema)),
})
