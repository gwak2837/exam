import { exam } from '@/common/exam'
import { RouteProps } from '@/common/types'
import { shuffle } from '@/utils/utils'
import { NextRequest } from 'next/server'

export const revalidate = 60

export async function GET(_: NextRequest, { params }: RouteProps) {
  const questionCount = +params.count
  if (!questionCount || questionCount > 50) throw new Error(`Invalid number of questions`)

  return Response.json({
    questions: shuffle(exam)
      .slice(0, questionCount)
      .map(({ id, 문제, 선택지 }) => ({ id, 문제, 선택지: shuffle(선택지) })),
  })
}
