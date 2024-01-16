import { type Static, Type } from '@sinclair/typebox'

export type CommentQuery = {
  id: bigint
}

export type RequestGETPostIdComment = Static<typeof schemaRequestGETPostIdComment>

export const schemaRequestGETPostIdComment = Type.Object({
  postId: Type.BigInt(),
  cursor: Type.Optional(Type.BigInt()),
  limit: Type.Optional(Type.Integer()),
})
