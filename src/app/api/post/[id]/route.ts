import prisma from '@/app/api/prisma'
import { PostStatus } from '@/database/Post'
import { type AuthenticatedRequest } from '@/middleware'
import { removeDeepNullKey } from '@/util/utils'

type Context = {
  params: {
    id: string
  }
}

export async function GET(request: AuthenticatedRequest, { params }: Context) {
  const postId = +params.id
  if (!postId || isNaN(postId)) return new Response('400 Bad Request', { status: 400, statusText: 'Bad Request' })

  const userId = request.user?.id

  const [post] = await prisma.$queryRaw<[PostFromDB]>`
    SELECT "Post".id,
      "Post"."createdAt",
      "Post"."updatedAt",
      "Post"."deletedAt",
      "Post"."publishAt",
      "Post".status,
      "Post".content,
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
      "ReferredPost".content AS "referredPost_content"
    FROM "Post"
      LEFT JOIN "User" AS "Author" ON "Author".id = "Post"."authorId"
      LEFT JOIN "Post" AS "ReferredPost" 
        ON "ReferredPost".id = "Post"."referredPostId" 
        AND "ReferredPost".status = ${PostStatus.PUBLIC} 
        AND "ReferredPost"."publishAt" < CURRENT_TIMESTAMP
    WHERE "Post".id = ${postId}
      AND (
        "Post"."authorId" = ${userId} 
        OR "Post".status = ${PostStatus.PUBLIC} 
        AND "Post"."publishAt" < CURRENT_TIMESTAMP
      );
  `
  if (!post) return new Response('404 Not Found', { status: 404, statusText: 'Not Found' })

  const isAuthor = post.author_id !== userId
  const postResponse = removeDeepNullKey({
    id: post.id,
    createdAt: isAuthor ? post.createdAt : null,
    updatedAt: post.updatedAt,
    deletedAt: post.deletedAt,
    publishAt: post.publishAt,
    status: isAuthor ? post.status : null,
    content: post.content,
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
    },
  })

  return Response.json(postResponse)
}

type PostFromDB = {
  id: bigint
  createdAt: Date
  updatedAt: Date | null
  deletedAt: Date | null
  publishAt: Date | null
  status: number | null
  content: string | null
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
}

export type PostResponse = {
  id: bigint
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
  publishAt?: Date
  status?: number
  content?: string
  author?: {
    id: string
    name?: string
    nickname?: string
    profileImageURLs?: string[]
  }
  referredPost?: {
    id: bigint
    createdAt?: Date
    updatedAt?: Date
    deletedAt?: Date
    publishAt?: Date
    status?: number
    content?: string
  }
}
const a = `ㄴㅇㄹ`
