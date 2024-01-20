import { type Static, Type } from '@sinclair/typebox'

export type GETUserResponse = Static<typeof schemaAuthor>

export const schemaAuthor = Type.Object({
  id: Type.String(),
  name: Type.Optional(Type.String()),
  nickname: Type.Optional(Type.String()),
  profileImageURLs: Type.Optional(Type.Array(Type.String())),
})
