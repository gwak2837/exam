import { exam } from '@/common/exam'
import { type RouteProps } from '@/common/types'
import { shuffle } from '@/utils/utils'
import { revalidateTag } from 'next/cache'
import { type NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(_: NextRequest, { params }: RouteProps) {
  const questionCount = +params.count
  if (!questionCount || questionCount > 50) throw new Error('Invalid number of questions')

  return Response.json({
    questions: shuffle(exam)
      .slice(0, questionCount)
      .map(({ id, 문제, 선택지 }) => ({ id, 문제, 선택지: shuffle(선택지) })),
  })
}

export async function POST(_: NextRequest, { params }: RouteProps) {
  const questionCount = +params.count
  if (!questionCount || questionCount > 50) throw new Error('Invalid number of questions')

  revalidateTag(`question:${questionCount}`)

  return Response.json({ revalidated: true, now: Date.now() })
}
