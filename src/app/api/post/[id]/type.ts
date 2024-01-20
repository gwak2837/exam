import { type Static, Type } from '@sinclair/typebox'

import { schemaAuthor } from '@/app/api/user/type'

export type PostQuery = {
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

export type GETPostIdResponse = Static<typeof schemaGETPostIdResponse>

export const schemaPost = {
  id: Type.String(),
  createdAt: Type.Optional(Type.Date()),
  updatedAt: Type.Optional(Type.Date()),
  deletedAt: Type.Optional(Type.Date()),
  publishAt: Type.Optional(Type.Date()),
  status: Type.Optional(Type.Integer()),
  content: Type.Optional(Type.String()),
  imageURLs: Type.Optional(Type.Array(Type.String())),
  author: Type.Optional(schemaAuthor),
}

export const schemaGETPostIdResponse = Type.Object({
  ...schemaPost,
  referredPost: Type.Optional(Type.Object(schemaPost)),
})

export type ResponseDELETEPostId = Static<typeof schemaResponseDELETEPostId>

export const schemaResponseDELETEPostId = Type.Object({
  id: Type.BigInt(),
  deletedAt: Type.Optional(Type.Date()),
})
