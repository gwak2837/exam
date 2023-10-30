import dynamic from 'next/dynamic'
import { type PageProps } from '@/common/types'
import { CANONICAL_URL } from '@/common/constants'
import { toQuerystring } from '@/util/utils'
import 다시풀기Button from '@/app/exam/result/다시풀기Button'
import 새로풀기Button from '@/app/exam/result/새로풀기Button'
import 난이도선택하기Button from '@/app/exam/result/난이도선택하기Button'

const Result = dynamic(async () => await import('@/app/exam/result/Result'), { ssr: false })

async function getResult(querystring: string) {
  const res = await fetch(`${CANONICAL_URL}/api/question/result?${querystring}`, { next: { tags: ['result'] } })
  if (!res.ok) throw new Error('Failed to fetch data')

  return await res.json()
}

export default async function Page({ searchParams }: PageProps) {
  const result = await getResult(toQuerystring(searchParams))

  return (
    <main className="flex grow flex-col p-4 sm:p-8 md:p-12 lg:p-16">
      <h1 className="text-center text-3xl">BDSM 고사</h1>
      <h2 className="my-8 text-center">난이도: {get시험난이도(result.문제개수)}</h2>
      <h3 className="my-2 text-center text-2xl">
        <b className="text-violet-900">{result.정답개수}</b> / {result.문제개수} 백분위 등급
      </h3>
      <Result result={result} />
      <div className="grid gap-4">
        <다시풀기Button examId={result.문제개수} />
        <새로풀기Button examId={result.문제개수} />
        <난이도선택하기Button />
      </div>
    </main>
  )
}

function get시험난이도(questionCount: string) {
  switch (questionCount) {
    case '10':
      return 'Child'
    case '20':
      return 'Teen'
    case '30':
      return 'Adult'
    default:
      return 'Custom'
  }
}
