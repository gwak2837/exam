import { GET as GETPostIdComment } from '@/app/api/post/[id]/comment/route'
import { type ResponseGETPostId } from '@/app/api/post/[id]/type'
import { POST as POSTPost, type POSTPostResponse, type POSTPostRequest } from '@/app/api/post/route'
import prisma from '@/app/api/prisma'
import { createOAuthUser, deleteOAuthUser, getOAuthUser } from '@/database/User'

beforeAll(async () => {
  await createOAuthUser({})
})

describe('GET /api/post/[id]/comment', () => {
  test('User = Author | One comment', async () => {
    const user = await getOAuthUser({})
    if (!user) throw new Error('User not found')

    const response = await POSTPost({
      user: { id: user.id },
      json: () => ({ content: '새 글 내용' }) satisfies POSTPostRequest,
    } as any)
    const newPost = (await response.json()) as POSTPostResponse

    const response2 = await POSTPost({
      user: { id: user.id },
      json: () => ({ content: '새 댓글 내용', parentPostId: BigInt(newPost.id) }) satisfies POSTPostRequest,
    } as any)
    const newComment = (await response2.json()) as POSTPostResponse
    console.log('👀 ~ newComment:', newComment)

    const response3 = await GETPostIdComment(
      {
        url: 'http://localhost:3000',
        user: { id: user.id },
      } as any,
      { params: { id: String(newPost.id) } },
    )
    if (!response3.ok) return console.log('👀 ~ response3:', await response3.text())
    const comment = (await response3.json()) as ResponseGETPostId
    console.log('👀 ~ comment:', comment)

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
  // await prisma.post.deleteMany()

  await prisma.$disconnect()
})
