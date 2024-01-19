import { type Static, Type } from '@sinclair/typebox'

export type POSTPostRequest = Static<typeof schemaPOSTPostRequest>

export const schemaPOSTPostRequest = Type.Object({
  publishAt: Type.Optional(Type.String({ format: 'date-time' })),
  status: Type.Optional(Type.Number()),
  content: Type.String(),
  parentPostId: Type.Optional(Type.String()),
  referredPostId: Type.Optional(Type.String()),
})

export type POSTPostResponse = Static<typeof schemaPOSTPostResponse>

export const schemaPOSTPostResponse = Type.Object({
  id: Type.String(),
  createdAt: Type.Date(),
  publishAt: Type.Optional(Type.Date()),
})
