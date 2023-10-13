import { exam } from '@/common/exam'
import { RouteProps } from '@/common/types'
import { shuffle } from '@/common/utils'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest, { params }: RouteProps) {
  const questionCount = params.count

  return Response.json({ questions: shuffle(exam).slice(+questionCount) })
}
