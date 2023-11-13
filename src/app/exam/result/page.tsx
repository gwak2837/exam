import ResultStatistics from '@/app/exam/result/ResultStatistics'
import { type PageProps } from '@/common/types'

export default function Page({ searchParams }: PageProps) {
  const 문제개수 = Array.from(new Set(Object.keys(searchParams))).length

  return (
    <>
      <h4 className="my-8 text-center">
        난이도: {get시험난이도(문제개수)} <span className="text-xs">({문제개수}개)</span>
      </h4>
      <ResultStatistics />
    </>
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
