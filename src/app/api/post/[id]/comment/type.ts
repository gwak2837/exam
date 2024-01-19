import { type Static, Type } from '@sinclair/typebox'

import { schemaPost } from '@/app/api/post/[id]/type'

export type GETPostIdCommentRequest = Static<typeof schemaGETPostIdCommentRequest>

export const schemaGETPostIdCommentRequest = Type.Object({
  postId: Type.String(),
  cursor: Type.Optional(Type.String()),
  limit: Type.Optional(Type.String()),
})

export type CommentsQuery = {
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
  referredPost_createdAt: Date
  referredPost_updatedAt: Date | null
  referredPost_deletedAt: Date | null
  referredPost_publishAt: Date | null
  referredPost_status: number | null
  referredPost_content: string | null
  referredPost_imageURLs: string[] | null
  referredAuthor_id: string | null
  referredAuthor_name: string | null
  referredAuthor_nickname: string | null
  referredAuthor_profileImageURLs: string[] | null
  replyPost_id: bigint | null
  replyPost_createdAt: Date
  replyPost_updatedAt: Date | null
  replyPost_deletedAt: Date | null
  replyPost_publishAt: Date | null
  replyPost_status: number | null
  replyPost_content: string | null
  replyPost_imageURLs: string[] | null
  replyAuthor_id: string | null
  replyAuthor_name: string | null
  replyAuthor_nickname: string | null
  replyAuthor_profileImageURLs: string[] | null
}

export type GETPostIdCommentResponse = Static<typeof schemaGETPostIdCommentResponse>

export const schemaGETPostIdCommentResponse = Type.Array(
  Type.Object({
    ...schemaPost,
    referredPost: Type.Optional(Type.Object(schemaPost)),
    replyPost: Type.Optional(Type.Object(schemaPost)),
  }),
)
