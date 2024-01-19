import { Type } from '@sinclair/typebox'
import { Value } from '@sinclair/typebox/value'

import { schemaGETPostIdResponse, type PostQuery, schemaResponseDELETEPostId } from '@/app/api/post/[id]/type'
import prisma from '@/app/api/prisma'
import { PostStatus } from '@/database/Post'
import { type AuthenticatedRequest } from '@/middleware'
import { deleteDeepNullKey, bigIntToString, stringToBigInt } from '@/util/utils'

type Context = {
  params: {
    id: string
  }
}

export async function GET(request: AuthenticatedRequest, { params }: Context) {
  const postId = stringToBigInt(params.id)
  if (!Value.Check(Type.BigInt(), postId))
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
    WHERE "Post".id = ${postId} AND (
      "Post"."authorId" = ${userId} OR
      "Post"."publishAt" < CURRENT_TIMESTAMP AND (
        "Post".status = ${PostStatus.PUBLIC} OR 
        "Post".status = ${PostStatus.ONLY_FOLLOWERS} AND "UserFollow"."leaderId" IS NOT NULL
      ));`
  if (!post) return new Response('404 Not Found', { status: 404, statusText: 'Not Found' })

  const isAuthor = post.author_id === userId
  const isReferredAuthor = post.referredPostAuthor_id === userId

  const postORM = deleteDeepNullKey({
    id: String(post.id),
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
      id: bigIntToString(post.referredPost_id),
      createdAt: isReferredAuthor ? post.referredPost_createdAt : null,
      updatedAt: post.referredPost_updatedAt,
      deletedAt: post.referredPost_deletedAt,
      publishAt: post.referredPost_publishAt,
      status: isReferredAuthor ? post.referredPost_status : null,
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
  if (!Value.Check(schemaGETPostIdResponse, postORM))
    return new Response('422 Unprocessable Content', { status: 422, statusText: 'Unprocessable Content' })

  return Response.json(postORM)
}

export async function DELETE(request: AuthenticatedRequest, { params }: Context) {
  const postId = stringToBigInt(params.id)
  if (!Value.Check(Type.BigInt(), postId))
    return new Response('400 Bad Request', { status: 400, statusText: 'Bad Request' })

  const userId = request.user?.id
  if (!userId) return new Response('401 Unauthorized', { status: 401, statusText: 'Unauthorized' })

  const deletedPost = await prisma.post.delete({ where: { id: postId }, select: { id: true, deletedAt: true } })
  if (!Value.Check(schemaResponseDELETEPostId, deleteDeepNullKey(deletedPost)))
    return new Response('422 Unprocessable Content', { status: 422, statusText: 'Unprocessable Content' })

  return Response.json(deletedPost)
}
