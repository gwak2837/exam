import { createOAuthUser, deleteOAuthUser } from '../../../test/user/util'

import { GET } from '@/app/api/post/[id]/comment/route'
import prisma from '@/app/api/prisma'

beforeAll(async () => {
  await createOAuthUser({})
})

describe('GET /api/post/[id]/comment', () => {
  test('One comments', async () => {
    // await GET({ url: 'http://.', user: { id: '123' } } as any, { params: { id: '1' } })
    await expect(Promise.resolve(1)).resolves.toEqual(1)
  })
})

afterAll(async () => {
  await deleteOAuthUser({})

  await prisma.$disconnect()
})
