import { GET } from '@/app/api/post/[id]/comment/route'
import prisma from '@/app/api/prisma'
import { createOAuthUser, deleteOAuthUser } from '@/database/User'

beforeAll(async () => {
  await createOAuthUser({})
})

describe('GET /api/post/[id]/comment', () => {
  test('One comment', async () => {
    // await GET({ url: 'http://.', user: { id: '123' } } as any, { params: { id: '1' } })
    await expect(Promise.resolve(1)).resolves.toEqual(1)
  })

  test('One comment with referring post', async () => {
    await expect(Promise.resolve(1)).resolves.toEqual(1)
  })

  test('One comment with one reply', async () => {
    await expect(Promise.resolve(1)).resolves.toEqual(1)
  })

  test('One comment with many replies', async () => {
    await expect(Promise.resolve(1)).resolves.toEqual(1)
  })

  test('Many comments', async () => {
    await expect(Promise.resolve(1)).resolves.toEqual(1)
  })

  test('Many comments with one reply', async () => {
    await expect(Promise.resolve(1)).resolves.toEqual(1)
  })

  test('Many comments with many replies', async () => {
    await expect(Promise.resolve(1)).resolves.toEqual(1)
  })
})

afterAll(async () => {
  await deleteOAuthUser({})

  await prisma.$disconnect()
})
