import prisma from '@/app/api/prisma'
import { PostStatus } from '@/database/Post'
import { type AuthenticatedRequest } from '@/middleware'

type Context = {
  params: {
    id: string
  }
}

export async function GET(request: AuthenticatedRequest, { params }: Context) {
  const postId = +params.id
  if (!postId || isNaN(postId)) return new Response('400 Bad Request', { status: 400, statusText: 'Bad Request' })

  const userId = request.user?.id

  const post = await prisma.post.findUnique({
    select: {
      id: true,
      createdAt: true,
      updatedAt: true,
      deletedAt: true,
      status: true,
      content: true,
      author: {
        select: {
          id: true,
          name: true,
          nickname: true,
        },
      },
      childrenPosts: true,
      referredPost: true,
    },
    where: {
      id: postId,
      deletedAt: null,
      OR: [{ authorId: userId }, { status: PostStatus.PUBLIC }],
    },
  })
  if (!post) return new Response('404 Not Found', { status: 404, statusText: 'Not Found' })

  return Response.json({ post })
}
