import prisma from '@/app/api/prisma'

type Context = {
  params: {
    id: string
  }
}

export async function GET(request: Request, { params }: Context) {
  const postId = +params.id
  if (!postId || isNaN(postId)) return new Response('400 Bad Request', { status: 400, statusText: 'Bad Request' })

  // TODO: 글 열람 권한 처리하기
  const post = await prisma.post.findUnique({ where: { id: postId } })

  return Response.json({ post })
}
