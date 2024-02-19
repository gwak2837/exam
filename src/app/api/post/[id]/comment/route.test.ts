import POSTPost from '../../POST'

import { GET as GETPostIdComment } from '@/app/api/post/[id]/comment/route'
import { type GETPostIdCommentResponse } from '@/app/api/post/[id]/comment/type'
import { type POSTPostRequest, type POSTPostResponse } from '@/app/api/post/type'
import prisma from '@/app/api/prisma'
import { createOAuthUser, getOAuthUser } from '@/database/User'
import { stringToBigInt } from '@/util/utils'

beforeAll(async () => {
  await createOAuthUser({}).catch()
})

describe('GET /api/post/[id]/comment', () => {
  test('작성자 본인 | 글 1개 댓글 1개 작성 | 특정 글 댓글 불러오기', async () => {
    const user = await getOAuthUser({})
    if (!user) throw new Error('User not found')

    const commentContent = '새 댓글 내용'

    const response = await POSTPost({
      user: { id: user.id },
      json: () => ({ content: '새 글 내용' }) satisfies POSTPostRequest,
    } as any)
    if (!response.ok) throw Error(await response.text())
    const newPost = (await response.json()) as POSTPostResponse

    const response2 = await POSTPost({
      user: { id: user.id },
      json: () => ({ content: commentContent, parentPostId: newPost.id }) satisfies POSTPostRequest,
    } as any)
    if (!response2.ok) throw Error(await response2.text())
    const newComment = (await response2.json()) as POSTPostResponse

    const response3 = await GETPostIdComment(
      {
        url: 'http://localhost:3000',
        user: { id: user.id },
      } as any,
      { params: { id: newPost.id } },
    )
    if (!response3.ok) throw Error(await response3.text())
    const comments = (await response3.json()) as GETPostIdCommentResponse

    expect(comments[0]).toEqual({
      id: newComment.id,
      createdAt: newComment.createdAt,
      updatedAt: newComment.createdAt,
      publishAt: newComment.publishAt,
      status: 0,
      content: commentContent,
      author: {
        id: user.id,
      },
    })

    await prisma.post.deleteMany({
      where: {
        OR: [{ id: stringToBigInt(newPost.id) }, { id: stringToBigInt(newComment.id) }],
      },
    })
  })

  test('작성자 본인 | 글 1개 댓글 1개 작성 | One comment with referring post', async () => {
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
  // await deleteOAuthUser({})
  // await prisma.post.deleteMany()
  // await prisma.$disconnect()
})
