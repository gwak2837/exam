'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import useSWR from 'swr'

import Loading from '@/app/exam/[questionCount]/loading'
import { ResultFallback } from '@/app/exam/result/Result'
import 난이도선택하기Button from '@/app/exam/result/난이도선택하기Button'
import 다시풀기Button from '@/app/exam/result/다시풀기Button'
import 새로풀기Button from '@/app/exam/result/새로풀기Button'
import { fetchJSON } from '@/util/swr'

const Result = dynamic(async () => await import('@/app/exam/result/Result'), { ssr: false, loading: ResultFallback })

export default function Page() {
  const searchParams = useSearchParams()

  const { data, isLoading } = useSWR(`/api/question/result?${searchParams}`, fetchJSON)

  if (isLoading) return <Loading />

  return (
    <main className="flex grow flex-col p-4 sm:p-8 md:p-12 lg:p-16">
      <h1 className="text-center text-3xl">BDSM 고사</h1>
      <h5 className="text-center text-xs text-gray-400">
        <Link href="/">https://bdsm.vercel.app</Link>
      </h5>
      <h4 className="my-8 text-center">
        난이도: {get시험난이도(data.문제개수)} <span className="text-xs">({data.문제개수}개)</span>
      </h4>
      <h2 className="my-2 text-center text-2xl">
        <b className="text-violet-900">{data.정답개수}</b> / {data.문제개수}
      </h2>
      <h3 className="my-2 flex items-center justify-center gap-2 text-lg">
        등급: <b className="text-4xl text-violet-950">{get등급((100 * data.정답개수) / data.문제개수)}</b>
      </h3>
      <div className="h-8" />
      <Result result={data} />
      <div className="h-16" />
      <div className="grid gap-4">
        <다시풀기Button examId={data.문제개수} />
        <새로풀기Button examId={data.문제개수} />
        <난이도선택하기Button />
      </div>
    </main>
  )
}

function get시험난이도(questionCount: number) {
  switch (questionCount) {
    case 10:
      return 'Junior'
    case 20:
      return 'Senior'
    case 30:
      return 'Staff'
    default:
      return 'Custom'
  }
}

function get등급(score: number) {
  if (score >= 95) return 'A+'
  else if (score >= 90) return 'A'
  else if (score >= 85) return 'B+'
  else if (score >= 80) return 'B'
  else if (score >= 75) return 'C+'
  else if (score >= 70) return 'C'
  else if (score >= 65) return 'D+'
  else if (score >= 60) return 'D'
  else return 'F'
}
