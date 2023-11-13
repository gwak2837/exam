import Link from 'next/link'

import ResultStatistics from '@/app/exam/result/ResultStatistics'
import { type PageProps } from '@/common/types'

export default function Page({ searchParams }: PageProps) {
  const 문제개수 = Array.from(new Set(Object.keys(searchParams))).length

  return (
    <main className="flex grow flex-col p-4 sm:p-8 md:p-12 lg:p-16">
      <h1 className="text-center text-3xl">BDSM 고사</h1>
      <h5 className="text-center text-xs text-gray-400">
        <Link href="/">https://bdsm.vercel.app</Link>
      </h5>
      <h4 className="my-8 text-center">
        난이도: {get시험난이도(문제개수)} <span className="text-xs">({문제개수}개)</span>
      </h4>
      <ResultStatistics />
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
